import { product } from "./assets/data/data.jsx";
import { useState } from "react";
function App() {
  return (
    <div className="container">
      <div className="product-list">
        <h1>Desserts</h1>
        <div className="product-list-items">
          {product.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="cart">
        <h1>Your Cart (0)</h1>
        <div className="cart-items"></div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <figure>
        <img src={product.image} alt={product.name} />
        {count > 0 ? (
          <div className="cart-count">
            <button onClick={() => setCount(count - 1)}>
              <img src="/images/minus.svg" alt="minus" />
            </button>
            <span>{count} </span>
            <button onClick={() => setCount(count + 1)}>
              <img src="/images/plus.svg" alt="plus" />
            </button>
          </div>
        ) : (
          <div className="cart-button">
            <button onClick={() => setCount(count + 1)}>
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
