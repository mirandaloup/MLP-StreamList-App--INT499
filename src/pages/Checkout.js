import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function formatCardNumber(value) {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
  return digitsOnly.replace(/(.{4})/g, "$1 ").trim();
}

function isValidCardNumberFormatted(value) {
  return /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(value);
}

export default function Checkout() {
  const navigate = useNavigate();

  const [cardName, setCardName] = useState(() => {
    try {
      return localStorage.getItem("cc_name") || "";
    } catch {
      return "";
    }
  });

  const [cardNumber, setCardNumber] = useState(() => {
    try {
      return localStorage.getItem("cc_number") || "";
    } catch {
      return "";
    }
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("cc_name", cardName);
      localStorage.setItem("cc_number", cardNumber);
    } catch {
      // ignore
    }
  }, [cardName, cardNumber]);

  const handleSave = () => {
    if (!cardName.trim()) {
      setMessage("Please enter the name on the card.");
      return;
    }
    if (!isValidCardNumberFormatted(cardNumber)) {
      setMessage("Card number must be in the format 1234 5678 9012 3456.");
      return;
    }
    setMessage("Saved to localStorage successfully.");
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h1>Checkout</h1>
      <p>Enter your credit card information to complete checkout.</p>

      <label style={{ display: "block", marginTop: 12 }}>
        Name on Card
        <input
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="John Smith"
          style={{ width: "100%", height: 40, padding: 8, marginTop: 6 }}
        />
      </label>

      <label style={{ display: "block", marginTop: 12 }}>
        Card Number (Format: 1234 5678 9012 3456)
        <input
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
          style={{ width: "100%", height: 40, padding: 8, marginTop: 6 }}
        />
      </label>

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button onClick={() => navigate("/cart")} style={{ height: 40 }}>
          Back
        </button>
        <button onClick={handleSave} style={{ height: 40 }}>
          Save Card
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        {message ? <p>{message}</p> : <p>Card details are stored in localStorage for this assignment.</p>}
      </div>
    </div>
  );
}