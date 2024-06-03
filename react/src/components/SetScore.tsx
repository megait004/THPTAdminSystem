import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
interface AddScoreProps {
  onclick: () => void;
}
const SetScore = () => {
  const [student, setStudent] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [showAddScore, setShowAddScore] = useState(false);
  useEffect(() => {
    setStudent(searchParams.get('student') || '');
  }, []);
  return (
    <div className="flex flex-col">
      <button onClick={() => navigate(-1)}>Quay lại</button>
      {student}
      <button onClick={() => setShowAddScore(true)}>Thêm điểm</button>
      {showAddScore && <AddScore onclick={() => setShowAddScore(false)} />}
    </div>
  );
};
const AddScore: React.FC<AddScoreProps> = ({ onclick }) => {
  const [score, setScore] = useState<number>(0);
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
    <div className="fixed z-50 flex h-full w-full flex-col items-center justify-center bg-indigo-500 bg-opacity-20">
      <div className="flex flex-col gap-2 rounded-lg bg-white p-4 text-indigo-500 shadow-2xl">
        <h1 className="text-xl font-bold">Thêm điểm</h1>
        <label className="font-bold" htmlFor="subject">
          Môn học:
        </label>
        <input
          className="bg-transparent px-1"
          type="text"
          placeholder="Môn học"
        />
        <label className="flex w-full" htmlFor="score">
          <b>Điểm</b>
          <input
            value={score}
            onChange={(e) => {
              handleInput(Number(e.target.value));
            }}
            className="w-8 max-w-fit text-center"
            type="number"
            id="score"
            placeholder="Điểm"
          />
        </label>
        <div
          onClick={onclick}
          className="rounded-lg bg-indigo-500 p-2 text-center font-bold text-white"
        >
          Lưu
        </div>
      </div>
    </div>
  );
};
export default SetScore;
