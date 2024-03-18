import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';

const Members = ({ boardId, isAdmin }) => {
  const { backendApiUrl, userId, isMember, members, setMembers } =
    useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [isMemberRemoved, setIsMemberRemoved] = useState(false);

  socket.on('acceptInvite', (data) => {
    setMembers([...members, data]);
  });

  const fetchMembers = async () => {
    try {
      const res = await axios.get(
        `${backendApiUrl}/members/${boardId}/${userId}`
      );
      if (res.data.status) {
        setMembers(res.data.members);
      } else {
        setMembers([]);
        console.log(res.data.msg);
      }
    } catch (error) {
      setMembers([]);

      console.log('fetching members error', error);
    }
  };

  useEffect(() => {
    isAdmin && fetchMembers();
  }, [isMember, isMemberRemoved]);

  const handleRemoveMembers = async (memberId) => {
    try {
      const res = await axios.delete(
        `${backendApiUrl}/deleteMember/${memberId}/${boardId}/${userId}`
      );
      if (res.data.msg === 'Member removed successfully') {
        console.log('fetchMembers');
        fetchMembers();
        setIsMemberRemoved(!isMemberRemoved);
      }

      socket.emit('removeMember', { boardId, memberId });
    } catch (error) {
      console.log('delete member error', error);
    }
  };

  return (
    members && (
      <div
        className={`hidden md:flex justify-center items-center gap-2 ${
          isAdmin ? 'mr-24' : ''
        } `}
      >
        {members.map((member) => {
          return (
            <div
              key={member._id}
              className='group flex justify-center items-center w-12 h-12 rounded-full relative'
            >
              {isAdmin && (
                <div
                  className='bg-red-700 text-[10px] w-full h-full absolute rounded-full cursor-pointer hidden group-hover:block'
                  onClick={() => handleRemoveMembers(member._id)}
                >
                  <div className='w-full h-full flex flex-col justify-center items-center'>
                    <span>Remove</span>
                    <span>
                      {member.username.length > 5
                        ? `${member.username[0].toUpperCase()}${member.username.slice(
                            1,
                            5
                          )}...`
                        : member.username[0].toUpperCase() +
                          member.username.slice(1)}
                    </span>
                  </div>
                </div>
              )}
              <img
                src={`data:image/png;base64,${member.imageUrl}`}
                className=' w-full h-full rounded-full object-cover '
              />
            </div>
          );
        })}
      </div>
    )
  );
};

export default Members;
