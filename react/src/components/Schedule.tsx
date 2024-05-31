import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Schedule = () => {
  return (
    <div className="w-full">
      <div className="text-3xl font-bold text-indigo-500">
        <FontAwesomeIcon icon={faCalendar} /> Thời khóa biểu
      </div>
      <div className="content mt-2 w-full overflow-auto text-indigo-500">
        <table className="table w-full border-t border-indigo-500">
          <thead>
            <tr>
              <th>Thứ 2</th>
              <th>Thứ 3</th>
              <th>Thứ 4</th>
              <th>Thứ 5</th>
              <th>Thứ 6</th>
              <th>Thứ 7</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};
export default Schedule;
