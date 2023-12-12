import React from "react";

function Transaction({ date, description, category, amount, children }) {
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>{children}</td>
    </tr>
  );
}

export default Transaction;
