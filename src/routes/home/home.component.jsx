import React, { useState, useEffect } from "react";
import Directory from "../../components/directory/directory.component.jsx";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/categories.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <Outlet />
      <Directory categories={data} />
    </div>
  );
};

export default Home;
