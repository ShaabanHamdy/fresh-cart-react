import React from "react";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlide from "../mainSlide/MainSlide";
import FeaturedProducts from "../Products/FeaturedProducts";

const Home = () => {
  return (
    <>
      <MainSlide />
      <CategorySlider />
      <FeaturedProducts />
    </>
  );
};

export default Home;
