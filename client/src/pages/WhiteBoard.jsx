import { useContext, useEffect, useState } from 'react';
import { IoIosAlbums } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { IoMdCloseCircle } from 'react-icons/io';
import { UserContext } from '../context/UserContext';
import { RoomProvider } from '../../liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';
import { Room } from '../components';
import { useParams } from 'react-router-dom';

const WhiteBoard = () => {
  const { isAuthenticated, checkIfIsAuthenticated, boardId } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [isInvite, setIsInvite] = useState(false);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const check = async () => {
      const checkResult = await checkIfIsAuthenticated();

      if (!checkResult) {
        navigate('/');
      }
    };
    check();
  }, []);

  return (
    isAuthenticated && (
      <div className='h-screen w-full text-white overflow-hidden'>
        <nav className='bg-[#1F2937] h-16 flex justify-between items-center px-5 lg:px-16 z-50 relative'>
          <div className='flex items-center gap-10'>
            <IoIosAlbums
              className='text-2xl cursor-pointer hover:text-[#DFB700] delay-75 duration-200'
              onClick={() => navigate('/main')}
            />
            <span className='text-xl font-bold'>Project Name</span>
          </div>
          <button
            className='bg-[#DFB700] text-black p-1 rounded-md font-medium'
            onClick={() => setIsInvite(true)}
          >
            Invite
          </button>
        </nav>

        {isInvite && (
          <div className='w-[350px] h-[200px] p-4 absolute bg-[#1F2937] right-16 top-20 rounded-md'>
            <div className='flex flex-col items-center justify-center relative'>
              <label htmlFor='inviteEmail' className='self-start ml-8 mb-1'>
                Invite to your board
              </label>
              <input
                type='email'
                name='inviteEmail'
                id='inviteEmail'
                placeholder='search by email'
                className='p-1 rounded-md text-black'
              />
            </div>
            <IoMdCloseCircle
              className='text-lg absolute top-3 right-3 hover:text-red-500 cursor-pointer'
              onClick={() => setIsInvite(false)}
            />
          </div>
        )}

        <div className='h-[calc(100vh-64px)] w-full flex justify-between'>
          <aside className='bg-zinc-700 h-full w-[280px]'></aside>
          <div className=' h-full bg-slate-300 inline-block'>
            <RoomProvider id={id} initialPresence={{ cursor: null }}>
              <ClientSideSuspense fallback={<div>Loading…</div>}>
                {() => <Room />}
              </ClientSideSuspense>
            </RoomProvider>
          </div>
          <aside className='bg-zinc-700 h-full w-[280px]'></aside>
        </div>
      </div>
    )
  );
};

export default WhiteBoard;
