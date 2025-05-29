import { prisma } from "../config/db.js";
import { patientEditSchema } from "../schema/User.js";

// GET all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      include: { user: true },
    });
    res.status(200).json(patients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching patients", error });
  }
};

// GET single patient by ID with hospitalVisits, treatmentRecords, and patientQueries
export const getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        user: true,
        hospitalVisits: {
          include: {
            treatmentRecord: true,
          },
        },
        patientQueries: {
          include: {
            treatmentRecord: {
              select: {
                treatmentPlan: true,
              },
            },
            doctorResponses: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving patient", error });
  }
};

// PUT update patient info
export const updatedPatient = async (req, res) => {
  const { id } = req.params;
  const { error, value } = patientEditSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingPatient = await prisma.patient.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        user: {
          update: {
            fullName: value.fullName || existingPatient.user.fullName,
            email: value.email || existingPatient.user.email,
            phoneNumber: value.phoneNumber || existingPatient.user.phoneNumber,
            password: value.password || existingPatient.user.password,
          },
        },
        nationalIdNo: value.nationalIdNo || existingPatient.nationalIdNo,
        age: value.age || existingPatient.age,
        address: value.address || existingPatient.address,
        gender: value.gender || existingPatient.gender,
        dateOfBirth: value.dateOfBirth || existingPatient.dateOfBirth,
      },
      include: {
        user: true,
      },
    });

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating patient", error });
  }
};
