import { doctorResponseSchema } from "../schema/doctorResponse.js";
import { prisma } from "../config/db.js";

export const createDoctorResponse = async (req, res) => {
  try {
    // Validate the incoming request body
    const { error, value } = doctorResponseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { patientQueryId, doctorId, responseMessage, status } = value;

    // Create the DoctorResponse in the database
    const newDoctorResponse = await prisma.doctorResponse.create({
      data: {
        patientQueryId,
        doctorId,
        responseMessage,
        status,
      },
    });

    // Return the created DoctorResponse
    res.status(201).json(newDoctorResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDoctorResponseById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const doctorResponse = await prisma.doctorResponse.findUnique({
        where: { id: id },
        include: {
          patientQuery: true,
          doctor: true,
        },
      });
  
      if (!doctorResponse) {
        return res.status(404).json({ message: "Doctor Response not found" });
      }
  
      res.status(200).json(doctorResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const updateDoctorResponse = async (req, res) => {
    try {
      const { id } = req.params;
      const { error, value } = doctorResponseSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const { patientQueryId, doctorId, responseMessage, status } = value;
  
      // Update the doctor response
      const updatedDoctorResponse = await prisma.doctorResponse.update({
        where: { id: id },
        data: {
          patientQueryId,
          doctorId,
          responseMessage,
          status,
        },
      });
  
      res.status(200).json(updatedDoctorResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  