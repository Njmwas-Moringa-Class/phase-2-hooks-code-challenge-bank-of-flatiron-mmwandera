import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import AddTransactionForm from "./AddTransactionForm";
import Search from "./Search";

function AccountContainer() {
  
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Fetch transactions from the backend URL
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch(error => console.error("Error fetching transactions:", error));
  }, []);

  // Function to add a new transaction to the list
  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);

    // Update filtered transactions to include the new transaction
    setFilteredTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  const handleSearch = (term) => {
    // Filter transactions based on the search term
    const filtered = transactions.filter(transaction =>
      transaction.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }

  return (
    <div>
      <Search onSearch={handleSearch}/>
      {/* Pass transactions and addTransaction function as props */}
      <AddTransactionForm transactions={transactions} addTransaction={addTransaction} />
      {/* Pass transactions as a prop */}
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;

