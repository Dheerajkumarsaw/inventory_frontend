import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";

function App() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 items-center justify-center m-auto h-screen">
      <p className="welcomeText text-4xl font-bold tracking-tight ">Welcome to the inventory management</p>
      <div className="buttons flex flex-row gap-6">
        <Button name="Create Items" route="/create_items"></Button>
        <Button name="Get all items" route="/get_all_items"></Button>
      </div>
    </div>
  );
}

export default App;
