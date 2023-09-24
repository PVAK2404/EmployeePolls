import Layout from './Layout';

const routes = [
  {
    path: '',
    element: <Layout />,
  },
  {
    path: '*',
    element: <Layout />,
  },
];

export default routes;
