import React from "react";
import AddToCartIcon from "../icons/addtocart.svg";

export default function ProductList({ products, onAddToCart }) {
  return (
    <div>
      <h2>Available Products</h2>

      {products.map((product) => (
        <div className="cart" key={product.id} style={{ marginBottom: "10px" }}>
          <span>
            {product.name} - ${product.price.toFixed(2)}
          </span>
          <button className="icon-btn"
            style={{ marginLeft: "10px" }}
            onClick={() => onAddToCart(product)}
          >
          <img src={AddToCartIcon} alt="Add to Cart" className="icon" />
          </button>
        </div>
      ))}
    </div>
  );
}