import { memoryStore } from "../utils/memoryStore.js";

export const createInquiry = async (req, res, next) => {
  try {
    const { carId, carTitle, name, phone, email, message } = req.body;
    if (!carId || !name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Car ID, Name, Phone Number, and Message are required."
      });
    }

    const inquiry = memoryStore.createInquiry({
      carId,
      carTitle: carTitle || "Car Listing",
      name,
      phone,
      email: email || "",
      message
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully! A representative from Gode & Million will contact you shortly.",
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = memoryStore.getInquiries(req.query);
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    next(error);
  }
};
