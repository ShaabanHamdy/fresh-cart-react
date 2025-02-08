import React, { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ReactImageMagnify from "react-image-magnify";
import { ContainerContext } from "../Context/Context";
import ApisProductDetails from "./ApisProductDetails";

const ProductDetails = () => {
  let { state, dispatch } = useContext(ContainerContext);
  const { SpecificProduct, addProductToCart } = ApisProductDetails();
  useEffect(() => {
    SpecificProduct();
  }, [SpecificProduct]);
  // ======================================================================================================
  return (
    <>
      <div className="container">
        <div className="row py-5 m-1 align-items-center">
          <div className="col-md-5 py-5 d-flex">
            <div className="w-25">
              {state.data?.subImages?.map((elm, index) => (
                <img
                  onClick={() =>
                    dispatch({
                      type: "SET_STATE",
                      field: "coverImage",
                      value: elm,
                    })
                  }
                  key={index}
                  className="w-75 m-2 cursor-pointer"
                  src={elm}
                  alt={state.data?.title}
                />
              ))}
            </div>
            <div className="w-100">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: state.data?.title,
                    isFluidWidth: true,
                    src: state.coverImage,
                  },
                  largeImage: {
                    src: state.coverImage,
                    width: 1000,
                    height: 1000,
                  },
                }}
              />
            </div>
          </div>
          <div className="col-md-7  ">
            <div>
              <h2 className="h5">{state.data?.title}</h2>
              <p>{state.data?.description}</p>
              <h3 className="text-main h5">{state.data?.categoryId?.name}</h3>
              <h3 className="text-main h5">Price : {state.data?.price} EGP</h3>
              <div className=" d-flex justify-content-between">
                <span>ratingQuantity : 5 </span>
                <span>
                  <i className="fas fa-star rating-color"></i>{" "}
                  {state.data?.ratingAverage}
                </span>
              </div>
              <div className=" my-2 d-flex ">
                <label>Quantity:</label>
                <input
                  className="form-control mx-2 w-25 d-flex"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_STATE",
                      field: "getQntValue",
                      value: e.target.value,
                    })
                  }
                  value={state.getQntValue}
                  type="number"
                ></input>
              </div>
              {state.errorQntMas ? (
                <p className=" text-danger">{state.errorQntMas}</p>
              ) : (
                ""
              )}
              <button
                onClick={() => addProductToCart(state.data?._id)}
                className="btn bg-main text-white w-100 my-3"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default ProductDetails;
