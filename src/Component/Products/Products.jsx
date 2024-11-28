import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import Swal from "sweetalert2";
import { ContainerContext } from "./../Context/Context";

const Products = () => {
  
  let { baseUrl, addToCart, getFeaturesProducts } =
    useContext(ContainerContext);
  const [quantity, setQuantity] = useState(1);

  let { data, isLoading } = useQuery("featuresProducts", getFeaturesProducts);
let navigate = useNavigate()
  const sweetAlertError = (tokenMsg) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: tokenMsg,
      // footer: `<a href="/https://shaaban-hamdy-fresh-cart.netlify.app/#/Login" target="_blank" >Go to Login</a>`,
      footer: navigate("/Login")
    });
  };
  const sweetAlertErrorQuantity = (tokenMsg) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: tokenMsg,
    });
  };
  const addProductToCart = async (id) => {
    let response = await addToCart(id, quantity);
    if (response?.data?.message === "Product added successfully to your cart") {
      toast.success(
        <span className="small">Product added successfully to your cart</span>
      );
    }
    let product = data?.data?.data.filter((product) => product._id == id);
    let stock = product?.map((s) => s.stock);
    if (response == "You are not logged in. Please login to get access") {
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

  return (
    <>
      {isLoading ? (
        <div className="min-vh-100 d-flex  justify-content-center align-items-center">
          <BounceLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="container py-2">
          <h2 className="m-4 text-main text-center  Products">Products</h2>
          <div className="row">
            {data?.data?.data.map((product) => (
              <div key={product._id} className="col-lg-2 col-md-3 col-sm-4">
                <div className="product cursor-pointer py-3 px-2">
                  <Link to={`/productDetails/${product.id}`}>
                    <img
                      className="w-100"
                      src={product.mainImage.map((i) => i)}
                      alt={product.title}
                    />
                    <span className="text-main font-sm fw-bold">
                      {product?.categoryId?.name}
                    </span>
                    <h3
                      style={{
                        height: "40px",
                      }}
                      className="h6"
                    >
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className=" d-flex justify-content-between mt-3">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addProductToCart(product._id)}
                    className="btn bg-main text-white w-100 btn-sm mt-2"
                  >
                    {" "}
                    add to cart{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Toaster />
        </div>
      )}
    </>
  );
};

export default Products;
