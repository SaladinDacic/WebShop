import React, { SetStateAction, useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyProfile from "./MyProfile";
import { ProfileDetailContext } from "../context/MainContext";
import { logIn, logOut } from "../api/api";
export interface LoginProps {
  setToggleShowLogin: React.Dispatch<SetStateAction<boolean>>;
  toggleShowLogin: boolean;
  setToggleShowRegister: React.Dispatch<SetStateAction<boolean>>;
  toggleShowRegister: boolean;
  closeAllComponents: (message?: string) => void;
  loggedIn: boolean;
  // setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: React.FC<LoginProps> = ({
  setToggleShowRegister,
  toggleShowRegister,
  setToggleShowLogin,
  toggleShowLogin,
  closeAllComponents,
  loggedIn,
}: LoginProps) => {
  const { profileDetail } = useContext(ProfileDetailContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    eval(`set${evt.target.name}`)(evt.target.value);
  };

  const handleLogIn = () => {
    try {
      logIn(userName, password);
      closeAllComponents("welcome");
    } catch (err) {
      toast.error("Not allowed: insert username and password!");
    }
  };
  const handleLogOut = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    try {
      logOut();
      closeAllComponents("bye");
    } catch (err) {
      toast.error("Can not logout user");
    }
  };
  return (
    <div>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
        }}
      >
        {!loggedIn ? (
          <div className="Login">
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
          </div>
        ) : (
          <div className="logout">
            {profileDetail.show && (
              <MyProfile
                closeAllComponents={closeAllComponents}
                handleLogOut={handleLogOut}
              />
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
