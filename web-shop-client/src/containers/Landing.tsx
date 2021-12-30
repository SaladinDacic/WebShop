import React, { useEffect, useState } from "react";
import {
  useDeepCompareEffectNoCheck,
  useDeepCompareMemoize,
} from "use-deep-compare-effect";
import Footer from "../components/Footer";
import ListCards from "./ListCards";
import Navbar from "./Navbar";
import { getLoggedUserName, getSellers } from "../api/api";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Product from "./Product";
import Category from "../components/Product-routes/Category";
import BasicInformation from "../components/Product-routes/BasicInformation";
import PriceImageDesc from "../components/Product-routes/PriceImageDesc";
import Publish from "../components/Product-routes/Publish";
import { ProductProvider } from "../context/ProductContext";
import MyShop from "./MyShop";
const Landing: React.FC = () => {
  const [allSellers, setAllSellers] = useState<{}[] | undefined>(undefined);
  const [mySellers, setMySellers] = useState<{}[] | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   let getAllApis = async () => {
  //     let response1 = await getSellers();
  //     setAllSellers(response1);
  //     let mySellersData = response1.filter((obj: any) => {
  //       return obj.sellerId === response2.data.sellerId;
  //     });
  //     setMySellers(mySellersData);
  //     var response2 = await getLoggedUserName();
  //     if (response2.data) setLoggedIn(true);
  //     else setLoggedIn(false);
  //   };
  //   getAllApis();
  // }, [loggedIn]);
  useDeepCompareEffectNoCheck(() => {
    let getAllApis = async () => {
      let response1 = await getSellers();
      setAllSellers(response1);
      // console.log(response1);

      var response2 = await getLoggedUserName();
      let mySellersData = allSellers?.filter((obj: any) => {
        return obj.sellerId === response2.data.sellerId;
      });
      setMySellers(mySellersData);

      console.log(response2);
      if (response2.data.data === false) setLoggedIn(false);
      else setLoggedIn(true);
    };
    getAllApis();
  }, [mySellers, loggedIn]);
  return (
    <div className="Landing">
      <BrowserRouter>
        <Navbar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          allSellers={allSellers}
          setAllSellers={setAllSellers}
        />
        <div className="Landing__ContentBody">
          <Routes>
            <Route
              path="/addProduct/"
              element={
                <ProductProvider>
                  <Product />
                </ProductProvider>
              }
            >
              <Route path="/addProduct/category" element={<Category />} />
              <Route
                path="/addProduct/basic-information"
                element={<BasicInformation />}
              />
              <Route
                path="/addProduct/price-image-desc"
                element={<PriceImageDesc />}
              />
              <Route path="/addProduct/publish" element={<Publish />} />
            </Route>

            <Route
              path="/"
              element={
                <ProductProvider>
                  <ListCards
                    setAllSellers={setAllSellers}
                    allSellers={allSellers}
                  />
                </ProductProvider>
              }
            />
            <Route
              path="/myArticles"
              element={
                <ProductProvider>
                  <MyShop
                    loggedIn={loggedIn}
                    setMySellers={setMySellers}
                    mySellers={mySellers}
                  />
                </ProductProvider>
              }
            />

            <Route path="/*" element={<Navigate to={"/"} />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Landing;
