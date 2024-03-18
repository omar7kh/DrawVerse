import { useContext } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';
import NotificationResponse from './NotificationResponse';
import { UserContext } from '../context/UserContext';

const NotificationsBox = ({ setIsNotificationOpen }) => {
  const { notifications } = useContext(UserContext);

  return (
    <div className='w-60 h-auto max-h-28 absolute flex flex-col justify-center items-start top-6 right-3 bg-[#1F2937] border border-black rounded-md shadow-xl z-10'>
      {notifications.length ? (
        <NotificationResponse
          notifications={notifications}
          setIsNotificationOpen={setIsNotificationOpen}
        />
      ) : (
        <div className='w-full h-full p-2 flex flex-col justify-center items-center gap-1'>
          <IoAlertCircleOutline className='text-2xl text-yellow-500' />
          <span className='text-xs'>There is no Notifications</span>
        </div>
      )}
    </div>
  );
};

export default NotificationsBox;
