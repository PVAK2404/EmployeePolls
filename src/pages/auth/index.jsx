import { redirect } from 'react-router-dom';
import Layout from './Layout';

const routes = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/:path',
        element: redirect(''),
      },
    ],
  },
];

export default routes;
