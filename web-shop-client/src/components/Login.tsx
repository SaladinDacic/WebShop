import React, { Dispatch, SetStateAction } from "react";
interface LoginProps {
  setToggleShowLogin: Dispatch<SetStateAction<boolean>>;
  toggleShowLogin: boolean;
  setToggleShowRegister: Dispatch<SetStateAction<boolean>>;
  toggleShowRegister: boolean;
}
const Login: React.FC<LoginProps> = ({
  setToggleShowRegister,
  toggleShowRegister,
  setToggleShowLogin,
  toggleShowLogin,
}: LoginProps) => {
  return (
    <form className="Login">
      <h2 className="h2__tag">Login</h2>
      <div className="Login__container">
        <input
          className="Login__container--round fontAwesome"
          type="text"
          placeholder="&#xf2bd; Username"
        />
        <input
          className="Login__container--round fontAwesome"
          type="password"
          placeholder="&#xf059; Password"
        />
        <div className="Login__container--check">
          <input type="checkbox" />
          <p className="p__tag">Remember me</p>
        </div>
      </div>
      <button className="Login__btn">Login</button>
      <a
        onClick={() => {
          setToggleShowLogin(!toggleShowLogin);
          setToggleShowRegister(!toggleShowRegister);
        }}
      >
        Register instead?
      </a>
    </form>
  );
};

export default Login;
