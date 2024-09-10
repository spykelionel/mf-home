import { useAppContext } from "home/AppContext";
import React from "react";
export default function Footer() {
  const { counter, decrement } = useAppContext();
  return (
    <div className="p-5 bg-blue-500 text-white -text-3xl font-bold">
      Micro Frontend Footer
      <button
        onClick={decrement}
        className="bg-red-500 text-white p-2 rounded-md mx-2"
      >
        Decrement Counter: {counter}
      </button>
    </div>
  );
}
