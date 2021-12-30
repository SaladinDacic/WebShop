import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Product: React.FC = () => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/addProduct/category");
  }, []);
  return (
    <div className="Product">
      <div className="Product__tabs">
        <NavLink
          to={"/addProduct/category"}
          className={"Product__tabs--category"}
        >
          Kategorija
        </NavLink>
        <NavLink
          to={"/addProduct/basic-information"}
          className="Product__tabs--category"
        >
          Osnovni podaci
        </NavLink>
        <NavLink
          to={"/addProduct/price-image-desc"}
          className="Product__tabs--category"
        >
          Cijena, slike i opis
        </NavLink>
        <a
          // to={"/addProduct/publish"}
          className="Product__tabs--category"
        >
          Objavi
        </a>
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
