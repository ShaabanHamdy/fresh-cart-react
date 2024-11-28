import { useFormik } from "formik";
import React, { useContext } from "react";
import { ContainerContext } from "../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentOnline = () => {
  const { userToken, baseUrl } = useContext(ContainerContext);
  let navigate = useNavigate();
  const handelSubmit = async (values) => {
    return await axios
      .post(`${baseUrl}/order/createOrder`, values, {
        headers: {
          auth: userToken,
        },
      })
      .then((response) => {
        if (response?.data.message) {
          return (window.location.href = response?.data?.url);
        }
      })
      .catch((err) => console.log(err?.response?.data.Error));
  };

  let formik = useFormik({
    initialValues: {
      address: "",
      phone: "",
      note: "",
    },
    onSubmit: handelSubmit,
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 p-5">
            <div className="w-75 m-auto">
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="address">Address :</label>
                <textarea
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  className=" form-control mb-2"
                  name="address"
                  id="address"
                />

                <label htmlFor="phone">Phone :</label>
                <input
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="tel"
                  className=" form-control mb-2"
                  name="phone"
                  id="phone"
                />

                <label htmlFor="note">Note :</label>
                <textarea
                  placeholder="if you have notes"
                  value={formik.values.note}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  className=" form-control mb-2"
                  name="note"
                  id="note"
                />

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn bg-main text-white  ">
                    pay now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentOnline;
