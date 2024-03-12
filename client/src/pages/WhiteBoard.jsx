import { useContext, useEffect, useState } from 'react';
import { IoIosAlbums } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { RoomProvider } from '../../liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';
import { Invite, Members, Room } from '../components';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

import axios from 'axios';

const WhiteBoard = ({ boards }) => {
  const {
    isAuthenticated,
    checkIfIsAuthenticated,
    userId,
    backendApiUrl,
    boardData,
    setMembers,
  } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const navigate = useNavigate();
  const [isInvite, setIsInvite] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [boardName, setBoardName] = useState('boardName');

  const { id } = useParams();

  socket?.on('removeMemberBoard', (boardId) => {
    navigate('/main');
  });

  useEffect(() => {
    const getMembers = async () => {
      const res = await axios.post(`${backendApiUrl}/getMembers`, {
        id,
      });
      if (res.data) {
        setBoardName(res.data.findBoard.name);
        setMembers(res.data.findMembers);
      }
    };
    !isAdmin && getMembers();
  }, [boardData]);

  useEffect(() => {
    const check = async () => {
      const checkResult = await checkIfIsAuthenticated();
      if (!checkResult) {
        navigate('/');
      }
    };
    check();
    if (id && userId) {
      checkIsMember(id, userId);
    }
  }, [userId]);

  const checkIsMember = async (id, userId) => {
    const res = await axios.post(`${backendApiUrl}/checkIsMember`, {
      id: id,
      userId: userId,
    });
    if (!res.data.isMember && !res.data.isAdmin) {
      navigate('/main');
    }
    if (res.data.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  return (
    isAuthenticated && (
      <div className='h-screen w-full text-white overflow-hidden'>
        <nav className='bg-[#1F2937] h-16 flex justify-between items-center px-5 lg:px-16 z-50 relative'>
          <div className='flex items-center gap-10'>
            <IoIosAlbums
              className='text-2xl cursor-pointer hover:text-[#DFB700] delay-75 duration-200'
              onClick={() => navigate('/main')}
            />
            <span className='text-xl font-bold'>{boardName}</span>
          </div>

          <Members boardId={id} isAdmin={isAdmin} />
          {isAdmin && (
            <button
              className='bg-[#DFB700] text-black p-1 rounded-md font-medium'
              onClick={() => setIsInvite(true)}
            >
              Invite
            </button>
          )}
        </nav>

        {isInvite && <Invite setIsInvite={setIsInvite} />}

        <div className='h-[calc(100vh-64px)] min-w-full flex justify-between'>
          <aside className='bg-zinc-700 h-full w-[280px]'></aside>
          <div className='h-full w-full bg-slate-100'>
            <RoomProvider id={id} initialPresence={{ cursor: null }}>
              <ClientSideSuspense
                fallback={
                  <div className='w-full h-full flex justify-center items-center'>
                    <span className='loader'></span>
                  </div>
                }
              >
                {() => <Room />}
              </ClientSideSuspense>
            </RoomProvider>
          </div>
          <aside className='bg-zinc-700 h-full w-[280px]  '></aside>
        </div>
      </div>
    )
  );
};

export default WhiteBoard;
