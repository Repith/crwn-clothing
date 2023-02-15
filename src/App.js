import React, { useState, useEffect } from "react";
import Directory from "./components/directory/directory.component";

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/categories.json")
      .then((response) => response.json())
      .then((categories) => setCategories(categories));
  }, []);

  return <Directory categories={categories} />;
};

export default App;
