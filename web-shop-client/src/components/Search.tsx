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
    let inputStateArr = inputState
      .split("")
      .map((char: string) => {
        if (isAlphaNumeric(char)) return char;
      })
      .filter((val: undefined | string) => {
        if (val !== undefined) return true;
      });
    let moddedInput = inputStateArr.join("");

    let filteredSellers = sellersRef.current?.filter((obj: any) => {
      var arr: string[] = Object.keys(obj);
      let thruty = false;
      for (let i = 0; i < arr.length; i++) {
        try {
          if (obj[arr[i]].toLowerCase().includes(moddedInput.toLowerCase()))
            thruty = true;
        } catch (err) {}
      }
      return thruty;
    });
    // console.log(filteredSellers);
    setAllSellers(filteredSellers);
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

function isAlphaNumeric(char: string) {
  var code = char.charCodeAt(0);
  if (
    !(code > 47 && code < 58) && // ako kod nije numeric (0-9)
    !(code > 64 && code < 91) && // ako kod nije upper alpha (A-Z)
    !(code > 96 && code < 123) // ako kod nije lower alpha (a-z)
  ) {
    return false; // reci da nije alpha-numeric
  }
  return true; // u suprotnom reci da jeste
}
