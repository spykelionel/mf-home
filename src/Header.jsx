import { useAppContext } from "home/AppContext";
import React from "react";
export default function Header() {
  const { counter, increment } = useAppContext();

  return (
    <div className="p-5 bg-blue-500 text-white -text-3xl font-bold">
      Micro Frontend Header
      <button
        onClick={increment}
        className="bg-green-500 text-white p-2 rounded-md mx-2"
      >
        Increment Counter: {counter}
      </button>
    </div>
  );
}
