import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ReactImageMagnify from "react-image-magnify";
import ApisProductDetails from "./ApisProductDetails";

const ProductDetails = () => {
  const {
    data,
    setCoverImage,
    getQntValue,
    setGetQntValue,
    coverImage,
    errorQntMas,
    SpecificProduct,
    addProductToCart,
  } = ApisProductDetails();
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
              {data?.subImages?.map((elm, index) => (
                <img
                  onClick={() => setCoverImage(elm)}
                  key={index}
                  className="w-75 m-2 cursor-pointer"
                  src={elm}
                  alt={data?.title}
                />
              ))}
            </div>
            <div className="w-100">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: data?.title,
                    isFluidWidth: true,
                    src: coverImage,
                  },
                  largeImage: {
                    src: coverImage,
                    width: 1000,
                    height: 1000,
                  },
                }}
              />
            </div>
          </div>
          <div className="col-md-7  ">
            <div>
              <h2 className="h5">{data?.title}</h2>
              <p>{data?.description}</p>
              <h3 className="text-main h5">{data?.categoryId?.name}</h3>
              <h3 className="text-main h5">Price : {data?.price} EGP</h3>
              <div className=" d-flex justify-content-between">
                <span>ratingQuantity : 5 </span>
                <span>
                  <i className="fas fa-star rating-color"></i>{" "}
                  {data?.ratingAverage}
                </span>
              </div>
              <div className=" my-2 d-flex ">
                <label>Quantity:</label>
                <input
                  className="form-control mx-2 w-25 d-flex"
                  onChange={(e) => setGetQntValue(e.target.value)}
                  value={getQntValue}
                  type="number"
                ></input>
              </div>
              {errorQntMas ? <p className=" text-danger">{errorQntMas}</p> : ""}
              <button
                onClick={() => addProductToCart(data?._id)}
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
