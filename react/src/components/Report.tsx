import { faBug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Bug = () => {
  return (
    <div className="w-full">
      <div className="text-3xl font-bold text-indigo-500">
        <FontAwesomeIcon icon={faBug} /> Báo lỗi
      </div>
      <div className="content mt-2 w-full overflow-auto text-indigo-500">
        <form className="flex flex-col">
          <label className="font-bold" htmlFor="card">
            Số thẻ{' '}
            <span className="font-medium text-gray-400">
              (*Xem ở mặt trước thẻ học sinh)
            </span>
            :
          </label>
          <input
            name="card"
            id="card"
            type="number"
            className="w-1/2 rounded-lg border border-indigo-500 px-2 py-1"
            placeholder="VD: 987654321"
          />
          <label className="font-bold" htmlFor="phone">
            Số điện thoại{' '}
            <span className="font-medium text-gray-400">(*Bắt buộc)</span>:
          </label>
          <input
            name="phone"
            id="phone"
            type="number"
            className="w-1/2 rounded-lg border border-indigo-500 px-2 py-1"
            placeholder="VD: 0123456789"
          />
          <label className="font-bold" htmlFor="message">
            Nội dung
          </label>
          <textarea
            className="w-1/2 rounded-lg border border-indigo-500 px-2 py-1"
            name="message"
            id="message"
            placeholder="Nội dung báo lỗi"
          ></textarea>
          <button
            className="mt-4 w-1/2 rounded-lg bg-indigo-500 p-2 font-bold text-white"
            type="submit"
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};
export default Bug;
