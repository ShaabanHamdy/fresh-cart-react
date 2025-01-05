import ApisRegister from "./ApisRegister";

const Register = () => {
  const { formik, showBackErrors, loading, error } = ApisRegister();

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
