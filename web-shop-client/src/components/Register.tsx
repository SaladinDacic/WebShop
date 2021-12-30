import axios from "axios";
import React, { SetStateAction, useState } from "react";
import { toast } from "react-toastify";
interface RegisterProps {
  setToggleShowLogin: React.Dispatch<SetStateAction<boolean>>;
  toggleShowLogin: boolean;
  setToggleShowRegister: React.Dispatch<SetStateAction<boolean>>;
  toggleShowRegister: boolean;
  closeAllComponents: (toast: React.ReactText) => void;
}
const Register: React.FC<RegisterProps> = ({
  setToggleShowLogin,
  toggleShowLogin,
  setToggleShowRegister,
  toggleShowRegister,
  closeAllComponents,
}: RegisterProps) => {
  const [register, setRegister] = useState<{
    username: string;
    email: string;
    password1: string;
    password2: string;
  }>({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRegister((oldRegister) => {
      return { ...oldRegister, [evt.target.name]: evt.target.value };
    });
  };
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:3001/api/seller/register",
        {
          username: register.username,
          email: register.email,
          password: register.password1,
        },
        { withCredentials: true }
      );
      closeAllComponents(toast.success("Welcome!!"));
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="Register">
      <h2 className="h2__tag">Register</h2>
      <div className="Register__container">
        <input
          onChange={handleChange}
          className="Register__container--round fontAwesome"
          type="text"
          placeholder="&#xf2bd; Username"
          name="username"
          value={register.username}
        />
        <input
          onChange={handleChange}
          className="Register__container--round fontAwesome"
          type="email"
          placeholder="&#xf2bd; Email"
          name="email"
          value={register.email}
        />
        <input
          onChange={handleChange}
          className="Register__container--round fontAwesome"
          type="password"
          placeholder="&#xf059; Password"
          name="password1"
          value={register.password1}
        />
        <input
          onChange={handleChange}
          className="Register__container--round fontAwesome"
          type="password"
          placeholder="&#xf059; Repeat Password"
          name="password2"
          value={register.password2}
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
