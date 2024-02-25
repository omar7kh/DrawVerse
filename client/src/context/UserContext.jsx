import { createContext, useEffect, useState } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const backendApiUrl =
    import.meta.env.VITE_NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'vercel';
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleIfUserHasToken = () => {
    let JWTinfocookie = cookie.get('JWTinfo');

    if (!JWTinfocookie) return;

    JWTinfocookie = JWTinfocookie.replace('j:', '');
    const cookieValueObj = JSON.parse(JWTinfocookie);

    const expirationInMs = new Date(cookieValueObj.expires) - new Date();

    if (expirationInMs <= 0) return;
    return JWTinfocookie;
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
    }
  };

  return (
    <UserContext.Provider
      value={{
        backendApiUrl,
        isAuthenticated,
        checkIfIsAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
