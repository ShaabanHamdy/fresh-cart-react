/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { ContainerContext } from "../Context/Context";

const CategorySlider = () => {
  let { getCategorySlider } = useContext(ContainerContext);

  let { data } = useQuery("CategorySlider", getCategorySlider);
  let products = data?.data?.data;

  var settings = {
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1500,
    cssEase: "linear",
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  var settings2 = {
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1500,
    cssEase: "linear",
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <>
      {window.innerWidth > 500 ? (
        <Slider {...settings}>
          {products?.map((product) => (
            <div key={product._id} className="py-3">
              <img
                style={{
                  height: "300px",
                }}
                className="CategorySlider  w-100 p-2"
                src={product.image}
                alt="product.image"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <Slider {...settings2}>
          {products?.map((product) => (
            <div key={product._id} className="py-3">
              <img
                style={{
                  height: "300px",
                }}
                className="CategorySlider  w-100 p-2"
                src={product.image}
                alt="product.image"
              />
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};

export default CategorySlider;
