import React from "react";
import "./Stake.css";

const Stake = () => {
  return (
    <div className="stake-item">
      <img
        className="stake-item-logo"
        src="https://raw.githack.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0x6BA5b4e438FA0aAf7C1bD179285aF65d13bD3D90/logo-128.png"
      />
      <p>Curve RAI</p>
      <p>50.26%</p>
      <p>$ {"1,262,560"}</p>
      <button className="small-button stake-button">Deposit</button>
    </div>
  );
};

export default Stake;
