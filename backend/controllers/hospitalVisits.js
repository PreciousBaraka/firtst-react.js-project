import { prisma } from "../config/db.js";
import { hospitalVisitEditSchema, hospitalVisitSchema } from "../schema/hospitalVisits.js";

export const createHospitalVisit = async (req, res) => {
  try {
    const { error, value } = hospitalVisitSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { visitDate, reason } = value;
    const { patientId, doctorId, receptionistId } = req.query;

    // Validate required foreign keys
    if (!patientId || !doctorId || !receptionistId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Ensure all linked entities exist
    const [patient, doctor, receptionist] = await Promise.all([
      prisma.patient.findUnique({ where: { id: patientId } }),
      prisma.doctor.findUnique({ where: { id: doctorId } }),
      prisma.receptionist.findUnique({ where: { id: receptionistId } }),
    ]);

    if (!patient || !doctor || !receptionist) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Create the hospital visit
    const newVisit = await prisma.hospitalVisit.create({
      data: {
        visitDate: new Date(visitDate),
        reason,
        patient: { connect: { id: patientId } },
        doctor: { connect: { id: doctorId } },
        receptionist: { connect: { id: receptionistId } },
      },
    });

    res.status(201).json(newVisit);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllHospitalVisits = async (req, res) => {
  try {
    const visits = await prisma.hospitalVisit.findMany({
      include: {
        patient: true,
        doctor: true,
        receptionist: true,
      },
      orderBy: {
        visitDate: "desc",
      },
    });

    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHospitalVisitById = async (req, res) => {
  try {
    const { id } = req.params;

    const visit = await prisma.hospitalVisit.findUnique({
      where: { id },
      include: {
        patient: true,
        doctor: true,
        receptionist: true,
      },
    });

    if (!visit) {
      return res.status(404).json({ message: "Hospital visit not found" });
    }

    res.status(200).json(visit);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateHospitalVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = hospitalVisitEditSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existing = await prisma.hospitalVisit.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Hospital visit not found" });
    }

    const updated = await prisma.hospitalVisit.update({
      where: { id },
      data: value,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

