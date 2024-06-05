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
import ListStudent from './components/ListStudent';
import Bug from './components/Report';
import Schedule from './components/Schedule';
import Score from './components/Score';
import SetScore from './components/SetScore';
import './index.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RegAccount from './pages/RegAccount';
import TeacherDashboard from './pages/TeacherDashboard';
const routes = createRoutesFromElements(
  <>
    <Route path="/signup" element={<RegAccount />} />
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Dashboard />}>
      <Route path="student" element={<Home />} />
      <Route path="score" element={<Score />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="account" element={<Account />} />
      <Route path="report" element={<Bug />} />
    </Route>
    <Route path="/teacher" element={<TeacherDashboard />}>
      <Route path="home" element={<Home />} />
      <Route path="list-student" element={<ListStudent />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="account" element={<Account />} />
      <Route path="set-score" element={<SetScore />} />
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
