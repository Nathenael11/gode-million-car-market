import { verifyToken } from "../utils/jwt.js";
import { memoryStore } from "../utils/memoryStore.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route. Please login."
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });
  }

  const user = memoryStore.findUserById(decoded.id);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User no longer exists."
    });
  }

  const { password, plainPassword, ...safeUser } = user;
  req.user = safeUser;
  next();
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user ? req.user.role : "unauthorized"}' is not permitted to perform this action.`
      });
    }
    next();
  };
};
