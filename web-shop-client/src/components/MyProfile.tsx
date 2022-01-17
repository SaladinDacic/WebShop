import React, { useContext, useEffect, useState } from "react";
import { ProfileDetailContext } from "../context/ProfileDetailContext";

import SellerDetailProducts from "./SellerDetailProducts";

const MyProfile: React.FC<{
  handleLogOut: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  closeAllComponents: (message?: string) => void;
}> = ({ handleLogOut, closeAllComponents }) => {
  const {
    loggedSellerInfo,
    mySellers,
    allSellers,
    profileDetail,
    setProfileDetail,
  } = useContext(ProfileDetailContext);
  const [currentSeller, setCurrentSeller] = useState<any[]>();
  const [soldAndHold, setSoldAndHold] =
    useState<{ sold: number; hold: number }>();

  /*   useEffect(() => {
    if (profileDetail.show) {
      let allSold = 0;
      let allHolds = 0;
      let filteredSellersData = mySellers?.filter((obj: any) => {
        return obj.sellerId === profileDetail.sellerId;
      });
      setCurrentSeller(filteredSellersData);

      filteredSellersData?.forEach((obj: any) => {
        allSold = allSold + obj.sold;
        allHolds = allHolds + obj.holds;
      });
      setSoldAndHold({ sold: allSold, hold: allHolds });
      console.log(filteredSellersData);
    }
  }, []); */

  const handleClick = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    console.log(loggedSellerInfo && loggedSellerInfo.sellerId);
    closeAllComponents();
    setProfileDetail(
      (oldVal: {
        show: boolean;
        sellerId: string;
      }): { show: boolean; sellerId: string } => {
        return { ...oldVal, show: false };
      }
    );
  };
  let renderStars = () => {
    if (loggedSellerInfo) {
      let value = loggedSellerInfo.rating;
      const stars = [1, 2, 3, 4, 5].map((val, i) => {
        let newVal = Math.floor(value);
        if (i < newVal) {
          return <i key={i} className="fas fa-star"></i>;
        } else if (Math.floor(value) < value) {
          value = Math.floor(value);
          return <i key={i} className="fas fa-star-half-alt"></i>;
        } else {
          return <i key={i} className="far fa-star"></i>;
        }
      });
      return stars;
    }
  };

  let arrayRotate = (arr: []) => {
    let newArr = [];
    while (arr.length !== 0) {
      newArr.push(arr.pop());
    }
    return newArr;
  };
  return (
    <div className="MyProfile">
      <div className="MyProfile__images">
        <div className="MyProfile__images--main">
          <SellerDetailProducts />
        </div>
        <div className="MyProfile__images--list"></div>
      </div>

      <div className="MyProfile__text">
        <div className="MyProfile__text--specs">
          {renderStars()}
          <br />

          <br />
          <h3>{loggedSellerInfo && loggedSellerInfo.sellerName}</h3>
          {
            <div>
              <p>
                Profil created:{" "}
                {loggedSellerInfo &&
                  arrayRotate(loggedSellerInfo.date.split("-")).join(" ")}
              </p>
              <h4>Likes:</h4>
              <p>pc, game, car, diary</p>
            </div>
          }
        </div>
        <br />
        <p>About me:</p>
        <div className="MyProfile__text--desc">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
            omnis eaque quis possimus placeat architecto eum harum expedita
            pariatur numquam? Hic rerum autem nostrum optio sed cum veritatis
            fugit beatae.
          </p>
        </div>
        <br />
        <br />
        <h2 className="h2__tag">LogOut</h2>
        <p className="p__tag">
          Hope you enjoyed using our site, see you later.
        </p>
        <div className=" MyProfile__text--btn">
          <button onClick={handleClick} type="button" className="btnn">
            Close window
          </button>
          <button onClick={handleLogOut} className="btnn">
            Press to logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
