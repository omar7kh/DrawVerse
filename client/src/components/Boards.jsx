import { HiOutlineDotsVertical } from 'react-icons/hi';
import EditBoard from './EditBoard';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import img from '../assets/images/placeholders/2.svg';
import img1 from '../assets/images/placeholders/3.svg';
import img2 from '../assets/images/placeholders/4.svg';

const Boards = () => {
  const boards = [
    {
      name: 'chatApp',
      image: img,
      id: 'lkjsdlfj4lkjr3lkj5l34hlkrhjfljfsdfj',
    },
    {
      name: 'website',
      image: img1,
      id: 'lkjsdlfj4lkjr3lkj5l34bbgggfgfg',
    },
    {
      name: 'game',
      image: img2,
      id: 'lkjssdfgsgsdfhdshhd',
    },
  ];

  const [isEditBoard, setIsEditBoard] = useState(false);
  const [editBoardId, setEditBoardId] = useState(null);

  const toggleEditBoard = (boardId) => {
    setEditBoardId(boardId === editBoardId ? null : boardId);
  };

  return (
    <div className='grid grid-cols-1 px-16 my-10 gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
      <div className='p-20 sm:p-0 max-h-[240px] rounded-md cursor-pointer flex flex-col justify-center items-center bg-[#171717] hover:bg-black transition-colors group'>
        <FaPlus className='text-3xl group-hover:rotate-180 transition delay-75 duration-300' />
        <span className='font-bold text-lg'>New Board</span>
      </div>

      {boards.map((board) => {
        return (
          <>
            <div
              key={board.id}
              className='group bg-slate-300 cursor-pointer relative rounded-md'
            >
              <img
                src={board.image}
                alt='board-image'
                className='w-[300px] h-[200px] object-fill rounded-t-md'
              />
              <p className='p-2 text-black font-medium'>
                {board.name[0].toLocaleUpperCase() + board.name.slice(1)}
              </p>
              <HiOutlineDotsVertical
                className='hidden group-hover:block absolute top-2 right-2 z-10 text-xl bg-black rounded-full w-6 h-6 p-1'
                onClick={() => toggleEditBoard(board.id)}
              />

              {editBoardId === board.id && (
                <ul className='hidden group-hover:block h-fit p-2 text-xs z-10 bg-gray-800 rounded-md absolute top-8 right-4'>
                  <li
                    className='cursor-pointer hover:bg-slate-800 p-1 border-gray-800 border-b hover:border-[#DFB700] delay-75 duration-150'
                    onClick={() => setIsEditBoard(true)}
                  >
                    Change Name
                  </li>
                  <li className='cursor-pointer hover:bg-slate-800 p-1 border-gray-800 border-b hover:border-[#DFB700] delay-75 duration-150'>
                    Delete Board
                  </li>
                </ul>
              )}

              <div className='absolute inset-0 h-full w-full opacity-0 group-hover:opacity-50 transition-opacity bg-black' />
            </div>

            {isEditBoard && <EditBoard setIsEditBoard={setIsEditBoard} />}
          </>
        );
      })}
    </div>
  );
};

export default Boards;
