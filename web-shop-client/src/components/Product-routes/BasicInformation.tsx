import React, { useEffect, useContext, useRef, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { ProfileDetailContext } from "../../context/MainContext";

const BasicInformation = () => {
  const { basicInfoTab, setBasicInfoTab } = useContext(ProductContext);
  const { categories, setCategories } = useContext(ProfileDetailContext);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const navigate = useNavigate();

  useEffect(() => {
    radio1.current?.click();
    if (Object.keys(basicInfoTab).length !== 0) {
      setBasicObj(basicInfoTab);
    }
  }, []);
  useEffect(() => {
    categoryRef.current = categoryRef.current.slice().concat(categories);
  }, [categories]);

  const radio1 = useRef<HTMLInputElement | null>(null);
  const radio2 = useRef<HTMLInputElement | null>(null);
  // const radio3 = useRef<HTMLInputElement | null>(null);
  const [radio, setRadio] = useState("");
  const [basicObj, setBasicObj] = useState<{
    productName: string;
    category: string;
    year: number;
    locationName: string;
  }>({
    productName: "",
    category: "",
    year: 2021,
    locationName: "Sarjevo",
  });
  const handleChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | (React.ChangeEvent<HTMLSelectElement> & {
          target: { name: string | number };
        })
  ) => {
    setBasicObj(
      (
        oldObj: any
      ): {
        productName: string;
        category: string;
        year: number;
        locationName: string;
      } => {
        return { ...oldObj, [evt.target.name]: evt.target.value };
      }
    );
  };

  const handleSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    let sellOrDemand;
    radio === "radio1" ? (sellOrDemand = "sell") : (sellOrDemand = "demand");
    radio === "radio2" ? (sellOrDemand = "demand") : (sellOrDemand = "sell");
    try {
      setBasicInfoTab({
        sellOrDemand: sellOrDemand,
        productName: basicObj.productName,
        category: basicObj.category,
        year: basicObj.year,
        locationName: basicObj.locationName,
      });
      navigate("/addProduct/price-image-desc");
    } catch (err) {
      console.log("can't set property", err);
    }
    // console.log(radio);
    // console.log(basicObj);
  };

  const switchCheck = (
    evt: React.ChangeEvent<HTMLInputElement> & { target: { name: string } }
  ) => {
    let arr = ["radio1", "radio2" /* , "radio3" */];
    arr.forEach((radioInput) => {
      if (radioInput === evt.target.name) {
        let newArr = arr.filter((val) => val !== radioInput);
        newArr.forEach((notRadioInput) => {
          eval(notRadioInput).current.checked = null;
        });
      }
    });
    setRadio(evt.target.name);
  };

  const categoryRef = useRef<string[]>([""]);
  const citiesRef = useRef<string[]>([
    "Sarajevo",
    "??ajni??e",
    "??apljina",
    "??elinac",
    "??eli??",
    "??itluk",
    "Banja Luka",
    "Banovi??i",
    "Berkovi??i",
    "Biha??",
    "Bijeljina",
    "Bile??a",
    "Bosanska Krupa",
    "Bosanski Petrovac",
    "Bosansko Grahovo",
    "Bratunac",
    "Breza",
    "Brod",
    "Br??ko",
    "Bugojno",
    "Busova??a",
    "Bu??im",
    "Cazin",
    "Derventa",
    "Doboj",
    "Dobrati??i",
    "Domaljevac",
    "Donji Dubovik",
    "Donji Vakuf",
    "Donji ??abar",
    "Drini??",
    "Drvar",
    "Fojnica",
    "Fo??a",
    "Gacko",
    "Glamo??",
    "Gora??de",
    "Gornji Ribnik",
    "Gornji Vakuf",
    "Grada??ac",
    "Gradi??ka",
    "Gra??anica",
    "Grude",
    "Had??i??i",
    "Han Pijesak",
    "Hre??a",
    "Ilid??a",
    "Ilija??",
    "Jablanica",
    "Jajce",
    "Jezero",
    "Kakanj",
    "Kalesija",
    "Kalinovik",
    "Kiseljak",
    "Kladanj",
    "Klju??",
    "Klokotnica",
    "Kne??evo",
    "Konjic",
    "Kopa??i",
    "Kostajnica",
    "Kotor Varo??",
    "Kozarska Dubica",
    "Kre??evo",
    "Kupres",
    "Lakta??i",
    "Livno",
    "Ljubinje",
    "Ljubu??ki",
    "Lopare",
    "Lukavac",
    "Lukavica",
    "Maglaj",
    "Matuzi??i",
    "Mili??i",
    "Modri??a",
    "Mostar",
    "Mrkonji?? Grad",
    "Neum",
    "Nevesinje",
    "Novi Grad",
    "Novi Travnik",
    "Novo Selo",
    "Od??ak",
    "Olovo",
    "Omanjska",
    "Ora??je",
    "Osmaci",
    "O??tra Luka",
    "Pale",
    "Pelagi??evo",
    "Petrovo",
    "Posu??je",
    "Potoci",
    "Pra??a",
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
    "??amac",
    "??ekovi??i",
    "??ipovo",
    "??iroki Brijeg",
    "Teo??ak",
    "Tesli??",
    "Te??anj",
    "Tomislavgrad",
    "Travnik",
    "Trebinje",
    "Trnovo",
    "Tuzla",
    "Ugljevik",
    "Vare??",
    "Velika Kladu??a",
    "Visoko",
    "Vitez",
    "Vi??egrad",
    "Vlasenica",
    "Vogo????a",
    "Vukosavlje",
    "Zavidovi??i",
    "Zenica",
    "Zvornik",
    "??ep??e",
    "??ivinice",
  ]);
  const categoryEnums = categoryRef.current.map((oneOption, i) => {
    return (
      <option key={i} value={oneOption}>
        {oneOption}
      </option>
    );
  });
  const citiesEnums = citiesRef.current.map((oneOption, i) => {
    return (
      <option key={i} value={oneOption}>
        {oneOption}
      </option>
    );
  });

  return (
    <form
      ref={formRef}
      // onSubmit={handleSubmit}
      className="Product__Routes--BasicInfo BasicInfo"
    >
      <div className="BasicInfo__radio">
        <div className="BasicInfo__radio--divs">
          <h3>Sell </h3>
          <input
            ref={radio1}
            onChange={switchCheck}
            type="radio"
            name="radio1"
            value="prodaja"
            // defaultChecked
          />
        </div>
        <div className="BasicInfo__radio--divs">
          <h3>Demand</h3>
          <input
            ref={radio2}
            onChange={switchCheck}
            type="radio"
            name="radio2"
            value="potra??nja"
          />
        </div>
        {/*         <div className="BasicInfo__radio--divs">
          <h3>iznajmljivanje</h3>
          <input
            ref={radio3}
            onChange={switchCheck}
            type="radio"
            name="radio3"
            value="iznajmljivanje"
          />
        </div> */}
      </div>
      <div className="BasicInfo__inputs">
        <div className="BasicInfo__inputs--div div1">
          <div className="BasicInfo__inputs--div-name">
            <h3>Name of product</h3>
            <input
              onChange={handleChange}
              value={basicObj.productName}
              type="text"
              name="productName"
              required
            />
          </div>
          <div className="BasicInfo__inputs--div-year">
            <h3>Year</h3>
            <input
              onChange={handleChange}
              // value={basicObj.year}
              type="number"
              name="year"
              defaultValue={2021}
            />
          </div>
        </div>
        <div className="BasicInfo__inputs--div div2">
          <div className="BasicInfo__inputs--div-category">
            <h3>Category</h3>
            <select
              onChange={handleChange}
              required
              value={basicObj.category}
              name="category"
            >
              {categoryEnums}
            </select>
          </div>
          <div className="BasicInfo__inputs--div-location">
            <h3>Location</h3>
            <select
              onChange={handleChange}
              value={basicObj.locationName}
              name="locationName"
            >
              {citiesEnums}
            </select>
          </div>
        </div>
      </div>
      <div className="Product__MainBtn btn">
        <button
          onClick={() => {
            navigate("/addProduct/category");
          }}
          type="submit"
        >
          Back
        </button>
        <button onClick={handleSubmit} type="submit">
          Next
        </button>
      </div>
    </form>
  );
};

export default BasicInformation;
