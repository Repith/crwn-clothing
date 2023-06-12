import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";

import { Title, CategoryContainer } from "./category.styles";

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  //Taking a category name from URL parameters (renders only if category is inside URL)
  //making is only as a keyof those params, but needs them to be as intended
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;
  //Pulling category map from selector that transforms the category array
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  //Update products inside category depend on changes in URL or map
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  //rendering a component only if the actual data is present
  return (
    <Fragment>
      <Title>{category}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
