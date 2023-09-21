import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { authorizedRoutes, nonAuthorizedRoutes } from 'routers';

function App() {
  const isUserAuthenticated = useSelector(
    (state) => state.authStore.isUserAuthenticated,
  );

  return (
    <RouterProvider
      router={createBrowserRouter(
        isUserAuthenticated ? authorizedRoutes : nonAuthorizedRoutes,
      )}
    />
  );
}

export default App;
