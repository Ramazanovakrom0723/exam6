import React, { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(4);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setTotalPages(Math.ceil(response.data.length / limit));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [limit]);

  const changePage = (type) => {
    if (type === "prev") {
      setPage((prev) => Math.max(prev - 1, 1));
    } else {
      setPage((prev) => Math.min(prev + 1, totalPages));
    }
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(1);
  };

  const displayedProducts = products.slice((page - 1) * limit, page * limit);

  return (
    <div className="container">
      <div className="product-grid">
        {displayedProducts.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="product-card"
          >
            <div className="product-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="product-details">
              <h4 className="product-title">{item.title}</h4>
              <p className="product-description">{item.description}</p>
              <b className="product-price">Price: ${item.price}</b>
              <b className="product-rating">
                Rating: {item.rating.rate} ({item.rating.count} reviews)
              </b>
            </div>
          </div>
        ))}
      </div>
      <section className="limit-section">
        <label htmlFor="limitSelect">Limit:</label>
        <select
          id="limitSelect"
          className="form-select"
          onChange={handleLimitChange}
          value={limit}
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="9">9</option>
        </select>
      </section>
      <div className="pagination">
        <button
          className="btn btn-primary"
          onClick={() => changePage("prev")}
          disabled={page === 1}
        >
          Prev
        </button>
        <h3 className="fs-4">
          {page} / {totalPages}
        </h3>
        <button
          className="btn btn-primary"
          onClick={() => changePage("next")}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Index;
