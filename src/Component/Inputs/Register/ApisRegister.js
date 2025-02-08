import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ContainerContext } from "../../Context/Context";

const ApisRegister = () => {
  const { state, dispatch } = useContext(ContainerContext);
  let navigate = useNavigate();

  const handleOnSubmit = async (values) => {
    dispatch({ type: "SET_STATE", field: "loading", value: true });
    const { data } = await axios
      .post(`${state.baseUrl}/user/signup`, values)
      .catch((err) => {
        dispatch({
          type: "SET_MULTIPLE_STATES",
          payload: { loading: false, error: err?.response?.data?.Error },
        });
      });
      
      if (data?.message === "success") {
      dispatch({
        type: "SET_MULTIPLE_STATES",
        payload: { loading: false, error: null },
      });
      navigate("/login");
      return;
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long."
      )
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

  // ========================================================
  const showBackErrors = (parameter) => {
    let resultError = state.error === parameter;
    if (resultError) {
      return <div className=" alert alert-danger p-1 mt-1">{state.error}</div>;
    }
  };
  return {
    formik,
    showBackErrors,
  };
};

export default ApisRegister;
