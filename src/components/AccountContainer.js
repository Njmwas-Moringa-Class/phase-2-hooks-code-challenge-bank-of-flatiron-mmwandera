import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import AddTransactionForm from "./AddTransactionForm";
import Search from "./Search";

function AccountContainer() {
  // State to store the list of transactions
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from the backend URL
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error("Error fetching transactions:", error));
  }, []);

  // Function to add a new transaction to the list
  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  return (
    <div>
      <Search />
      {/* Pass transactions and addTransaction function as props */}
      <AddTransactionForm transactions={transactions} addTransaction={addTransaction} />
      {/* Pass transactions as a prop */}
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;

