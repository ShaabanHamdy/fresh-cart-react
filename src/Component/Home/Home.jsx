import React from "react";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlide from "../mainSlide/MainSlide";
import FeaturedProducts from "../Products/FeaturedProducts";
// import Counter from "./test/Counter";

const Home = () => {
  return (
    <>

      {/* <Counter /> */}
      <MainSlide />
      <CategorySlider />
      <FeaturedProducts />
    </>
  );
};

export default Home;
