import cookie from 'js-cookie';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

const MainPage = () => {
  const { isAuthenticated, checkIfIsAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const checkResult = await checkIfIsAuthenticated();

      if (!checkResult) {
        navigate('/');
      }
    };
    check();
  }, []);

  return isAuthenticated && <div>MainPage</div>;
};
export default MainPage;
