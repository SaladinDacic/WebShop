import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { ToastContainer, Bounce } from "react-toastify";
import SortFilter from "../components/SortFilter";

interface NavbarProps {
  allSellers: {}[] | undefined;
  setAllSellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({
  setAllSellers,
  allSellers,
  loggedIn,
  setLoggedIn,
}) => {
  const [toggleShowLogin, setToggleShowLogin] = useState(false);
  const [toggleShowRegister, setToggleShowRegister] = useState(false);
  const closeAllComponents = (toast: React.ReactText): void => {
    setTimeout(() => {
      setToggleShowLogin(false);
      setToggleShowRegister(false);
    }, 500);
  };

  return (
    <div className="Navbar">
      <div className="Navbar__primary">
        <i className="Navbar__primary--logo fab fa-shopware"></i>
        <div className="Navbar__primary--div">
          <ToastContainer
            draggable={true}
            autoClose={4000}
            transition={Bounce}
          />
          <Search allSellers={allSellers} setAllSellers={setAllSellers} />
          <i className="fas fa-shopping-cart"></i>
          <i className="fas fa-clipboard-check"></i>
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
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              closeAllComponents={closeAllComponents}
              setToggleShowLogin={setToggleShowLogin}
              toggleShowLogin={toggleShowLogin}
              setToggleShowRegister={setToggleShowRegister}
              toggleShowRegister={toggleShowRegister}
            />
          )}
          {toggleShowRegister && (
            <Register
              closeAllComponents={closeAllComponents}
              setToggleShowLogin={setToggleShowLogin}
              toggleShowLogin={toggleShowLogin}
              setToggleShowRegister={setToggleShowRegister}
              toggleShowRegister={toggleShowRegister}
            />
          )}
        </div>
      </div>
      <div className="Navbar__secondary">
        <Link
          to={"/addProduct/category"}
          className="Navbar__secondary--tag a-tag add-product"
        >
          ++Add new product++
        </Link>
        <div className="Navbar__secondary--middleDiv">
          <Link to={"/"} className="Navbar__secondary--tag a-tag">
            Home
          </Link>

          <Link to={"/popular"} className="Navbar__secondary--tag a-tag">
            Popular
          </Link>
          <Link to={"/suggested"} className="Navbar__secondary--tag a-tag">
            Suggested
          </Link>
        </div>
        {loggedIn && (
          <Link to={"/myArticles"} className="Navbar__secondary--tag a-tag">
            My Shop
          </Link>
        )}
        <SortFilter allSellers={allSellers} setAllSellers={setAllSellers} />
      </div>
    </div>
  );
};

export default Navbar;
