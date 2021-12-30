import axios from "axios";

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

export { getSellers, getLoggedUserName };