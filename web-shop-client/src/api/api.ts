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


const intitialDataSetDetailedCard = async (setAd: any, sellerId: any, productId: any) => {
  try {
    let response = await axios.get(
      `http://localhost:3001/api/seller/getProduct/${sellerId}/${productId}`,
      { withCredentials: true }
    );
    setAd(response.data);
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


export { getSellerById, deleteProduct, getSellers, getLoggedUserName, intitialDataSetDetailedCard, logIn, logOut, updateProduct };