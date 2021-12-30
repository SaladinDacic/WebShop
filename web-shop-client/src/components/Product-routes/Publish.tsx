import axios from "axios";
import React, { useContext, useState } from "react";

import { ProductContext } from "../../context/ProductContext";
const Publish: React.FC = () => {
  const [mainImg, setMainImg] = useState(0);
  const { ad } = useContext<{
    ad: {
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
    };
  }>(ProductContext);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:3001/api/seller/addproduct",
        ad,
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  let renderImages;
  try {
    renderImages = ad.imgSrc.map((link, i) => {
      return <img onClick={() => setMainImg(i)} key={i} src={link} />;
    });
  } catch (err) {}

  return (
    <form onSubmit={handleSubmit} className="Product__Routes--Publish Publish">
      <div className="Publish__images">
        <div className="Publish__images--main">
          {renderImages !== undefined && renderImages[mainImg]}
        </div>
        <div className="Publish__images--list">{renderImages}</div>
      </div>
      <div className="Publish__text">
        <div className="Publish__text--specs">
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
        <div className="Publish__text--desc">
          <p>{ad.desc}</p>
        </div>
        <div className="Product__MainBtn btn Publish__text--btn">
          <button type="submit">Publish</button>
        </div>
      </div>
    </form>
  );
};

export default Publish;
