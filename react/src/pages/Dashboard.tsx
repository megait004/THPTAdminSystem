import {
  faBell,
  faBellSlash,
  faBug,
  faCalendarDay,
  faChartColumn,
  faFaceMehBlank,
  faHome,
  faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '/avatar.png';

const Dashboard = () => {
  const [notification, setNotification] = useState(false);
  const [name, setName] = useState('');
  useEffect(() => {
    if (!localStorage.getItem('loaded')) {
      localStorage.setItem('loaded', 'true');
      window.location.reload();
    }
    const parsedData = JSON.parse(localStorage.getItem('data') || '{}');
    if (Object.keys(parsedData).length > 0) {
      const data: ResponseInfo = JSON.parse(parsedData);
      if (parsedData) {
        setName(data.Name);
      }
    }
  }, []);

  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full">
        <div className="sticky z-10 flex h-screen w-1/6 flex-col items-start bg-indigo-500 px-4 text-white">
          <img
            src={Logo}
            className="my-4 cursor-pointer self-center rounded-full hover:scale-105 hover:drop-shadow-2xl"
          />
          <div className="mb-4 flex w-full max-w-full flex-col items-center justify-center self-center truncate whitespace-nowrap rounded-lg bg-white p-1 text-indigo-500 hover:drop-shadow-2xl">
            <FontAwesomeIcon icon={faFaceMehBlank} /> <b>{name}</b>
          </div>
          <div
            className="cursor-pointer  hover:scale-110 hover:drop-shadow-2xl"
            onClick={() => navigate('/home/student')}
          >
            <FontAwesomeIcon icon={faHome} /> <b>Trang chủ</b>
          </div>
          <div
            className="cursor-pointer whitespace-nowrap hover:scale-110 hover:drop-shadow-2xl"
            onClick={() => navigate('/home/score')}
          >
            <FontAwesomeIcon icon={faChartColumn} /> <b>Bảng điểm</b>
          </div>
          <div
            className=" cursor-pointer whitespace-nowrap hover:scale-110 hover:drop-shadow-2xl"
            onClick={() => navigate('/home/schedule')}
          >
            <FontAwesomeIcon icon={faCalendarDay} /> <b>Thời khóa biểu</b>
          </div>
          <div
            className=" cursor-pointer whitespace-nowrap hover:scale-110 hover:drop-shadow-2xl"
            onClick={() => navigate('/home/account')}
          >
            <FontAwesomeIcon icon={faUserPen} /> <b>Tài khoản</b>
          </div>
          <div
            className=" cursor-pointer whitespace-nowrap hover:scale-110 hover:drop-shadow-2xl"
            onClick={() => navigate('/home/report')}
          >
            <FontAwesomeIcon icon={faBug} /> <b>Báo lỗi</b>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="sticky flex w-full items-center justify-end bg-white px-3 py-1 shadow-lg">
            <div
              className="cursor-pointer"
              onClick={() => setNotification(!notification)}
            >
              <FontAwesomeIcon
                className="mr-4 rounded-full p-2 text-indigo-500 hover:bg-indigo-600 hover:text-white"
                size="xl"
                icon={notification ? faBell : faBellSlash}
              />
            </div>
            <div
              className="cursor-pointer rounded-lg px-2 py-2 font-bold text-indigo-500 hover:bg-indigo-600 hover:text-white"
              onClick={() => {
                navigate('/');
                localStorage.clear();
              }}
            >
              Đăng xuất
            </div>
          </div>
          <div className="flex w-full bg-white p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
