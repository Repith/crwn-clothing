import { ItemDetails, CartItemContainer } from "./cart-item.styles";

type CartItemProps = {
  name: string;
  quantity: number;
  imageUrl: string;
  price: string;
};

const CartItem = ({ name, quantity, imageUrl, price }: CartItemProps) => (
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

export default CartItem;
