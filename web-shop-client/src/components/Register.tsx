import axios from "axios";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
interface RegisterProps {
  setToggleShowLogin: React.Dispatch<SetStateAction<boolean>>;
  toggleShowLogin: boolean;
  setToggleShowRegister: React.Dispatch<SetStateAction<boolean>>;
  toggleShowRegister: boolean;
  closeAllComponents: (message: string) => void;
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
    likes: { name: string; importance: number }[];
    sells: string[];
  }>({
    username: "",
    email: "",
    password1: "",
    password2: "",
    likes: [
      { name: "Smartphone", importance: 3 },
      { name: "Game", importance: 3 },
      { name: "Pc", importance: 3 },
      { name: "Console", importance: 3 },
    ],
    sells: [],
  });
  const [runUseEffect, setRunUseEffect] = useState(false);
  const [runUseEffect2, setRunUseEffect2] = useState(false);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRegister((oldRegister) => {
      return { ...oldRegister, [evt.target.name]: evt.target.value };
    });
  };

  useEffect(() => {
    var map = new Map() as any;
    for (let i = 0; i < register.likes.length; i++) {
      map.set(register.likes[i].name, register.likes[i]);
    }
    let newLikesArr = [...map.values()];

    setRegister((oldRegister) => {
      return { ...oldRegister, likes: newLikesArr };
    });
    console.log(newLikesArr);
  }, [runUseEffect]);

  useEffect(() => {
    var map = new Map() as any;
    for (let i = 0; i < register.sells.length; i++) {
      map.set(register.sells[i], register.sells[i]);
    }
    let newSellsArr = [...map.values()];

    setRegister((oldRegister) => {
      return { ...oldRegister, sells: newSellsArr };
    });
    console.log(newSellsArr);
  }, [runUseEffect2]);

  const handleCategoryChange1 = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    let newLikesArr = register.likes;
    if (newLikesArr.length >= 4) {
      let idx = parseInt(evt.target.name.slice(6)) - 1;
      newLikesArr[idx] = { name: evt.target.value, importance: 10 };
    } else {
      newLikesArr.push({ name: evt.target.value, importance: 10 });
    }
    setRegister((oldRegister) => {
      return { ...oldRegister, likes: newLikesArr };
    });
    setRunUseEffect(!runUseEffect);
  };
  const handleCategoryChange2 = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    let newSellsArr = register.sells;

    if (newSellsArr.length >= 4) {
      let idx = parseInt(evt.target.name.slice(6)) - 1;
      newSellsArr[idx] = evt.target.value;
    } else {
      newSellsArr.push(evt.target.value);
    }

    setRegister((oldRegister) => {
      return { ...oldRegister, sells: newSellsArr };
    });
    setRunUseEffect2(!runUseEffect2);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(register);
    try {
      let response = await axios.post(
        "http://localhost:3001/api/seller/register",
        {
          username: register.username,
          email: register.email,
          password: register.password1,
          sells: register.sells,
          likes: register.likes,
        },
        { withCredentials: true }
      );
      closeAllComponents("welcome");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const categoryRef = useRef<string[]>([
    "Option",
    "fruit",
    "vegetable",
    "dairy",
    "meat",
    "vehicle",
    "console",
    "game",
    "house",
    "apartment",
    "smartphone",
    "pc",
    "work",
    "pool",
    "tools",
    "forHouse",
  ]);
  const categoryEnums = categoryRef.current.map((oneOption, i) => {
    return (
      <option className="options" key={i} value={oneOption}>
        {oneOption}
      </option>
    );
  });

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
          <div>
            <h3>What you are intested in?</h3>
            <select
              onChange={handleCategoryChange1}
              name="likes-1"
              id="likes-1"
            >
              {categoryEnums}
            </select>
            <select
              onChange={handleCategoryChange1}
              name="likes-2"
              id="likes-2"
            >
              {categoryEnums}
            </select>
            <select
              onChange={handleCategoryChange1}
              name="likes-3"
              id="likes-3"
            >
              {categoryEnums}
            </select>
            <select
              onChange={handleCategoryChange1}
              name="likes-4"
              id="likes-4"
            >
              {categoryEnums}
            </select>
          </div>
          <div>
            <h3>What would you like to sell?</h3>
            <select
              onChange={handleCategoryChange2}
              name="sells-1"
              id="sells-1"
            >
              {categoryEnums}
            </select>
            <select
              onChange={handleCategoryChange2}
              name="sells-2"
              id="sells-2"
            >
              {categoryEnums}
            </select>
            <select
              onChange={handleCategoryChange2}
              name="sells-3"
              id="sells-3"
            >
              {categoryEnums}
            </select>
            <select
              onChange={handleCategoryChange2}
              name="sells-4"
              id="sells-4"
            >
              {categoryEnums}
            </select>
          </div>
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
