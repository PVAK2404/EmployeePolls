import Layout from './Layout';
import homeRoutes from './home';
import leaderboardRoutes from './leaderboard';
import newRoutes from './new';
import pollRoutes from './poll';

const routes = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        children: homeRoutes,
      },
      {
        path: 'questions/:question_id',
        children: pollRoutes,
      },
      {
        path: 'leaderboard',
        children: leaderboardRoutes,
      },
      {
        path: 'new',
        children: newRoutes,
      },
    ],
  },
];

export default routes;
