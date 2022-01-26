import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { intitialDataSetDetailedCard } from "../api/api";
import { ProductContext } from "../context/ProductContext";
import { ProfileDetailContext } from "../context/MainContext";
interface CardDetailInterface {
  sellOrRent: string;
  sellOrDemand: string;
  productName: string;
  category: string;
  year: number;
  locationName: string;
  price: number;
  holds: number;
  sold: number;
  brand: string;
  make: string;
  model: string;
  imgSrc: string[];
  used: boolean;
  desc: string;
}

const CardDetails: React.FC = () => {
  const {
    detailCard,
    closeWindow,
    thisSellerIsLoggedIn,
    setHideChat,
    loggedSellerInfo,
    setCustomerBasketToBuy,
  } = useContext(ProfileDetailContext);
  const [mainImg, setMainImg] = useState(0);
  const [ad, setAd] = useState<CardDetailInterface>();
  const [itsMe, setItsMe] = useState(false);
  useEffect(() => {
    //hvata podatke iz baze i koristi sedAd dispatcher da set-a ad u ovoj i editProduct komponenti
    intitialDataSetDetailedCard(
      setAd,
      detailCard.sellerId,
      detailCard.productId
    );
    setTimeout(async () => {
      // console.log(await thisSellerIsLoggedIn(filteredSellersData[0].sellerId));
      setItsMe(await thisSellerIsLoggedIn(detailCard.sellerId));
      // console.log("došlo");
    }, 0);
  }, [detailCard.sellerId, detailCard.productId]);

  const handleChat = () => {
    setHideChat(false);
  };

  const handleAddToCart = () => {
    // loggedSellerInfo as { sellerName: string; sellerId: string };
    if (ad) {
      setCustomerBasketToBuy(
        (
          oldArr: {
            sellerId: string;
            productId: string;
            pieces: number;
            price: number;
            productName: string;
            imgSrc: string;
          }[]
        ) => {
          return [
            ...oldArr,
            {
              sellerId: detailCard.sellerId,
              productId: detailCard.productId,
              pieces: ad.holds,
              price: ad.price,
              productName: ad.productName,
              imgSrc: ad.imgSrc[0],
            },
          ];
        }
      );
    }
  };
  let renderImages;
  try {
    renderImages = ad?.imgSrc.map((link, i) => {
      return <img onClick={() => setMainImg(i)} key={i} src={link} />;
    });
  } catch (err) {}

  return (
    <div className="CardDetails">
      <div className="CardDetails__images">
        <div className="CardDetails__images--main">
          {renderImages !== undefined && renderImages[mainImg]}
        </div>
        <div className="CardDetails__images--list">{renderImages}</div>
      </div>
      {ad ? (
        <div className="CardDetails__text">
          <div className="CardDetails__text--specs">
            <h3>{detailCard.sellerName}</h3>
            {ad.sellOrDemand === "demand" ? (
              <p>
                I am looking to{" "}
                {` ${ad.sellOrRent === "sell" ? "buy" : "loan"} ${ad.brand} ${
                  ad.productName
                }`}{" "}
              </p>
            ) : (
              <p>
                I am{" "}
                {` ${ad.sellOrRent === "sell" ? "selling" : "renting"} ${
                  ad.brand
                } ${ad.productName}`}{" "}
              </p>
            )}
            <p>Product is: {ad.used ? "New" : "Used"}</p>
            <p>Year: {ad.year} KM</p>
            <p>For: {ad.price} KM</p>
            <p>From: {ad.locationName}</p>
            <p>Category: {ad.category}</p>
            <p>In stock: {ad.holds}</p>
            <p>I have sold: {ad.sold}</p>
            <p>Brand: {ad.brand}</p>
            <p>Make: {ad.make}</p>
            <p>Model: {ad.model}</p>
          </div>
          <p>DETAILED</p>
          <div className="CardDetails__text--desc">
            <p>{ad.desc}</p>
          </div>
          <div className="CardDetails__text--btn">
            {!itsMe && (
              <>
                <button onClick={handleChat} type="button">
                  Chat with us
                </button>
                <button onClick={handleAddToCart} type="button">
                  Add to Cart
                </button>
              </>
            )}
            <button onClick={closeWindow} type="submit">
              Close window
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CardDetails;
