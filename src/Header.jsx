import { useAppContext } from "home/AppContext";
import createSharedStateHook from "home/shared";
import React from "react";

const origins = ["http://localhost:3000", "http://localhost:3001"];
const useSharedCounter = createSharedStateHook("sharedCounter", 0, origins);
export default function Header() {
  const { counter, increment } = useAppContext();
  const [count, setCount] = useSharedCounter();
  return (
    <div
      className="p-5 bg-blue-500 text-white -text-3xl font-bold"
      onClick={(_) => setCount(count + 1)}
    >
      Micro Frontend Header - {count}
      <button
        onClick={increment}
        className="bg-green-500 text-white p-2 rounded-md mx-2"
      >
        Increment Counter: {counter}
      </button>
    </div>
  );
}
