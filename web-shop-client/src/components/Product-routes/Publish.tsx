import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSellers } from "../../api/api";

import { ProductContext } from "../../context/ProductContext";
import { ProfileDetailContext } from "../../context/ProfileDetailContext";
const Publish: React.FC = () => {
  const [mainImg, setMainImg] = useState(0);
  const { ad, setAd } = useContext<{
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
    setAd: React.Dispatch<React.SetStateAction<{}>>;
  }>(ProductContext);
  const { rerender, setRerender } = useContext(ProfileDetailContext);
  let navigate = useNavigate();

  // useEffect(() => {
  //   console.log("hitt", ad.imgSrc.length);
  //   if (ad.imgSrc.length === 0) {
  //     setAd((oldObj) => {
  //       return {
  //         ...oldObj,
  //         imgSrc: [
  //           "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png",
  //         ],
  //       };
  //     });
  //   }
  // }, []);
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:3001/api/seller/addproduct",
        ad,
        { withCredentials: true }
      );
      setAd({});
      setRerender(!rerender);
      console.log(response);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setAd({});
      setRerender(!rerender);
      console.log(err);
      navigate("/");
      window.location.reload();
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
          <button
            onClick={() => {
              navigate("/addProduct/price-image-desc");
            }}
          >
            Back
          </button>
          <button type="submit">Publish</button>
        </div>
      </div>
    </form>
  );
};

export default Publish;
