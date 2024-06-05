//  fa-magnifying-glass
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
  const [itemSearch, setItemSearch] = useState<Student[]>([]);
  const [showRawList, setShowRawList] = useState(true);
  const [studentSearch, setStudentSearch] = useState('');
  const getListStudent = () => {
    window.chrome.webview.postMessage({
      type: 'getstudent',
    });
    window.chrome.webview.addEventListener('message', (e: any) => {
      setStudents(JSON.parse(e.data));
    });
  };
  const searchStudent = () => {
    if (studentSearch.length > 0) {
      const tempList: Student[] = [];
      students.forEach((student) => {
        if (student.Name.includes(studentSearch)) {
          tempList.push(student);
        }
      });
      setItemSearch(tempList);
    } else {
      setShowRawList(true);
    }
  };
  useEffect(() => {
    getListStudent();
    if (itemSearch.length > 0) {
      setShowRawList(false);
    }
  }, [itemSearch]);
  return (
    <div className="flex w-full flex-col text-indigo-500">
      <header className="flex justify-between">
        <div className="text-3xl font-bold text-indigo-500">
          <FontAwesomeIcon icon={faUserFriends} /> Danh sách học sinh
        </div>
        <div className="flex items-center justify-center">
          <input
            value={studentSearch}
            onChange={(e) => {
              setStudentSearch(e.target.value);
              searchStudent();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchStudent();
              }
            }}
            type="text"
            className="rounded-l-lg  border border-r-0 border-indigo-500 p-1 focus:border-indigo-400"
          />
          <FontAwesomeIcon
            className="cursor-pointer rounded-r-lg border border-indigo-500 p-2 font-bold hover:bg-indigo-500 hover:text-white"
            icon={faMagnifyingGlass}
            onClick={searchStudent}
          />
        </div>
      </header>
      {showRawList ? (
        <List students={students} />
      ) : (
        <List students={itemSearch} />
      )}
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
            navigate(
              `/teacher/set-score?student=${student.Username}&name=${student.Name}`,
            )
          }
          className="cursor-pointer"
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
