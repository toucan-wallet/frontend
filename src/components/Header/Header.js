import React, { useState } from "react";
import "./Header.css";

const Header = ({ currentAccount, network }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(currentAccount);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  if (network !== "0x13881") {
    return;
  } else {
    return (
      <div className="header">
        <h3>Toucan Wallet</h3>
        <div className="header-right">
          <p className="buy-eth-button">Buy ETH</p>
          <p onClick={copyToClipboard} className="address-widget">
            {copied
              ? "Copied!"
              : currentAccount.slice(0, 5) +
                "..." +
                currentAccount.slice(
                  currentAccount.length - 3,
                  currentAccount.length
                )}
          </p>
        </div>
      </div>
    );
  }
};

export default Header;
