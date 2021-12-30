import axios from "axios";
import React, { useEffect, useState } from "react";
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
interface CardDetailProps {
  sellerId: string;
  productId: string;
  closeWindow: () => void;
}
const CardDetails: React.FC<CardDetailProps> = ({
  sellerId,
  productId,
  closeWindow,
}) => {
  const [mainImg, setMainImg] = useState(0);
  const [ad, setAd] = useState<CardDetailInterface>();

  useEffect(() => {
    const intitialDataSet = async () => {
      try {
        let response = await axios.get(
          `http://localhost:3001/api/seller/getProduct/${sellerId}/${productId}`,
          { withCredentials: true }
        );
        setAd(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    intitialDataSet();
  }, [sellerId, productId]);

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
            {ad.sellOrDemand === "demand" ? (
              <p>
                I am looking to{" "}
                {` ${ad.sellOrRent === "sell" ? "buy" : "loan"} ${ad.brand} ${
                  ad.productName
                } ${ad.year}`}{" "}
              </p>
            ) : (
              <p>
                I am{" "}
                {` ${ad.sellOrRent === "sell" ? "selling" : "renting"} ${
                  ad.brand
                } ${ad.productName} ${ad.year}`}{" "}
              </p>
            )}
            <p>Product is: {ad.used ? "New" : "Used"}</p>
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
          <div className="Product__MainBtn btn CardDetails__text--btn">
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
