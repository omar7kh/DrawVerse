import { HiOutlineDotsVertical } from 'react-icons/hi';
import EditBoard from './EditBoard';
import React, { useContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import EmptyBoards from './EmptyBoards';
import { Link, useNavigate } from 'react-router-dom';
import DeleteBoard from './DeleteBoard';
import { SocketContext } from '../context/SocketContext';

const Boards = () => {
  const {
    userId,
    backendApiUrl,
    handleCreateBoard,
    boards,
    setBoards,
    setBoardData,
  } = useContext(UserContext);
  const [editBoardData, setEditBoardData] = useState({ id: '', name: '' });
  const [isEditBoard, setIsEditBoard] = useState(false);
  const [isDeleteBoard, setIsDeleteBoard] = useState(false);
  const [isBoard, seIsBoard] = useState(false);
  const { socket } = useContext(SocketContext);

  socket.on('getInvitedBoards', (data) => {
    setBoards([...boards, data]);
  });

  socket.on('removeMemberBoard', (boardId) => {
    const updateBoards = boards.filter((board) => {
      return board.boardId !== boardId;
    });
    setBoards(updateBoards);
  });

  const navigate = useNavigate();
  const toggleEditBoard = (boardId) => {
    setEditBoardData((prevData) => ({
      ...prevData,
      id: boardId === editBoardData.id ? null : boardId,
    }));
  };

  useEffect(() => {
    axios
      .post(
        `${backendApiUrl}/getBoards`,
        { userId: userId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setBoards(res.data.boards);
        if (res.data.boards.length >= 1) {
          seIsBoard(false);
        } else {
          setBoards([]);
          seIsBoard(true);
        }
      })
      .catch((error) => {
        console.log('error getBoards', error);
        setBoards([]);
        seIsBoard(true);
      });
  }, [isDeleteBoard, isEditBoard]);

  // todo: this function should be in separate file
  const updateBoard = () => {
    const newBoard = handleCreateBoard();

    setBoards([...boards, newBoard]);
  };

  if (isBoard) {
    return <EmptyBoards seIsBoard={seIsBoard} />;
  }

  return (
    <div className='grid grid-cols-1 px-16 my-10 gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
      {boards.length >= 1 && (
        <div
          className='relative p-20 sm:p-0 max-h-[240px] rounded-md cursor-pointer flex flex-col justify-center items-center bg-black transition-colors group'
          onClick={updateBoard}
        >
          <span className='absolute w-0 h-0 transition-all duration-200 ease-linear bg-yellow-500 rounded-full group-hover:rounded-md group-hover:w-full group-hover:h-full'></span>
          <span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700'></span>
          <FaPlus className='text-3xl group-hover:rotate-180 transition delay-75 duration-300 group-hover:text-black' />
          <span className='font-bold text-lg z-10 group-hover:text-black transition delay-75 duration-300'>
            New Board
          </span>
        </div>
      )}

      {boards.length >= 1 &&
        boards.map((board) => {
          return (
            <React.Fragment key={board.boardId}>
              <div
                className='group bg-slate-300 cursor-pointer relative rounded-md'
                onClick={() => {
                  setBoardData(board);
                  navigate(`/whiteboard/${board.boardId}`);
                }}
              >
                <img
                  src={board.imageUrl}
                  alt='board-image'
                  className='w-[300px] h-[200px] object-fill rounded-t-md'
                />

                <p className='p-2 text-black font-medium'>
                  {board.name.length > 15
                    ? `${board.name.slice(0, 15)}...`
                    : board.name[0].toLocaleUpperCase() + board.name.slice(1)}
                </p>
                {!board.members.includes(userId) ? (
                  <HiOutlineDotsVertical
                    className='hidden group-hover:block absolute top-2 right-2 z-10 text-xl bg-black rounded-full w-6 h-6 p-1'
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEditBoard(board.boardId);
                    }}
                  />
                ) : null}

                {editBoardData.id === board.boardId && (
                  <ul className='hidden group-hover:block h-fit p-2 text-xs z-10 bg-gray-800 rounded-md absolute top-8 right-4'>
                    <li
                      className='cursor-pointer hover:bg-slate-800 p-1 border-gray-800 border-b hover:border-[#DFB700] delay-75 duration-150'
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditBoard(true);
                        setEditBoardData({
                          id: board.boardId,
                          name: board.name,
                        });
                      }}
                    >
                      Change Name
                    </li>
                    <li
                      className='cursor-pointer hover:bg-slate-800 p-1 border-gray-800 border-b hover:border-[#DFB700] delay-75 duration-150'
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDeleteBoard(true);
                        setEditBoardData({
                          id: board.boardId,
                          name: board.name,
                        });
                      }}
                    >
                      Delete Board
                    </li>
                  </ul>
                )}

                <div className='absolute inset-0 h-full w-full opacity-0 group-hover:opacity-50 transition-opacity bg-black' />
              </div>

              {isEditBoard && (
                <EditBoard
                  setIsEditBoard={setIsEditBoard}
                  boardData={editBoardData}
                />
              )}

              {isDeleteBoard && (
                <DeleteBoard
                  setIsDeleteBoard={setIsDeleteBoard}
                  boardData={editBoardData}
                />
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
};
export default Boards;
