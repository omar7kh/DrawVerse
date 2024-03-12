import User from '../models/userSchema.js';
import Board from '../models/boardSchema.js';

let onlineUsers = [];

export const socketFunc = (io) => {
  const addNewUser = (userId, socketId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId);
  };

  io.on('connection', (socket) => {
    socket.on('newUser', (userId) => {
      addNewUser(userId, socket.id);
    });

    socket.on('invite', async ({ senderId, receiverId, boardId }) => {
      const receiver = getUser(receiverId);

      const findSender = await User.findOne({ _id: senderId });
      const findSenderBoards = await Board.findOne({ userId: senderId });
      const findBoard = findSenderBoards.boards.find((board) => board.boardId);

      if (!findSender) throw error;
      if (!findSenderBoards) throw error;
      if (!findBoard) throw error;

      io.to(receiver.socketId).emit('getNotifications', {
        senderId: findSender._id,
        senderName: findSender.username,
        senderImgUrl: findSender.imageUrl,
        boardName: findBoard.name,
        receiverId: receiver.userId,
        boardId: boardId,
      });
    });

    socket.on('acceptInvite', async (data) => {
      const userBoards = await Board.findOne({ userId: data.senderId });
      const board = userBoards.boards.find((b) => b.boardId === data.boardId);
      board.members.push(data.receiverId.toString());
      await userBoards.save();

      const getInvitedUser = await User.findOne({
        _id: data.receiverId,
      });
      const handleInvitedBoards = getInvitedUser.invitedBoards;
      handleInvitedBoards.push(data.boardId);
      await getInvitedUser.save();

      const sender = getUser(data.senderId);
      io.to(sender.socketId).emit('acceptInvite', getInvitedUser);

      const updatedNotifications = getInvitedUser.notifications.filter(
        (notification) => {
          return notification.boardId !== data.boardId;
        }
      );

      getInvitedUser.notifications = updatedNotifications;

      await getInvitedUser.save();

      const notificationsData = await Promise.all(
        updatedNotifications.map(async (notification) => {
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
            receiverId: data.receiverId,
          };
        })
      );
      const receiver = getUser(data.receiverId);

      const getBoard = await Board.find();
      getBoard.map((Board) => {
        Board.boards.map((board) => {
          if (board.boardId === data.boardId) {
            io.to(receiver.socketId).emit('getInvitedBoards', board);
          }
        });
      });

      io.to(receiver.socketId).emit('updatedNotifications', notificationsData);
    });

    socket.on('removeMember', (data) => {
      console.log(data);
      const member = getUser(data.memberId);
      console.log(member.socketId);
      io.to(member.socketId).emit('removeMemberBoard', data.boardId);
    });

    socket.on('disconnect', () => {
      removeUser(socket.id);
    });
  });
};
