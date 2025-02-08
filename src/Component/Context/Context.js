import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
export const ContainerContext = createContext();

// Initial state
const initialState = {
  userToken: null,
  baseUrl: "https://freshcard-ecommerce-node.onrender.com",
  calcCount: 0,
  error: null,
  loading: false,
  cart: null,
  errorQntMas: "",
  getId: 0,
  data: {},
  getQntValue: 1,
  stock: "",
  coverImage: "",
  quantity: 1,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, [action.field]: action.value };
    case "SET_MULTIPLE_STATES":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default function ContainerContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ================================================================

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      dispatch({ type: "SET_STATE", field: "calcCount", value: 0 });
    }
  }, []);
  // ================================================================

  const getSpecificProduct = async (id) => {
    return await axios
      .get(`${state.baseUrl}/product/getOneProduct/${id}`)
      .then((res) => res)
      .catch((err) => err);
  };
  // ================================================================

  const addToCart = async (productId, quantity) => {
    return await axios
      .post(
        `${state.baseUrl}/cart/addProductToCart`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            auth: state.userToken,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: "SET_STATE",
          field: "calcCount",
          value: response?.data?.calcQuantity,
        });
        return response;
      })
      .catch((err) => {
        return err?.response?.data.Error;
      });
  };

  // ================================================================
  const decrementCarts = async (productId, quantity) => {
    return await axios
      .post(
        `${state.baseUrl}/cart/decrementCarts`,
        {
          productId,
          quantity,
        },

        {
          headers: {
            auth: state.userToken,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: "SET_STATE",
          field: "calcCount",
          value: response?.data?.calcQuantity,
        });
        return response;
      })
      .catch((err) => {
        return err?.response?.data.Error;
      });
  };

  // =================================================================================
  const getAllCarts = async () => {
    return await axios
      .get(`${state.baseUrl}/cart/getAllCarts`, {
        headers: {
          auth: state.userToken,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((err) => err?.response?.data?.Error);
  };

  // =================================================================================
  const removeProduct = async (productId) => {
    return await axios
      .put(
        `${state.baseUrl}/cart/removeOneCart`,
        {
          productId,
        },
        {
          headers: {
            auth: state.userToken,
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  };

  // =================================================================================

  async function getFeaturesProducts() {
    if (state.userToken) {
      let response = await axios.get(
        `${state.baseUrl}/product/getAllProductsUsers`,
        {
          headers: {
            auth: state.userToken,
          },
        }
      );
      dispatch({
        type: "SET_STATE",
        field: "calcCount",
        value: response?.data?.calcQuantity,
      });
      return response;
    } else {
      let response = await axios.get(`${state.baseUrl}/product/getAllProducts`);
      dispatch({ type: "SET_STATE", field: "calcCount", value: 0 });
      return response;
    }
  }

  // ====================================================================

  const getCategorySlider = async () => {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  };

  // ====================================================================
  const handelSubmitPayment = async (values) => {
    return await axios
      .post(`${state.baseUrl}/order/createOrder`, values, {
        headers: {
          auth: state.userToken,
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
        addToCart,
        getAllCarts,
        removeProduct,
        getSpecificProduct,
        getFeaturesProducts,
        decrementCarts,
        state,
        dispatch,
      }}
    >
      {props.children}
    </ContainerContext.Provider>
  );
}
