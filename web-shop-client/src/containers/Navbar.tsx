import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

import Search from "../components/Search";

// import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [toggleShowLogin, setToggleShowLogin] = useState(false);
  const [toggleShowRegister, setToggleShowRegister] = useState(false);

  return (
    <div className="Navbar">
      <div className="Navbar__primary">
        <i className="Navbar__primary--logo fab fa-shopware"></i>
        <div className="Navbar__primary--div">
          <Search />
          <i
            onClick={() => {
              toggleShowRegister
                ? setToggleShowRegister(!toggleShowRegister)
                : setToggleShowLogin(!toggleShowLogin);
            }}
            className="fas fa-user-tie"
          ></i>
          {toggleShowLogin && (
            <Login
              setToggleShowLogin={setToggleShowLogin}
              toggleShowLogin={toggleShowLogin}
              setToggleShowRegister={setToggleShowRegister}
              toggleShowRegister={toggleShowRegister}
            />
          )}
          {toggleShowRegister && (
            <Register
              setToggleShowLogin={setToggleShowLogin}
              toggleShowLogin={toggleShowLogin}
              setToggleShowRegister={setToggleShowRegister}
              toggleShowRegister={toggleShowRegister}
            />
          )}
          <i className="fas fa-shopping-cart"></i>
        </div>
      </div>
      <div className="Navbar__secondary">
        <a className="Navbar__secondary--tag a-tag">Home</a>
        <a className="Navbar__secondary--tag a-tag">Men</a>
        <a className="Navbar__secondary--tag a-tag">Women</a>
        <a className="Navbar__secondary--tag a-tag">Kids</a>
        <a className="Navbar__secondary--tag a-tag">Accessories</a>
      </div>
    </div>
  );
};

export default Navbar;
