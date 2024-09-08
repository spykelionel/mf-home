import Footer from "home/Footer";
import Header from "home/Header";
import "home/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
const App = () => (
  <div className="text-3xl mx-auto max-w-6xl">
    <Header />
    <div class="text-center">
      <img
        src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
        class="rounded-full w-32 mb-4 mx-auto"
        alt="Avatar"
      />
      <h5 class="text-xl font-medium leading-tight mb-2">John Doe</h5>
      <p class="text-gray-500 bg-slate-950">Web designer</p>
    </div>
    <Footer />
  </div>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
