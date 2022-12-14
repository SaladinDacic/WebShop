import div from "react-masonry-component";
import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import CardDetails from "./CardDetails";
import { ProfileDetailContext } from "../context/MainContext";
import EditProduct from "./EditProduct";

interface ListCardsProps {
  mySellers?: {}[] | undefined;
  setMySellers?: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
  loggedIn?: boolean;
}

const MyShop: React.FC<ListCardsProps> = ({ mySellers, setMySellers, loggedIn }) => {
  const { detailCard, closeWindow, setDetailCard, editProduct, setEditProduct } = useContext(ProfileDetailContext);
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

  const handleClick = (obj: { show: boolean; sellerId: string; productId: string; sellerName: string }) => {
    setEditProduct({
      sellerId: obj.sellerId,
      productId: obj.productId,
      show: true,
      sellerName: obj.sellerName,
    });
  };

  return (
    <div className="MyShop">
      <div className="MyShop__detail">{detailCard.show && <CardDetails />}</div>
      <div className="ListCards__detail">{editProduct.show && <EditProduct />}</div>
      <div className="MyShop__list">
        {renderProductList}
        {/* {renderProductList}
        {renderProductList} */}
      </div>
    </div>
  );
};

export default MyShop;
