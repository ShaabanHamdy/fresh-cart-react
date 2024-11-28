import axios from "axios";
import React, { useState } from "react";
import Slider from "react-slick";
import { useQuery } from "react-query";

const CategorySlider = () => {
  // let {quantitySlider , setQuantitySlider} = useState(7)
  const getCategorySlider = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  };

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
  console.log();
  return (
    <>
  {  window.innerWidth > 500 ? 
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
      : 
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
}
      
    </>
  );
};

export default CategorySlider;
