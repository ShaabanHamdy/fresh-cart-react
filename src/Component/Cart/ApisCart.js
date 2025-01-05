import { useContext, useState } from "react";
import { ContainerContext } from "../Context/Context";

const Apis = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  let [errorQntMas, setErrorQntMas] = useState("");
  let [getId, setGetId] = useState(0);

  let { decrementCarts, setCalcCount, getAllCarts, addToCart, removeProduct } =
    useContext(ContainerContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCats = async () => {
    let response = await getAllCarts();
    setCart(response?.data);
    setCalcCount(response?.data?.calcQuantity);
    setLoading(false);
  };
  // =======================================================
  const updateCountProduct = async (productId, quantity) => {
    let response = await addToCart(productId, quantity);
    let product = cart?.data[0]
      ?.filter((product) => product.productId._id === productId)
      .map((e) => e.productId.stock);
    if (response === `invalid product quantity max available is ${product}`) {
      setErrorQntMas(response);
      setGetId(productId);
    } else {
      setErrorQntMas("");
    }
  };
  // ===========================================================================================
  const removeItem = async (productId) => {
    await removeProduct(productId);
  };

  const decrementCart = async (productId, quantity) => {
    let response = await decrementCarts(productId, quantity);
    setErrorQntMas("");
    if (response === "can't decrement less than 1") {
      setErrorQntMas("can't decrement less than 1");
      setGetId(productId);
    }
  };

  return {
    decrementCart,
    removeItem,
    updateCountProduct,
    getCats,
    loading,
    errorQntMas,
    getId,
    cart,
  };
};
export default Apis;
