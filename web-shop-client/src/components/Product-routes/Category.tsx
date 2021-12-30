import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

const Category: React.FC = () => {
  const { setCategoryTab } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleClick = (
    evt: React.MouseEvent<HTMLButtonElement> & { target: { innerHTML: string } }
  ) => {
    try {
      setCategoryTab(evt.target.innerHTML.toLocaleLowerCase());
      navigate("/addProduct/basic-information");
    } catch (err) {
      console.log("can't set property", err);
    }
  };
  return (
    <form
      onSubmit={(evt) => evt.preventDefault()}
      className="Product__Routes--Category"
    >
      <div className="Prodaja Category__divs">
        <h3 className="h4__tag Category__tags">Sell</h3>
        <p className="p__tag Category__ps">
          Želim da nešto prodam po fiksnoj cijeni, po dogovoru ili da mi ljudi
          šalju ponude.
        </p>
        <button onClick={handleClick} className="Category__btns Product--btn">
          Sell
        </button>
      </div>
      <div className="Iznajmljivanje Category__divs">
        <h3 className="h4__tag Category__tags">Rent</h3>
        <p className="p__tag Category__ps">
          Želim da nekome iznajmim nekretninu na određeno vrijeme.
        </p>
        <button
          onClick={handleClick}
          className="Category__btns Iznajmljivanje--btn"
        >
          Rent
        </button>
      </div>
      {/*       <div className="Posao Category__divs">
        <h3 className="h4__tag Category__tags">Posao</h3>
        <p className="p__tag Category__ps">Želim da objavim posao</p>
        <a className="Category__btns Posao--btn">Objavite posao</a>
      </div>
      <div className="Usluga Category__divs">
        <h3 className="h4__tag Category__tags">Servis ili Usluga</h3>
        <p className="p__tag Category__ps">
          Želim da objavim servis ili uslugu koju nudim.
        </p>
        <a className="Category__btns Usluga--btn">Objavite servis ili uslugu</a>
      </div> */}
    </form>
  );
};

export default Category;
