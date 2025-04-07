import { UserType } from "@prisma/client";
import { prisma } from "../config/db.js";
import { patientSchema, userLoginSchema } from "../schema/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../util/jwt.js";

export const registerUser = async (req, res) => {
  const { userType } = req.query;

  if (userType !== "patient" && userType !== "doctor") {
    return res.status(400).json({ message: "Invalid user type" });
  }

  try {
    // Patient registration
    if (userType === "patient") {
      const { error, value } = patientSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { fullName, email, phoneNumber, password, age } = value;

      // Check if the patient already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Patient already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create patient and user
      const patient = await prisma.patient.create({
        data: {
          user: {
            create: {
              fullName,
              email,
              phoneNumber,
              password: hashedPassword,
              age,
              type: UserType.PATIENT,
            },
          },
          nationalIdNo,
        },
        include: { user: true },
      });

      return res.status(201).json(patient);
    }

    // Doctor registration
    if (userType === "doctor") {
      const { error, value } = patientSchema.validate(req.body);
      if (error && error?.details[0]) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { fullName, email, phoneNumber, age, nationalIdNo, roleId } = value;

      // Check if the role exists
      const role = await prisma.role.findUnique({
        where: {
          id: roleId,
        },
      });

      if (!role) {
        return res.status(404).json({ message: "Invalid role" });
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { patient: { age } }],
        },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Generate an initial password for the doctor and hash it
      const generatedPassword = "12345678";
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      // Create doctor and user
      const doctor = await prisma.doctor.create({
        data: {
          user: {
            create: {
              fullName,
              email,
              phoneNumber,
              age,
              password: hashedPassword,
              type: UserType.DOCTOR,
            },
          },
          nationalIdNo,
          role: {
            connect: { id: roleId },
          },
        },
        include: { user: true },
      });

      return res.status(201).json(doctor);
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
        patient: { include: { role: true } },
        doctor: { include: { role: true } },
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

    let role = "PATIENT";
    if (existingUser.type === UserType.DOCTOR) {
      role = existingUser.doctor.role.name;
    }

    const user = {
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      phoneNumber: existingUser.phoneNumber,
      nationalIdNo: existingUser.nationalIdNo,
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
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive },
      include: {
        doctor: { include: { role: true } },
        patient: true,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Error deactivating user" });
  }
};
