import React, { createContext, useState, useEffect } from "react";
import { getLoggedUserName, getSellerById } from "../api/api";

export const ProfileDetailContext = createContext<any | null>(null);

export interface ProfileDetailContextProps {
  allSellers: {}[] | undefined;
  setAllSellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
  sellerId: string;
  mySellers: any[] | undefined;
  setMySellers: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileDetailProvider: React.FC<ProfileDetailContextProps> = ({
  allSellers,
  setAllSellers,
  children,
  sellerId,
  mySellers,
  setMySellers,
  rerender,
  setRerender,
  loggedIn,
  setLoggedIn,
}) => {
  const [sellerDetail, setSellerDetail] = useState<{
    show: boolean;
    sellerId: string;
  }>({ show: false, sellerId: "" });
  const [detailCard, setDetailCard] = useState<{
    sellerId: string;
    productId: string;
    show: boolean;
    sellerName: string;
  }>({ show: false, sellerId: "", productId: "", sellerName: "" });
  const [editProduct, setEditProduct] = useState<{
    sellerId: string;
    productId: string;
    show: boolean;
    sellerName: string;
  }>({ show: false, sellerId: "", productId: "", sellerName: "" });
  const [profileDetail, setProfileDetail] = useState<{
    show: boolean;
    sellerId: string;
  }>({ show: false, sellerId: "" });
  const [loggedSellerInfo, setLoggedSellerInfo] = useState<
    | {
        sellerId: string;
        rating: number;
        sellerName: string;
        date: string;
      }
    | undefined
  >(undefined);

  const closeWindow = () => {
    setDetailCard((preVal) => {
      return { ...preVal, show: false };
    });
    setEditProduct((preVal) => {
      return { ...preVal, show: false };
    });
  };

  const [hideChat, setHideChat] = useState(true);

  const thisSellerIsLoggedIn = async (id: string) => {
    try {
      let response1 = await getSellerById(id);
      let response2 = await getLoggedUserName();
      // console.log(response1.data.name === response2.data.name);
      return response1.data.name === response2.data.name;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    if (sellerId) {
      console.log(sellerId);
      if (sellerId) {
        setProfileDetail((oldProps) => {
          return { ...oldProps, sellerId: sellerId };
        });
      }
      (async function provideLoggedSellerInfo() {
        try {
          let response = await getSellerById(sellerId);
          let info = response.data as {
            sellerId: string;
            rating: number;
            name: string;
            date: string;
          };
          // console.log(info.name);
          setLoggedSellerInfo({
            sellerId,
            rating: info.rating,
            date: info.date,
            sellerName: info.name,
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [sellerId]);

  return (
    <ProfileDetailContext.Provider
      value={{
        allSellers,
        setAllSellers,
        sellerDetail,
        setSellerDetail,
        detailCard,
        setDetailCard,
        closeWindow,
        profileDetail,
        setProfileDetail,
        editProduct,
        setEditProduct,
        mySellers,
        setMySellers,
        loggedIn,
        setLoggedIn,
        rerender,
        setRerender,
        hideChat,
        setHideChat,
        thisSellerIsLoggedIn,
        loggedSellerInfo,
      }}
    >
      {children}
    </ProfileDetailContext.Provider>
  );
};
