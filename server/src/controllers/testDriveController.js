import { memoryStore } from "../utils/memoryStore.js";

export const bookTestDrive = async (req, res, next) => {
  try {
    const {
      carId,
      carTitle,
      fullName,
      phone,
      email,
      preferredDate,
      preferredTime,
      drivingLicenseNumber,
      notes
    } = req.body;

    if (!carId || !fullName || !phone || !preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        message: "Please provide Full Name, Phone number, Preferred Date, and Time for the test drive."
      });
    }

    const testDrive = memoryStore.createTestDrive({
      carId,
      carTitle: carTitle || "Vehicle Test Drive",
      fullName,
      phone,
      email: email || "",
      preferredDate,
      preferredTime,
      drivingLicenseNumber: drivingLicenseNumber || "Provided at showroom",
      notes: notes || ""
    });

    res.status(201).json({
      success: true,
      message: "Test drive booking confirmed at Bole Rwanda Showroom! Please bring your Ethiopian or International Driver's License.",
      data: testDrive
    });
  } catch (error) {
    next(error);
  }
};

export const getTestDrives = async (req, res, next) => {
  try {
    const list = memoryStore.getTestDrives();
    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    next(error);
  }
};
