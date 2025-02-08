import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import {
  sweetAlertError,
  sweetAlertErrorQuantity,
} from "../sweetAlert/sweetAlert";
import { ContainerContext } from "./../Context/Context";

const ApisFeatured = () => {
  let { state, addToCart, getFeaturesProducts } = useContext(ContainerContext);

  let { data, isLoading } = useQuery("featuresProducts", getFeaturesProducts);

  // ===============================================
  const addProductToCart = async (id) => {
    let response = await addToCart(id, state.quantity);

    if (response?.data?.message === "Product added successfully to your cart") {
      toast.success(
        <span className="small">Product added successfully to your cart</span>
      );
    }
    let product = data?.data?.data.filter((product) => product._id === id);
    let stock = product?.map((s) => s.stock);
    if (response === "You are not logged in. Please login to get access") {
      sweetAlertError("You are not logged in. Please login to get access");
    }
    if (response === "token invalid please go to login again") {
      sweetAlertError("token invalid please go to login again");
    }
    if (response === `invalid product quantity max available is ${stock}`) {
      sweetAlertErrorQuantity(
        `invalid product quantity max available is ${stock}`
      );
    }
  };

  return {
    isLoading,
    addProductToCart,
    data,
  };
};

export default ApisFeatured;
