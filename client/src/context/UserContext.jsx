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
      : 'vercel';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [boards, setBoards] = useState([]);
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
    let JWTInfoCookie = cookie.get('JWTinfo');
    if (!JWTInfoCookie) return false;
    JWTInfoCookie = JWTInfoCookie.replace('j:', '');
    const cookieValueObj = JSON.parse(JWTInfoCookie);
    const expirationInMs = new Date(cookieValueObj.expires) - new Date();
    const getUserId = cookieValueObj.userId;
    setUserId(getUserId);
    if (expirationInMs <= 0) return null;
    return JWTInfoCookie;
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

          console.log('imageUrl', res.data.imageUrl);
          console.log('dataUrl', dataUrl);

          setCurrentUser({
            username: res.data.username,
            email: res.data.email,
            image: !imageFromRes
              ? dataUrl.replace(/^data:image\/[a-z]+;base64,/, '')
              : dataUrl,
          });
          console.log('res.data', res.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    getUser();
  }, [userId, currentUser.image]);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
