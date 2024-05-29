import { faUserGraduate } from '@fortawesome/free-solid-svg-icons/faUserGraduate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Account = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState(false);
  const [phone, setPhone] = useState('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error('Vui lòng nhập mật khẩu!');
    } else if (password.length < 6) {
      toast.warning('Mật khẩu phải trên 6 kí tự!');
    } else {
      toast.success('Cập nhật thành công!');
    }
  };
  useEffect(() => {
    setUsername('1231321');
  });
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
            value={username}
            name="card"
            id="card"
            type="number"
            className="pointer-events-none w-1/2 select-none rounded-lg border border-indigo-500 px-2 py-1"
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
      <ToastContainer autoClose={3000} />
    </div>
  );
};
export default Account;
