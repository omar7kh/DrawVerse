import { createContext, useEffect, useState } from 'react';
import cookie from 'js-cookie';
import { getRandomImage } from '../components/liveBlocks/Images';
import { v4 as randomId } from 'uuid';
import axios from 'axios';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const backendApiUrl =
    import.meta.env.VITE_NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : import.meta.env.VITE_SERVER_DOMAIN;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [boards, setBoards] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [boardData, setBoardData] = useState({});
  const [members, setMembers] = useState([]);

  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    imageUrl: '',
  });
  const [currentUser, setCurrentUser] = useState({
    username: '',
    email: '',
    image: '',
    password: '',
  });

  const handleIfUserHasToken = () => {
    // TODO: for deployment
    let JWTInfo = localStorage.getItem('JWTinfo');

    // let JWTInfoCookie = cookie.get('JWTinfo');
    // return JWTInfoCookie;
    return JWTInfo;
  };

  const checkIfIsAuthenticated = async () => {
    const token = handleIfUserHasToken();
    if (token) {
      const res = await axios.post(
        `${backendApiUrl}/isAuth`,
        { token },
        { withCredentials: true }
      );
      if (res.data.isAuth) {
        setUserId(res.data.userId);
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } else {
      return false;
    }
  };
  // TODO: handleCreateBoard in separate file;
  const handleCreateBoard = () => {
    let newBoard = {
      userId: userId,
      boardId: randomId(),
      name: 'untitled',
      imageUrl: getRandomImage(),
    };
    axios.post(`${backendApiUrl}/createBoard`, {
      newBoard,
    });
    return newBoard;
  };
  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        try {
          const res = await axios.get(`${backendApiUrl}/getUser/${userId}`);
          const imageFromRes = res.data.imageUrl;
          const dataUrl = `data:image/png;base64,${imageFromRes}`;

          setCurrentUser({
            username: res.data.username,
            email: res.data.email,
            image: !imageFromRes
              ? dataUrl.replace(/^data:image\/[a-z]+;base64,/, '')
              : dataUrl,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    getUser();
  }, [userId, currentUser.image]);

  useEffect(() => {
    if (userId) {
      const getNotifications = async () => {
        try {
          const res = await axios.get(
            `${backendApiUrl}/getNotifications/${userId}`
          );
          setNotifications((prev) => [...prev, ...res.data]);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      getNotifications();
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        backendApiUrl,
        isAuthenticated,
        checkIfIsAuthenticated,
        setIsAuthenticated,
        userId,
        handleCreateBoard,
        boards,
        setBoards,
        setUserData,
        userData,
        setCurrentUser,
        currentUser,
        isMember,
        setIsMember,
        socket,
        notifications,
        setNotifications,
        boardData,
        setBoardData,
        members,
        setMembers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
