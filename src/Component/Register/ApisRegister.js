import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ContainerContext } from "../Context/Context";

const ApisRegister = () => {
  const { baseUrl } = useContext(ContainerContext);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleOnSubmit = async (values) => {
    setLoading(true);
    const { data } = await axios
      .post(`${baseUrl}/user/signup`, values)
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data?.Error);
        return;
      });

    if (data?.message === "success") {
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
    let resultError = error === parameter;
    if (resultError) {
      return <div className=" alert alert-danger p-1 mt-1">{error}</div>;
    }
  };
  return {
    formik,
    showBackErrors,
    loading,
    error,
  };
};

export default ApisRegister;
