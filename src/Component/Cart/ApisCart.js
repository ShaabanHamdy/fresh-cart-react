import { useContext } from "react";
import { ContainerContext } from "../Context/Context";

const Apis = () => {
  let {
    state,
    dispatch,
    decrementCarts,
    getAllCarts,
    addToCart,
    removeProduct,
  } = useContext(ContainerContext);
  const getCats = async () => {
    let response = await getAllCarts();
    dispatch({
      type: "SET_MULTIPLE_STATES",
      payload: {
        calcCount: response?.data?.calcQuantity,
        loading: false,
        cart: response?.data,
      },
    });
  };
  // =======================================================
  const updateCountProduct = async (productId, quantity) => {
    let response = await addToCart(productId, quantity);
    let product = state.cart?.data[0]
      ?.filter((product) => product.productId._id === productId)
      .map((e) => e.productId.stock);
    if (response === `invalid product quantity max available is ${product}`) {
      dispatch({
        type: "SET_MULTIPLE_STATES",
        payload: {
          errorQntMas: response,
          getId: productId,
        },
      });
    } else {
      dispatch({ type: "SET_STATE", field: "errorQntMas", value: "" });
    }
  };
  // ===========================================================================================
  const removeItem = async (productId) => {
    await removeProduct(productId);
  };

  const decrementCart = async (productId, quantity) => {
    let response = await decrementCarts(productId, quantity);
    dispatch({ type: "SET_STATE", field: "errorQntMas", value: "" });

    if (response === "can't decrement less than 1") {
      dispatch({
        type: "SET_MULTIPLE_STATES",
        payload: {
          errorQntMas: "can't decrement less than 1",
          getId: productId,
        },
      });
    }
  };

  return {
    decrementCart,
    removeItem,
    updateCountProduct,
    getCats,
  };
};
export default Apis;
