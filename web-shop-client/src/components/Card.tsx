import React from "react";
interface CardProp {
  brand: string;
  description: string;
  price: number;
  ShopName: string;
  productName: string;
}
const Card: React.FC<CardProp> = ({
  brand,
  description,
  price,
  ShopName,
  productName,
}: CardProp) => {
  return (
    <div className="Card">
      <img
        className="Card__img"
        src="https://e7.pngegg.com/pngimages/501/152/png-clipart-sneakers-adidas-originals-shoe-adidas-superstar-adidas-original-shoes-brown-fashion.png"
        alt="shoes"
      />
      <div className="Card__heading">
        <h3 className="Card__heading--primary h3__tag">Brand: {brand}</h3>
        <h4 className="Card__heading--secondary h4__tag">{productName}</h4>
        <p className="p__tag">{description}</p>
        <p className="p__tag">{price} $</p>
        <h4 className="Card__heading--secondary h4__tag">{ShopName}</h4>
      </div>
    </div>
  );
};

export default Card;
