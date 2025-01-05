import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ContainerContext } from "../Context/Context";
import { sweetAlertError } from "../sweetAlert/sweetAlert";
const ApisProductDetails = () => {
  let { addToCart, getSpecificProduct } = useContext(ContainerContext);

  let [data, setData] = useState({});
  let [getQntValue, setGetQntValue] = useState(1);
  let [stock, setStock] = useState("");
  let [coverImage, setCoverImage] = useState("");
  let [errorQntMas, setErrorQntMas] = useState("");
  let { id } = useParams();

  // =====================================================================use Query to get data===========================
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const SpecificProduct = async () => {
    let { data } = await getSpecificProduct(id);
    setData(data?.product);
    setStock(data?.product.stock);
    setCoverImage(data?.product?.mainImage);
  };
  // ======================================================================================================

  // ======================================================================================================
  const addProductToCart = async (id) => {
    let count = parseInt(getQntValue);
    let response = await addToCart(id, count);

    if (response?.data?.message === "Product added successfully to your cart") {
      toast.success(
        <span className="small">Product added successfully to your cart</span>
      );
      setErrorQntMas("");
    }
    if (response === "You are not logged in. Please login to get access") {
      sweetAlertError("You are not logged in. Please login to get access");
    }
    if (response === `invalid product quantity max available is ${stock}`) {
      setErrorQntMas(response);
    }
  };

  return {
    data,
    setGetQntValue,
    coverImage,
    errorQntMas,
    SpecificProduct,
    addProductToCart,
    setCoverImage,
    getQntValue,
  };
};

export default ApisProductDetails;
