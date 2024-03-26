import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { io } from 'socket.io-client';

export const SocketContext = createContext({});

export const SocketContextProvider = ({ children }) => {
  const { backendApiUrl, userId, setNotifications } = useContext(UserContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(backendApiUrl));
    console.log(backendApiUrl);
  }, []);

  useEffect(() => {
    if (userId && socket) {
      socket.emit('newUser', userId);
    }
  }, [socket, userId]);

  useEffect(() => {
    socket?.on('getNotifications', (data) => {
      console.log(data);
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
