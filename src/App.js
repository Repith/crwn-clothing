import React, { useState, useEffect } from "react";
import Directory from "./components/directory/directory.component";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/categories.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return <Directory categories={data} />;
};

export default App;
