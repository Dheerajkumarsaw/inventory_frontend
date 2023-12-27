import React, { useReducer, useState } from "react";
import Button from "./Button";

const initialState = {
  groceryName: "",
  price: 0,
  weight: 0,
  pricePerKg: 0,
  ingredients: "",
  mfd: "",
  exp: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "grocery":
      return { ...state, groceryName: action.payload };
    case "price":
      return { ...state, price: action.payload };
    case "weight":
      return { ...state, weight: action.payload };
    case "exp":
      return { ...state, exp: action.payload };
    case "ppk":
      return { ...state, pricePerKg: action.payload };
    case "mfd":
      return { ...state, mfd: action.payload };
    case "ingredients":
      return { ...state, ingredients: action.payload };
    case "reset":
      return initialState;
    default:
      return new Error("Unknown action");
  }
};

function CreateItems() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ingredientsArray, setIngredients] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { groceryName, price, weight, pricePerKg, ingredients, mfd, exp } =
    state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(state);
    if (
      groceryName &&
      price &&
      pricePerKg &&
      ingredients &&
      mfd &&
      exp &&
      weight
    ) {
      setIngredients([...ingredientsArray, state]);
      // need to add api call
      let response = await fetch("https://inventory-4iia.onrender.com/create", {
        method: "POST",
        body: JSON.stringify(state),
        headers: { "Content-Type": "application/json" },
      });
      response = await response.json();
      // console.log(response.status)
      if (response.status) {
        setSuccess(true);
        dispatch({ type: "reset" });
      }
    } else {
      setSuccess(false);
      setError(true);
    }
  };
  return (
    <div className="createItemContainer flex flex-col items-center justify-center m-auto gap-9 h-screen">
      <p className="info text-4xl text-orange-500 tracking-wider font-bold">
        Create Items
      </p>
      <div className="formContainer flex flex-col items-center gap-5 bg-slate-600 h-[420px] p-5 rounded-lg">
        <form action="submit" className="grid  grid-cols-2 gap-4">
          <label htmlFor="grocery">Grocery Name : </label>
          <input
            type="text"
            name="grocery"
            id="grocery"
            value={groceryName}
            onChange={(e) =>
              dispatch({ type: "grocery", payload: e.target.value })
            }
          />
          <label htmlFor="price">Price ₹ : </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price ? price : ""}
            onChange={(e) =>
              dispatch({ type: "price", payload: e.target.value })
            }
          />
          <label htmlFor="ppk">Price per kg ₹ : </label>
          <input
            type="number"
            id="ppk"
            name="ppk"
            value={pricePerKg ? pricePerKg : ""}
            onChange={(e) => dispatch({ type: "ppk", payload: e.target.value })}
          />
          <label htmlFor="weight">Weight gm : </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={weight ? weight : ""}
            onChange={(e) =>
              dispatch({ type: "weight", payload: e.target.value })
            }
          />
          <label htmlFor="mfd">Mfd Date: </label>
          <input
            type="date"
            value={mfd}
            id="mfd"
            name="mfd"
            onChange={(e) => dispatch({ type: "mfd", payload: e.target.value })}
          />
          <label htmlFor="exp">Exp Date: </label>
          <input
            type="date"
            id="exp"
            name="exp"
            value={exp}
            onChange={(e) => dispatch({ type: "exp", payload: e.target.value })}
          />
          <label htmlFor="ingredients">Ingredients : </label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            value={ingredients}
            onChange={(e) =>
              dispatch({ type: "ingredients", payload: e.target.value })
            }
          />
        </form>
        <button
          className="bg-orange-600 h-9 w-32 rounded-lg text-black tracking-tight font-bold"
          onClick={handleSubmit}
        >
          Add Item
        </button>
        {success ? (
          <p className="h-4 rounded-sm text-black tracking-tight font-semibold">
            Item Added Successfully
          </p>
        ) : error ? (
          <p className="h-4 rounded-sm text-black tracking-tight font-semibold">
            Please fill all the fields
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="buttons flex flex-row gap-6">
        <Button name="Home" route="/"></Button>
        <Button name="Get all Items" route="/get_all_items"></Button>
      </div>
    </div>
  );
}

export default CreateItems;
