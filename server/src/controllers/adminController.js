import { memoryStore } from "../utils/memoryStore.js";

export const getAdminStats = async (req, res, next) => {
  try {
    const cars = memoryStore.getAllCars();
    const users = memoryStore.getUsers();
    const inquiries = memoryStore.getInquiries();
    const testDrives = memoryStore.getTestDrives();

    const totalValuationETB = cars.reduce((acc, c) => acc + (c.price || 0), 0);
    const totalViews = cars.reduce((acc, c) => acc + (c.viewsCount || 0), 0);
    const electricCarsCount = cars.filter(c => c.fuelType === "Electric").length;

    res.json({
      success: true,
      data: {
        totalListings: cars.length,
        totalUsers: users.length,
        totalInquiries: inquiries.length,
        totalTestDrives: testDrives.length,
        totalValuationETB,
        totalViews,
        electricCarsCount,
        featuredCount: cars.filter(c => c.isFeatured).length
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: memoryStore.getUsers()
    });
  } catch (error) {
    next(error);
  }
};
