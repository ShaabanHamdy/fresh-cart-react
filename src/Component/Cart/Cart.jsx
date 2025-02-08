import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { ContainerContext } from "../Context/Context";
import Apis from "./ApisCart";

const Cart = () => {
  let { state } = useContext(ContainerContext);
  const { decrementCart, removeItem, updateCountProduct, getCats } = Apis();
  // =======================================================
  useEffect(() => {
    getCats();
  }, [getCats]);

  return (
    <>
      {state.loading && (
        <div className=" min-vh-100  d-flex justify-content-center align-items-center">
          <BounceLoader color="#36d7b7" />
        </div>
      )}
      {state.cart?.results > 0 ? (
        <div className="my-3   p-3 bg-main-light">
          <h3>Shop Cart :</h3>
          <h6 className="text-main fw-bolder  d-flex justify-content-end  ">
            Cart Items : {state.cart?.results}
          </h6>
          <h6 className="text-main fw-bolder ">
            Total Cart Price :{" "}
            {state.cart?.data[0]?.reduce(
              (x, y) => x + y?.productId?.price * y?.quantity,
              0
            )}{" "}
            EGP
          </h6>
          {state.cart?.data[0]?.map((product) => (
            <div
              key={product.productId._id}
              className="row border-bottom py-3 "
            >
              <div className="col-md-1">
                <img
                  src={product?.productId.mainImage.map((e) => e)}
                  className="w-100"
                  alt=""
                />
              </div>
              <div className="col-md-11">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="textTitle">
                      {/* {product?.productId?.title.split(" ").slice(0, 3).join(" ")} */}
                      {product?.productId?.title}
                    </h3>
                    <h6 className="text-main">
                      Price : {product?.productId?.price} EGP
                    </h6>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        updateCountProduct(product?.productId?._id, 1)
                      }
                      className="border-main"
                    >
                      +
                    </button>
                    <span>{product?.quantity}</span>
                    <button
                      onClick={() => decrementCart(product?.productId?._id, 1)}
                      className="border-main"
                    >
                      -
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(product?.productId?._id)}
                  className="btn p-0 "
                >
                  <i className="fas fa-trash-can text-danger font-small mx-2 "></i>
                  Remove
                </button>
              </div>
              {product?.productId?._id === state.getId ? (
                <p className=" text-danger d-flex justify-content-end">
                  {" "}
                  {state.errorQntMas}{" "}
                </p>
              ) : (
                ""
              )}
            </div>
          ))}
          <div className=" text-center">
            <Link
              to={`/PaymentOnline`}
              className="btn bg-main text-white w-50 m-3"
            >
              checkout Order
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={
            state.loading
              ? `rounded-5 d-none bg-danger my-5 h1 fw-bolder  text-center text-white p-5`
              : `rounded-5  bg-danger my-5 h1 fw-bolder  text-center text-white p-3`
          }
        >
          Empty Cart
        </div>
      )}
    </>
  );
};

export default Cart;
