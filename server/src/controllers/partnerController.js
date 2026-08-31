import { memoryStore } from "../utils/memoryStore.js";

export const getPartners = async (req, res, next) => {
  try {
    const partners = memoryStore.getPartners();
    res.json({
      success: true,
      count: partners.length,
      data: partners
    });
  } catch (error) {
    next(error);
  }
};
