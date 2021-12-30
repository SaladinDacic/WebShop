import React, { useEffect, useRef, useState } from "react";

interface SearchProps {
  allSellers: {}[] | undefined;
  setAllSellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
}

const Search: React.FC<SearchProps> = ({ setAllSellers, allSellers }) => {
  const sellersRef = useRef(allSellers);

  useEffect(() => {
    if (sellersRef.current === undefined) sellersRef.current = allSellers;
  }, [allSellers]);
  const [inputState, setInputState] = useState<string>("");

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let filteredSellers = sellersRef.current?.filter((obj: any) => {
      var arr: string[] = Object.keys(obj);
      let thruty = false;
      for (let i = 0; i < arr.length; i++) {
        try {
          if (obj[arr[i]].toLowerCase().includes(inputState.toLowerCase()))
            thruty = true;
        } catch (err) {}
      }
      return thruty;
    });
    setAllSellers(filteredSellers);
    // console.log(allSellers, sellersRef.current);
  };

  return (
    <form onSubmit={handleSubmit} className="Search">
      <input
        onChange={(evt) => {
          setInputState(evt.target.value);
        }}
        value={inputState}
        className="Search__input"
      />
      <button className="Search__btn">Search</button>
    </form>
  );
};

export default Search;
