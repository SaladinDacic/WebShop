import React, { useContext, useEffect, useState } from "react";
import { getRatingOfSeller } from "../api/api";
import { ProfileDetailContext } from "../context/MainContext";

import SellerDetailProducts from "./SellerDetailProducts";

const MyProfile: React.FC<{
  handleLogOut: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  closeAllComponents: (message?: string) => void;
}> = ({ handleLogOut, closeAllComponents }) => {
  const { loggedSellerInfo, profileDetail, setProfileDetail } =
    useContext(ProfileDetailContext);
  const [currentSeller, setCurrentSeller] = useState<any[]>();
  const [soldAndHold, setSoldAndHold] =
    useState<{ sold: number; hold: number }>();
  const [fromMyProfile, setFromMyProfile] = useState(true);
  const [renderStarsElement, setRenderStarsElement] = useState<Element | any>();

  useEffect(() => {
    if (loggedSellerInfo) {
      console.log(loggedSellerInfo);
      getRatingOfSeller(loggedSellerInfo.sellerId).then((response) => {
        let value = response.data.rating;
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
        setRenderStarsElement(stars);
      });
    }
  }, []);

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
  let renderLikes = () => {
    let likesString = "";
    loggedSellerInfo.likes.forEach((val: { name: string }) => {
      likesString = likesString.concat(` ${val.name},`);
    });

    if (likesString !== undefined) {
      let newArrOfStrin: any = [];
      likesString.split(",").forEach((word: string) => {
        if (word.length !== 0) {
          if (isAlphaNumeric(word)) newArrOfStrin.push(word);
          else newArrOfStrin.push(word.slice(1));
        }
      });
      let newStrin = bubbleUp(newArrOfStrin).join(", ");
      return newStrin;
    }

    // console.log(likesString);
    return likesString;
  };
  let renderSells = () => {
    let sellsString = "";
    loggedSellerInfo.sells.forEach((val: string) => {
      sellsString = sellsString.concat(` ${val},`);
    });

    if (sellsString !== undefined) {
      let newArrOfStrin: any = [];
      sellsString.split(",").forEach((word: string) => {
        if (word.length !== 0) {
          if (isAlphaNumeric(word)) newArrOfStrin.push(word);
          else newArrOfStrin.push(word.slice(1));
        }
      });
      let newStrin = bubbleUp(newArrOfStrin).join(", ");
      return newStrin;
    }

    return sellsString;
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
          <SellerDetailProducts fromMyProfile={fromMyProfile} />
        </div>
        <div className="MyProfile__images--list"></div>
      </div>

      <div className="MyProfile__text">
        <div className="MyProfile__text--specs">
          {renderStarsElement}
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
              {renderLikes()}
              <h4>Sells:</h4>
              {renderSells()}
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

function bubbleUp(arr: string[]) {
  let noSwaps;
  for (let i = arr.length - 1; i >= 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i; j++) {
      if (arr[j][0] > arr[j + 1][0]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) {
      break;
    }
  }
  return arr;
}

function isAlphaNumeric(char: string) {
  var code = char.charCodeAt(0);
  if (
    !(code > 47 && code < 58) && // ako kod nije numeric (0-9)
    !(code > 64 && code < 91) && // ako kod nije upper alpha (A-Z)
    !(code > 96 && code < 123) // ako kod nije lower alpha (a-z)
  ) {
    return false; // reci da nije alpha-numeric
  }
  return true; // u suprotnom reci da jeste
}
