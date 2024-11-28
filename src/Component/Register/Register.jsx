import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ContainerContext } from "../Context/Context";

const Register = () => {
  const { baseUrl } = useContext(ContainerContext);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const handleOnSubmit = async (values) => {
    setLoading(true);
    const { data } = await axios
      .post(`${baseUrl}/user/signup`, values)
      .catch((err) => {
        return (
          setLoading(false),
          setError(err?.response?.data?.Error),
          console.log(err?.response?.data?.Error)
        );
      });

    if (data?.message == "success") {
      navigate("/login");
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "min name is 3 character")
      .max(10, "max name is 10 character")
      .required("name is required"),
    email: Yup.string().email().required("email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("phone is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password should start With capital letter and more than 6 letters"
      )
      .max(10, "max password is 10 character")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleOnSubmit,
  });
  const showBackErrors = (parameter) => {
    let resultError = error == parameter;
    if (resultError) {
      return <div className=" alert alert-danger p-1 mt-1">{error}</div>;
    }
  };
  return (
    <>
      <div className="formControl m-auto w-75 p-5">
        <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="my-3">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              className=" form-control"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="alert alert-danger p-1 mt-1" role="alert">
                {" "}
                {formik.errors.name}{" "}
              </div>
            ) : (
              ""
            )}
          </div>
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
            {error ? showBackErrors("email already exist") : ""}
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
            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className=" form-control"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger p-1 mt-1" role="alert">
                {" "}
                {formik.errors.phone}{" "}
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
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger p-1 mt-1" role="alert">
                {" "}
                {formik.errors.password}{" "}
              </div>
            ) : (
              ""
            )}
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
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
