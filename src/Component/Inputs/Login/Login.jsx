import { Link } from "react-router-dom";
import ApisLogin from "./ApisLogin";
import { Inputs } from "../Inputs";
import ApisRegister from "../Register/ApisRegister";
import { ContainerContext } from "../../Context/Context";
import { useContext } from "react";

const Login = () => {
  const { formik } = ApisLogin();
  const { showBackErrors } = ApisRegister();
  const { state } =
  useContext(ContainerContext);
  return (
    <>
      <div className=" formControl  m-auto w-75 p-5">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="my-3">
            <Inputs>
              {/* email */}
              <Inputs.Email
                formik={formik}
                showBackErrors={showBackErrors}
                error={state.error}
              />
              {/* Password */}
              <Inputs.Password formik={formik}  showBackErrors={showBackErrors}
                error={state.error}/>
            </Inputs>
            {/* {error ? showBackErrors("invalid password information") : ""} */}
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
            <Inputs>
              <Inputs.Btn formik={formik} loading={state.loading} btName={"Login"} />
            </Inputs>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
