import { memoryStore } from "../utils/memoryStore.js";

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = memoryStore.getAllBlogs();
    res.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = memoryStore.getBlogBySlug(req.params.slug);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};
