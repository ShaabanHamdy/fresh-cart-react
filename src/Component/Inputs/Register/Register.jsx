import { useContext } from "react";
import { ContainerContext } from "../../Context/Context";
import { Inputs } from "../Inputs";
import ApisRegister from "./ApisRegister";

const Register = () => {
  const { formik, showBackErrors } = ApisRegister();
   const { state } =
      useContext(ContainerContext);

  return (
    <>
      <div className="formControl m-auto w-75 p-5">
        <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="my-3">
            <Inputs>
              {/* name */}
              <Inputs.Name formik={formik} />
              {/* email */}
              <Inputs.Email
                formik={formik}
                showBackErrors={showBackErrors}
                error={state.error}
              />
              {/* phone */}
              <Inputs.Phone formik={formik} />
              {/* Password */}
              <Inputs.Password formik={formik} />
            </Inputs>
          </div>
          <div className=" d-flex justify-content-end">
            <Inputs>
              <Inputs.Btn
                formik={formik}
                loading={state.loading}
                btName={"Register"}
              />
            </Inputs>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
