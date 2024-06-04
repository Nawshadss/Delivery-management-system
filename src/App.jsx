import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./context/components/shared/Navbar";
import Footer from "./context/components/shared/Footer";

function App() {
  return (
    <>
      <div className="flex flex-col  h-[100vh]">
        <Navbar></Navbar>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  );
}

export default App;
