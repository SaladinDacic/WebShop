import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

const PriceImageDesc: React.FC = () => {
  const { pidTab, setPidTab } = useContext(ProductContext);
  const navigate = useNavigate();
  const [numOfImgInputs, setNumOfImgInputs] = useState([0]);

  const [baseObj, setBaseObj] = useState<{
    price?: number;
    holds: number;
    sold: number;
    brand: string;
    make: string;
    model: string;
    imgSrc: string[];
    used: boolean;
    desc: string;
  }>({
    price: 0,
    holds: 1,
    sold: 0,
    brand: "",
    make: "",
    model: "",
    imgSrc: [],
    used: false,
    desc: "",
  });

  useEffect(() => {
    /* if (Object.keys(pidTab).length !== 0) {
      // setBaseObj(pidTab);
      pidTab.imgSrc.forEach((val: number, i: number) => {
        if (val === 99999) {
          console.log("ignore this line");
        }
        if (i !== 0) {
          setNumOfImgInputs((oldVal) => [...oldVal, 0]);
        } else {
          setNumOfImgInputs([0]);
        }
      });
    } */
    setBaseObj((oldObj) => {
      return {
        ...oldObj,
        imgSrc: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png",
        ],
      };
    });
  }, []);

  const handleUsed = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setBaseObj((oldObj) => {
      return { ...oldObj, used: !oldObj.used };
    });
  };
  const handleImage = (
    evt: React.ChangeEvent<HTMLInputElement> & { target: { key: string } }
  ) => {
    if (evt.target.key === "") {
      setBaseObj((oldObj) => {
        return {
          ...oldObj,
          imgSrc: oldObj.imgSrc.slice(0, oldObj.imgSrc.length - 1),
        };
      });
    }
    setBaseObj((oldObj) => {
      return { ...oldObj, imgSrc: [...oldObj.imgSrc, evt.target.value] };
    });
  };
  const handleImageDeletion = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    setBaseObj((oldObj) => {
      return {
        ...oldObj,
        imgSrc: oldObj.imgSrc.slice(0, oldObj.imgSrc.length - 1),
      };
    });
  };
  const handleChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (evt.target.name === "imgSrc" || evt.target.name === "used") return;
    setBaseObj((oldObj) => {
      return { ...oldObj, [evt.target.name]: evt.target.value };
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      setPidTab(baseObj);
      navigate("/addProduct/publish");
    } catch (err) {
      console.log("can't set property", err);
    }
  };

  const renderInputs = numOfImgInputs.map((num, i) => {
    return (
      <input
        key={i}
        onChange={handleImage}
        name="imgSrc"
        className="file"
        type="text"
        placeholder="sugested"
        defaultValue={baseObj.imgSrc[i]}
      />
    );
  });
  return (
    <form
      onSubmit={handleSubmit}
      className="Product__Routes--PriceImgDesc PriceImgDesc"
    >
      <div className="PriceImgDesc__inputs">
        <div className="PriceImgDesc__inputs--div">
          <div className="PriceImgDesc__inputs--div-number">
            <div>
              <h3>Price</h3>
              <input
                onChange={handleChange}
                name="price"
                type="number"
                value={baseObj.price}
                required
              />
            </div>
            <div>
              <h3>Holds</h3>
              <input
                onChange={handleChange}
                name="holds"
                type="number"
                placeholder="optional"
                value={baseObj.holds}
              />
            </div>
            <div>
              <h3>Sold </h3>
              <input
                onChange={handleChange}
                name="sold"
                type="number"
                placeholder="optional"
                value={baseObj.sold}
              />
            </div>
          </div>
          <div className="PriceImgDesc__inputs--div-text">
            <div>
              <h3>Brand </h3>
              <input
                onChange={handleChange}
                name="brand"
                placeholder="optional"
                value={baseObj.brand}
              />
            </div>
            <div>
              <h3>Make </h3>
              <input
                onChange={handleChange}
                name="make"
                placeholder="optional"
                value={baseObj.make}
              />
            </div>
            <div>
              <h3>Model </h3>
              <input
                onChange={handleChange}
                name="model"
                placeholder="optional"
                value={baseObj.model}
              />
            </div>
          </div>
          <div className="PriceImgDesc__inputs--div-file-new">
            <div className="file">
              <div className="file__inputs">
                <h3>Image </h3>
                {renderInputs}
              </div>
              <a
                className="moreInputs"
                onClick={() => {
                  setNumOfImgInputs((preVal) => {
                    return [...preVal, 0];
                  });
                }}
              >
                More img?
              </a>
              <a
                className="moreInputs"
                onClick={(evt) => {
                  handleImageDeletion(evt);
                  setNumOfImgInputs((preVal) => {
                    if (preVal.length > 1) {
                      return preVal.slice(0, preVal.length - 1);
                    } else {
                      return [];
                    }
                  });
                }}
              >
                X
              </a>
            </div>
            <div className="new">
              <h3>New</h3>
              <input onChange={handleUsed} name="used" type="checkbox" />
            </div>
          </div>
          <div className="PriceImgDesc__inputs--div-textArea">
            <div>
              <h3>Description {" (sugested)"}</h3>
              <textarea
                onChange={handleChange}
                name="desc"
                value={baseObj.desc}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="Product__MainBtn btn">
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default PriceImageDesc;
