import React, { useContext, useEffect, useState } from "react";
import {
  addRatingToSeller,
  getRatingOfSeller,
  updateSellerData,
} from "../api/api";
import { ProfileDetailContext } from "../context/MainContext";
import SellerDetailProducts from "./SellerDetailProducts";

const SellerDetail: React.FC = () => {
  const {
    allSellers,
    sellerDetail,
    setSellerDetail,
    setHideChat,
    thisSellerIsLoggedIn,
    createClickedSellerInfo,
    clickedSellerInfo,
  } = useContext(ProfileDetailContext);
  const [currentSeller, setCurrentSeller] = useState<any[]>();
  const [soldAndHold, setSoldAndHold] =
    useState<{ sold: number; hold: number }>();
  const [itsMe, setItsMe] = useState(false);
  const [renderStarsElement, setRenderStarsElement] = useState<Element | any>();

  useEffect(() => {
    (async function callYourself() {
      let allSold = 0;
      let allHolds = 0;
      let filteredSellersData = allSellers?.filter((obj: any) => {
        return obj.sellerId === sellerDetail.sellerId;
      });
      setCurrentSeller(filteredSellersData);

      filteredSellersData?.forEach((obj: any) => {
        allSold = allSold + obj.sold;
        allHolds = allHolds + obj.holds;
      });
      setSoldAndHold({ sold: allSold, hold: allHolds });

      let meOnWait = await thisSellerIsLoggedIn(
        filteredSellersData[0].sellerId
      );
      setTimeout(async () => {
        // console.log(meOnWait);
        setItsMe(meOnWait);
        // console.log(sellerDetail.sellerId);
        createClickedSellerInfo(sellerDetail.sellerId);
      }, 0);

      if (filteredSellersData) {
        // console.log(filteredSellersData[0].sellerId);
        getRatingOfSeller(filteredSellersData[0].sellerId).then((response) => {
          let value = response.data.rating;
          const stars = [1, 2, 3, 4, 5].map((val, i) => {
            let newVal = Math.floor(value);
            if (i < newVal) {
              return (
                <i
                  onClick={(evt) => {
                    handleStarClick(evt, i, filteredSellersData, meOnWait);
                  }}
                  key={i}
                  className="fas fa-star"
                ></i>
              );
            } else if (Math.floor(value) < value) {
              value = Math.floor(value);
              return (
                <i
                  onClick={(evt) => {
                    handleStarClick(evt, i, filteredSellersData, meOnWait);
                  }}
                  key={i}
                  className="fas fa-star-half-alt"
                ></i>
              );
            } else {
              return (
                <i
                  onClick={(evt) => {
                    handleStarClick(evt, i, filteredSellersData, meOnWait);
                  }}
                  key={i}
                  className="far fa-star"
                ></i>
              );
            }
          });
          setRenderStarsElement(stars);
        });
      }
    })();
  }, []);

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    console.log(currentSeller && currentSeller[0].sellerId);
    setSellerDetail(
      (oldVal: {
        show: boolean;
        sellerId: string;
      }): { show: boolean; sellerId: string } => {
        return { ...oldVal, show: false };
      }
    );
  };
  const handleStarClick = async (
    evt: React.MouseEvent<HTMLElement>,
    i: number,
    filteredSellersData: any,
    meOnWait: boolean
  ) => {
    setTimeout(async () => {
      console.log(!meOnWait, filteredSellersData);
      if (!meOnWait && filteredSellersData) {
        console.log("stiglo");
        console.log(
          await addRatingToSeller({
            sellerId: filteredSellersData[0].sellerId,
            rating: i + 1,
          })
        );
      }
    }, 100);
  };
  const handleChat = () => {
    setHideChat(false);
  };

  let renderSells = () => {
    let sellsString = "";
    clickedSellerInfo?.sells.forEach((val: string) => {
      sellsString = sellsString.concat(` ${val},`);
    });

    // bubbleUp(sellsString.split(",")).join(",")

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
    <div className="SellerDetails">
      <div className="SellerDetails__images">
        <div className="SellerDetails__images--main">
          <SellerDetailProducts itsMe={itsMe} currentSeller={currentSeller} />
        </div>
        <div className="SellerDetails__images--list"></div>
      </div>

      <div className="SellerDetails__text">
        <div className="SellerDetails__text--specs">
          {renderStarsElement}
          <br />

          <br />
          <h3>{currentSeller && currentSeller[0].sellerName}</h3>
          <p>
            Profil created:{" "}
            {currentSeller &&
              arrayRotate(currentSeller[0].date.split("-")).join(" ")}
          </p>
          <h4>Sells:</h4>
          <p>{renderSells()}</p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <p>About me:</p>
        <div className="SellerDetails__text--desc">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
            omnis eaque quis possimus placeat architecto eum harum expedita
            pariatur numquam? Hic rerum autem nostrum optio sed cum veritatis
            fugit beatae.
          </p>
        </div>
        <div className="SellerDetails__text--btn">
          <button onClick={handleClick} type="button">
            Close window
          </button>
          {!itsMe && (
            <button onClick={handleChat} type="button">
              Chat with us
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDetail;

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
