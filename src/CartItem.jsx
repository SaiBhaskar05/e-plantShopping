import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items); // Access correct cart state
  const dispatch = useDispatch();

  // Calculate total cart amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.cost.replace(/[^0-9.]/g, '')); // Extract numeric value
      return total + item.quantity * price;
    }, 0).toFixed(2);
  };

  // Increase item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrease item quantity (remove if it reaches zero)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost per item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace(/[^0-9.]/g, ''));
    return (item.quantity * price).toFixed(2);
  };

  // Handle checkout (Dummy function for now)
  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: 'black', textAlign: 'center' }}>Your cart is empty.</p>
        )}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
