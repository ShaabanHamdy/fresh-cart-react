import { useContext, useEffect, useState } from "react";
import freshCart from "../images/freshCartLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ContainerContext } from "../Context/Context";
import style from "./navbar.module.css"
const Navbar = () => {
  let { calcCount,setCalcCount, userToken, setUserToken } = useContext(ContainerContext);
  let navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    setUserToken(null);
    setCalcCount(0)
    navigate("/login");
  };

  
  return (
    <>
      <nav className="navbar navbar-expand-lg position-fixed w-100 z-3 top-0 navbar-light bg-light">
        <div className="container-fluid">
          <div>
            <img src={freshCart} className="w-100" alt="fresh market logo" />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/Cart"}>
                  Cart
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/Products"}>
                  Products
                </Link>
              </li>
            </ul>
            <div className=" position-relative d-flex justify-content-end  w-50">
              <div className=" cursor-pointer">
                <Link to={"/Cart"}>
                  <i className="fas fa-cart-shopping text-main  fs-2 d-flex justify-content-center align-items-center h-100"></i>
                  <span className={`${style.spanSmall} spanSmall badge`}>{calcCount}</span>
                </Link>
              </div>
            </div>
            {/* ================================================================================================= */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userToken !== null ? (
                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={logout}>
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Register"}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {/* ==================================== */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
