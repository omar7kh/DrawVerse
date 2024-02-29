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

  const handleIfUserHasToken = async () => {
    let JWTInfoCookie = cookie.get('JWTinfo');
    if (!JWTInfoCookie) return false;

    JWTInfoCookie = JWTInfoCookie.replace('j:', '');
    const cookieValueObj = JSON.parse(JWTInfoCookie);

    const getUserId = cookieValueObj.userId;
    setUserId(getUserId);

    const expirationInMs = new Date(cookieValueObj.expires) - new Date();

    if (expirationInMs <= 0) return null;

    return JWTInfoCookie;
  };

  const checkIfIsAuthenticated = async () => {
    const token = await handleIfUserHasToken();

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
