import React, { useEffect, useRef, useState } from "react";

interface SortFilterProps {
  allSellers: {}[] | undefined;
  setAllSellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
}

const SortFilter: React.FC<SortFilterProps> = ({
  allSellers,
  setAllSellers,
}) => {
  const sellersRef = useRef(allSellers);
  useEffect(() => {
    if (sellersRef.current === undefined) sellersRef.current = allSellers;
  }, [allSellers]);

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    if (evt.target.value === "Category") {
      setAllSellers(sellersRef.current);
    } else {
      let categorizedSellers = sellersRef.current?.filter((obj: any) => {
        return obj.category === evt.target.value;
      });
      setAllSellers(categorizedSellers);
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
    "category",
    "pool",
    "tools",
    "forHouse",
  ]);
  const categoryEnums = categoryRef.current.map((oneOption, i) => {
    return (
      <option key={i} value={oneOption}>
        {oneOption}
      </option>
    );
  });

  return (
    <div className="SortFilter">
      <div className="SortFilter__Category">
        <select onChange={handleChange} required name="category">
          {categoryEnums}
        </select>
        <i className="fas fa-level-down-alt SortFilter__Category--icon"></i>
      </div>
    </div>
  );
};

export default SortFilter;
