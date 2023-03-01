import { ItemDetails, CartItemContainer } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span className="name">{name}</span>
        <span>
          {quantity} x {price}$
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
