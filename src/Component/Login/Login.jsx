import { Link } from "react-router-dom";
import ApisLogin from "./ApisLogin";

const Login = () => {
  const { showError, formik, loading, error } = ApisLogin();

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
