import React from "react";
import Transaction from "./Transaction";

function TransactionsList( { transactions, onDelete } ) {

  const handleDelete = (id) => {
    // Call the onDelete function passed as a prop
    onDelete(id);
  }

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
        </tr>
        {/* render a list of <Transaction> components here */}
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            date={transaction.date}
            description={transaction.description}
            category={transaction.category}
            amount={transaction.amount}
          >
            {/* Pass the handleDelete function as a prop */}
            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
          </Transaction>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;
