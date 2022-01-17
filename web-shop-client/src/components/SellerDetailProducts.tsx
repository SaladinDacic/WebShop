import React, { useState, useEffect, ReactElement, useContext } from "react";
import { ProfileDetailContext } from "../context/ProfileDetailContext";
import Card from "./Card";

export interface SellerDetailProps {
  allSellers: {}[] | undefined;
  setAllSellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
  closeWindow: () => void;
}

export interface ListCardsProps {
  sellerName: string;
  sellerId: string;
  productId: string;
  closeWindow: () => void;
}

const SellerDetailProducts: React.FC = () => {
  const { allSellers, editProduct, setEditProduct, profileDetail, mySellers } =
    useContext(ProfileDetailContext);
  const [productList, setProductList] = useState<any[] | null>();

  useEffect(() => {
    console.log(mySellers);
    setProductList(mySellers);
  }, [mySellers]);

  const handleClick = (evt: React.MouseEvent<HTMLDivElement>, key: number) => {
    if (productList) {
      setEditProduct({
        sellerName: productList[key].sellerName,
        sellerId: productList[key].sellerId,
        productId: productList[key].productId,
        show: true,
      });
      console.log(productList && productList[key]);
    }
  };
  const renderProductList = productList?.map((obj: any, i) => {
    return (
      <div onClick={(evt) => handleClick(evt, i)} key={i}>
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

  return (
    <div className="SellerDetailProducts">
      <div className="SellerDetailProducts__list">
        {productList?.length !== 0 ? (
          <>
            {renderProductList}
            {renderProductList}
            {renderProductList}
          </>
        ) : (
          <h3>Product list is empty</h3>
        )}
      </div>
    </div>
  );
};

export default SellerDetailProducts;
