import React from "react";
import ListCards from "./ListCards";
import Navbar from "./Navbar";

const Landing: React.FC = () => {
  return (
    <div>
      <Navbar />
      <ListCards />
    </div>
  );
};

export default Landing;
