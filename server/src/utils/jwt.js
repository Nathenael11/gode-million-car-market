import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gode_million_super_secret_jwt_key_ethiopia_2026';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';

export const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
