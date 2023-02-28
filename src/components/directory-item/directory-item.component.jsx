import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const { id, imageUrl, title } = category;

  return (
    <div className="directory-item-container" key={id}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="directory-body-container">
        <h2>{title.toUpperCase()}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
