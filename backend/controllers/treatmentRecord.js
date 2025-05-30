import { prisma } from "../config/db.js";
import {
  treatmentRecordSchema,
  treatmentRecordEditSchema,
} from "../schema/treatmentRecord.js";

// Create Treatment Record
export const createTreatmentRecord = async (req, res) => {
  try {
    const { error, value } = treatmentRecordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { treatmentPlan, symptoms, status } = value;

    const { hospitalVisitId, doctorId } = req.query;
    console.log("doctor id found: ", doctorId)

    if (!hospitalVisitId || !doctorId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Ensure all linked entities exist
    // const [hospitalVisit, doctor] = await  Promise.all([
    //   prisma.hospitalVisit.findUnique({
    //     where: { id: hospitalVisitId },
    //     include: { patient: true },
    //   }),
    //   prisma.doctor.findUnique({ where: { id: doctorId } }),
    // ]);

    const hospitalVisit = await prisma.hospitalVisit.findUnique({
      where: { id: hospitalVisitId },
      include: { patient: true },
    });

    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
    });
    // console.log(doctor)

    if (!hospitalVisit) {
      return res.status(404).json({ message: "Hospital Visit not found" });
    }
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const newTreatmentRecord = await prisma.treatmentRecord.create({
      data: {
        treatmentPlan,
        symptoms,
        status,
        doctor: { connect: { id: doctorId } },
        hospitalVisit: { connect: { id: hospitalVisitId } },
      },
      include: {
        doctor: true,
        hospitalVisit: {
          include: {
            patient: {
              include: {
                user: {
                  select: {
                    fullName: true,
                    phoneNumber: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(201).json(newTreatmentRecord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Treatment Record by ID
export const getTreatmentRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("treatment record id: ", id)

    const treatmentRecord = await prisma.treatmentRecord.findUnique({
      where: { id },
      include: {
        hospitalVisit: true,
        doctor: {
          include: {
            user: true
          }
        },
        treatmenQueries: {
          include: {
            treatmentQueryResponses: {
              include: {
                treatmentQuery: {
                  include: {
                    treatmentRecord: true,
                  },
                }
                
              },
            },
          },
        }
      },
    });

    console.log("treatment record found: ", treatmentRecord)

    if (!treatmentRecord) {
      return res.status(404).json({ message: "Treatment record not found" });
    }

    res.status(200).json(treatmentRecord);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update Treatment Record
export const updateTreatmentRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = treatmentRecordEditSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingRecord = await prisma.treatmentRecord.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      return res.status(404).json({ message: "Treatment record not found" });
    }

    const updatedRecord = await prisma.treatmentRecord.update({
      where: { id },
      data: { ...value },
    });

    res.status(200).json(updatedRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Create Treatment Query (for patient)
export const createTreatmentQuery = async (req, res) => {
  try {
    const { treatmentRecordId, title, description } = req.body;

    if (!treatmentRecordId || !title || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if treatment record exists
    const treatmentRecord = await prisma.treatmentRecord.findUnique({
      where: { id: treatmentRecordId },
    });

    if (!treatmentRecord) {
      return res.status(404).json({ message: "Treatment record not found" });
    }

    const newQuery = await prisma.treatmentQuery.create({
      data: {
        treatmentRecordId,
        title,
        description,
      },
      include: {
        treatmentQueryResponses: true,
      },
    });

    res.status(201).json(newQuery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Doctor replies to a treatment query
export const replyTreatmentQuery = async (req, res) => {
  try {
    const { treatmentQueryId, doctorId, response } = req.body;

    if (!treatmentQueryId || !doctorId || !response) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if treatment query exists
    const treatmentQuery = await prisma.treatmentQuery.findUnique({
      where: { id: treatmentQueryId },
    });

    if (!treatmentQuery) {
      return res.status(404).json({ message: "Treatment query not found" });
    }

    // Check if doctor exists
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const newResponse = await prisma.treatmentQueryResponse.create({
      data: {
        treatmentQueryId,
        doctorId,
        responseMessage: response,
      },
    });

    res.status(201).json(newResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// List all treatment queries for a specific doctor
export const listQueriesByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params ;

    if (!doctorId) {
      return res.status(400).json({ message: "Missing doctorId parameter" });
    }

    // Find all treatment queries where the doctor has responded
    const queries = await prisma.treatmentQuery.findMany({
      where: {
        treatmentQueryResponses: {
          some: {
            doctorId: doctorId,
          },
        },
      },
      include: {
        treatmentQueryResponses: {
          where: { doctorId: doctorId },
        },
        treatmentRecord: true,
      },
    });

    res.status(200).json(queries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
