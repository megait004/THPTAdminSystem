import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
interface THStyle {
  width: string;
  maxWidth: string;
  minWidth: string;
}
interface ContentProps {
  id: number;
  day: number;
  subject: string;
  canEdit: boolean;
}

interface Day {
  ID: number;
  Subject1: string;
  Subject2: string;
  Subject3: string;
  Subject4: string;
  Subject5: string;
}
const Schedule = () => {
  const location = useLocation();
  const [teacher, setTeacher] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [thStyle, setTHStyle] = useState<THStyle>();
  const [schedule, setSchedule] = useState<Day[]>();
  useEffect(() => {
    window.chrome.webview.postMessage({
      type: 'getschedule',
    });
    window.chrome.webview.addEventListener('message', (e: any) => {
      setSchedule(JSON.parse(e.data));
    });
    return () => {
      window.chrome.webview.removeEventListener('message', () => {});
    };
  }, []);
  useEffect(() => {
    const tableWidth = tableRef.current?.clientWidth || 0;
    const width = tableWidth / 6 || 0;
    const style: THStyle = {
      width: `${width + 1}px`,
      maxWidth: `${width + 1}px`,
      minWidth: `${width + 1}px`,
    };
    setTHStyle(style);
    const searchTeacher = location.pathname.includes('teacher');
    if (searchTeacher) {
      setTeacher(true);
    }
    document.getElementById('table')?.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (divRef.current !== null) {
        divRef.current.scrollLeft += e.deltaY / 10;
      }
    });
  }, []);
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="self-start text-3xl font-bold text-indigo-500">
        <FontAwesomeIcon icon={faCalendar} /> Thời khóa biểu
      </div>
      <div
        id="table"
        ref={divRef}
        className="content mt-2 flex w-full items-center justify-center overflow-x-scroll text-indigo-500"
      >
        <table
          ref={tableRef}
          className="table w-11/12 max-w-full border-t border-indigo-500 object-cover"
        >
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="border-r-white">Thứ 2</th>
              <th className="border-x-white">Thứ 3</th>
              <th className="border-x-white">Thứ 4</th>
              <th className="border-x-white">Thứ 5</th>
              <th className="border-x-white">Thứ 6</th>
              <th className="border-l-white">Thứ 7</th>
            </tr>
            <tr id="Subject1">
              <th id="2Subject1" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={1}
                    day={2}
                    subject={schedule[0].Subject1}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="3Subject1" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={1}
                    day={3}
                    subject={schedule[1].Subject1}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="4Subject1" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={1}
                    day={4}
                    subject={schedule[2].Subject1}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="5Subject1" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={1}
                    day={5}
                    subject={schedule[3].Subject1}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="6Subject1" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={1}
                    day={6}
                    subject={schedule[4].Subject1}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="7Subject1" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={1}
                    day={7}
                    subject={schedule[5].Subject1}
                    canEdit={teacher}
                  />
                )}
              </th>
            </tr>
            <tr id="Subject2">
              <th id="2Subject2" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={2}
                    day={2}
                    subject={schedule[0].Subject2}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="3Subject2" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={2}
                    day={3}
                    subject={schedule[1].Subject2}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="4Subject2" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={2}
                    day={4}
                    subject={schedule[2].Subject2}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="5Subject2" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={2}
                    day={5}
                    subject={schedule[3].Subject2}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="6Subject2" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={2}
                    day={6}
                    subject={schedule[4].Subject2}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="7Subject2" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={2}
                    day={7}
                    subject={schedule[5].Subject2}
                    canEdit={teacher}
                  />
                )}
              </th>
            </tr>
            <tr id="Subject3">
              <th id="2Subject3" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={3}
                    day={2}
                    subject={schedule[0].Subject3}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="3Subject3" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={3}
                    day={3}
                    subject={schedule[1].Subject3}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="4Subject3" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={3}
                    day={4}
                    subject={schedule[2].Subject3}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="5Subject3" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={3}
                    day={5}
                    subject={schedule[3].Subject3}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="6Subject3" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={3}
                    day={6}
                    subject={schedule[4].Subject3}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="7Subject3" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={3}
                    day={7}
                    subject={schedule[5].Subject3}
                    canEdit={teacher}
                  />
                )}
              </th>
            </tr>
            <tr id="Subject4">
              <th id="2Subject4" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={4}
                    day={2}
                    subject={schedule[0].Subject4}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="3Subject4" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={4}
                    day={3}
                    subject={schedule[1].Subject4}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="4Subject4" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={4}
                    day={4}
                    subject={schedule[2].Subject4}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="5Subject4" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={4}
                    day={5}
                    subject={schedule[3].Subject4}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="6Subject4" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={4}
                    day={6}
                    subject={schedule[4].Subject4}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="7Subject4" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={4}
                    day={7}
                    subject={schedule[5].Subject4}
                    canEdit={teacher}
                  />
                )}
              </th>
            </tr>
            <tr id="Subject5">
              <th id="2Subject5" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={5}
                    day={2}
                    subject={schedule[0].Subject5}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="3Subject5" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={5}
                    day={3}
                    subject={schedule[1].Subject5}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="4Subject5" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={5}
                    day={4}
                    subject={schedule[2].Subject5}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="5Subject5" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={5}
                    day={5}
                    subject={schedule[3].Subject5}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="6Subject5" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={5}
                    day={6}
                    subject={schedule[4].Subject5}
                    canEdit={teacher}
                  />
                )}
              </th>
              <th id="7Subject5" className="truncate" style={thStyle}>
                {schedule && (
                  <Content
                    id={5}
                    day={7}
                    subject={schedule[5].Subject5}
                    canEdit={teacher}
                  />
                )}
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

const Content: React.FC<ContentProps> = ({ id, day, subject, canEdit }) => {
  const [content, setContent] = useState('');
  const [fixed, setFixed] = useState(false);
  const [value, setValue] = useState('');
  const updateSchedule = (value: string) => {
    window.chrome.webview.postMessage({
      type: 'updateschedule',
      id: id.toString(),
      day: day.toString(),
      content: value,
    });
  };
  useEffect(() => {
    setContent(subject);
  }, []);
  return (
    <>
      {content === '' ? (
        <div
          className={`${fixed ? 'fixed left-0 top-0 z-20 flex h-screen w-full flex-col items-center justify-center p-5' : 'block'}`}
          onClick={() => {
            if (canEdit) {
              if (!fixed) {
                setFixed(!fixed);
              }
            }
          }}
        >
          <div className="flex flex-col gap-2">
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateSchedule(value);
                  setContent(value);
                }
              }}
              type="text"
              className={`${fixed && 'rounded-lg border border-indigo-500 p-2'}`}
              readOnly={!canEdit}
            />
            {fixed && (
              <button
                className="rounded-lg bg-indigo-500 p-2 font-bold text-white"
                onClick={() => {
                  updateSchedule(value);
                  setContent(value);
                }}
              >
                Lưu
              </button>
            )}
          </div>
        </div>
      ) : (
        <p
          onClick={() => {
            if (canEdit) {
              setContent('');
            }
          }}
        >
          {content}
        </p>
      )}
    </>
  );
};
export default Schedule;
