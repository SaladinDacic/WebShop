// import emailjs from "emailjs-com";
// import { init as emailInit, send as emailSend } from "@emailjs/browser";
import React, { useContext, useEffect, useState } from "react";
import {
  getCustomerBasketById,
  getProduct,
  getSellerBasketById,
  updateProductShipping,
  unAcceptProductSell,
  acceptProductSell,
  addProductToBasket,
} from "../api/api";
import { ProfileDetailContext } from "../context/MainContext";

interface BasketProps {
  toggleShowBasket: boolean;
  setToggleShowBasket: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProductInterface extends FillProduct {
  _id: string;
  brand: string;
  category: string;
  date: string;
  desc: string;
  imgSrc: string[];
  locationName: string;
  make: string;
  model: string;
  price: number;
  productName: string;
  used: boolean;
  year: number;
  productId?: string;
  moddedDate?: string;
}

interface FillProduct {
  accepted: boolean;
  purchasedDate: string;
  pieces: number;
  shipping: string;
  purchaseId: string;
}

const Basket: React.FC<BasketProps> = ({
  toggleShowBasket,
  setToggleShowBasket,
}) => {
  const {
    loggedSellerInfo,
    createProductDetailArr,
    productDetailArr,

    customerBasketToBuy,
    setCustomerBasketToBuy,
    userID,
    serviceID,
    templateID,
  } = useContext(ProfileDetailContext);

  const [renderPurchasedItems, setRenderPurchasedItems] =
    useState<JSX.Element[]>();
  const [buySell, setBuySell] = useState<"buy" | "sell">("buy");

  const [customerBasketHome, setCustomerBasketHome] = useState<
    {
      sellerId: string;
      customerId: string;
      productId: string;
      shipping: string;
      accepted: boolean;
      pieces: number;
      date: string;
    }[]
  >();
  const [sellerBasketHomeExpended, setSellerBasketHomeExpended] =
    useState<ProductInterface[]>();

  const [boughtDetailArrExpended, setBoughtDetailArrExpended] =
    useState<{}[]>();
  const [soldDetailArrExpended, setSoldDetailArrExpended] = useState<{}[]>();

  const [rerender, setRerender] = useState(false);
  const [rerender2, setRerender2] = useState(false);

  //Rerender effect
  useEffect(() => {
    setTimeout(() => {
      setRerender(!rerender);
    }, 100);
  }, []);

  //Provide data from database for boy and sell busket
  useEffect(() => {
    (async function provideDataForBasketCustomer() {
      if (loggedSellerInfo !== undefined) {
        let response1 = await getCustomerBasketById(loggedSellerInfo.sellerId);
        // let response2 = await getSellerBasketById(loggedSellerInfo.sellerId);
        if (response1.data !== "no item avaliable") {
          let arr: string[] = [];
          response1.data.forEach((obj: any) => {
            arr.push(obj.productId);
          });
          createProductDetailArr(response1.data[0].sellerId, arr);
          setCustomerBasketHome(response1.data);
          // setCustomerBasket(response1.data);
        }
        // console.log(response1.data);
      }
    })();
    (async function provideDataForBasketSeller() {
      if (loggedSellerInfo !== undefined) {
        let response1 = await getSellerBasketById(loggedSellerInfo.sellerId);
        // let response2 = await getSellerBasketById(loggedSellerInfo.sellerId);
        if (response1.data !== "no item avaliable") {
          let arr: string[] = [];
          response1.data.forEach((obj: any) => {
            arr.push(obj.productId);
          });
          createProductDetailArr(response1.data[0].sellerId, arr);
          // setSellerBasket(response1.data);
        }
        let productDataDetails: ProductInterface[] = [];
        response1.data.forEach(async (obj: any) => {
          let response2 = await getProduct(
            loggedSellerInfo.sellerId,
            obj.productId
          );
          // console.log({ ...response2.data, ...obj });
          productDataDetails.push({ ...response2.data, ...obj });
        });

        // console.log(productDataDetails);
        setSellerBasketHomeExpended(productDataDetails);

        // console.log(response1.data);
      }
    })();
  }, [rerender]);

  //Transform data to be able to use it in render
  useEffect(() => {
    (function renderPurchasedItems() {
      if (
        productDetailArr !== undefined &&
        customerBasketHome !== undefined &&
        buySell !== "sell"
      ) {
        let productDetailArrExpended: {}[] = [];
        productDetailArr.forEach((obj: ProductInterface) => {
          let objforFillProduct = customerBasketHome.find((object: any) => {
            // console.log({ productDetailArr: obj, customerBasketHome: object });
            return object.productId === obj._id;
          });
          if (objforFillProduct !== undefined) {
            productDetailArrExpended.push({
              ...obj,
              accepted: objforFillProduct.accepted,
              purchasedDate: objforFillProduct.date,
              pieces: objforFillProduct.pieces,
              shipping: objforFillProduct.shipping,
              purchaseId: objforFillProduct.productId,
            });
          }
        });
        setBoughtDetailArrExpended(productDetailArrExpended);
        console.log(productDetailArrExpended);
        console.log("bought items filled");
      }
      if (
        productDetailArr !== undefined &&
        sellerBasketHomeExpended !== undefined &&
        buySell !== "buy"
      ) {
        let productDetailArrExpended: {}[] = [];
        productDetailArr.forEach((obj: ProductInterface) => {
          let objforFillProduct = sellerBasketHomeExpended.find(
            (object: any) => {
              // console.log(object.productId, obj._id);
              return object.productId === obj._id;
            }
          );
          if (objforFillProduct !== undefined) {
            productDetailArrExpended.push({
              ...obj,
              accepted: objforFillProduct.accepted,
              purchasedDate: objforFillProduct.date,
              pieces: objforFillProduct.pieces,
              shipping: objforFillProduct.shipping,
              purchaseId: objforFillProduct._id,
            });
          }
        });
        setSoldDetailArrExpended(productDetailArrExpended);
        console.log("sold items filled");
      }
    })();
  }, [rerender, buySell, rerender2]);

  //Accept selling to one user
  const handleAcceptance = (
    evt: React.MouseEvent<HTMLButtonElement>,
    productId: string | undefined,
    idx: number
  ) => {
    evt.preventDefault();

    if (productId) {
      acceptProductSell(loggedSellerInfo.sellerId, productId);

      setSellerBasketHomeExpended((oldObjArr) => {
        if (oldObjArr !== undefined) {
          let newArrObj = oldObjArr.map((obj: any, i: number) => {
            let typedObj = obj as ProductInterface;
            if (idx === i) {
              typedObj.accepted = true;
            }
            return typedObj;
          });
          return newArrObj;
        }
      });
      setSoldDetailArrExpended((oldObjArr) => {
        if (oldObjArr !== undefined) {
          let newArrObj = oldObjArr.map((obj: any, i: number) => {
            let typedObj = obj as ProductInterface;
            if (idx === i) {
              typedObj.accepted = true;
            }
            return typedObj;
          });
          return newArrObj;
        }
      });

      // setRerender2(!rerender2);
    }
  };
  //Update shipping in 4 variations home, sent, traveling, arrived
  const updateShipping = (
    evt: React.MouseEvent<HTMLHeadingElement>,
    productId: string,
    shipping: "home" | "sent" | "traveling" | "arrived",
    idx: number
  ) => {
    // console.log(productId);
    updateProductShipping(loggedSellerInfo.sellerId, productId, shipping);
    setRerender2(rerender2);
    setSoldDetailArrExpended((oldObjArr) => {
      if (oldObjArr !== undefined) {
        let newArrObj = oldObjArr.map((obj: any, i: number) => {
          let typedObj = obj as ProductInterface;
          if (idx === i) {
            typedObj.shipping = shipping;
          }
          return typedObj;
        });
        return newArrObj;
      }
    });
  };

  const handleBuyItem = async (
    evt: React.MouseEvent<HTMLButtonElement>,
    obj: {}
  ) => {
    evt.preventDefault();
    let typedObj = obj as {
      sellerId: string;
      productId: string;
      pieces: number;
      price: number;
      productName: string;
      imgSrc: string;
    };

    // console.log(userID, serviceID, templateID);
    let userId = JSON.stringify(userID);
    let serviceId = JSON.stringify(serviceID);
    let templateId = JSON.stringify(templateID);
    if (userID && serviceID && templateID) {
      let templateParams = {
        seller_name: typedObj.sellerId,
        customer_name: "customerName",
        item_name: "itemName",
        phone_number: "phone",
        my_email: "customer_email",
        email_to_send: "saladindacic@gmail.com",
      };
      // await emailInit(userId);
      // await emailSend(
      //   serviceId,
      //   templateId,
      //   templateParams
      //   // "user_ba8JZ0m5YOZkVPLpkjFHo"
      // );
    }

    // addProductToBasket(typedObj.sellerId, typedObj.productId, typedObj.pieces);
    // setCustomerBasketToBuy((oldArrOfObj: {}[]) => {
    //   return oldArrOfObj.filter((obj: any) => {
    //     return obj.productId !== typedObj.productId;
    //   });
    // });

    // setBoughtDetailArrExpended((oldArrOfObj) => {
    //   var newDateArr = [];
    //   newDateArr.push(new Date().toLocaleDateString().split("/")[2]);
    //   newDateArr.push(new Date().toLocaleDateString().split("/")[0]);
    //   newDateArr.push(new Date().toLocaleDateString().split("/")[1]);
    //   if (oldArrOfObj !== undefined)
    //     return [
    //       ...oldArrOfObj,
    //       {
    //         imgSrc: [typedObj.imgSrc],
    //         accepted: false,
    //         price: typedObj.price,
    //         pieces: typedObj.pieces,
    //         productName: typedObj.productName,
    //         moddedDate: newDateArr.join("-"),
    //         productId: typedObj.productId,
    //         _id: typedObj.productId,
    //       },
    //     ];
    // });
  };

  const renderCustomerBasketToBuy = customerBasketToBuy.map(
    (obj: any, i: string) => {
      let typedObj = obj as {
        sellerId: string;
        productId: string;
        pieces: number;
        price: number;
        productName: string;
        imgSrc: string;
      };
      return (
        <form key={i}>
          <div key={i} className="itemDiv">
            <div className="itemDiv__div1">
              <img src={`${typedObj.imgSrc}`} alt="" />
              <h3>{typedObj.productName}</h3>
            </div>
            <div className="itemDiv__div2">
              <div className="itemDiv__div2--price">
                <h3>{`X ${typedObj.pieces}`}</h3>
                <h3>{typedObj.price * typedObj.pieces}KM</h3>
              </div>
              <div className="itemDiv__div2--buttons">
                <button>Remove</button>
                <button
                  onClick={(evt) => {
                    handleBuyItem(evt, typedObj);
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
          <hr />
        </form>
      );
    }
  );
  const renderSellerBasketToSell = sellerBasketHomeExpended?.map(
    (obj: any, i: any) => {
      // console.log(sellerBasketHomeExpended);
      let typedObj = obj as ProductInterface;
      if (!typedObj.accepted) {
        return (
          <div key={i}>
            <div key={i} className="itemDiv">
              <div className="itemDiv__div1">
                <img src={`${typedObj.imgSrc[0]}`} alt="" />
                <h3>{typedObj.productName}</h3>
              </div>
              <div className="itemDiv__div2">
                <div className="itemDiv__div2--price">
                  <h3>{`X ${typedObj.pieces}`}</h3>
                  <h3>{typedObj.price * typedObj.pieces}KM</h3>
                </div>
                <div className="itemDiv__div2--buttons">
                  <button
                    onClick={(evt) =>
                      handleAcceptance(evt, typedObj.productId, i)
                    }
                    id="accept"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
            <hr />
          </div>
        );
      }
    }
  );

  const renderBoughtItemsFromBackend = boughtDetailArrExpended?.map(
    (obj: any, i: number) => {
      let typedObj = obj as ProductInterface;

      return (
        <div key={i} className="itemDiv">
          <div className="itemDiv__div1">
            <img src={`${typedObj.imgSrc[0]}`} alt="" />
            <div>
              <h3>{typedObj.productName}</h3>
              {typedObj.moddedDate !== undefined ? (
                <h4>{`Purcashed: ${typedObj.moddedDate}`}</h4>
              ) : (
                <h4>{`Purcashed: ${typedObj.purchasedDate
                  .split("T")[0]
                  .toString()}`}</h4>
              )}
            </div>
          </div>
          <div className="itemDiv__div2">
            <div className="itemDiv__div2--price">
              <h3>{`X ${typedObj.pieces}`}</h3>
              <h3>{`${typedObj.price}KM`}</h3>
            </div>
            <div className="itemDiv__div2--shipping">
              {typedObj.accepted ? (
                <h3>Shipping: {typedObj.shipping}</h3>
              ) : (
                <h3>Accepted: Not</h3>
              )}
            </div>
          </div>
        </div>
      );
    }
  );

  const renderSoldItemsFromBackend = soldDetailArrExpended?.map(
    (obj: any, i: number) => {
      let typedObj = obj as ProductInterface;
      if (typedObj.accepted) {
        return (
          <div id="sold-box" key={i} className="itemDiv">
            <div className="itemDiv__div1">
              <img src={`${typedObj.imgSrc[0]}`} alt="" />
              <div>
                <h3>{typedObj.productName}</h3>
                <h4>{`Purcashed: ${typedObj.purchasedDate
                  .split("T")[0]
                  .toString()}`}</h4>
              </div>
            </div>
            <div className="itemDiv__div2">
              <div id="sold-price" className="itemDiv__div2--price">
                <h3>{`X ${typedObj.pieces}`}</h3>
                <h3>{`${typedObj.price}KM`}</h3>
              </div>
              <div id="sold" className="itemDiv__div2--shipping">
                <div className="sold-div">
                  <h4>Shipping:</h4>
                  <div className="sold-div-2">
                    <h4
                      onClick={(evt) =>
                        updateShipping(evt, typedObj._id, "home", i)
                      }
                      className={`${
                        typedObj.shipping === "home" && typedObj.shipping
                      }`}
                    >
                      Home
                    </h4>
                    <h4
                      onClick={(evt) =>
                        updateShipping(evt, typedObj._id, "sent", i)
                      }
                      className={`${
                        typedObj.shipping === "sent" && typedObj.shipping
                      }`}
                    >
                      Sent
                    </h4>
                    <h4
                      onClick={(evt) =>
                        updateShipping(evt, typedObj._id, "traveling", i)
                      }
                      className={`${
                        typedObj.shipping === "traveling" && typedObj.shipping
                      }`}
                    >
                      Traveling
                    </h4>
                    <h4
                      onClick={(evt) =>
                        updateShipping(evt, typedObj._id, "arrived", i)
                      }
                      className={`${
                        typedObj.shipping === "arrived" && typedObj.shipping
                      }`}
                    >
                      Arrived
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  );

  return (
    <div className="Basket">
      <nav className="Basket__nav">
        <i className="Basket__nav--logo fab fa-shopware"></i>
        <h3>Shop with us</h3>
        <div className="Basket__nav--icons">
          <i
            onClick={() => {
              setToggleShowBasket(false);
            }}
            className="fas fa-times"
          ></i>
        </div>
      </nav>
      <>
        <div className="Basket__header">
          <div className="Basket__header--div">
            <h3
              onClick={() => {
                setBuySell("buy");
                setRerender(!rerender);
                setRerender2(!rerender2);
              }}
            >
              Items to Buy
            </h3>
            <h3
              onClick={() => {
                setBuySell("sell");
                setRerender2(!rerender2);
              }}
            >
              Items to Sell
            </h3>
          </div>
        </div>
        <div className="Basket__body">
          <div className="Basket__body--readyToBuy">
            <div className="Basket__body--readyToBuy-items">
              {buySell === "buy"
                ? renderCustomerBasketToBuy
                : renderSellerBasketToSell}
            </div>
          </div>
          <div className="Basket__body--purchased">
            <div className="Basket__body--purchased-items">
              {buySell == "buy"
                ? renderBoughtItemsFromBackend
                : renderSoldItemsFromBackend}
              <hr />
            </div>
          </div>
        </div>
        <div className="Basket__footer">
          {/* <div>
            <h3>Total:</h3>
            <h3>120KM</h3>
          </div>
          <button>Buy All</button> */}
        </div>
      </>
    </div>
  );
};

export default Basket;
