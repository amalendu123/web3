
import React, { useEffect, useState } from "react";
import Web3 from "web3";

const ContractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidate",
        "type": "uint256",
      },
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "candidate1Votes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "candidate2Votes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "name": "hasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
];

const ContractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; 

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [candidate1Votes, setCandidate1Votes] = useState(0);
  const [candidate2Votes, setCandidate2Votes] = useState(0);

  useEffect(() => {
    async function loadBlockchainData() {
      // Modern dapp browsers
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable(); // Request account access

          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          const contract = new web3.eth.Contract(ContractABI, ContractAddress);
          setContract(contract);

          // Get initial vote counts
          const votes1 = await contract.methods.candidate1Votes().call();
          const votes2 = await contract.methods.candidate2Votes().call();

          // Update state after ensuring web3 and contract are properly set
          setWeb3(web3);
          setCandidate1Votes(votes1);
          setCandidate2Votes(votes2);
        } catch (error) {
          console.error("Error loading blockchain data:", error);
        }
      } else {
        console.log("Please install MetaMask or use a dapp browser.");
      }
    }

    loadBlockchainData();
  }, []);

  const handleVote = async (candidate) => {
    try {
      await contract.methods.vote(candidate).send({ from: account });
      // Update vote counts after voting
      const votes1 = await contract.methods.candidate1Votes().call();
      const votes2 = await contract.methods.candidate2Votes().call();
      setCandidate1Votes(votes1);
      setCandidate2Votes(votes2);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center font-mono font-bold">
        <h1>Voting For Your Candidate</h1>
      </div>
      <div className="flex justify-between gap-10">
        <div className="flex flex-col gap-4">
          <h2>Candidate 1</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleVote(1)}
          >
            Vote
          </button>
          <p>Total: {candidate1Votes}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h2>Candidate 2</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleVote(2)}
          >
            Vote
          </button>
          <p>Total: {candidate2Votes}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
