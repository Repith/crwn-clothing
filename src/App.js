import "./categories.styles.scss";
import React, { useState, useEffect } from "react";

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/categories.json")
      .then((response) => response.json())
      .then((categories) => setCategories(categories));
  }, []);

  console.log(categories);
  return (
    <div className="categories-container">
      {categories.map(({ title, id, imageUrl }) => (
        <div className="category-container" key={id}>
          <div
            className="background-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop now</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
