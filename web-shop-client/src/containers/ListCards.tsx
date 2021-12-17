import React, { useState } from "react";
import Card from "../components/Card";

const ListCards: React.FC = () => {
  const [list, setList] = useState([
    {
      brand: "Adidas",
      shopName: "Bingo",
      price: 5,
      desc: "Great shoes for enjoyable walk",
      productName: "shoes",
    },
    {
      brand: "Adidas",
      shopName: "Bingo",
      price: 5,
      desc: "Great shoes for enjoyable walk",
      productName: "shoes",
    },
    {
      brand: "Adidas",
      shopName: "Bingo",
      price: 5,
      desc: "Great shoes for enjoyable walk",
      productName: "shoes",
    },
    {
      brand: "Adidas",
      shopName: "Bingo",
      price: 5,
      desc: "Great shoes for enjoyable walk",
      productName: "shoes",
    },
    {
      brand: "Adidas",
      shopName: "Bingo",
      price: 5,
      desc: "Great shoes for enjoyable walk",
      productName: "shoes",
    },
    {
      brand: "Adidas",
      shopName: "Bingo",
      price: 5,
      desc: "Great shoes for enjoyable walk",
      productName: "shoes",
    },
  ]);

  const renderList = list.map((obj, i) => {
    return (
      <Card
        key={i}
        ShopName={obj.shopName}
        productName={obj.productName}
        brand={obj.brand}
        description={obj.desc}
        price={obj.price}
      />
    );
  });
  return <div className="ListCards">{renderList}</div>;
};

export default ListCards;
