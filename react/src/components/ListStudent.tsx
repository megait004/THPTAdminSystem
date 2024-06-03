import { faUserFriends } from '@fortawesome/free-solid-svg-icons/faUserFriends';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface ListProps {
  students: {
    Username: string;
    Name: string;
    PhoneNumber: string;
  }[];
}
interface Student {
  Username: string;
  Name: string;
  PhoneNumber: string;
}
const ListStudent = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const getListStudent = () => {
    window.chrome.webview.postMessage({
      type: 'getstudent',
    });
    window.chrome.webview.addEventListener('message', (e: any) => {
      console.log(e.data);
      setStudents(JSON.parse(e.data));
    });
  };
  useEffect(() => {
    getListStudent();
  });
  return (
    <div className="flex w-full flex-col text-indigo-500">
      <div className="text-3xl font-bold text-indigo-500">
        <FontAwesomeIcon icon={faUserFriends} /> Danh sách học sinh
      </div>
      <List students={students} />
    </div>
  );
};
const List: React.FC<ListProps> = ({ students }) => {
  const navigate = useNavigate();
  return (
    <ul>
      {students.map((student, index) => (
        <li
          onClick={() =>
            navigate(`/teacher/set-score?student=${student.Username}`)
          }
          className=""
          key={student.Username}
        >
          {' '}
          <strong>
            {index + 1}. {student.Name}
          </strong>
          {student.PhoneNumber && ` - ${student.PhoneNumber}`}
        </li>
      ))}
    </ul>
  );
};
export default ListStudent;
