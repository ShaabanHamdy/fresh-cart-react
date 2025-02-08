import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ContainerContext } from "../Context/Context";
import { sweetAlertError } from "../sweetAlert/sweetAlert";
const ApisProductDetails = () => {
  let { state, dispatch, addToCart, getSpecificProduct } =
    useContext(ContainerContext);

  let { id } = useParams();

  // =====================================================================use Query to get data===========================
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const SpecificProduct = async () => {
    let { data } = await getSpecificProduct(id);
    dispatch({
      type: "SET_MULTIPLE_STATES",
      payload: {
        data: data?.product,
        stock: data?.product.stock,
        coverImage: data?.product?.mainImage,
      },
    });
  };
  // ======================================================================================================

  // ======================================================================================================
  const addProductToCart = async (id) => {
    let count = parseInt(state.getQntValue);
    let response = await addToCart(id, count);

    if (response?.data?.message === "Product added successfully to your cart") {
      toast.success(
        <span className="small">Product added successfully to your cart</span>
      );
      dispatch({ type: "SET_STATE", field: "errorQntMas", value: "" });
      // setErrorQntMas("");
    }
    if (response === "You are not logged in. Please login to get access") {
      sweetAlertError("You are not logged in. Please login to get access");
    }
    if (
      response === `invalid product quantity max available is ${state.stock}`
    ) {
      dispatch({ type: "SET_STATE", field: "errorQntMas", value: response });
      // setErrorQntMas(response);
    }
  };

  return {
    SpecificProduct,
    addProductToCart,
  };
};

export default ApisProductDetails;
