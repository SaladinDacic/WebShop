import React, { useContext, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Link, useNavigate } from "react-router-dom";
import Search from "../components/Search";
import { ToastContainer, Bounce, toast } from "react-toastify";
import SortFilter from "../components/SortFilter";
import { ProfileDetailContext } from "../context/MainContext";
import Basket from "../components/Basket";

interface NavbarProps {
  allSellers: {}[] | undefined;
  mySellers: {}[] | undefined;
  setAllSellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
  setMySellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({
  loggedIn,
  setLoggedIn,
  setMySellers,
  mySellers,
}) => {
  const {
    allSellers,
    setAllSellers,
    profileDetail,
    setProfileDetail,
    setDetailCard,
    closeWindow,
    setRerender,
    rerender,
  } = useContext(ProfileDetailContext);
  const navigate = useNavigate();
  const [toggleShowBasket, setToggleShowBasket] = useState(false);
  const [toggleShowLogin, setToggleShowLogin] = useState(false);
  const [toggleShowRegister, setToggleShowRegister] = useState(false);
  const closeAllComponents = async (message = "") => {
    if (message !== "") {
      toast.success(message);
      await setTimeout(() => {
        setToggleShowLogin(false);
        setToggleShowRegister(false);
        setLoggedIn(!loggedIn);
        setRerender(!rerender);
        navigate("/");
        window.location.reload();
      }, 1200);
    } else {
      await setTimeout(() => {
        setToggleShowLogin(false);
        setToggleShowRegister(false);
        // setRerender(!rerender);
        // window.location.reload();
        // navigate("/");
      }, 500);
    }

    // console.log(message);
  };

  const handleLogInData = () => {
    // console.log(profileDetail);
    setProfileDetail(
      ({ show, sellerId }: { show: boolean; sellerId: string }) => {
        return { sellerId: profileDetail.sellerId, show: true };
      }
    );
  };
  return (
    <div className="Navbar">
      <div className="Navbar__primary">
        <i className="Navbar__primary--logo fab fa-shopware"></i>
        <div className="Navbar__primary--div">
          <ToastContainer
            draggable={true}
            autoClose={1200}
            transition={Bounce}
          />
          <Search allSellers={allSellers} setAllSellers={setAllSellers} />
          <i className="fas fa-clipboard-check"></i>
          <i
            onClick={() => {
              setToggleShowBasket(!toggleShowBasket);
            }}
            className="fas fa-shopping-cart"
          ></i>
          <i
            onClick={() => {
              handleLogInData();
              toggleShowRegister
                ? setToggleShowRegister(!toggleShowRegister)
                : setToggleShowLogin(!toggleShowLogin);
            }}
            className="fas fa-user-tie"
          ></i>
          {toggleShowBasket && (
            <Basket
              toggleShowBasket={toggleShowBasket}
              setToggleShowBasket={setToggleShowBasket}
            />
          )}
          {toggleShowLogin && (
            <Login
              loggedIn={loggedIn}
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
        {loggedIn ? (
          <Link
            to={"/addProduct/category"}
            className="Navbar__secondary--tag a-tag add-product"
          >
            Add new product
          </Link>
        ) : (
          <a
            onClick={() => setToggleShowLogin(true)}
            className="Navbar__secondary--tag a-tag add-product"
          >
            Add new product
          </a>
        )}

        {/* <div className="Navbar__secondary--middleDiv"> */}
        <Link to={"/"} className="Navbar__secondary--tag a-tag">
          Home
        </Link>

        <Link to={"/popular"} className="Navbar__secondary--tag a-tag">
          Popular
        </Link>
        <Link to={"/suggested"} className="Navbar__secondary--tag a-tag">
          Suggested
        </Link>
        {/* </div> */}
        {loggedIn && (
          <Link to={"/myArticles"} className="Navbar__secondary--tag a-tag">
            My Shop
          </Link>
        )}
        <SortFilter
          mySellers={mySellers}
          setMySellers={setMySellers}
          allSellers={allSellers}
          setAllSellers={setAllSellers}
        />
      </div>
    </div>
  );
};

export default Navbar;
