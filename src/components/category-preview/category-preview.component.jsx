import ProductCard from "../product-card/product-card.component";

import {
  CategoryLink,
  CategoryPreviewContainer,
  Preview,
} from "./category-preview.styles";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryLink to={title}>{title}</CategoryLink>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
