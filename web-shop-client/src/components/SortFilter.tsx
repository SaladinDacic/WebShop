import React, { useEffect, useRef, useState } from "react";

interface SortFilterProps {
  allSellers: {}[] | undefined;
  mySellers: {}[] | undefined;
  setAllSellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
  setMySellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
}

const SortFilter: React.FC<SortFilterProps> = ({
  allSellers,
  setAllSellers,
  setMySellers,
  mySellers,
}) => {
  const sellersRef = useRef(allSellers);
  const mySellersRef = useRef(mySellers);
  useEffect(() => {
    if (sellersRef.current === undefined) sellersRef.current = allSellers;
  }, [allSellers]);
  useEffect(() => {
    if (mySellersRef.current === undefined) mySellersRef.current = mySellers;
  }, [mySellers]);

  const handleChangeCategory = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    if (evt.target.value === "Category") {
      setAllSellers(sellersRef.current);
      setMySellers(mySellersRef.current);
    } else {
      let categorizedSellers = sellersRef.current?.filter((obj: any) => {
        return obj.category === evt.target.value;
      });
      let categorizedMySellers = mySellersRef.current?.filter((obj: any) => {
        return obj.category === evt.target.value;
      });
      setAllSellers(categorizedSellers);
      setMySellers(categorizedMySellers);
    }
  };
  const handleChangeSort = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    if (evt.target.value === "Sort") {
      setAllSellers(sellersRef.current);
      setMySellers(mySellersRef.current);

      console.log(mySellersRef.current, sellersRef.current);
    } else if (evt.target.value === "Price low") {
      if (sellersRef.current) {
        let sortedSellers = bubbleSortObjUp(sellersRef.current, "price");
        setAllSellers(sortedSellers);
        console.log(sortedSellers == sellersRef.current);
      }
      if (mySellersRef.current) {
        let sortedMySellers = bubbleSortObjUp(mySellersRef.current, "price");
        setMySellers(sortedMySellers);
        console.log(sortedMySellers == mySellersRef.current);
      }
    } else if (evt.target.value === "Price high") {
      if (sellersRef.current) {
        let sortedSellers = bubbleSortObjDown(sellersRef.current, "price");
        setAllSellers(sortedSellers);
        console.log(sortedSellers == sellersRef.current);
      }
      if (mySellersRef.current) {
        let sortedMySellers = bubbleSortObjDown(mySellersRef.current, "price");
        setMySellers(sortedMySellers);
        console.log(sortedMySellers == mySellersRef.current);
      }
    } else if (evt.target.value === "Newest") {
      if (sellersRef.current) {
        let sortedSellers = bubbleSortObjDown(sellersRef.current, "date");
        setAllSellers(sortedSellers);
      }
      if (mySellersRef.current) {
        let sortedMySellers = bubbleSortObjDown(mySellersRef.current, "date");
        setMySellers(sortedMySellers);
      }
    } else if (evt.target.value === "Oldest") {
      if (sellersRef.current) {
        let sortedSellers = bubbleSortObjUp(sellersRef.current, "date");
        setAllSellers(sortedSellers);
      }
      if (mySellersRef.current) {
        let sortedMySellers = bubbleSortObjUp(mySellersRef.current, "date");
        setMySellers(sortedMySellers);
      }
    }
  };

  const categoryRef = useRef<string[]>([
    "Category",
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
  const sortRef = useRef<string[]>([
    "Sort",
    "Price low",
    "Price high",
    "Newest",
    "Oldest",
  ]);
  const sortEnums = sortRef.current.map((oneOption, i) => {
    return (
      <option className="options" key={i} value={oneOption}>
        {oneOption}
      </option>
    );
  });

  return (
    <div className="SortFilter">
      <div className="SortFilter__Category">
        <div className="SortFilter__Category--Filter">
          <i className="fas fa-level-down-alt SortFilter__Category--Filter-icon"></i>
          <select onChange={handleChangeCategory} required name="category">
            {categoryEnums}
          </select>
        </div>
        <div className="SortFilter__Category--Sort">
          <i className="fas fa-level-down-alt SortFilter__Category--Sort-icon"></i>
          <select onChange={handleChangeSort} required name="category">
            {sortEnums}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortFilter;

function bubbleSortObjDown(arr: any[], condition: string) {
  let noSwaps;
  let newArr = arr.slice();
  for (let i = newArr.length - 1; i >= 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i; j++) {
      // console.log(newArr[j][condition], newArr[j + 1][condition]);
      if (newArr[j][condition] < newArr[j + 1][condition]) {
        [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) {
      break;
    }
  }
  // console.log(arr, newArr);
  return newArr;
}
function bubbleSortObjUp(arr: any[], condition: string) {
  let noSwaps;
  let newArr = arr.slice();
  for (let i = newArr.length - 1; i >= 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i; j++) {
      // console.log(newArr[j][condition], newArr[j + 1][condition]);
      if (newArr[j][condition] > newArr[j + 1][condition]) {
        [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) {
      break;
    }
  }
  return newArr;
}
