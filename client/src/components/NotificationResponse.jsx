import '../index.css';
import avatar from '../assets/images/avatar.png';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { UserContext } from '../context/UserContext';

const NotificationResponse = ({ notifications, setIsNotificationOpen }) => {
  const [showInviteBox, setShowInviteBox] = useState(false);
  const [notificationData, setNotificationData] = useState({});
  const { socket } = useContext(SocketContext);
  const { setNotifications, setInvitedAccepted } = useContext(UserContext);

  const acceptInvite = () => {
    setIsNotificationOpen(false);
    socket.emit('acceptInvite', notificationData);
  };

  socket.on('updatedNotifications', (data) => {
    console.log(data);
    setNotifications(data);
  });

  return (
    <>
      {showInviteBox ? (
        <div className='w-full h-full text-xs flex flex-col justify-evenly items-center p-1'>
          <div className='flex justify-center items-center gap-3'>
            <img
              src={
                notificationData.senderImgUrl
                  ? `data:image/png;base64,${notificationData.senderImgUrl}`
                  : avatar
              }
              className='w-10 h-10 object-cover rounded-full'
            />
            <span>
              {notificationData.senderName} has invited you to{' '}
              {notificationData.boardName}
            </span>
          </div>

          <div className='w-full my-[5px] flex justify-evenly'>
            <button
              className='p-1 rounded-sm bg-green-700 hover:bg-green-800'
              onClick={acceptInvite}
            >
              Accept
            </button>
            <button
              className='p-1 rounded-sm bg-red-700 hover:bg-red-800'
              onClick={() => setShowInviteBox(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className='overflow-y-auto h-full w-full'>
          {notifications.map((notification, index) => (
            <div
              className='text-xs w-full flex justify-center items-center gap-3 border-b rounded-sm p-1 cursor-pointer hover:bg-[#12181f] last:border-none'
              onClick={() => {
                setNotificationData(notification);
                setShowInviteBox(true);
              }}
              key={index}
            >
              <img
                src={
                  notification.senderImgUrl
                    ? `data:image/png;base64,${notification.senderImgUrl}`
                    : avatar
                }
                className='w-10 h-10 object-cover rounded-full'
              />
              <span>{`${notification.senderName} has invited you to ${notification.boardName}`}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NotificationResponse;
