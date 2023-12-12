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

  // Function to delete a transaction from the list
  const handleDelete = (id) => {
    // Filter out the deleted transaction
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);

    // Delete the transaction from the backend
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(data => console.log("Transaction deleted successfully:", data))
      .catch(error => console.error("Error deleting transaction:", error));
  };

    // Function to sort transactions
    const handleSort = (key, order) => {
      const sorted = [...filteredTransactions].sort((a, b) => {
        const valueA = a[key].toLowerCase();
        const valueB = b[key].toLowerCase();
        return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      });
      setFilteredTransactions(sorted);
    };

  return (
    <div>
      <Search onSearch={handleSearch}/>
      <AddTransactionForm transactions={transactions} addTransaction={addTransaction} />
      <TransactionsList transactions={filteredTransactions} onDelete={handleDelete} onSort={handleSort}/>
    </div>
  );
}

export default AccountContainer;

