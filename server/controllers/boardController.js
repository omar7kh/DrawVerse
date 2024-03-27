import Board from '../models/boardSchema.js';
import User from '../models/userSchema.js';

export const createBoard = async (req, res) => {
  const { userId, boardId, name, imageUrl } = req.body.newBoard;

  try {
    let userBoard = await Board.findOne({ userId: userId });

    if (userBoard) {
      const newBoard = {
        boardId,
        name,
        imageUrl,
      };
      userBoard.boards.push(newBoard);
      await userBoard.save();
      res.status(201).send(`New board added to existing user boarders`);
    } else {
      const newBoard = new Board({
        userId,
        boards: [
          {
            boardId,
            name,
            imageUrl,
          },
        ],
      });
      await newBoard.save();
      res.status(201).send(`New user boarders and board created`);
    }
  } catch (error) {
    res.status(500).json({ createBoardError: error.message });
  }
};

export const fetchBoard = async (req, res) => {
  const { userId } = req.body;
  console.log('userId', userId);

  let boards = [];

  try {
    const getBoard = await Board.find();
    getBoard.map((Board) => {
      Board.boards.map((board) => {
        board.members.map((member) => {
          if (member === userId) {
            boards.push(board);
          }
        });
      });
    });
    const userBoard = await Board.findOne({ userId });

    if (userBoard) {
      boards.push(...userBoard.boards);
    }

    if (boards.length) {
      res.status(200).json({ boards: boards });
    } else {
      res.status(500).json({ msg: 'No boards found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBoard = async (req, res) => {
  const { boardId, userId } = req.params;

  try {
    const user = await Board.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const indexToRemove = user.boards.findIndex(
      (board) => board.boardId === boardId
    );
    if (indexToRemove === -1) {
      return res.status(404).json({ msg: 'Board not found for this user' });
    }
    user.boards.splice(indexToRemove, 1);

    await user.save();

    res.status(200).json({ msg: 'Board deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editBoardName = async (req, res) => {
  const { boardId, userId } = req.params;
  const { newName } = req.body;

  try {
    const user = await Board.findOne({ userId });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const board = user.boards.find((b) => b.boardId === boardId);

    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    board.name = newName;

    await user.save();

    res.status(200).json({ msg: 'Board renamed successfully' });
  } catch (error) {
    console.error('Error editing board name:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getMembers = async (req, res) => {
  const { id } = req.body;
  const boards = await Board.find();

  let findMembersId;
  let findBoard;
  await Promise.all(
    boards.map((board) => {
      board.boards.map((board) => {
        if (board.boardId === id) {
          findMembersId = board.members;
          findBoard = board;
        }
      });
    })
  );

  let findMembers = [];
  await Promise.all(
    findMembersId.map(async (id) => {
      await User.findOne({ _id: id }).then((member) => {
        const object = {
          imageUrl: member.imageUrl,
          username: member.username,
          _id: member._id,
        };
        findMembers.push(object);
      });
    })
  );
  res.status(200).json({ findMembers, findBoard: findBoard });
};

export const members = async (req, res) => {
  const { boardId, userId } = req.params;

  try {
    const user = await Board.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const board = user.boards.find((b) => b.boardId === boardId);

    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    if (board.members.length >= 1) {
      const membersData = await Promise.all(
        board.members.map(async (member) => {
          const findMember = await User.findOne({ _id: member });

          return findMember;
        })
      );
      res.status(200).json({ status: true, members: membersData });
    } else {
      res.status(200).json({
        status: false,
        msg: 'there is no members',
      });
    }
  } catch (error) {
    console.error('Error by get members', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteMember = async (req, res) => {
  const { memberId, userId, boardId } = req.params;
  try {
    const user = await Board.findOne({ userId });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const board = user.boards.find((b) => b.boardId === boardId);

    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    const isMemberIndex = board.members.findIndex(
      (member) => member === memberId
    );
    if (isMemberIndex !== -1) {
      board.members.splice(isMemberIndex, 1);
      await user.save();
      return res.status(200).json({ msg: 'Member removed successfully' });
    }

    return res.status(404).json({ msg: 'Member not found' });
  } catch (error) {
    console.error('Error by get members', error);
    res.status(500).json({ error: error.message });
  }
};

export const checkIsMember = async (req, res) => {
  const { id, userId } = req.body;

  try {
    const userBoards = await Board.find();
    let isAdmin = false;
    let isMember = false;
    userBoards.map((board) => {
      board.boards.map((board) => {
        if (id === board.boardId) {
          isMember = board.members.includes(userId);
        }
      });
      if (board.userId === userId) {
        board.boards.map((board) => {
          if (id === board.boardId) {
            isAdmin = true;
          }
        });
      }
    });

    res.json({ status: true, isAdmin: isAdmin, isMember: isMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
