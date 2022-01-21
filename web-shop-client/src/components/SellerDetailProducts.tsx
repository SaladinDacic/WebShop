import React, { useState, useEffect, ReactElement, useContext } from "react";
import { ProfileDetailContext } from "../context/MainContext";
import Card from "./Card";

export interface SellerDetailProps {
  currentSeller?: any[] | undefined;
  itsMe?: boolean;
  fromMyProfile?: boolean;
}

const SellerDetailProducts: React.FC<SellerDetailProps> = ({
  currentSeller,
  itsMe,
  fromMyProfile,
}) => {
  const { setDetailCard, setEditProduct, mySellers } =
    useContext(ProfileDetailContext);
  const [productList, setProductList] = useState<any[] | null>();

  useEffect(() => {
    // console.log({ mySellers: mySellers, currentSeller: currentSeller });
    if (currentSeller) {
      setProductList(currentSeller);
    } else {
      setProductList(mySellers);
    }
  }, [currentSeller]);

  const handleClick = (evt: React.MouseEvent<HTMLDivElement>, key: number) => {
    let funcName = "setEditProduct";
    console.log(itsMe);
    if (!itsMe && !fromMyProfile) {
      funcName = "setDetailCard";
    }
    if (productList) {
      eval(funcName)({
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
            {/* {renderProductList}
            {renderProductList} */}
          </>
        ) : (
          <h3>Product list is empty</h3>
        )}
      </div>
    </div>
  );
};

export default SellerDetailProducts;
