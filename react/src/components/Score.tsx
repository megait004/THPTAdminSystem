import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
const Score = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [tableSize, setTableSize] = useState(0);
  useEffect(() => {
    setTableSize(tableRef.current?.clientWidth || 0);
  });
  return (
    <div className="w-full">
      <div className="text-3xl font-bold text-indigo-500">
        <FontAwesomeIcon icon={faChartPie} /> Bảng điểm
      </div>
      <div className="content mt-2 w-full overflow-auto text-indigo-500">
        <table
          ref={tableRef}
          className="table w-full border-t border-indigo-500"
        >
          <tr>
            <th style={{ width: `${tableSize / 20}px` }}>Số thứ tự</th>
            <th style={{ width: `${(tableSize / 5) * 2}px` }}>Tên môn học</th>
            <th style={{ width: `${tableSize / 20}px` }}>Được dự thi</th>
            <th style={{ width: `${tableSize / 20}px` }}>Điểm</th>
            <th style={{ width: `${tableSize / 20}px` }}>Xếp loại</th>
            <th style={{ width: `${(tableSize / 5) * 2}px` }}>Ghi chú</th>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default Score;
