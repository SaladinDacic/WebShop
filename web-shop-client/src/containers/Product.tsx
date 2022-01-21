import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Product: React.FC = () => {
  const handleDisableLink = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
  };
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/addProduct/category");
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
