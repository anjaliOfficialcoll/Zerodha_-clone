import React, { useContext, useState } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";
import { useAuth } from "./AuthContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState("");
  const generalContext = useContext(GeneralContext);
  const { isAuthenticated } = useAuth();

  const handleBuyClick = async () => {
    if (!isAuthenticated) {
      window.location.assign("/login");
      return;
    }

    setOrderError("");
    setPlacing(true);
    try {
      await axios.post("http://localhost:3002/newOrder", {
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      });

      generalContext.closeBuyWindow();
    } catch (err) {
      const msg = err?.response?.data?.error || "Order failed";
      setOrderError(msg);
    } finally {
      setPlacing(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={placing}
            style={{ cursor: placing ? "not-allowed" : "pointer" }}
          >
            {placing ? "Placing..." : "Buy"}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
        {orderError ? (
          <div style={{ color: "#d92d20", marginTop: "8px" }}>{orderError}</div>
        ) : null}
      </div>
    </div>
  );
};

export default BuyActionWindow;
