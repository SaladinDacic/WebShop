import React from "react";
interface CardProp {
  brand: string;
  description: string;
  price: number;
  ShopName: string;
  productName: string;
  category: string;
  imgSrc: string;
}
const Card: React.FC<CardProp> = ({
  brand,
  description,
  price,
  ShopName,
  productName,
  category,
  imgSrc,
}: CardProp) => {
  return (
    <div className="Card">
      <img className="Card__img" src={imgSrc[0]} alt={category} />
      <div className="Card__heading">
        <h4 className="Card__heading--secondary p__tag">{productName}</h4>
        <p className="p__tag">{brand}</p>
        <p className="p__tag">{price} $</p>
        <h4 className="Card__heading--secondary h4__tag">{ShopName}</h4>
      </div>
    </div>
  );
};

export default Card;
