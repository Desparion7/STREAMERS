import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout';
import Homepage from './pages/HomePage';
import StreamerPage from './pages/StreamerPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: '/',
    children: [
      {
        path: '*',
        // element: <ErrorBoundary />,
      },
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/streamer/:id',
        element: <StreamerPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
