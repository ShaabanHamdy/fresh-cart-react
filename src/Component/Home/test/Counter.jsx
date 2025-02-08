import React, { useReducer } from "react";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
};

const Counter = () => {
  // useReducer hook
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold">Counter: {count}</h1>
      <div className="flex gap-4 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch({ type: "increment" })}
        >
          +
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch({ type: "decrement" })}
        >
          -
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
