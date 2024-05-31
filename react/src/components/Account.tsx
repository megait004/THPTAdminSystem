import { faUserGraduate } from '@fortawesome/free-solid-svg-icons/faUserGraduate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Account = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState(false);
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error('Vui lòng nhập mật khẩu!');
    } else if (password.length < 6) {
      toast.warning('Mật khẩu phải trên 6 kí tự!');
    } else {
      let data = {
        type: 'updateinfo',
        username: username,
        password: password,
        phonenumber: phone,
      };
      window.chrome.webview.postMessage(data);
      toast.success('Đăng xuất sau 2 giây');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
  useEffect(() => {
    const parsedData = JSON.parse(localStorage.getItem('data') || '{}');
    if (Object.keys(parsedData).length > 0) {
      const data: ResponseInfo = JSON.parse(parsedData);
      setUsername(data.Username);
      setPhone(data.PhoneNumber);
    }
  }, [username]);
  return (
    <div className="w-full">
      <div className="text-3xl font-bold text-indigo-500">
        <FontAwesomeIcon icon={faUserGraduate} /> Thông tin tài khoản
      </div>
      <div className="content mt-2 w-full overflow-auto text-indigo-500">
        <form className="flex flex-col">
          <label className="font-bold" htmlFor="phone">
            Số điện thoại:
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            id="phone"
            type="number"
            className="w-1/2 rounded-lg border border-indigo-500 px-2 py-1"
            placeholder="VD: 0123456789"
            onBlur={() => {
              if (phone.length < 10) {
                setWarning(true);
              }
            }}
            onInput={() => setWarning(false)}
          />
          {warning && (
            <p className="text-yellow-500">Số điện thoại không hợp lệ!</p>
          )}
          <label className="font-bold" htmlFor="card">
            Tài khoản:
          </label>
          <input
            name="card"
            id="card"
            type="number"
            className="pointer-events-none w-1/2 select-none rounded-lg border border-indigo-500 px-2 py-1"
            placeholder={username}
            readOnly
          />
          <label className="font-bold" htmlFor="password">
            Mật khẩu:
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            type="password"
            className="w-1/2 select-none rounded-lg border border-indigo-500 px-2 py-1"
          />
          <button
            className="mt-4 w-1/2 rounded-lg bg-indigo-500 p-2 font-bold text-white"
            type="submit"
            onClick={handleSubmit}
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};
export default Account;
