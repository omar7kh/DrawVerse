import axios from 'axios';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const DeleteBoard = ({ setIsDeleteBoard, boardData }) => {
  const { backendApiUrl, userId } = useContext(UserContext);

  const closeDeleteBoard = () => {
    setIsDeleteBoard(false);
  };

  const handleDeleteBoard = async () => {
    const res = await axios.delete(
      `${backendApiUrl}/deleteBoard/${boardData.id}/${userId}`,
      { withCredentials: true }
    );
    // TODO: fix the res
    if (res.data.msg === 'Board deleted successfully') {
      setIsDeleteBoard(false);

      fetch(`https://api.liveblocks.io/v2/rooms/${boardData.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${
            import.meta.env.VITE_LIVE_BLOCKS_SECRET_KEY
          }`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle response (success/failure)
        })
        .catch((error) => {
          console.log(error);
          // Handle errors
        });
    }
  };

  return (
    <div className='w-full h-screen bg-[#010101a9] z-50 absolute inset-0 flex justify-center items-center overflow-hidden'>
      <div className='w-[400px] h-[150px] bg-[#1F2937] p-4 flex flex-col justify-center items-center gap-3 rounded-md'>
        <span>Are you sure you want to delete ( {boardData.name} ) ?</span>
        <div className='flex justify-center items-center gap-5'>
          <button
            className='inline-flex items-center justify-center px-2 py-[2px] text-base font-medium leading-6 text-black whitespace-no-wrap bg-[#DFB700] border border-[#DFB700] rounded-md shadow-sm hover:bg-[#1F2937] hover:text-white transition-colors'
            onClick={handleDeleteBoard}
          >
            Delete
          </button>
          <button
            className='inline-flex items-center justify-center px-2 py-[2px] text-base font-medium leading-6 text-white whitespace-no-wrap border border-[#DFB700] rounded-md shadow-sm hover:bg-[#DFB700] hover:text-black transition-colors'
            onClick={closeDeleteBoard}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoard;
