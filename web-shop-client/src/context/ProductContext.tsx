import React, { useState, createContext, useEffect } from "react";
type ContainerProps = {
  children: React.ReactNode; //👈 children prop typr
};

export const ProductContext = createContext<any | null>(null);

export const ProductProvider = (props: ContainerProps) => {
  const [ad, setAd] = useState<
    | {
        sellOrRent: string;
        sellOrDemand: string;
        productName: string;
        category: string;
        year: number;
        locationName: string;
        price: number;
        holds: number;
        sold: number;
        brand: string;
        make: string;
        model: string;
        imgSrc: string[];
        used: boolean;
        desc: string;
      }
    | {}
  >({});

  const [categoryTab, setCategoryTab] = useState("");
  const [basicInfoTab, setBasicInfoTab] = useState<
    | {
        sellOrDemand: string;
        productName: string;
        category: string;
        year: number;
        locationName: string;
      }
    | {}
  >({});
  const [pidTab, setPidTab] = useState<
    | {
        price: number;
        holds: number;
        sold: number;
        brand: string;
        make: string;
        model: string;
        imgSrc: string[];
        used: boolean;
        desc: string;
      }
    | {}
  >({});
  const [deleteAllImagesFromBase, setDeleteAllImagesFromBase] = useState(true);
  useEffect(() => {
    setAd({ sellOrRent: categoryTab, ...basicInfoTab, ...pidTab });
  }, [categoryTab, basicInfoTab, pidTab]);

  return (
    <ProductContext.Provider
      value={{
        pidTab,
        basicInfoTab,
        setCategoryTab,
        setBasicInfoTab,
        setPidTab,
        ad,
        setAd,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
