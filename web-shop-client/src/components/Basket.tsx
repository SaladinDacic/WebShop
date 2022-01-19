import React, { useContext, useState } from "react";

interface BasketProps {
  toggleShowBasket: boolean;
  setToggleShowBasket: React.Dispatch<React.SetStateAction<boolean>>;
}

const Basket: React.FC<BasketProps> = ({
  toggleShowBasket,
  setToggleShowBasket,
}) => {
  return (
    <div className="Basket">
      <nav className="Basket__nav">
        <i className="Basket__nav--logo fab fa-shopware"></i>
        <h3>Shop with us</h3>
        <div className="Basket__nav--icons">
          <i
            onClick={() => {
              setToggleShowBasket(false);
            }}
            className="fas fa-times"
          ></i>
        </div>
      </nav>
      <>
        <div className="Basket__header">
          <div className="Basket__header--Basketer">
            <h3>Items in Basket:</h3>
          </div>
        </div>
        <div className="Basket__body">
          <div className="Basket__body--items">
            <div className="itemDiv">
              <div className="itemDiv__div1">
                <img
                  src="https://m.media-amazon.com/images/I/81Lk-W1Bm2L._AC_SL1500_.jpg"
                  alt=""
                />
                <h3>Hp Laptop</h3>
              </div>
              <div className="itemDiv__div2">
                <div className="itemDiv__div2--price">
                  <h3>X1 = </h3>
                  <h3>120KM</h3>
                </div>
                <div className="itemDiv__div2--buttons">
                  <button>Remove</button>
                  <button>Buy</button>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="Basket__footer">
          <div>
            <h3>Total:</h3>
            <h3>120KM</h3>
          </div>
          <button>Buy All</button>
        </div>
      </>
    </div>
  );
};

export default Basket;
