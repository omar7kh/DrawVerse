import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Boards, DropdownMenu, Logo, NotificationsBox } from '../components';
import avatar from '../assets/images/avatar.png';
import '../index.css';
import { IoMdNotifications } from 'react-icons/io';

const MainPage = () => {
  const {
    checkIfIsAuthenticated,
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    notifications,
    setMembers,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [shake, setShake] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationsNumber, setNotificationsNumber] = useState(0);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    setMembers([]);
    const check = async () => {
      const checkIsAuth = await checkIfIsAuthenticated();
      if (checkIsAuth) {
        setIsAuthenticated(true);
      } else {
        navigate('/login');
        setIsAuthenticated(false);
        console.log('not authenticated');
      }
    };

    check();
  }, [isAuthenticated]);

  useEffect(() => {
    setNotificationsNumber(notifications.length);
  }, [notifications]);

  return (
    <div className='min-h-full w-full bg-[#1F2937] text-white'>
      {isAuthenticated && (
        <>
          <nav className='flex justify-between bg-yellow-500 items-center px-5 h-14 z-50 lg:px-16'>
            <Logo
              width={35}
              height={35}
              textClasses='font-bold text-sm md:text-lg lg:text-xl'
            />
            <div className='flex justify-center items-center gap-5'>
              <div className='relative'>
                <IoMdNotifications
                  className={`text-2xl text-black cursor-pointer ${
                    shake ? 'animate-shake' : ''
                  }`}
                  onMouseEnter={() => setShake(true)}
                  onMouseLeave={() => setShake(false)}
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                />
                {notificationsNumber >= 1 && (
                  <span className='absolute -top-1 right-[-6px] text-xs bg-black rounded-full flex justify-center items-center w-[17px] h-[17px] overflow-hidden'>
                    {notificationsNumber}
                  </span>
                )}

                {isNotificationOpen && (
                  <NotificationsBox
                    setIsNotificationOpen={setIsNotificationOpen}
                  />
                )}
              </div>

              <div className='w-[45px] h-[45px] relative'>
                <img
                  src={
                    currentUser.image == 'undefined'
                      ? avatar
                      : currentUser.image
                  }
                  alt='avatar'
                  className='w-full h-full object-cover rounded-full relative cursor-pointer'
                  onClick={toggleDropdown}
                />
                {showDropdown && (
                  <div className='absolute top-[45px] right-6 z-10'>
                    <DropdownMenu />
                  </div>
                )}
              </div>
            </div>
          </nav>
          <div className='h-[calc(100vh-56px)] w-full flex justify-center items-start overflow-x-auto'>
            <Boards />
          </div>
        </>
      )}
    </div>
  );
};
export default MainPage;
