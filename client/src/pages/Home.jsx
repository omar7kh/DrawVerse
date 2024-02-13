import { UserContext } from '../context/UserContext.jsx';
import { useContext } from 'react';

const Home = () => {
  const { backendApiUrl } = useContext(UserContext);
  console.log(backendApiUrl);
  return <div>Home</div>;
};

export default Home;
