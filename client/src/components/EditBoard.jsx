const EditBoard = ({ setIsEditBoard }) => {
  const closeEditBoard = () => {
    setIsEditBoard(false);
  };

  return (
    <div className='w-full h-full bg-[#0101018a] z-50 absolute inset-0 flex justify-center items-center'>
      <div className='w-[400px] h-[150px] bg-[#1F2937] p-4 flex flex-col justify-center gap-3 rounded-md'>
        <p>Change Board Name</p>
        <input type='text' className='w-full text-black py-1 px-2 rounded-md' />
        <div className='flex justify-center items-center gap-3'>
          <button className='bg-[#DFB700] text-black font-medium px-1 py-[1px] rounded-md w-fit'>
            save
          </button>
          <button
            className='font-medium px-1 py-[1px] rounded-md w-fit border border-[#DFB700]'
            onClick={closeEditBoard}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBoard;
