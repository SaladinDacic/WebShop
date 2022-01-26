import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import EditProduct from "../components/EditProduct";
import SellerDetail from "../components/SellerDetail";
import { ProfileDetailContext } from "../context/MainContext";
import CardDetails from "../components/CardDetails";

interface ListCardsProps {
  allSellers: {}[] | undefined;
  setAllSellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
}

const ListCards: React.FC<ListCardsProps> = ({ allSellers, setAllSellers }) => {
  const {
    sellerDetail,
    setSellerDetail,
    detailCard,
    setDetailCard,
    editProduct,
    loggedSellerInfo,
    setEditProduct,
    closeWindow,
  } = useContext(ProfileDetailContext);
  const [productList, setProductList] = useState<{}[] | null>();

  useEffect(() => {
    setProductList(allSellers);
    // console.log(allSellers);
  }, [allSellers]);

  const renderProductList = productList?.map((obj: any, i) => {
    return (
      <div onClick={() => handleClick(obj)} key={i}>
        <Card
          sellerId={obj.sellerId}
          setSellerDetail={setSellerDetail}
          key={i}
          ShopName={obj.sellerName}
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
    sellerName: string;
    show: boolean;
    sellerId: string;
    productId: string;
  }) => {
    if (
      loggedSellerInfo !== undefined &&
      obj.sellerId === loggedSellerInfo.sellerId
    ) {
      setEditProduct({
        sellerName: obj.sellerName,
        sellerId: obj.sellerId,
        productId: obj.productId,
        show: true,
      });
    } else {
      setDetailCard({
        sellerName: obj.sellerName,
        sellerId: obj.sellerId,
        productId: obj.productId,
        show: true,
      });
    }
  };

  return (
    <div className="ListCards">
      <div className="ListCards__detail">
        {detailCard.show && <CardDetails />}
      </div>
      <div className="ListCards__detail">
        {sellerDetail.show && <SellerDetail />}
      </div>
      <div className="ListCards__detail">
        {editProduct.show && <EditProduct />}
      </div>
      <div className="ListCards__list">
        {renderProductList}
        {/* {renderProductList}
        {renderProductList}
        {renderProductList}
        {renderProductList}
        {renderProductList} */}
      </div>
    </div>
  );
};

export default ListCards;
