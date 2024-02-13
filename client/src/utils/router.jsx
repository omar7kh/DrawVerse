import { createBrowserRouter } from 'react-router-dom';
import { Root } from '../components';
import { Home, LogIn, MainPage, PageNotFound, SignUp } from '../pages';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/main', element: <MainPage /> },
      { path: '/login', element: <LogIn /> },
      { path: '/signup', element: <SignUp /> },

      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
