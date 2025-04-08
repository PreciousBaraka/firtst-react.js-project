import { RoleType } from "@prisma/client";
import { prisma } from "../config/db.js";

export const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    if (!Object.values(RoleType).includes(name)) {
      return res.status(400).json({ message: "Invalid role name" });
    }

    const existingRole = await prisma.role.findUnique({
      where: { name },
    });

    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }
    const role = await prisma.role.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json(role);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const role = await prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const updatedRole = await prisma.role.update({
      where: {
        id,
      },
      data: {
        name: name || role.name,
        description: description || role.description,
      },
    });
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    await prisma.role.delete({
      where: {
        id,
      },
    });

    res.status(204).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
