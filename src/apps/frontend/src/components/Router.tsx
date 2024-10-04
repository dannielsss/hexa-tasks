import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loaderRoot } from '../pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: loaderRoot,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
