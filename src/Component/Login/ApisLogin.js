import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ContainerContext } from "../Context/Context";

const ApisLogin = () => {
  let { baseUrl, setUserToken } = useContext(ContainerContext);
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  // ================================================================
  const handleOnSubmit = async (values) => {
    setLoading(true);
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
  return {
    showError,
    formik,
    loading,
    error,
  };
};

export default ApisLogin;
