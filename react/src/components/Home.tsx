import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Home = () => {
  const historyCommit = [
    'init',
    'add README to Repo',
    'add sln to project',
    'remove manifest sign',
    'add studen gui and login api for winform',
    'add database and some api: login, changeinfo,...',
    'remove unused readme',
    'add vscode config to github',
    'chore:add teacher route',
    'chore: update add student form and view score',
    'chore: add signup page',
  ];
  return (
    <div className="w-full">
      <div className="text-3xl font-bold text-indigo-500">
        <FontAwesomeIcon icon={faFire} /> Thông báo
      </div>
      <div className="content w-full overflow-auto text-indigo-500">
        <p className="text-2xl">Lịch sử cập nhật:</p>
        <ul>
          {historyCommit.map((commit, index) => (
            <li>
              <b className="mr-2">{index + 1}.</b>
              {commit}.
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-2">
          <img src="https://picsum.photos/200/300" alt="" />
          <img src="https://picsum.photos/200/300" alt="" />
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
      </div>
    </div>
  );
};
export default Home;
