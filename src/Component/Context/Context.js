import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const ContainerContext = createContext()



export default function ContainerContextProvider(props) {
  // ========================================== userToken ========    
  let [userToken, setUserToken] = useState(null)
  let [baseUrl, setBaseUrl] = useState("https://freshcard-ecommerce-node.onrender.com")
  let [calcCount, setCalcCount] = useState(0)
  // ================================================================    
  const getSpecificProduct = async (id) => {
    return await axios.get(`${baseUrl}/product/getOneProduct/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
  // ================================================================    

  const addToCart = (productId, quantity) => {
    return axios.post(`${baseUrl}/cart/addProductToCart`, {
      productId,
      quantity
    }, {
      headers: {
        auth: userToken
      }
    }).then((response) => {
      setCalcCount(response?.data?.calcQuantity)
      return response
    })
      .catch((err) => err?.response?.data.Error)

  }


  // ================================================================    
  const decrementCarts = (productId, quantity) => {
    return axios.post(`${baseUrl}/cart/decrementCarts`, {
      productId,
      quantity
    }, {
      headers: {
        auth: userToken
      }
    }).then((response) => {
      setCalcCount(response?.data?.calcQuantity)

      return response
    })
      .catch((err) => err?.response?.data.Error)
  }


  // =================================================================================
  const getAllCarts = async () => {
    let response = await axios.get(`${baseUrl}/cart/getAllCarts`, {
      headers: {
        auth: localStorage.getItem("token")
      }
    }).then((response) => {
      return response;
    })
      .catch((err) => err?.response?.data?.Error)

    return response
  }

  // =================================================================================
  const removeProduct = (productId) => {
    return axios.put(`${baseUrl}/cart/removeOneCart`, {
      productId
    }, {
      headers: {
        auth: localStorage.getItem("token")
      }
    }).then((response) => {
      return response;
    })
      .catch((err) => err)

  }

  // =================================================================================

  async function getFeaturesProducts() {

    if (localStorage.getItem("token")) {
      let response = await axios.get(`${baseUrl}/product/getAllProductsUsers`, {
        headers: {
          auth: localStorage.getItem("token")
        }
      });
      setCalcCount(response?.data?.calcQuantity)
      return response
    }
    else {
      let response = await axios.get(`${baseUrl}/product/getAllProducts`);
      setCalcCount(0)
      return response

    }
  }
  // =================================================================================
  async function functionOnRender() {

    await axios.get(`${baseUrl}/cart/logFunction`, {

    }).then((response) => {
      return response;
    })
      .catch((err) => err?.response)
  }

  // =================================================================================
  useEffect(() => {
    setInterval(() => {
      functionOnRender()

    }, 4000);
  }, [])


  useEffect(() => {
    setCalcCount(calcCount)
  }, [calcCount])
  // ====================================================================
  return <ContainerContext.Provider value={{
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
    decrementCarts
  }}>

    {props.children}
  </ContainerContext.Provider>
}