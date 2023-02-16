import "./categories.styles.scss";

const CategoryItem = ({ category }) => {
  const { id, imageUrl, title } = category;

  return (
    <div className="category-container" key={id}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title.toUpperCase()}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
