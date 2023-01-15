import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ errors: ['Access denied'] });
    return;
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.id = data.id;
    next();
  } catch (error) {
    res.status(400).json({ errors: ['Token is not valid'] });
  }
};

export default verifyToken;
