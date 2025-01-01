import { product } from "./assets/data/data";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  
  function handleAddToCart(params) {
    if (cart.find((item) => item.id === params.id)) {
      cart.find((item) => item.id === params.id).count++;
      setCart([...cart]);
    } else {
      setCart([...cart, { count: 1, ...params }]);
    }
  }

  function handleRemoveCart(params) {
    if (cart.find((item) => item.id === params.id).count > 1) {
      cart.find((item) => item.id === params.id).count--;
      setCart([...cart]);
    } else {
      setCart(cart.filter((item) => item.id !== params.id));
    }
  }

  function getTotal() {
    let total = 0;
    cart.map((item) => (total += item.price * item.count));
    return total.toFixed(2);
  }

  function handleConfirmOrder() {
    setOrderConfirmed(true);
  }

  function handleStartNewOrder() {
    setOrderConfirmed(false);
    setCart([]);
  }

  return (
    <>
      <div className="container">
        <div className="product-list">
          <h1>Desserts</h1>
          <div className="product-list-items">
            {product.map((item) => (
              <ProductCard product={item} key={item.id} handleAddToCart={handleAddToCart} handleRemoveCart={handleRemoveCart} cart={cart} />
            ))}
          </div>
        </div>
        <div className="cart">
          <h1>Your Cart ({cart.length})</h1>
          <div className="cart-items" style={cart.length === 0 ? { background: "url('/images/cart-bg.svg') no-repeat center center" } : {}}>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="product-info">
                  <h2>{item.name}</h2>
                  <div className="product-price">
                    <p className="product-count">x{item.count}</p>
                    <p className="product-price">@ ${item.price.toFixed(2)}</p>
                    <p className="product-total">${(item.price * item.count).toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => handleRemoveCart(item)}>
                  <img src="/images/remove.svg" alt="remove" />
                </button>
              </div>
            ))}
            {cart.length !== 0 && (
              <div className="cart-total">
                <div className="order-total">
                  <span>Order Total</span>
                  <span className="total-price">${getTotal()}</span>
                </div>
                <div className="carbon-neutral">
                  <img src="/images/carbon_tree.svg" alt="carbon-neutral" />
                  <p>
                    This is a <strong>carbon-neutral</strong> delivery
                  </p>
                </div>
                <button className="confirm-order" onClick={handleConfirmOrder}>
                  Confirm Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {orderConfirmed && <OrderConfirmedPopup cart={cart} getTotal={getTotal} handleStartNewOrder={handleStartNewOrder} />}
    </>
  );
}

function ProductCard({ product, handleAddToCart, handleRemoveCart, cart }) {
  const isInCart = cart.find((item) => item.id === product.id);
  const isOutOfStock = product.stock === 0;
  return (
    <div className={isOutOfStock ? "card no-stock" : "card"}>
      <figure>
        <img src={product.image} alt={product.name} />
        {isInCart ? (
          <div className="cart-count">
            <button disabled={isOutOfStock} onClick={() => handleRemoveCart(product)}>
              <img src="/images/minus.svg" alt="minus" />
            </button>
            <span>{isInCart.count} </span>
            <button disabled={isOutOfStock} onClick={() => handleAddToCart(product)}>
              <img src="/images/plus.svg" alt="plus" />
            </button>
          </div>
        ) : (
          <div className="cart-button">
            <button disabled={isOutOfStock} onClick={() => handleAddToCart(product)}>
              <img src="/images/cart.svg" alt="cart" />
              Add to Cart
            </button>
          </div>
        )}
      </figure>
      <div className="card-content">
        <span>{product.category}</span>
        <h2>{product.name}</h2>
        <p>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

function OrderConfirmedPopup({ cart, getTotal, handleStartNewOrder }) {
  return (
    <div className="order-confirmed-popup">
      <div className="order-confirmed-popup-container">
        <img src="./images/confirm-order-tick.svg" alt="order-confirmed" />
        <div className="order-confirmed-popup-header">
          <h1>Order Confirmed</h1>
          <p>We hope you enjoy your food!</p>
        </div>
        <div className="order-confirmed-popup-body">
          <div className="order-confirmed-popup-items">
            {cart.map((item) => (
              <div className="order-confirmed-popup-item" key={item.id}>
                <div className="order-confirmed-popup-item-container">
                  <img src={item.image} alt={item.name} />
                  <div className="order-confirmed-popup-item-info">
                    <h2>{item.name}</h2>
                    <div className="order-confirmed-popup-item-price">
                      <p>x{item.count}</p>
                      <p>@ ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="order-confirmed-popup-item-count">
                  <p>${(item.price * item.count).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Order Total</span>
            <span className="total-price">${getTotal()}</span>
          </div>
        </div>
        <div className="order-confirmed-popup-footer">
          <button onClick={handleStartNewOrder}>Start New Order</button>
        </div>
      </div>
    </div>
  );
}

export default App;
