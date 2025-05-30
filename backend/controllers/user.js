import { UserType } from "@prisma/client";
import { prisma } from "../config/db.js";
import {
  doctorSchema,
  receptionistSchema,
  userLoginSchema,
  patientSchema,
} from "../schema/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
  const { userType } = req.query;
  console.log(req.body)

  if (!["doctor", "patient", "receptionist"].includes(userType)) {
    return res.status(400).json({ message: "Invalid user type" });
  }

  try {
    if (userType === "patient") {
      const { error, value } = patientSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const {
        fullName,
        email,
        phoneNumber,
        dateOfBirth,
        gender,
        address,
        nationalIdNo,
        password,
      } = value;

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: "Patient already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const patient = await prisma.patient.create({
        data: {
          user: {
            create: {
              fullName,
              email,
              phoneNumber,
              password: hashedPassword,
              usertype: UserType.PATIENT,
            },
          },
          nationalIdNo,
          dateOfBirth,
          gender,
          address,
        },
        include: {
          user: true,
        },
      });

      return res.status(201).json(patient);
    }

    if (userType === "doctor") {
      const { error, value } = doctorSchema.validate(req.body);
      if (error && error?.details[0]) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const {
        fullName,
        email,
        phoneNumber,
        nationalIdNo,
        password,
        specialization,
        roleId,
      } = value;

      const role = await prisma.role.findUnique({
         where: { 
          id: roleId 
        } });
      if (!role) {
        return res.status(404).json({ message: "Invalid role" });
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const doctor = await prisma.doctor.create({
        data: {
          user: {
            create: {
              fullName,
              email,
              phoneNumber,
              password: hashedPassword,
              usertype: UserType.DOCTOR,
            },
          },
          specialization,
          nationalIdNo,
          role: {
            connect: {
              id: roleId,
            },
          },
        },
        include: { user: true },
      });

      return res.status(201).json(doctor);
    }

    if (userType === "receptionist") {
      const { error, value } = receptionistSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { fullName, email, phoneNumber, password, roleId, nationalIdNo } =
        value;

      if (!roleId) {
        return res.status(400).json({ message: "Role ID is required" });
      }

      const role = await prisma.role.findUnique({ where: { id: roleId } });
      if (!role) {
        return res.status(404).json({ message: "Invalid role" });
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Receptionist already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const receptionist = await prisma.receptionist.create({
        data: {
          user: {
            create: {
              fullName,
              email,
              phoneNumber,
              password: hashedPassword,
              usertype: UserType.RECEPTIONIST,
            },
          },
          nationalIdNo,
          role: {
            connect: { id: roleId },
          },
        },
        include: { user: true },
      });

      return res.status(201).json(receptionist);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { error, value } = userLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = value;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        patient: true,
        receptionist: true,
        doctor:true
      },
    });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "No account found with this email" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!existingUser.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }


    const user = {
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.phoneNumber,
      isActive: existingUser.isActive,
      role: existingUser.usertype,
      patientId: existingUser.patient?.id || null,
      receptionistId: existingUser.receptionist?.id || null,
      doctorId: existingUser.doctor?.id || null,
    };

    const token = generateToken(user);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const changeUserAccess = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive },
      include: {
        doctor: {
          include: {
            role: true,
          },
        },
        patient: true,
        receptionist: {
          include: { role: true },
        },
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Error deactivating user" });
  }
};


// Controller to fetch dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Count users by type
    const [receptionists, doctors, patients] = await Promise.all([
      prisma.receptionist.count(),
      prisma.doctor.count(),
      prisma.patient.count(),
    ]);

    // Count queries and replies
    const [totalPatientQueries, totalTreatmentQueries, totalDoctorReplies, totalTreatmentReplies] = await Promise.all([
      prisma.patientQuery.count(),
      prisma.treatmentQuery.count(),
      prisma.doctorResponse.count(),
      prisma.treatmentQueryResponse.count(),
    ]);

    // Get 5 most recent treatments
    const recentTreatments = await prisma.treatmentRecord.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        doctor: {
          include: { user: true }
        },
        hospitalVisit: true,
      },
    });

    res.json({
      totalReceptionists: receptionists,
      totalDoctors: doctors,
      totalPatients: patients,
      totalPatientQueries,
      totalTreatmentQueries,
      totalDoctorReplies,
      totalTreatmentReplies,
      recentTreatments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};