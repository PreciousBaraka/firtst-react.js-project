import { prisma } from "../config/db.js";
import { patientEditSchema } from "../schema/User.js";
import bcrypt from "bcrypt";

// Get Patients
export const getPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      include: { user: true },
    });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update Patient
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = patientEditSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingPatient = await prisma.patient.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // hashedpasswod
    const hashedPassword = await bcrypt.hash(value.password, 10);

    // Update client
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        user: {
          update: {
            fullName: value.fullName || existingPatient.user.fullName,
            phoneNumber: value.phoneNumber || existingPatient.user.phoneNumber,
            password: value.hashedPassword || existingPatient.user.password,
            email: value.email || existingPatient.user.email,
          },
        },
        nationalIdNo: value.nationalIdNo || existingPatient.nationalIdNo,
        age: value.age || existingPatient.age,
      },
      include: { user: true },
    });

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
