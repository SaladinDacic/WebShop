import React, { SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
interface LoginProps {
  setToggleShowLogin: React.Dispatch<SetStateAction<boolean>>;
  toggleShowLogin: boolean;
  setToggleShowRegister: React.Dispatch<SetStateAction<boolean>>;
  toggleShowRegister: boolean;
  closeAllComponents: (toast: React.ReactText) => void;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: React.FC<LoginProps> = ({
  setToggleShowRegister,
  toggleShowRegister,
  setToggleShowLogin,
  toggleShowLogin,
  closeAllComponents,
  setLoggedIn,
  loggedIn,
}: LoginProps) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    eval(`set${evt.target.name}`)(evt.target.value);
  };

  const handleLogIn = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    try {
      let response = await axios.post(
        "http://localhost:3001/api/seller/login",
        {
          username: userName,
          password: password,
        },
        { withCredentials: true }
      );
      setLoggedIn(true);
      closeAllComponents(toast.success("Welcome!!"));
    } catch (err) {
      // console.log(err);
      setLoggedIn(false);
      toast.error("Not allowed: insert username and password!");
    }
  };
  const handleLogOut = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    try {
      let response = await axios.get(
        "http://localhost:3001/api/seller/logOut"
        // { withCredentials: true }
      );
      setLoggedIn(false);
      closeAllComponents(toast.success("Bye!!"));
    } catch (err) {
      // console.log(err);
      // setLoggedIn(false);
      toast.error("Can not logout user");
    }
  };
  return (
    <div>
      <form className="Login">
        {!loggedIn ? (
          <>
            <h2 className="h2__tag">Login</h2>
            <div className="Login__container">
              <input
                onChange={handleChange}
                className="Login__container--round fontAwesome"
                type="text"
                placeholder="&#xf2bd; Username"
                value={userName}
                name="UserName"
              />
              <input
                onChange={handleChange}
                className="Login__container--round fontAwesome"
                type="password"
                placeholder="&#xf059; Password"
                value={password}
                name="Password"
              />
            </div>
            <button onClick={handleLogIn} className="Login__btn">
              Login
            </button>
            <a
              onClick={() => {
                setToggleShowLogin(!toggleShowLogin);
                setToggleShowRegister(!toggleShowRegister);
              }}
            >
              Register instead?
            </a>
          </>
        ) : (
          <div className="logout">
            <h2 className="h2__tag">LogOut</h2>
            <p className="p__tag">
              Hope you enjoyed using our site, see you later.
            </p>
            <button onClick={handleLogOut} className="logout__btn">
              Press to logout ":("
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
