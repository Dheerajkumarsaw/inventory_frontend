import React from "react";

function Card({ item }) {
  return (
    <div>
      <ul>
        <li>Grocery : {item.groceryName}</li>
        <li>Price ₹ : {item.price}</li>
        <li>Price per kg ₹ : {item.pricePerKg}</li>
        <li>Weight : {item.weight}</li>
        <li>Mfd Date : {item.mfd}</li>
        <li> Exp Date : {item.exp}</li>
      </ul>
    </div>
  );
}

export default Card;
