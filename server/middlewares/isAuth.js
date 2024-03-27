import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

export default async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    console.log('Token not found');
    return res
      .status(401)
      .json({ error: 'Unauthorized', details: 'Token not found' });
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedPayload.userId;
    await findUser(req.userId, res);
    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    return res
      .status(401)
      .json({ error: 'Unauthorized', details: 'Invalid token' });
  }
};

const findUser = async (userId, res) => {
  const existingUser = await User.findOne({
    _id: userId,
  });
  if (existingUser) {
    return res.status(200).json({
      isAuth: true,
      userId: userId,
      username: existingUser.username,
      email: existingUser.email,
    });
  } else {
    return res.send('User not found');
  }
};
