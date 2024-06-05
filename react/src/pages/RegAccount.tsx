import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Poster from '/poster.png';
interface Response {
  data: string;
}
const RegAccount = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [imageHeight, setImageHeight] = useState(0);

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const isValidInput = (input: string) => {
    const regex =
      /^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ\\s]*$/;
    return regex.test(input);
  };
  const handleSubmit = (e: FormEvent) => {
    localStorage.clear();
    e.preventDefault();
    if (name === '') {
      toast.warning('Vui lòng nhập tên!');
      nameRef.current?.focus();
    } else if (username === '') {
      toast.warning('Vui lòng nhập tài khoản!');
      usernameRef.current?.focus();
    } else if (password === '') {
      toast.warning('Vui lòng nhập mật khẩu!');
      passwordRef.current?.focus();
    } else {
      if (isValidInput(name)) {
        toast.warning('Tên người dùng không hợp lệ!');
        return;
      }
      const data = {
        type: 'signup',
        name: name,
        username: username,
        password: password,
      };
      window.chrome.webview.postMessage(data);

      window.chrome.webview.addEventListener('message', (e: Response) => {
        if (e.data) {
          window.chrome.webview.removeEventListener('message', () => {});
          if (e.data === 'Đăng kí thành công') {
            toast.success(e.data, {
              toastId: 'success1',
            });
            setTimeout(() => {
              navigate('/');
            }, 2000);
          } else if (e.data === 'Tài khoản đã tồn tại') {
            localStorage.clear();
            toast.error(e.data, {
              toastId: 'error1',
            });
            if (usernameRef.current) {
              usernameRef.current.value = '';
            }
          }
        }
      });
    }
  };

  useEffect(() => {
    setImageHeight(screenHeight - 200);
    window.addEventListener('resize', () => {
      setScreenHeight(window.innerHeight), setImageHeight(screenHeight - 200);
    });
    window.localStorage.clear();
    setTimeout(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoaded(true);
        setTimeout(() => {
          setIsLoaded(false);
        }, 500);
        setIsLoading(false);
      }, 1000);
    }, 100);
  }, []);
  return (
    <div
      className={`flex ${screenHeight} min-h-screen w-full items-center justify-center`}
    >
      <div
        className={`flex ${isLoaded ? 'animate-ping' : ''} w-11/12 ${isLoading ? '' : 'flex-row-reverse'}  items-center justify-center gap-2 rounded-lg bg-white p-4 shadow-xl xl:w-1/2`}
      >
        <div>
          <img
            className={`${isLoading ? 'translate-x-full transition-transform duration-1000 ease-in-out ' : ''}`}
            style={{ height: `${imageHeight}px` }}
            src={Poster}
          />
        </div>
        <div
          className={`flex ${isLoading ? '-translate-x-full transition-transform duration-1000 ease-in-out' : ''} flex-col `}
        >
          <h1 className="mb-5 text-2xl font-semibold text-indigo-500">
            {!isLoading ? (
              <>Hãy đăng kí tài khoản để sử dụng nhé :&gt;</>
            ) : (
              <> Chào mừng đến với THPT OvFTeam</>
            )}
          </h1>
          {!isLoading && (
            <>
              {' '}
              <label
                className="text-lg font-semibold text-indigo-500"
                htmlFor="name"
              >
                Họ và Tên
              </label>
              <input
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-indigo-500 p-2"
                type="text"
                name="name"
                id="name"
                placeholder="VD: Nguyễn Văn A"
                autoComplete="off"
              />
            </>
          )}
          <label
            className="text-lg font-semibold text-indigo-500"
            htmlFor="username"
          >
            Tài khoản
          </label>
          <input
            ref={usernameRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-lg border border-indigo-500 p-2"
            type="text"
            name="username"
            id="username"
            placeholder="Tài khoản"
            autoComplete="off"
          />
          <label
            className="text-lg font-semibold text-indigo-500"
            htmlFor="password"
          >
            Mật khẩu:
          </label>
          <input
            ref={passwordRef}
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
            {!isLoading ? <>Đăng kí tài khoản</> : <>Đăng nhập</>}
          </button>
          {!isLoading && (
            <p>
              Đã có tài khoản?{' '}
              <b
                className="cursor-pointer font-bold text-indigo-500"
                onClick={() => {
                  navigate('/');
                }}
              >
                Đăng nhập tại đây
              </b>
            </p>
          )}
          <span className="m-auto text-gray-600">
            &#169; Copyright 2024 OvFTeam
          </span>
        </div>
      </div>
    </div>
  );
};
export default RegAccount;
