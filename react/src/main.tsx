import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Login />}>
      <Route index element={<Navigate to="/home/welcome" replace />} />
      <Route path="student" element={<Login />} />
    </Route>
  </>,
);
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
