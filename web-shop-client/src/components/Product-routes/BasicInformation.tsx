import React, { useEffect, useContext, useRef, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

const BasicInformation = () => {
  const { basicInfoTab, setBasicInfoTab } = useContext(ProductContext);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const navigate = useNavigate();

  useEffect(() => {
    radio1.current?.click();
    if (Object.keys(basicInfoTab).length !== 0) {
      setBasicObj(basicInfoTab);
    }
  }, []);

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
            value="potražnja"
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
