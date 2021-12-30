import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import CardDetails from "../components/CardDetails";

interface ListCardsProps {
  mySellers: {}[] | undefined;
  setMySellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
  loggedIn: boolean;
}

const MyShop: React.FC<ListCardsProps> = ({
  mySellers,
  setMySellers,
  loggedIn,
}) => {
  const [productList, setProductList] = useState<{}[] | null>();
  const [detailCard, setDetailCard] = useState<{
    sellerId: string;
    productId: string;
    show: boolean;
  }>({ show: false, sellerId: "", productId: "" });

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
  }) => {
    setDetailCard({
      sellerId: obj.sellerId,
      productId: obj.productId,
      show: true,
    });
  };

  const closeWindow = () => {
    setDetailCard((preVal) => {
      return { ...preVal, show: !preVal.show };
    });
  };
  return (
    <div className="ListCards">
      <div className="ListCards__detail">
        {detailCard.show ? (
          <CardDetails
            sellerId={detailCard.sellerId}
            productId={detailCard.productId}
            closeWindow={closeWindow}
          />
        ) : null}
      </div>
      <div className="ListCards__list">
        {renderProductList}
        {renderProductList}
        {renderProductList}
      </div>
    </div>
  );
};

export default MyShop;
