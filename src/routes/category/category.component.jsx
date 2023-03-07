import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";

import { selectCategoriesMap } from "../../store/categories/category.selector";

import { Title, CategoryContainer } from "./category.styles";

const Category = () => {
  //Taking a category name from URL parameters
  const { category } = useParams();
  //Pulling category map from selector that transforms the category array
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  //Update products inside category depend on changes in URL or map
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  //rendering a component only if the acutal data is present
  return (
    <Fragment>
      <Title>{category}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
