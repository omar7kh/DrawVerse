import { useContext, useEffect, useRef, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { UserContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';
import { IoSearch } from 'react-icons/io5';
import axios from 'axios';
import { IoAlertCircle } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const Invite = ({ setIsInvite }) => {
  const { backendApiUrl, userId, setIsMember, isMember } =
    useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { id } = useParams();

  const [error, setError] = useState('');
  const [invitedUserData, setInvitedUserData] = useState('');
  const emailRef = useRef();

  const handleEmailSearch = async (e) => {
    e.preventDefault();
    setError('');
    let searchedEmail = emailRef.current.value;

    try {
      const res = await axios.get(`${backendApiUrl}/getUsers/${userId}`, {
        params: {
          findEmail: searchedEmail,
        },
      });
      setInvitedUserData(res.data);
      emailRef.current.value = '';
    } catch (error) {
      setInvitedUserData('');
      console.error('error search email', error.response.data);
      setError(error.response.data.msg);
    }
  };

  const handleInvite = async () => {
    try {
      const res = await axios.post(`${backendApiUrl}/invite`, {
        boardId: id,
        invitedUserEmail: invitedUserData.email,
        userId,
      });
      socket.emit('invite', {
        senderId: userId,
        receiverId: invitedUserData.id,
        boardId: id,
      });
      setIsInvite(false);
      setIsMember(!isMember);
    } catch (error) {
      setInvitedUserData('');
      setError(error.response.data.msg);
      console.error(error.response.data.msg);
    }
  };

  return (
    <div
      className={`w-[350px] shadow-xl border border-black z-50 ${
        invitedUserData || error ? 'h-[170px]' : 'h-[100px]'
      }  py-4 px-8 absolute bg-[#1F2937] right-16 top-20 rounded-md transition-all`}
    >
      <form
        onSubmit={handleEmailSearch}
        className='flex flex-col items-center justify-center relative'
      >
        <label htmlFor='inviteEmail' className='self-start mb-1'>
          Invite to your board
        </label>
        <div className='flex items-center relative'>
          <input
            type='email'
            name='inviteEmail'
            id='inviteEmail'
            required
            placeholder='search by email'
            className='p-1 w-full rounded-md text-black pr-7'
            ref={emailRef}
            autoFocus={true}
          />
          <button
            type='submit'
            className='absolute text-black right-2 cursor-pointer text-xl'
          >
            <IoSearch />
          </button>
        </div>
      </form>
      <IoMdCloseCircle
        className='text-lg absolute top-3 right-3 hover:text-red-500 cursor-pointer'
        onClick={() => setIsInvite(false)}
      />

      {invitedUserData && (
        <div className='p-1 border rounded-md mt-7 w-full flex justify-between items-center transition-all'>
          <span>{invitedUserData.email}</span>
          <button
            className='px-1 py-[2px] text-sm bg-yellow-400 text-black rounded-md'
            onClick={handleInvite}
          >
            Invite
          </button>
        </div>
      )}

      {error && (
        <div className='p-2 h-[100px] text-sm w-full flex flex-col justify-center items-center transition-all'>
          <IoAlertCircle className='text-3xl' />
          {error}
        </div>
      )}
    </div>
  );
};

export default Invite;
