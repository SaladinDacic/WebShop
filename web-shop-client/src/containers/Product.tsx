import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { deleteImages } from "../api/api";
import { ProductContext } from "../context/ProductContext";

const Product: React.FC = () => {
  const handleDisableLink = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
  };
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
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/addProduct/category");

    /*   return () => {
      if (ad.imgSrc !== undefined && ad.imgSrc.length !== 0) {
        deleteImages(ad.imgSrc);
      }
    }; */
  }, []);

  return (
    <div className="Product">
      <div className="Product__tabs">
        <NavLink
          onClick={handleDisableLink}
          to={"/addProduct/category"}
          className={"Product__tabs--category"}
        >
          Category
        </NavLink>
        <NavLink
          onClick={handleDisableLink}
          to={"/addProduct/basic-information"}
          className="Product__tabs--category"
        >
          Basic info
        </NavLink>
        <NavLink
          onClick={handleDisableLink}
          to={"/addProduct/price-image-desc"}
          className="Product__tabs--category"
        >
          Price, Image & Desc
        </NavLink>
        <NavLink
          onClick={handleDisableLink}
          to={"/addProduct/publish"}
          className="Product__tabs--category"
        >
          Publish
        </NavLink>
      </div>
      <div className="Product__Routes">
        <Outlet />
      </div>
    </div>
  );
};

export default Product;

/* {sellerId, productName, category, sellOrDemand, job, service, year, locationName, make, model, 
kilometers, used, sellOrRent, holds, sold, price, brand, imgSrc, desc} */
/* {  
  // productId:String,
  productName:String,
  category:{
    type: String,
    enum: [
      "fruit", "vegetable", "dairy", "meat", 
      "vehicle", "console", "game", "house", 
      "apartment", "smartphone", "pc",
      "work", "productivity", "pool", "tools",
      "forHouse"
    ]
  },
  price: Number,
  desc: String,
  imgSrc:[String],
  brand: String,
  make:String,
  model: String,
  year:Number,
  location:String,
  kilometers:Number,
  useed:{type: Boolean, default: false},
  sellOrRent:{
    type: String,
    enum:["sell", "rent"]
  },
  holds:{
  type: Number,
  default: 0
  },
  sold:{
    type: Number,
    default: 0
  } */
