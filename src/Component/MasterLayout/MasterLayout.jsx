import React, { useContext, useEffect } from "react";
import { Offline, Online } from "react-detect-offline";
import { Outlet } from "react-router-dom";
import { ContainerContext } from "../Context/Context";
import Navbar from "../Navbar/Navbar";
import OfflineComponent from "../OfflineComponent/OfflineComponent";

const MasterLayout = () => {
  let {  dispatch } = useContext(ContainerContext);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch({
        type: "SET_STATE",
        field: "userToken",
        value: localStorage.getItem("token"),
      });
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <Online>
          <Outlet />
        </Online>
      </div>
      <div>
        <Offline>
          <OfflineComponent />
        </Offline>
      </div>
    </>
  );
};

export default MasterLayout;
