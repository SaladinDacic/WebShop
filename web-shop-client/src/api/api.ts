import axios from "axios";
import { TypeOfExpression } from "typescript";

interface updateProductInterfaceProp {
  sellOrRent: "sell" | "rent",
  sellOrDemand: "sell" | "demand",
  price: number,
  used: boolean,
  year: number,
  locationName: string,
  category: string,
  holds: number,
  brand: string,
  make: string,
  model: string,
  desc: string,
  productId: string,
  sellerId: string,
  imgSrc: string[]
}
const updateProduct = async (obj: updateProductInterfaceProp) => {
  // console.log(obj)
  let response = await axios.put(
    `http://localhost:3001/api/seller/${obj.sellerId}`, obj
  );
}

const deleteProduct = async (obj: { sellerId: string, productId: string }) => {
  let response = await axios.put(
    `http://localhost:3001/api/seller/`, obj
  );
}

const getSellers = async () => {
  let response = await axios.get(
    "http://localhost:3001/api/seller/getSellers"
  );
  let sellers = response.data.seller;
  let allProducts = sellers
    .map(
      (objSeller: {
        ["products"]: {}[];
        name: string;
        sellerId: string;
        rating: number;
      }) => {
        let newObj = objSeller.products.map((miniObj: any) => {
          return {
            ...miniObj,
            sellerName: objSeller.name,
            sellerId: objSeller.sellerId,
            rating: objSeller.rating,
            date: miniObj.date.split("T")[0],
          };
        });
        return [newObj];
      }
    )
    .flat(2);
  return (allProducts)
};

const getLoggedUserName = async () => {
  let response = await axios.get(
    "http://localhost:3001/api/seller/getAuthUser",
    { withCredentials: true }
  );
  // console.log(response)
  return response;
}
const getSellerById = async (id: string | undefined) => {
  if (id === undefined) id = "";
  let response = await axios.get(
    `http://localhost:3001/api/seller/getSellerById/${id}`,
    { withCredentials: true }
  );
  // console.log(response)
  return response;
}

const getCustomerBasketById = async (id: string) => {
  let response = await axios.get(
    `http://localhost:3001/api/basket/customer/${id}`,
    { withCredentials: true }
  );
  // console.log(response)
  return response;
}
const getSellerBasketById = async (id: string) => {
  let response = await axios.get(
    `http://localhost:3001/api/basket/seller/${id}`,
    { withCredentials: true }
  );
  // console.log(response)
  return response;
}

const getProduct = async (sellerId: string, productId: string) => {
  // localhost:3001/api/seller/getProduct/61e5a443b09123931f5a42e0/61e891eaaea9b3c9e2b24ff5
  let response = await axios.get(
    `http://localhost:3001/api/seller/getProduct/${sellerId}/${productId}`,
    { withCredentials: true }
  );
  // console.log(response)
  return response;
}

const addProductToBasket = async (sellerId: string, productId: string, pieces: number = 1) => {
  // localhost:3001/api/seller/getProduct/61e5a443b09123931f5a42e0/61e891eaaea9b3c9e2b24ff5
  let response = await axios.post(
    `http://localhost:3001/api/basket/addProductToBasket`, { sellerId, productId, pieces },
    { withCredentials: true }
  );
  // console.log(response)
  return response;
}
const acceptProductSell = async (sellerId: string, productId: string) => {
  // localhost:3001/api/seller/getProduct/61e5a443b09123931f5a42e0/61e891eaaea9b3c9e2b24ff5
  let response = await axios.post(
    `http://localhost:3001/api/basket/acceptProductSell`, { sellerId, productId },
    { withCredentials: true }
  );
  // console.log(response)
  return response;
}
const unAcceptProductSell = async (sellerId: string, productId: string) => {
  // localhost:3001/api/seller/getProduct/61e5a443b09123931f5a42e0/61e891eaaea9b3c9e2b24ff5
  let response = await axios.post(
    `http://localhost:3001/api/basket/unAcceptProductSell`, { sellerId, productId },
    { withCredentials: true }
  );
  // console.log(response)
  return response;
}
const updateProductShipping = async (sellerId: string, productId: string, shipping: "home" | "sent" | "traveling" | "arrived") => {

  try {
    let response = await axios.post(
      `http://localhost:3001/api/basket/updateProductShipping`, { sellerId, productId, shipping },
      { withCredentials: true }
    );

    return response;
  } catch (err) {
    console.log("err")
  }
  // console.log(response)
}

const getAllPopular = async () => {
  let response = await axios.get(
    `http://localhost:3001/api/popular`,
  );
  return response.data
}

const increasePopularity = async (category: string) => {
  let response = await axios.post(
    `http://localhost:3001/api/popular/increasePopularity`, { category: category },
    { withCredentials: true }
  );
  return response.data
}

const intitialDataSetDetailedCard = async (setAd: any, sellerId: any, productId: any) => {
  try {
    let response = await axios.get(
      `http://localhost:3001/api/seller/getProduct/${sellerId}/${productId}`,
      { withCredentials: true }
    );
    setAd(response.data);
    return response.data
  } catch (err) {
    console.log(err);
  }
};

const logIn = async (userName: string, password: string) => {
  await axios.post(
    "http://localhost:3001/api/seller/login",
    {
      username: userName,
      password: password,
    },
    { withCredentials: true }
  );
}

const logOut = async () => {
  await axios.get(
    "http://localhost:3001/api/seller/logOut",
    { withCredentials: true }
  );
}
const upload = async (data: File) => {
  return await axios.post(
    `http://localhost:3001/api/upload`,
    data,
    { withCredentials: true }
  )
    .then((data) => data);
}
const deleteImages = async (arrayOfLinks: string[]) => {
  return await axios.post(
    `http://localhost:3001/api/images/deletion`,
    arrayOfLinks,
    { withCredentials: true }
  )
    .then((data) => data);
}

export { deleteImages, upload, increasePopularity, getAllPopular, addProductToBasket, unAcceptProductSell, acceptProductSell, updateProductShipping, getProduct, getSellerBasketById, getCustomerBasketById, getSellerById, deleteProduct, getSellers, getLoggedUserName, intitialDataSetDetailedCard, logIn, logOut, updateProduct };