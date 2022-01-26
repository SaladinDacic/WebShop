import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "../components/Card";
import EditProduct from "../components/EditProduct";
import SellerDetail from "../components/SellerDetail";
import { ProfileDetailContext } from "../context/MainContext";
import CardDetails from "../components/CardDetails";

interface SuggestedProps {
  allSellers: {}[] | undefined;
  setAllSellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
}

const Suggested: React.FC<SuggestedProps> = ({ allSellers, setAllSellers }) => {
  const {
    sellerDetail,
    setSellerDetail,
    detailCard,
    setDetailCard,
    editProduct,
    loggedSellerInfo,
    setEditProduct,
  } = useContext(ProfileDetailContext);
  const [productList, setProductList] = useState<{}[] | null>();
  const sellersRef = useRef(allSellers);

  useEffect(() => {
    if (loggedSellerInfo !== undefined) {
      sellersRef.current = allSellers;

      let likesString = "";
      loggedSellerInfo.likes.forEach((val: { name: string }) => {
        likesString = likesString.concat(` ${val.name},`);
      });
      let strArr: string[] = [];
      likesString.split("").forEach((val) => {
        if (val !== " ") {
          strArr.push(val);
        }
      });
      let compressedString = strArr.join("");
      const categoriesArr = compressedString
        .split(",")
        .filter((str: string) => {
          if (str !== "") return true;
        });

      var categorizedSellers: {}[] = [];

      categoriesArr.forEach((category: string) => {
        var data: {}[] = [];
        if (sellersRef.current !== undefined)
          data = [
            ...sellersRef.current.filter((obj: any) => {
              return obj.category === category;
            }),
          ];
        if (data !== undefined) {
          categorizedSellers = [...categorizedSellers, ...data];
        }
      });
      console.log(categorizedSellers);
      sellersRef.current = unique(categorizedSellers, "productId");
      setProductList(sellersRef.current);
    }
  }, [allSellers]);

  // useEffect(() => {
  // }, []);

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
    if (obj.sellerId === loggedSellerInfo.sellerId) {
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
    <div className="Suggested">
      <div className="Suggested__detail">
        {detailCard.show && <CardDetails />}
      </div>
      <div className="Suggested__detail">
        {sellerDetail.show && <SellerDetail />}
      </div>
      <div className="Suggested__detail">
        {editProduct.show && <EditProduct />}
      </div>
      <div className="Suggested__list">
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

export default Suggested;

function unique(arrOfObj: {}[], prop: string) {
  let newArr: {}[] = [];
  arrOfObj.forEach((val: any) => {
    if (
      undefined ===
      newArr.find(
        (value: any) =>
          JSON.stringify(value[prop]) === JSON.stringify(val[prop])
      )
    ) {
      newArr.push(val);
    }
  });
  return newArr;
}
