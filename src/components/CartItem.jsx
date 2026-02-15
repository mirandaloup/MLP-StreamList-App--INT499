import React from "react";
import IncreaseIcon from "../icons/increase.svg";
import DecreaseIcon from "../icons/decrease.svg";
import CancelIcon from "../icons/cancel.svg";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart" style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "10px" }}>
      <div style={{ flex: 1 }}>
        <strong>{item.name}</strong>
        <div>${item.price.toFixed(2)}</div>
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button type ="button" onClick={() => onDecrease(item.id)} disabled={item.quantity <= 1}>
        <img src={DecreaseIcon} alt="Decrease" className="icon" />
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrease(item.id)}>
        <img src={IncreaseIcon} alt="Increase" className="icon" />
        </button>
      </div>

      <div style={{ width: "90px", textAlign: "right" }}>
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <button onClick={() => onRemove(item.id)}>
        <img src={CancelIcon} alt="cancel" className="icon" />
      </button>
    </div>
  );
}