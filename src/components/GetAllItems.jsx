import React, { useState } from "react";
import Button from "./Button";
import Card from "./Card";

function GetAllItems() {
  const [allFetchedItems, setFetchedItems] = useState([]);
  const handleFetchItem = async (e) => {
    e.preventDefault();
    let response = await fetch("https://inventory-4iia.onrender.com/get");
    response = await response.json();
    setFetchedItems([...allFetchedItems, response.data]);
  };

  return (
    <div className="flex gap-2 flex-col items-center">
      <p className="info text-4xl text-orange-500 tracking-wider font-bold">
        All Items
      </p>
      <div className="showItems h-[calc(100vh-140px)] bg-slate-800 rounded-2xl w-full grid grid-cols-6 gap-y-3 overflow-scroll p-3">
        {allFetchedItems.map((items) =>
          items.map((item, index) => (
            <div
              className="showItem p-4 w-52 h-44 bg-slate-600 font-semibold rounded-lg text-black"
              key={index}
            >
              <Card item={item} />
            </div>
          ))
        )}
      </div>
      <button
        className="bg-orange-600 h-9 w-32 rounded-lg text-black tracking-tight font-bold"
        onClick={handleFetchItem}
      >
        Get all items
      </button>
      <div className="buttons flex flex-row gap-6">
        <Button name="Home" route="/"></Button>
        <Button name="Create Items" route="/create_items"></Button>
      </div>
    </div>
  );
}

export default GetAllItems;
