import React from "react";
import ApisPayment from "./ApisPayment";
const PaymentOnline = () => {
  const { formik, errorValidation } = ApisPayment();
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
                {errorValidation.includes("address") ? (
                  <div className="alert alert-danger p-1 mt-1  ">
                    Address is required
                  </div>
                ) : (
                  ""
                )}
                {formik.errors.address && formik.touched.address ? (
                  <div className="alert alert-danger p-1 mt-1" role="alert">
                    {" "}
                    {formik.errors.address}{" "}
                  </div>
                ) : (
                  ""
                )}
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
                {errorValidation.includes("phone") ? (
                  <div className="alert alert-danger text-danger rounded-1 p-2  ">
                    phone is required
                  </div>
                ) : (
                  ""
                )}
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="alert alert-danger p-1 mt-1" role="alert">
                    {" "}
                    {formik.errors.phone}{" "}
                  </div>
                ) : (
                  ""
                )}
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
