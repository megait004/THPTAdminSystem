import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Home = () => {
  return (
    <div className="">
      <div className="text-3xl font-bold text-indigo-500">
        <FontAwesomeIcon icon={faFire} /> Thông báo
      </div>
      <div className="content overflow-auto text-indigo-500">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          mollitia. Distinctio adipisci doloremque facere officia velit
          quibusdam quo amet. Quas at accusamus porro tempora modi, veniam
          voluptatem quis sint harum. Quisquam sapiente officia possimus esse
          similique mollitia nihil cumque consequatur eaque quas beatae quae,
          iste illo sit praesentium neque harum corrupti modi blanditiis vitae
          nostrum nisi unde exercitationem deleniti. Eius! Nobis placeat maxime
          cumque illo odio cupiditate blanditiis dolorum eos ipsa minus itaque
          tempore quasi reiciendis, explicabo hic numquam adipisci laborum,
          suscipit animi facilis temporibus rerum aut quibusdam? Corporis, fuga.
        </p>
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
