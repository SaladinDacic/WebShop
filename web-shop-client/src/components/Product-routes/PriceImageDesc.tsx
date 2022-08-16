import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Line } from "rc-progress";
import axios from "axios";
import _ from "lodash";

const PriceImageDesc: React.FC = () => {
  const { pidTab, setPidTab } = useContext(ProductContext);
  const navigate = useNavigate();
  const [numOfImgInputs, setNumOfImgInputs] = useState([0]);
  const [imageFiles, setImageFiles] = useState<
    React.ChangeEvent<HTMLInputElement> | undefined
  >() as any;

  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
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
    if (Object.keys(pidTab).length !== 0) {
      setBaseObj(pidTab);
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
    }
    setBaseObj((oldObj) => {
      return {
        ...oldObj,
        imgSrc: [],
      };
    });
  }, []);

  const handleUploadFile = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    const formData = new FormData();
    _.forEach(imageFiles, (file) => {
      formData.append("files", file);
    });
    setIsUploading(true);
    await axios({
      method: "post",
      url: `http://localhost:3001/api/upload`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: ({ loaded, total }) => {
        setProgress((loaded / total) * 100);
        // console.log("uload_evt", (loaded / total) * 100);
      },
    }).then((res) => {
      console.log(res.data.arr);
      setIsUploading(false);
      // setUploadedImagesArr(res.data.arr);
      if (res.data.arr.length !== 0) {
        setBaseObj((oldObj) => {
          return { ...oldObj, imgSrc: [...oldObj.imgSrc, ...res.data.arr] };
        });
      } else {
        setProgress(0);
      }
    });
  };

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
  // const renderInputs = numOfImgInputs.map((num, i) => {
  //   return (
  //     <input
  //       key={i}
  //       onChange={handleImage}
  //       name="imgSrc"
  //       className="file"
  //       type="text"
  //       placeholder="sugested"
  //       // defaultValue={baseObj.imgSrc[i]}
  //     />
  //   );
  // });
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
                {/* <h3>Image </h3> */}
                <div className="upload__arrOfImgs">
                  {baseObj.imgSrc.map((imgLink: string, i: number) => {
                    return (
                      <div
                        key={i}
                        className="upload__arrOfImgs--oneImageDiv"
                        style={{ backgroundImage: `url(${imgLink})` }}
                      ></div>
                    );
                  })}
                </div>
                <br />
                <div className="upload__progress">
                  <Line percent={progress} trailWidth={1.5} strokeWidth={2} />
                  <h3>{progress}%</h3>
                </div>
                <br />
                <div className="upload">
                  <input
                    className="upload__input"
                    onChange={(evt) => {
                      if (evt.target.files !== null) {
                        setImageFiles(evt.target.files);
                      }
                    }}
                    type="file"
                    multiple
                    name="files"
                  />
                </div>
                <button className="upload__button" onClick={handleUploadFile}>
                  upload
                </button>
                {/* {renderInputs} */}
              </div>
              {/* <a
                className="moreInputs"
                onClick={() => {
                  setNumOfImgInputs((preVal) => {
                    return [...preVal, 0];
                  });
                }}
              >
                More img?
              </a> */}
              {/* <a
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
              </a> */}
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
        <button
          onClick={() => {
            navigate("/addProduct/basic-information");
          }}
        >
          Back
        </button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default PriceImageDesc;
