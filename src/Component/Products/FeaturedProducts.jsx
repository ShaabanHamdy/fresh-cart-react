import React from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import ApisFeatured from "./ApisFeatured";
const FeaturedProducts = () => {
  const { isLoading, addProductToCart, data } = ApisFeatured();
  // ====================================================

  return (
    <>
      {isLoading ? (
        <div className="min-vh-100 d-flex  justify-content-center align-items-center">
          <i className="fas fa-spinner fa-spin text-main  fs-1"></i>
        </div>
      ) : (
        <div className="container py-2">
          <h2 className="m-4 text-main">Features Products</h2>
          <div className="row">
            {data?.data?.data.slice(2, 8).map((product) => (
              <div key={product._id} className="col-lg-2 col-md-3 col-sm-4">
                <div className="product cursor-pointer py-3 px-2">
                  <Link to={`/productDetails/${product._id}`}>
                    <img
                      className="w-100"
                      src={product.mainImage.map((i) => i)}
                      alt={product.title}
                    />
                    <span className="text-main font-sm fw-bold">
                      {product.categoryId.name}
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

export default FeaturedProducts;
