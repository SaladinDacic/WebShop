import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { intitialDataSetDetailedCard } from "../api/api";
import { ProductContext } from "../context/ProductContext";
import { ProfileDetailContext } from "../context/ProfileDetailContext";
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
  const { detailCard, closeWindow } = useContext(ProfileDetailContext);
  const [mainImg, setMainImg] = useState(0);
  const [ad, setAd] = useState<CardDetailInterface>();

  useEffect(() => {
    intitialDataSetDetailedCard(
      setAd,
      detailCard.sellerId,
      detailCard.productId
    );
  }, [detailCard.sellerId, detailCard.productId]);

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
            <button onClick={closeWindow} type="submit">
              Close window
            </button>
            <button type="submit">Chat with us</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CardDetails;
