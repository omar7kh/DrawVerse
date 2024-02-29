import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const EditBoard = ({ setIsEditBoard, boardData }) => {
  const { backendApiUrl, userId } = useContext(UserContext);
  const [newName, setNewName] = useState('');

  const closeEditBoard = () => {
    setIsEditBoard(false);
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `${backendApiUrl}/editBoardName/${boardData.id}/${userId}`,
        {
          newName,
        }
      );
      setIsEditBoard(false);

      console.log(response.data.msg);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='w-full h-screen bg-[#010101a9] z-50 absolute inset-0 flex justify-center items-center overflow-hidden'>
      <div className='w-[400px] h-[150px] bg-[#1F2937] p-4 flex flex-col justify-center gap-3 rounded-md'>
        <span>Change Board Name</span>
        <input
          type='text'
          placeholder={
            boardData.name.length > 15
              ? `${boardData.name.slice(0, 15)}...`
              : boardData.name[0].toLocaleUpperCase() + boardData.name.slice(1)
          }
          className='w-full text-black py-1 px-2 rounded-md'
          onChange={(e) => setNewName(e.target.value)}
        />
        <div className='flex justify-center items-center gap-10'>
          <button
            className='inline-flex items-center justify-center px-2 py-[2px] text-base font-medium leading-6 text-black whitespace-no-wrap bg-[#DFB700] border border-[#DFB700] rounded-md shadow-sm hover:bg-[#1F2937] hover:text-white transition-colors'
            onClick={handleEdit}
          >
            Save
          </button>
          <button
            className='inline-flex items-center justify-center px-2 py-[2px] text-base font-medium leading-6 text-white whitespace-no-wrap border border-[#DFB700] rounded-md shadow-sm hover:bg-[#DFB700] hover:text-black transition-colors'
            onClick={closeEditBoard}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBoard;
