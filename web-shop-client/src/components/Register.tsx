import React, { Dispatch, SetStateAction } from "react";
interface RegisterProps {
  setToggleShowLogin: Dispatch<SetStateAction<boolean>>;
  toggleShowLogin: boolean;
  setToggleShowRegister: Dispatch<SetStateAction<boolean>>;
  toggleShowRegister: boolean;
}
const Register: React.FC<RegisterProps> = ({
  setToggleShowLogin,
  toggleShowLogin,
  setToggleShowRegister,
  toggleShowRegister,
}: RegisterProps) => {
  return (
    <form className="Register">
      <h2 className="h2__tag">Register</h2>
      <div className="Register__container">
        <input
          className="Register__container--round fontAwesome"
          type="text"
          placeholder="&#xf2bd; Username"
        />
        <input
          className="Register__container--round fontAwesome"
          type="email"
          placeholder="&#xf2bd; Email"
        />
        <input
          className="Register__container--round fontAwesome"
          type="password"
          placeholder="&#xf059; Password"
        />
        <input
          className="Register__container--round fontAwesome"
          type="password"
          placeholder="&#xf059; Repeat Password"
        />
        <div className="Register__container--check">
          <input type="checkbox" />
          <p className="p__tag">Remember me</p>
        </div>
        <div className="Register__container--check">
          <input type="checkbox" />
          <p className="p__tag">I am company</p>
        </div>
      </div>
      <button className="Register__btn">Register</button>
      <a
        onClick={() => {
          setToggleShowLogin(!toggleShowLogin);
          setToggleShowRegister(!toggleShowRegister);
        }}
      >
        Already have account?
      </a>
    </form>
  );
};

export default Register;
