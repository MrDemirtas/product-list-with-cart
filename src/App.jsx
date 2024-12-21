import { product } from "./assets/data/data.jsx";

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
  return (
    <div className="card">
      <figure>
        <img src={product.image} alt={product.name} />
        <button>
          <img src="/src/assets/images/cart.svg" alt="cart" />
          Add to Cart
        </button>
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
