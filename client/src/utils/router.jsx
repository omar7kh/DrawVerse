import { createBrowserRouter } from 'react-router-dom';
import { Root } from '../components';
import {
  Home,
  LogIn,
  PageNotFound,
  Profile,
  SignUp,
  WhiteBoard,
  MainPage,
} from '../pages';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <LogIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/profile', element: <Profile /> },
      { path: '/whiteboard', element: <WhiteBoard /> },
      { path: '/main', element: <MainPage /> },

      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
