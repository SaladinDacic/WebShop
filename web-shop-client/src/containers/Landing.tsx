import React, { useEffect, useState } from "react";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import Footer from "./Footer";
import ListCards from "./ListCards";
import Navbar from "./Navbar";
import { getCategories, getLoggedUserName, getSellers } from "../api/api";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Product from "./Product";
import Category from "../components/Product-routes/Category";
import BasicInformation from "../components/Product-routes/BasicInformation";
import PriceImageDesc from "../components/Product-routes/PriceImageDesc";
import Publish from "../components/Product-routes/Publish";
import { ProductProvider } from "../context/ProductContext";
import MyShop from "../components/MyShop";

import { ProfileDetailProvider } from "../context/MainContext";
import Suggested from "./Suggested";
import Popular from "./Popular";
const Landing: React.FC = () => {
  const [allSellers, setAllSellers] = useState<{}[] | undefined>(undefined);
  const [mySellers, setMySellers] = useState<any[] | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [sellerId, setSellerId] = useState("");
  const [rerender, setRerender] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    (async function () {
      await getCategories().then((res) => {
        setCategories(
          res.data.map((obj: any) => {
            let typedObj = obj as { productCategories: string };
            return typedObj.productCategories;
          })
        );
      });
    })();
  }, []);
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
      // console.log(response2.data);
      setSellerId(response2.data.sellerId);
      if (response2.data.data === false) setLoggedIn(false);
      else setLoggedIn(true);
    };
    getAllApis();
  }, [rerender, loggedIn]);
  return (
    <ProfileDetailProvider
      sellerId={sellerId}
      allSellers={allSellers}
      setAllSellers={setAllSellers}
      mySellers={mySellers}
      setMySellers={setMySellers}
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
      rerender={rerender}
      setRerender={setRerender}
      categories={categories}
      setCategories={setCategories}
    >
      <div className="Landing">
        <BrowserRouter>
          <Navbar
            mySellers={mySellers}
            setMySellers={setMySellers}
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
              <Route
                path="/suggested"
                element={
                  <ProductProvider>
                    <Suggested
                      setAllSellers={setAllSellers}
                      allSellers={allSellers}
                    />
                  </ProductProvider>
                }
              />
              <Route
                path="/popular"
                element={
                  <ProductProvider>
                    <Popular
                      setAllSellers={setAllSellers}
                      allSellers={allSellers}
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
    </ProfileDetailProvider>
  );
};

export default Landing;
