import { useContext, useEffect } from 'react';
import emptyImage from '../assets/images/empty-inbox-flatline.svg';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const EmptyBoards = ({ seIsBoard }) => {
  const { backendApiUrl, handleCreateBoard, boards, setBoards, userId } =
    useContext(UserContext);

  // todo this function should be in separate file
  const updateBoard = () => {
    const newBoard = handleCreateBoard();
    setBoards([...boards, newBoard]);
    seIsBoard(false);
  };

  return (
    <div className='w-full h-[600px] flex flex-col items-center justify-center gap-5'>
      <div className='w-[300px] h-[300px]'>
        <img
          src={emptyImage}
          alt='empty_image'
          className='h-full w-full object-cover'
        />
      </div>
      <div className='flex flex-col gap-10 justify-center items-center'>
        <p className='text-xl font-bold'>Start your first board</p>

        <button className='relative inline-block text-lg group'>
          <span className='relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-950 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white'>
            <span className='absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-yellow-400'></span>
            <span className='absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease'></span>
            <span className='relative font-bold' onClick={updateBoard}>
              New Board
            </span>
          </span>
          <span
            className='absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0'
            data-rounded='rounded-lg'
          ></span>
        </button>
      </div>
    </div>
  );
};

export default EmptyBoards;
