import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./single.css";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <button
        className="btn btn-secondary back-button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="product-content">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-details">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <b className="product-price">Price: ${product.price}</b>
          <b
            className={`product-rating rating-${Math.round(
              product.rating.rate
            )}`}
          >
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </b>
          <div className="size-options">
            <label htmlFor="sizeSelect">Size:</label>
            <select id="sizeSelect" className="form-select">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xl">XL</option>
            </select>
          </div>
          <button className="btn btn-primary add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
