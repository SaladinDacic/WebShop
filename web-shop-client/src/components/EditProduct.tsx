import React, { useContext, useEffect, useRef, useState } from "react";
import {
  deleteProduct,
  getSellers,
  intitialDataSetDetailedCard,
  updateProduct,
} from "../api/api";
import { ProfileDetailContext } from "../context/ProfileDetailContext";
interface EditProductInterface {
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
}
const EditProduct: React.FC = () => {
  const {
    editProduct,
    closeWindow,
    mySellers,
    setMySellers,
    allSellers,
    setAllSellers,
    setEditProduct,
    rerender,
    setRerender,
  } = useContext(ProfileDetailContext);
  const [ad, setAd] = useState<EditProductInterface>();
  const [mainImg, setMainImg] = useState(0);
  const [imageArr, setImageArr] = useState<string[]>([]);
  const [showAddImage, setShowAddImage] = useState(false);
  const [imgLinkInput, setImgLinkInput] = useState<string>("");
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  useEffect(() => {
    intitialDataSetDetailedCard(
      setAd,
      editProduct.sellerId,
      editProduct.productId
    );
  }, [editProduct.sellerId, editProduct.productId]);
  useEffect(() => {
    if (ad !== undefined) {
      setImageArr(ad.imgSrc);
    }
  }, [ad]);

  const citiesRef = useRef<string[]>([
    "Sarajevo",
    "Čajniče",
    "Čapljina",
    "Čelinac",
    "Čelić",
    "Čitluk",
    "Banja Luka",
    "Banovići",
    "Berkovići",
    "Bihać",
    "Bijeljina",
    "Bileća",
    "Bosanska Krupa",
    "Bosanski Petrovac",
    "Bosansko Grahovo",
    "Bratunac",
    "Breza",
    "Brod",
    "Brčko",
    "Bugojno",
    "Busovača",
    "Bužim",
    "Cazin",
    "Derventa",
    "Doboj",
    "Dobratići",
    "Domaljevac",
    "Donji Dubovik",
    "Donji Vakuf",
    "Donji Žabar",
    "Drinić",
    "Drvar",
    "Fojnica",
    "Foča",
    "Gacko",
    "Glamoč",
    "Goražde",
    "Gornji Ribnik",
    "Gornji Vakuf",
    "Gradačac",
    "Gradiška",
    "Gračanica",
    "Grude",
    "Hadžići",
    "Han Pijesak",
    "Hreša",
    "Ilidža",
    "Ilijaš",
    "Jablanica",
    "Jajce",
    "Jezero",
    "Kakanj",
    "Kalesija",
    "Kalinovik",
    "Kiseljak",
    "Kladanj",
    "Ključ",
    "Klokotnica",
    "Kneževo",
    "Konjic",
    "Kopači",
    "Kostajnica",
    "Kotor Varoš",
    "Kozarska Dubica",
    "Kreševo",
    "Kupres",
    "Laktaši",
    "Livno",
    "Ljubinje",
    "Ljubuški",
    "Lopare",
    "Lukavac",
    "Lukavica",
    "Maglaj",
    "Matuzići",
    "Milići",
    "Modriča",
    "Mostar",
    "Mrkonjić Grad",
    "Neum",
    "Nevesinje",
    "Novi Grad",
    "Novi Travnik",
    "Novo Selo",
    "Odžak",
    "Olovo",
    "Omanjska",
    "Orašje",
    "Osmaci",
    "Oštra Luka",
    "Pale",
    "Pelagićevo",
    "Petrovo",
    "Posušje",
    "Potoci",
    "Prača",
    "Prijedor",
    "Prnjavor",
    "Prozor",
    "Ravno",
    "Rogatica",
    "Rudo",
    "Sanski Most",
    "Sapna",
    "Sarajevo",
    "Sokolac",
    "Srbac",
    "Srebrenica",
    "Srebrenik",
    "Stanari",
    "Stolac",
    "Šamac",
    "Šekovići",
    "Šipovo",
    "Široki Brijeg",
    "Teočak",
    "Teslić",
    "Tešanj",
    "Tomislavgrad",
    "Travnik",
    "Trebinje",
    "Trnovo",
    "Tuzla",
    "Ugljevik",
    "Vareš",
    "Velika Kladuša",
    "Visoko",
    "Vitez",
    "Višegrad",
    "Vlasenica",
    "Vogošća",
    "Vukosavlje",
    "Zavidovići",
    "Zenica",
    "Zvornik",
    "Žepče",
    "Živinice",
  ]);
  const citiesEnums = citiesRef.current.map((oneOption, i) => {
    return (
      <option key={i} value={oneOption}>
        {oneOption}
      </option>
    );
  });

  const categoryRef = useRef<string[]>([
    "",
    "fruit",
    "vegetable",
    "dairy",
    "meat",
    "vehicle",
    "console",
    "game",
    "house",
    "apartment",
    "smartphone",
    "pc",
    "work",
    "category",
    "pool",
    "tools",
    "forHouse",
  ]);
  const categoryEnums = categoryRef.current.map((oneOption, i) => {
    return (
      <option key={i} value={oneOption}>
        {oneOption}
      </option>
    );
  });

  const handleUpdate = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    let sellOrRent = formRef.current.sellOrRent.value;
    let sellOrDemand = formRef.current.sellOrDemand.value;
    let used: boolean = false;
    if (formRef.current.adUsed.value === "used") {
      used = true;
    }
    let year = parseInt(formRef.current.year.value);
    let locationName = formRef.current.locationName.value;
    let category = formRef.current.category.value;
    let holds = parseInt(formRef.current.holds.value);
    let price = parseInt(formRef.current.price.value);
    let brand = formRef.current.brand.value;
    let make = formRef.current.make.value;
    let model = formRef.current.model.value;
    let desc = formRef.current.desc.value;

    let updateObj = {
      sellOrRent,
      sellOrDemand,
      used,
      year,
      locationName,
      category,
      holds,
      brand,
      price,
      make,
      model,
      desc,
      productId: editProduct.productId,
      sellerId: editProduct.sellerId,
      imgSrc: imageArr,
    };
    console.log(updateObj);
    try {
      updateProduct(updateObj);
      setRerender(!rerender);
      setEditProduct({ ...editProduct, show: false });
    } catch (err) {
      console.log(rerender);
      console.log("can't update product");
    }
  };

  const handleAddImage = () => {
    if (imgLinkInput !== "") {
      let newArr = [...imageArr, imgLinkInput];
      setImageArr(newArr);
    }
  };

  const handleDeleteImg = (
    evt: React.MouseEvent<HTMLElement> & { target: { accessKey: string } }
  ) => {
    let newArr = imageArr
      .slice(0, parseInt(evt.target.accessKey))
      .concat(imageArr.slice(parseInt(evt.target.accessKey) + 1));
    if (newArr.length === 0) {
      newArr = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png",
      ];
    }
    setImageArr(newArr);
  };

  const handleDeletion = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const obj = {
      sellerId: editProduct.sellerId,
      productId: editProduct.productId,
    };
    // let newAllSellers = allSellers.filter((object: { productId: string }) => {
    //   return object.productId !== obj.productId;
    // });
    // let newMySellers = mySellers.filter((object: { productId: string }) => {
    //   return object.productId !== obj.productId;
    // });
    // console.log(obj, newAllSellers, newMySellers);
    try {
      deleteProduct(obj);
      setRerender(!rerender);
      // setAllSellers(newAllSellers);
      // setMySellers(newMySellers);
      setEditProduct({ ...editProduct, show: false });
    } catch (err) {
      console.log("can't delete product");
    }
  };

  const renderImages = () => {
    let renderImages;
    renderImages = imageArr.map((link, i) => {
      return (
        <div key={i}>
          <i
            accessKey={`${i}`}
            onClick={handleDeleteImg}
            className="far fa-times-circle"
          ></i>
          <img onClick={() => setMainImg(i)} key={i} src={link} />
        </div>
      );
    });
    return renderImages;
  };

  return (
    <form ref={formRef} className="EditProducts">
      <div className="EditProducts__images">
        <div className="EditProducts__images--main">
          {renderImages()[mainImg]}
        </div>
        <div className="EditProducts__images--list">
          <div className="fixDiv">
            <div className="addImage">
              <img
                onClick={() => {
                  setShowAddImage(!showAddImage);
                }}
                className="addImage__img"
                src={
                  "https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png"
                }
              />
            </div>
            {renderImages()}
          </div>
          {showAddImage && (
            <div className="insertion">
              <input
                onChange={(evt) => {
                  setImgLinkInput(evt.target.value);
                }}
                value={imgLinkInput}
                className="insertion--input"
                type="text"
                placeholder="Type link here ..."
              />
              <i
                onClick={handleAddImage}
                className="insertion--icon  fas fa-plus-circle"
              ></i>
            </div>
          )}
        </div>
      </div>
      {ad ? (
        <div className="EditProducts__text">
          <div className="EditProducts__text--specs">
            <h3>{editProduct.sellerName}</h3>
            <p className="EditProducts__text--specs-p">
              Sell or Rent:
              {ad.sellOrRent === "sell" ? (
                <select name="sellOrRent" defaultValue={"sell"}>
                  <option value="sell">Sell</option>
                  <option value="rent">Rent</option>
                </select>
              ) : (
                <select name="sellOrRent" defaultValue={"rent"}>
                  <option value="sell">Sell</option>
                  <option value="rent">Rent</option>
                </select>
              )}
            </p>
            <p className="EditProducts__text--specs-p">
              Sell or Demand
              {ad.sellOrDemand === "sell" ? (
                <select name="sellOrDemand" defaultValue={"sell"}>
                  <option value="sell">Sell</option>
                  <option value="demand">Demand</option>
                </select>
              ) : (
                <select name="sellOrDemand" defaultValue={"demand"}>
                  <option value="sell">Sell</option>
                  <option value="demand">Demand</option>
                </select>
              )}
            </p>
            {ad.used ? (
              <>
                <p className="EditProducts__text--specs-p">
                  Product is:
                  <select name="adUsed" defaultValue={"used"}>
                    <option value="new">New</option>
                    <option value="used"> Used </option>
                  </select>
                </p>
              </>
            ) : (
              <>
                <p className="EditProducts__text--specs-p">
                  Product is:
                  <select name="adUsed" defaultValue={"new"}>
                    <option value="new">New</option>
                    <option value="used"> Used </option>
                  </select>
                </p>
              </>
            )}

            <p className="EditProducts__text--specs-p">
              Year:
              <input name="year" type="number" defaultValue={ad.year} />
            </p>
            <p className="EditProducts__text--specs-p">
              For: <input name="price" type="number" defaultValue={ad.price} />
              <span>KM</span>
            </p>
            <p className="EditProducts__text--specs-p">
              From:
              <select name="locationName" defaultValue={ad.locationName}>
                {citiesEnums}
              </select>
            </p>
            <p className="EditProducts__text--specs-p">
              Category:
              <select name="category" defaultValue={ad.category}>
                {categoryEnums}
              </select>
            </p>
            <p className="EditProducts__text--specs-p">
              In stock:
              <input name="holds" type="number" defaultValue={ad.holds} />
            </p>
            <p className="EditProducts__text--specs-p">
              Brand:
              <input name="brand" type="text" defaultValue={ad.brand} />
            </p>
            <p className="EditProducts__text--specs-p">
              Make:
              <input name="make" type="text" defaultValue={ad.make} />
            </p>
            <p className="EditProducts__text--specs-p">
              Model:
              <input name="model" type="text" defaultValue={ad.model} />
            </p>
          </div>
          <p>DETAILED</p>

          <textarea
            name="desc"
            defaultValue={ad.desc}
            className="EditProducts__text--desc"
          ></textarea>

          <div className="EditProducts__text--btn">
            <button onClick={handleUpdate} type="submit">
              Save
            </button>
            <button onClick={closeWindow} type="button">
              Close window
            </button>
            <button onClick={handleDeletion} type="submit">
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </form>
  );
};

export default EditProduct;
