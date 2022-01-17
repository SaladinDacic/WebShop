import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import CardDetails from "../containers/CardDetails";
import { ProfileDetailContext } from "../context/ProfileDetailContext";

interface ListCardsProps {
  mySellers?: {}[] | undefined;
  setMySellers?: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
  loggedIn?: boolean;
}

const MyShop: React.FC<ListCardsProps> = ({
  mySellers,
  setMySellers,
  loggedIn,
}) => {
  const { detailCard, closeWindow, setDetailCard } =
    useContext(ProfileDetailContext);
  const [productList, setProductList] = useState<{}[] | null>();

  useEffect(() => {
    setProductList(mySellers);
  }, [mySellers, loggedIn]);

  const renderProductList = productList?.map((obj: any, i) => {
    return (
      <div onClick={() => handleClick(obj)} key={i}>
        <Card
          key={i}
          ShopName={obj.shopName}
          productName={obj.productName}
          brand={obj.brand}
          description={obj.desc}
          price={obj.price}
          category={obj.category}
          imgSrc={obj.imgSrc}
        />
      </div>
    );
  });

  const handleClick = (obj: {
    show: boolean;
    sellerId: string;
    productId: string;
    sellerName: string;
  }) => {
    setDetailCard({
      sellerId: obj.sellerId,
      productId: obj.productId,
      show: true,
      sellerName: obj.sellerName,
    });
  };

  return (
    <div className="MyShop">
      <div className="MyShop__detail">
        {detailCard.show ? <CardDetails /> : null}
      </div>
      <div className="MyShop__list">
        {renderProductList}
        {renderProductList}
        {renderProductList}
      </div>
    </div>
  );
};

export default MyShop;
