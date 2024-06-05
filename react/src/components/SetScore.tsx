import {
  faBan,
  faFaceFlushed,
  faTrashCan,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ModalProps {
  subject?: string;
  closeModal: () => void;
  username?: string;
  name?: string;
}
const SetScore = () => {
  const [username, setUserName] = useState('');
  const [name, setName] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [scores, setScores] = useState<ScoreList[]>();
  const navigate = useNavigate();
  const [showAddScore, setShowAddScore] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);
  const countRef = useRef<HTMLTableCellElement>(null);
  const subjectRef = useRef<HTMLTableCellElement>(null);
  const passRef = useRef<HTMLTableCellElement>(null);
  const scoreRef = useRef<HTMLTableCellElement>(null);
  const typeRef = useRef<HTMLTableCellElement>(null);
  const noteRef = useRef<HTMLTableCellElement>(null);
  const [tableSize, setTableSize] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('');
  const handleDelete = (
    e: React.SyntheticEvent<HTMLDivElement>,
    subject: string,
  ) => {
    e.preventDefault();
    setCurrentSubject(subject);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    setUserName(searchParams.get('student') || '');
    setName(searchParams.get('name') || '');
    setTableSize(tableRef.current?.clientWidth || 0);
    window.chrome.webview.postMessage({
      type: 'getscore',
      username: searchParams.get('student') || '',
    });
    window.chrome.webview.addEventListener('message', (e: any) => {
      if (e.data) {
        setScores(JSON.parse(e.data));
      }
    });
    setTableSize(tableRef.current?.clientWidth || 0);
  }, []);
  return (
    <div className="flex w-full flex-col gap-2 text-indigo-500">
      <header className="flex gap-2">
        {' '}
        <button
          className="cursor-pointer rounded-lg bg-indigo-500 p-2 text-center font-bold text-white hover:bg-indigo-600"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
        <button
          className="cursor-pointer rounded-lg bg-indigo-500 p-2 text-center font-bold text-white hover:bg-indigo-600"
          onClick={() => setShowAddScore(true)}
        >
          Thêm điểm
        </button>
      </header>
      <b className="text-xl">
        <FontAwesomeIcon icon={faUserGraduate} /> {name}
      </b>
      <table ref={tableRef} className="table w-full border-t border-indigo-500">
        <thead>
          <tr className="bg-indigo-500 font-bold text-white">
            <th ref={countRef} style={{ width: `${tableSize / 20}px` }}>
              Số thứ tự
            </th>
            <th ref={subjectRef} style={{ width: `${(tableSize / 5) * 2}px` }}>
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
            <tr
              key={index}
              onContextMenu={(e) => handleDelete(e, score.SUBJECT)}
            >
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
      {showDeleteModal && (
        <DeleteModal
          subject={currentSubject}
          closeModal={() => {
            setShowDeleteModal(!showDeleteModal);
          }}
          username={username}
          name={name}
        />
      )}
      {showAddScore && (
        <AddScore
          username={username}
          closeModal={() => setShowAddScore(false)}
        />
      )}
    </div>
  );
};

const DeleteModal: React.FC<ModalProps> = ({
  subject,
  closeModal,
  username,
  name,
}) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const modalContent = document.querySelector('#modal-content');
    const isInside = modalContent?.contains(e.target as Node);
    if (!isInside) {
      closeModal();
    }
  };
  const handleDelete = () => {
    const prop = {
      type: 'deletescore',
      subject: subject,
      username: username,
    };
    window.chrome.webview.postMessage(prop);
    window.location.reload();
  };
  const [state, setState] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setState(false);
    }, 1000);
  });
  return (
    <div
      className="fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center bg-black bg-opacity-20"
      onClick={handleClose}
    >
      <div
        id="modal-content"
        className="flex flex-col items-center justify-center rounded-lg bg-white shadow-2xl shadow-black"
      >
        <b className="mx-2 w-full rounded-t-lg text-center">
          Xóa điểm môn {subject} của học sinh {name}
        </b>
        <hr />
        <FontAwesomeIcon
          icon={faFaceFlushed}
          size="6x"
          className={`my-2 ${state ? 'animate-spin' : ''} text-red-500 hover:animate-bounce`}
        />
        <p className="self-start px-2">
          Thao tác này sẽ không thể khôi phục, xác nhận xóa?
        </p>
        <div className="my-2 flex w-1/2 items-center justify-center gap-4">
          <button
            className="basis-1/2 rounded-lg bg-red-500 p-2 font-bold text-white"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrashCan} /> Xóa
          </button>
          <button
            className="basis-1/2 whitespace-nowrap rounded-lg bg-indigo-500 p-2 font-bold text-white"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faBan} /> Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
};
const AddScore: React.FC<ModalProps> = ({ username, closeModal }) => {
  const [score, setScore] = useState<number>();
  const [subject, setSubject] = useState('');
  const [note, setNote] = useState('');
  const subjectRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!subject) {
      toast.warning('Chưa nhập tên môn học!');
      subjectRef.current?.focus();
    } else if (!score) {
      toast.warning('Điểm số không hợp lệ!');
      scoreRef.current?.focus();
    } else {
      let pass = false;
      let type = '';
      const prop = {
        type: 'addscore',
        username: username,
        subject: subject,
        score: score,
        note: note,
        level: '',
        pass: false,
      };
      if (score > 4 && score < 7) {
        type = 'Khá';
        pass = true;
      } else if (score >= 7) {
        type = 'Đạt';
        pass = true;
      } else {
        type = 'Cấm thi';
      }
      prop['level'] = type;
      prop['pass'] = pass;
      window.chrome.webview.postMessage(prop);
      window.location.reload();
    }
  };
  const handleInput = (score: number) => {
    setScore(score);
    if (score < 0) {
      setScore(0);
    } else if (score > 10) {
      setScore(10);
    } else {
      setScore(Number(score));
    }
  };
  return (
    <div className="fixed z-50 flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-1/3 flex-col gap-2 rounded-lg bg-white p-4 text-indigo-500 shadow-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Thêm điểm</h1>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="lg"
            className="cursor-pointer hover:scale-110"
            onClick={closeModal}
          />
        </div>
        <label className="font-bold" htmlFor="subject">
          Môn học:
        </label>
        <input
          ref={subjectRef}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-transparent px-1"
          type="text"
          id="subject"
          placeholder="Môn học"
          autoComplete="off"
        />
        <label className="flex w-full" htmlFor="score">
          <b>Điểm</b>
          <input
            ref={scoreRef}
            value={score}
            onChange={(e) => {
              handleInput(Number(e.target.value));
            }}
            className=" w-8 max-w-fit text-center"
            type="number"
            id="score"
            placeholder="0"
            autoComplete="off"
          />
        </label>
        <label htmlFor="note" className="flex flex-col">
          <b>Ghi chú:</b>
          <textarea
            onChange={(e) => setNote(e.target.value)}
            value={note}
            name="note"
            id="note"
            className="resize-none border p-2"
            rows={6}
          ></textarea>
        </label>
        <div
          className="cursor-pointer rounded-lg bg-indigo-500 p-2 text-center font-bold text-white hover:bg-indigo-600"
          onClick={handleAdd}
        >
          Lưu
        </div>
      </div>
    </div>
  );
};
export default SetScore;
