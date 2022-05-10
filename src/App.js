import "./App.css";
import { useState, useEffect } from "react";
import Stake from "./components/Stake/Stake";
import Send from "./components/Send/Send";
import Header from "./components/Header/Header";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [network, setNetwork] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Metamask -> https://metamask.io");
        return;
      }

      // request access to accounts
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const switchNetwork = async () => {
    if (window.ethereum) {
      // Try to switch to Mumbai Testnet
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }],
        });
      } catch (error) {
        // this error code means chain hasnt been connected to metamask, so ask user to add it
        if ((error.code = 4902)) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai Testnet",
                  rpcUrls: ["https;?/rpc-mumbai-maticvigil.com/"],
                  nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    } else {
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };

  const checkIfWalletConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask");
      return;
    } else {
      console.log("Ethereum object: ", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found authorized account", account);
      setCurrentAccount(account);
    } else {
      console.log("Could not find authorized account");
    }

    const chainId = await ethereum.request({ method: "eth_chainId" });
    setNetwork(chainId);

    ethereum.on("chainChanged", handleChainChanged);

    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  };

  const renderNotConnectedContainer = () => (
    <div className="connect-wallet-container">
      <h1>Welcome to Toucan Wallet</h1>
      <p>Connect your wallet to get started</p>
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
    </div>
  );

  const renderWallet = () => {
    if (network !== "0x13881") {
      console.log("network:", network);
      return (
        <div className="connect-wallet-container">
          <p>Please connect to the Mumbai Testnet</p>
          <button
            className="cta-button connect-wallet-button"
            onClick={switchNetwork}
          >
            Click here to switch
          </button>
        </div>
      );
    }
    // staking pools section -> h1 that says "stake your crypto"
    // user transaction history section -> "Transaction hisotry"
    return (
      <div>
        <div className="main">
          <Send />

          <div className="stake section">
            <h1>Stake your Crypto</h1>
            <Stake />
          </div>

          <div className="transaction-history section">
            <h1>Transaction history</h1>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <div className="App">
      {currentAccount && (
        <Header network={network} currentAccount={currentAccount} />
      )}
      <div className="app-container">
        {!currentAccount && renderNotConnectedContainer()}
        {currentAccount && renderWallet()}
      </div>
    </div>
  );
}

export default App;
