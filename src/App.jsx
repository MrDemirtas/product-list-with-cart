import { product } from "./assets/data/data";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  
  function handleAddToCart(params) {
    if (cart.find((item) => item.id === params.id)) {
      setCart(
        cart.map((item) => {
          if (item.id === params.id) {
            return { ...item, count: item.count + 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart([...cart, { count: 1, ...params }]);
    }
  }

  function handleRemoveCart(params) {
    if (cart.find((item) => item.id === params.id).count > 1) {
      setCart(
        cart.map((item) => {
          if (item.id === params.id) {
            return { ...item, count: item.count - 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart(cart.filter((item) => item.id !== params.id));
    }
  }

  function getTotal() {
    let total = 0;
    cart.map((item) => (total += item.price * item.count));
    return total.toFixed(2);
  }

  return (
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
                <p>This is a <strong>carbon-neutral</strong> delivery</p>
              </div>
              <button className="confirm-order">Confirm Order</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, handleAddToCart, handleRemoveCart, cart }) {
  function handleAdd() {
    handleAddToCart(product);
  }

  function handleRemove() {
    handleRemoveCart(product);
  }

  const isInCart = cart.find((item) => item.id === product.id);

  return (
    <div className="card">
      <figure>
        <img src={product.image} alt={product.name} />
        {isInCart ? (
          <div className="cart-count">
            <button onClick={handleRemove}>
              <img src="/images/minus.svg" alt="minus" />
            </button>
            <span>{isInCart.count} </span>
            <button onClick={handleAdd}>
              <img src="/images/plus.svg" alt="plus" />
            </button>
          </div>
        ) : (
          <div className="cart-button">
            <button onClick={handleAdd}>
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

export default App;
