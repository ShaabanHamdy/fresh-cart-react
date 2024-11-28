import React from "react";
import Slider from "react-slick";

import img1 from "../images/grocery-banner-2.jpeg";
import img2 from "../images/grocery-banner.png";
import img3 from "../images/slider-2.jpeg";
import img4 from "../images/slider-image-1.jpeg";
import img5 from "../images/slider-image-2.jpeg";
import img6 from "../images/slider-image-3.jpeg";


const MainSlide = () => {
  var settings = {
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1500,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  return (
    <>

      <div className="container py-5">
        <div className="row gx-0">
          <div className="col-md-9 ">
       <Slider {...settings}>
        
            <img height={400} src={img1} className="slidImage w-100" alt="slidImage" />
            <img height={400} src={img3} className="slidImage w-100" alt="slidImage" />
            <img height={400} src={img4} className="slidImage w-100" alt="slidImage" />
            <img height={400} src={img6} className="slidImage w-100" alt="slidImage" />
        
      </Slider> 


          </div>

          <div className="col-md-3 ">
            <img height={200} src={img5} className="w-100" alt="" />
            <img height={200} src={img2} className="w-100" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSlide;
