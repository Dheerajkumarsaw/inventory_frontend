import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ name, route }) {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="bg-orange-700 h-9 w-32 rounded-lg text-black tracking-tight font-bold"
        onClick={() => navigate(route)}
      >
        {name}
      </button>
    </div>
  );
}

export default Button;
