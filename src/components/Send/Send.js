import React from "react";
import "./Send.css";

const Send = () => {
  return (
    <div className="send">
      <p>Send Ethereum</p>
      <div className="send-inputs">
        <input type="text" placeholder="Address" />
        <input type="number" placeholder="Amount" />
      </div>
      <button>Send</button>
    </div>
  );
};

export default Send;
