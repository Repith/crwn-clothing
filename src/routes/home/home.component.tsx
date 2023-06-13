import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";

const Home = () => {
  // const [data, setData] = useState<Category[]>([]);

  // useEffect(() => {
  //   fetch("/categories.json")
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);

  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
