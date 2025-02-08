export const Inputs = ({ children }) => {
  return <>{children}</>;
};

Inputs.Email = ({ formik, showBackErrors, showError, error }) => {
  return (
    <div className="my-3">
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        className="form-control"
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email && (
        <div className="alert alert-danger p-1 mt-1" role="alert">
          {" "}
          {formik.errors.email}{" "}
        </div>
      )}
   

      {error === "email already exist" && showBackErrors("email already exist")}
      {error === "invalid email information" &&
        showBackErrors("invalid email information")}
    </div>
  );
};
Inputs.Name = ({ formik }) => {
  return (
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
      {formik.errors.name && formik.touched.name && (
        <div className="alert alert-danger p-1 mt-1" role="alert">
          {formik.errors.name}
        </div>
      )}
    </div>
  );
};
Inputs.Phone = ({ formik }) => {
  return (
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
      {formik.errors.phone && formik.touched.phone && (
        <div className="alert alert-danger p-1 mt-1" role="alert">
          {formik.errors.phone}
        </div>
      )}
    </div>
  );
};
Inputs.Password = ({ formik ,showBackErrors ,error}) => {
  return (
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
      {formik.errors.password && formik.touched.password && (
        <div className="alert alert-danger p-1 mt-1" role="alert">
          {formik.errors.password}
        </div>
      )}
      {error === "invalid password information" && showBackErrors("invalid password information")}
    </div>
  );
};
Inputs.Btn = ({ formik, loading, btName }) => {
  return (
    <button
      disabled={!(formik.isValid && formik.dirty)}
      type={loading ? "button" : "submit"}
      className="btn bg-main text-white mt-3"
    >
      {loading ? (
        <i className=" fas fa-spinner fa-spin"></i>
      ) : (
        <small>{btName}</small>
      )}
    </button>
  );
};
