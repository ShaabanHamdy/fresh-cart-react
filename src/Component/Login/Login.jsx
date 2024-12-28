import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ContainerContext } from "../Context/Context";

const Login = () => {
  let { baseUrl, setUserToken } = useContext(ContainerContext);

  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  // ================================================================
  const handleOnSubmit = async (values) => {
    const { data } = await axios
      .post(`${baseUrl}/user/login`, values)
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data.Error);
        return;
      });
    if (data?.message === "success") {
      localStorage.setItem("token", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  };

  let validationSchema = Yup.object({
    email: Yup.string().email().required("email is required"),
    password: Yup.string()
      // .matches(
      //   /^[A-Z][a-z0-9]{5,20}$/,
      //   "Password should start With capital letter and more than 6 letters"
      // )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long."
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleOnSubmit,
  });
  // =========================================================================
  const showError = (parameter) => {
    let lastResult = error === parameter;
    if (lastResult) {
      return <div className=" alert alert-danger p-1 mt-2">{error}</div>;
    }
  };


  return (
    <>
      <div className=" formControl  m-auto w-75 p-5">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="my-3">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              className=" form-control"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {error ? showError("invalid email information") : ""}
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger p-1 mt-1" role="alert">
                {" "}
                {formik.errors.email}{" "}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="my-3">
            <label htmlFor="password">Password:</label>
            <input
              autoComplete="on"
              id="password"
              name="password"
              type="password"
              className=" form-control"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {error ? showError("invalid password information") : ""}
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger p-1 mt-1" role="alert">
                {" "}
                {formik.errors.password}{" "}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <Link
              to={"https://shaaban-hamdy-fresh-cart.netlify.app/#/Register"}
              className=" text-primary"
            >
              Go to Register
            </Link>
          </div>
          <div className=" d-flex justify-content-end">
            {loading ? (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="button"
                className="btn bg-main text-white mt-3"
              >
                <i className=" fas fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white mt-3"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
