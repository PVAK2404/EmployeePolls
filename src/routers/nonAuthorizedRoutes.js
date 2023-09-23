import ErrorPage from 'components/ErrorPage';
import authRoutes from 'pages/auth';

export const nonAuthorizedRoutes = [
  {
    path: '',
    children: authRoutes,
    errorElement: <ErrorPage />,
  },
];

export default nonAuthorizedRoutes;
