import ErrorPage from 'components/ErrorPage';
import userRouters from 'pages/user';

const authorizedRoutes = [
  {
    path: '',
    children: userRouters,
    errorElement: <ErrorPage />,
  },
];

export default authorizedRoutes;
