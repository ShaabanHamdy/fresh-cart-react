import React from "react";
import FeaturedProducts from "../Products/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlide from "../mainSlide/MainSlide";

const Home = () => {
  
  return (
    <>
    <MainSlide/>
      <CategorySlider />
      <FeaturedProducts />
    </>
  );
};

export default Home;
