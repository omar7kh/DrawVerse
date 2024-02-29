import Board from '../models/boardSchema.js';

export const createBoard = async (req, res) => {
  const { userId, boardId, name, imageUrl } = req.body.newBoard;

  // TODO Date should be in schema format
  // const currentDate = new Date();

  // const day = String(currentDate.getDate()).padStart(2, '0');
  // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  // const year = currentDate.getFullYear();

  // const date = `${day}.${month}.${year}`;

  try {
    let userBoard = await Board.findOne({ userId: userId });
    console.log(userBoard, 'userBoard');
    if (userBoard) {
      const newBoard = {
        boardId,
        name,
        imageUrl,
        createdAt: date,
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
    res.status(500).json({ error: error.message });
  }
};

export const fetchBoard = async (req, res) => {
  const { userId } = req.body;
  try {
    const userBoard = await Board.findOne({ userId });

    if (userBoard) {
      res.status(200).json({ boards: userBoard.boards });
    } else {
      res.status(200).json({ msg: 'No boards found' });
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
