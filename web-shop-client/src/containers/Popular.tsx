import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "../components/Card";
import EditProduct from "../components/EditProduct";
import SellerDetail from "../components/SellerDetail";
import { ProfileDetailContext } from "../context/MainContext";
import CardDetails from "../components/CardDetails";
import { getAllPopular } from "../api/api";

interface PopularProps {
  allSellers: {}[] | undefined;
  setAllSellers: React.Dispatch<React.SetStateAction<{}[] | undefined>>;
}

const Popular: React.FC<PopularProps> = ({ allSellers, setAllSellers }) => {
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
    (async function providePopular() {
      await getAllPopular().then((data) => {
        let popularCategoriesArr = data
          .map((obj: { category: string }) => {
            return obj.category;
          })
          .slice(0, 10);

        if (loggedSellerInfo !== undefined) {
          if (sellersRef.current === undefined) sellersRef.current = allSellers;

          console.log(popularCategoriesArr);
          var categorizedSellers: {}[] = [];

          popularCategoriesArr.forEach((category: string) => {
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
          // console.log(categorizedSellers);
          sellersRef.current = unique(categorizedSellers, "productId");
          setProductList(sellersRef.current);
        }
      });
    })();
  }, []);

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
    <div className="Popular">
      <div className="Popular__detail">
        {detailCard.show && <CardDetails />}
      </div>
      <div className="Popular__detail">
        {sellerDetail.show && <SellerDetail />}
      </div>
      <div className="Popular__detail">
        {editProduct.show && <EditProduct />}
      </div>
      <div className="Popular__list">
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

export default Popular;

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