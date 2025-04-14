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
          fullName,
          email,
          phoneNumber,
          dateOfBirth,
          gender,
          address,
          nationalIdNo,
          user: {
            create: {
              fullName,
              email,
              phoneNumber,
              password: hashedPassword,
              type: UserType.PATIENT,
              isActive: true,
            },
          },
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

      const role = await prisma.role.findUnique({ where: { id: roleId } });
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
          fullName,
          email,
          phoneNumber,
          nationalIdNo,
          specialization,
          role: {
            connect: { id: roleId },
          },
          user: {
            create: {
              fullName,
              email,
              phoneNumber,
              password: hashedPassword,
              type: UserType.DOCTOR,
              isActive: true,
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

      const {
        fullName,
        email,
        phoneNumber,
        password,
        roleId,
        nationalIdNo,
        whatsappNumber,
      } = value;

      if (!roleId) {
        return res.status(400).json({ message: "Role ID is required" });
      }

      const role = await prisma.role.findUnique({ where: { id: roleId } });
      if (!role) {
        return res.status(404).json({ message: "Invalid role" });
      }

      const existingUser = await prisma.receptionist.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Receptionist already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const receptionist = await prisma.receptionist.create({
        data: {
          fullName, 
          nationalIdNo,
          email,
          phoneNumber, 
          role: {
            connect: { id: roleId },
          },
          user: {
            create: {
              fullName,
              email,
              phoneNumber,
              password: hashedPassword,
              type: UserType.RECEPTIONIST,
            },
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
      // include: {
      //   doctor: {
      //     include: {
      //       role: true,
      //     },
      //   },
      // },
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

    let role = "PATIENT";
    if (existingUser.type === UserType.DOCTOR) {
      role = existingUser.doctor?.role?.name || "DOCTOR";
    }

    const user = {
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.phoneNumber,
      type: existingUser.type,
      isActive: existingUser.isActive,
      role,
    };

    const token = generateToken(user);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
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
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Error deactivating user" });
  }
};
