import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const ContainerContext = createContext();

export default function ContainerContextProvider(props) {
  // ========================================== userToken ========
  let [userToken, setUserToken] = useState(null);
  let [baseUrl] = useState("https://freshcard-ecommerce-node.onrender.com");
  let [calcCount, setCalcCount] = useState(0);
  // ================================================================

  useEffect(() => {
    if (localStorage.getItem("token") === null) return setCalcCount(0);
  }, []);
  // ================================================================

  const getSpecificProduct = async (id) => {
    return await axios
      .get(`${baseUrl}/product/getOneProduct/${id}`)
      .then((res) => res)
      .catch((err) => err);
  };
  // ================================================================

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        `${baseUrl}/cart/addProductToCart`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            auth: userToken,
          },
        }
      );
      setCalcCount(response?.data?.calcQuantity);
      return response;
    } catch (err) {
      return err?.response?.data.Error;
    }
  };

  // ================================================================
  const decrementCarts = async (productId, quantity) => {
    try {
      const response = await axios.post(
        `${baseUrl}/cart/decrementCarts`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            auth: userToken,
          },
        }
      );
      setCalcCount(response?.data?.calcQuantity);
      return response;
    } catch (err) {
      return err?.response?.data.Error;
    }
  };

  // =================================================================================
  const getAllCarts = async () => {
    let response = await axios
      .get(`${baseUrl}/cart/getAllCarts`, {
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        return response;
      })
      .catch((err) => err?.response?.data?.Error);

    return response;
  };

  // =================================================================================
  const removeProduct = async (productId) => {
    try {
      const response = await axios.put(
        `${baseUrl}/cart/removeOneCart`,
        {
          productId,
        },
        {
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );

      return response;
    } catch (err) {
      return err;
    }
  };

  // =================================================================================

  async function getFeaturesProducts() {
    if (localStorage.getItem("token")) {
      let response = await axios.get(`${baseUrl}/product/getAllProductsUsers`, {
        headers: {
          auth: localStorage.getItem("token"),
        },
      });
      setCalcCount(response?.data?.calcQuantity);
      return response;
    } else {
      let response = await axios.get(`${baseUrl}/product/getAllProducts`);
      setCalcCount(0);
      return response;
    }
  }

  // ====================================================================

  const getCategorySlider = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  };

  // ====================================================================
  const handelSubmitPayment = async (values) => {
    return await axios
      .post(`${baseUrl}/order/createOrder`, values, {
        headers: {
          auth: userToken,
        },
      })
      .then((response) => {
        if (response?.data.message) {
          return (window.location.href = response?.data?.url);
        }
      })
      .catch((err) => {
        return err?.response?.data.Error;
      });
  };
  // ====================================================================
  return (
    <ContainerContext.Provider
      value={{
        handelSubmitPayment,
        getCategorySlider,
        userToken,
        setUserToken,
        addToCart,
        getAllCarts,
        removeProduct,
        setCalcCount,
        getSpecificProduct,
        calcCount,
        baseUrl,
        getFeaturesProducts,
        decrementCarts,
      }}
    >
      {props.children}
    </ContainerContext.Provider>
  );
}
