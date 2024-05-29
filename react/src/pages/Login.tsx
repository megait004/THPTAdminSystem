import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Poster from '/poster.png';
declare global {
  interface Window {
    chrome: any;
  }
}
interface Response {
  data: string;
}
const Login = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [imageHeight, setImageHeight] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username === '') {
      toast.warning('Vui lòng nhập tài khoản!');
    } else if (password === '') {
      toast.warning('Vui lòng nhập mật khẩu!');
    } else {
      const data = {
        type: 'login',
        username: username,
        password: password,
      };
      window.chrome.webview.postMessage(data);
      window.chrome.webview.addEventListener('message', (e: Response) => {
        if (e.data === 'Đăng nhập thành công') {
          toast.success(e.data);
          setTimeout(() => {
            navigate('/home/student');
          }, 1500);
        } else {
          toast.error(e.data);
        }
      });
    }
  };
  useEffect(() => {
    setImageHeight(screenHeight - 200);
    window.addEventListener('resize', () => {
      setScreenHeight(window.innerHeight), setImageHeight(screenHeight - 200);
    });
  });
  return (
    <div
      className={`flex ${screenHeight} min-h-screen w-full items-center justify-center`}
    >
      <div className="flex w-11/12 items-center justify-center gap-2 rounded-lg bg-white p-4 shadow-xl xl:w-1/2">
        <div>
          <img
            className="rounded-lg"
            style={{ height: `${imageHeight}px` }}
            src={Poster}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="mb-5 text-2xl font-semibold text-indigo-500">
            Chào mừng đến với
          </h1>
          <label
            className="text-lg font-semibold text-indigo-500"
            htmlFor="username"
          >
            Tài khoản
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-lg border border-indigo-500 p-2"
            type="text"
            name="username"
            id="username"
            placeholder="Tài khoản"
          />
          <label
            className="text-lg font-semibold text-indigo-500"
            htmlFor="password"
          >
            Mật khẩu:
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            className="rounded-lg border border-indigo-500 p-2"
            type="password"
            name="password"
            id="password"
            placeholder="Mật khẩu"
          />
          <button
            className="mt-2 rounded-lg bg-indigo-500 p-2 font-bold text-white hover:bg-indigo-600"
            type="submit"
            onClick={handleSubmit}
          >
            Đăng nhập
          </button>
          <span className="m-auto text-gray-600">
            &#169; Copyright 2024 OvFTeam
          </span>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};
export default Login;
