import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, deleteItem } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Total number of plants
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total cost of all plants
  const totalCost = cart.reduce((sum, item) => {
    const itemCost = parseFloat(item.cost.replace("$", ""));
    return sum + itemCost * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>Shopping Cart</h2>
      <p style={{ color: "black" }}>Total Plants: {totalItems}</p>
      <p style={{ color: "black" }}>Total Cost: ${totalCost}</p>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => dispatch(decreaseQuantity(item))}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => dispatch(increaseQuantity(item))}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${parseFloat(item.cost.replace("$", "")) * item.quantity}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => dispatch(deleteItem(item))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => onContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => alert("Coming Soon")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
