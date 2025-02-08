import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ContainerContext } from "../../Context/Context";

const ApisLogin = () => {
  let { state, dispatch } =
    useContext(ContainerContext);
  let navigate = useNavigate();
  // ================================================================
  const handleOnSubmit = async (values) => {
    
    dispatch({ type: "SET_STATE", field: "loading", value: true });
    const { data } = await axios
      .post(`${state.baseUrl}/user/login`, values)
      .catch((err) => {
        dispatch({
          type: "SET_MULTIPLE_STATES",
          payload: { loading: false, error: err?.response?.data?.Error },
        });
        // setLoading(false);
        // setError(err?.response?.data.Error);
        return;
      });
    if (data?.message === "success") {
      localStorage.setItem("token", data.token);
      dispatch({type:"SET_STATE",field:"userToken",value:data.token});
      navigate("/");
    }
  };

  let validationSchema = Yup.object({
    email: Yup.string().email().required("email is required"),
    password: Yup.string()
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
  
  return {
    formik,
  };
};

export default ApisLogin;
