import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Account from './components/Account';
import Home from './components/Home';
import Bug from './components/Report';
import Schedule from './components/Schedule';
import Score from './components/Score';
import './index.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Dashboard />}>
      <Route path="student" element={<Home />} />
      <Route path="score" element={<Score />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="account" element={<Account />} />
      <Route path="report" element={<Bug />} />
    </Route>
  </>,
);
const router = createBrowserRouter(routes);
declare global {
  interface Window {
    chrome: any;
  }
  interface ResponseInfo {
    ID: number;
    Name: string;
    Type: boolean;
    Username: string;
    Password: string;
    PhoneNumber: string;
  }
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer
      autoClose={2000}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
    />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
