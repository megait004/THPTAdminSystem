import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
declare global {
  interface ScoreList {
    STUDENTID: string;
    SUBJECT: string;
    PASS: boolean;
    SCORE: number;
    TYPE: string;
    NOTE: string;
  }
}
const Score = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [scores, setScores] = useState<ScoreList[]>();
  const [tableSize, setTableSize] = useState(0);
  const countRef = useRef<HTMLTableCellElement>(null);
  const subjectRef = useRef<HTMLTableCellElement>(null);
  const passRef = useRef<HTMLTableCellElement>(null);
  const scoreRef = useRef<HTMLTableCellElement>(null);
  const typeRef = useRef<HTMLTableCellElement>(null);
  const noteRef = useRef<HTMLTableCellElement>(null);
  useEffect(() => {
    window.chrome.webview.postMessage({
      type: 'getscore',
      username: localStorage.getItem('username'),
    });
    window.chrome.webview.addEventListener('message', (e: any) => {
      if (e.data) {
        setScores(JSON.parse(e.data));
      }
    });
    setTableSize(tableRef.current?.clientWidth || 0);
  }, []);
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
          <thead>
            <tr className="bg-indigo-500 font-bold text-white">
              <th ref={countRef} style={{ width: `${tableSize / 20}px` }}>
                Số thứ tự
              </th>
              <th
                ref={subjectRef}
                style={{ width: `${(tableSize / 5) * 2}px` }}
              >
                Tên môn học
              </th>
              <th ref={passRef} style={{ width: `${tableSize / 20}px` }}>
                Được dự thi
              </th>
              <th ref={scoreRef} style={{ width: `${tableSize / 20}px` }}>
                Điểm
              </th>
              <th ref={typeRef} style={{ width: `${tableSize / 20}px` }}>
                Xếp loại
              </th>
              <th ref={noteRef} style={{ width: `${(tableSize / 5) * 2}px` }}>
                Ghi chú
              </th>
            </tr>
          </thead>
          <tbody>
            {scores?.map((score, index) => (
              <tr key={index}>
                <td style={{ width: `${countRef.current?.clientWidth}px` }}>
                  {index + 1}
                </td>
                <td style={{ width: `${subjectRef.current?.clientWidth}px` }}>
                  {score.SUBJECT}
                </td>
                <td style={{ width: `${passRef.current?.clientWidth}px` }}>
                  {score.PASS ? 'Đỗ' : 'Trượt'}
                </td>
                <td style={{ width: `${scoreRef.current?.clientWidth}px` }}>
                  {score.SCORE}
                </td>
                <td style={{ width: `${typeRef.current?.clientWidth}px` }}>
                  {score.TYPE}
                </td>
                <td style={{ width: `${noteRef.current?.clientWidth}px` }}>
                  {score.NOTE}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Score;
