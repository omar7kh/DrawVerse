import User from '../models/userSchema.js';
import Board from '../models/boardSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const userSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    if (!newUser) {
      res.status(500).send('all field are required');
    }
    await newUser.save();
    res.status(201).send(`New User: ${username} is added`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loggedUser = await User.findOne({ email: email });

    if (!loggedUser) {
      return res.json({
        success: false,
        error: 'User or Password are not correct',
      });
    }

    const comparedPassword = await bcrypt.compare(
      password,
      loggedUser.password
    );
    if (!comparedPassword) {
      return res.json({
        success: false,
        error: 'User or Password are not correct',
      });
    }

    const token = jwt.sign({ userId: loggedUser._id }, process.env.JWT_SECRET);

    return res.json({
      success: true,
      msg: 'User logged in',
      userId: loggedUser._id,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  const { email, username, password } = req.body;
  const userId = req.params.userId;

  const updateObj = {
    username: username,
    email: email,
  };

  try {
    if (password) updateObj.password = await bcrypt.hash(password, 10);

    const result = await User.findByIdAndUpdate(userId, updateObj, {
      new: true,
    });

    if (!result) {
      res.status(404).send('User not exists');
    } else {
      res.status(202);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const updateImage = async (req, res) => {
  const { files, imageUrl } = req.body;
  const userId = req.params.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        imageUrl: files,
      },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ success: false, error: 'User not found' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deletePhoto = async (req, res) => {
  const { imageUrl } = req.body;
  const userId = req.params.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        imageUrl: imageUrl,
      },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ success: false, error: 'User not found' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserInfo = async (req, res) => {
  const userId = req.params.userId;

  try {
    const getUser = await User.findById(userId);
    if (!getUser) {
      res.status(402).send('User not exists');
    } else {
      res.status(200).json(getUser);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUsers = async (req, res) => {
  const { findEmail } = req.query;
  const { userId } = req.params;

  if (findEmail) {
    try {
      const getUser = await User.findOne({
        email: findEmail,
        _id: { $ne: userId },
      });

      if (!getUser) {
        res.status(402).json({ success: false, msg: 'User not found' });
      } else {
        res.status(200).json({ email: getUser.email, id: getUser._id });
      }
    } catch (error) {
      res.status(500).json({ success: false, mag: error.message });
    }
  } else {
    res.status(400).json({ success: false, msg: 'email is required' });
  }
};

export const invite = async (req, res) => {
  const { invitedUserEmail, boardId, userId } = req.body;

  try {
    const userBoards = await Board.findOne({ userId });

    if (!userBoards) {
      return res
        .status(404)
        .json({ success: false, error: 'User boards not found' });
    }

    const getInvitedUser = await User.findOne({ email: invitedUserEmail });

    if (!getInvitedUser) {
      return res
        .status(404)
        .json({ success: false, msg: 'Invited user not found' });
    }

    const board = userBoards.boards.find((b) => b.boardId === boardId);

    if (!board) {
      return res.status(404).json({ success: false, msg: 'Board not found' });
    }

    const isMember = board.members.some(
      (member) => member === getInvitedUser._id.toString()
    );

    if (isMember) {
      return res.status(400).json({
        success: false,
        msg: 'User is already a member of this board',
      });
    }

    const handleNotifications = getInvitedUser.notifications;
    handleNotifications.push({ from: userId, boardId: boardId });

    await getInvitedUser.save();

    res.status(200).json({
      success: true,
      message: 'User invited successfully',
      invitedUserId: getInvitedUser._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const notifications = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
    }
    const notificationsData = await Promise.all(
      user.notifications.map(async (notification) => {
        const getSender = await User.findById(notification.from);
        const getBoard = await Board.findOne({
          userId: getSender._id,
        });

        const getBoardName = getBoard.boards.find(
          (board) => board.boardId === notification.boardId
        );

        return {
          boardId: getBoardName.boardId,
          senderId: getSender._id,
          senderName: getSender.username,
          senderImgUrl: getSender.imageUrl,
          boardName: getBoardName.name,
          receiverId: userId,
        };
      })
    );

    res.status(200).json(notificationsData);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
