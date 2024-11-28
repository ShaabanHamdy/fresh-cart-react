import React from "react";
import ErrorImage from "../images/error.svg";

const NotFound = () => {
  return (
    <div>
      <div className=" p-5  d-flex justify-content-center">
       <div className="  text-center">

        <p className="h1 text-main fw-bolder">Page Not Found</p>
        <img className="w-100" src={ErrorImage} alt="" />
       </div>
      </div>
    </div>
  );
};

export default NotFound;
