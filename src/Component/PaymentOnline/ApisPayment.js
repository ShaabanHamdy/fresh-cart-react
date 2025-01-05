import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { ContainerContext } from "../Context/Context";
const ApisPayment = () => {
  let [errorValidation, setErrorValidation] = useState("");
  const { handelSubmitPayment } = useContext(ContainerContext);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let validationSchema = Yup.object({
    address: Yup.string().required("address is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("phone is required"),
  });

  const handelSubmit = async (values) => {
    let data = await handelSubmitPayment(values);
    setErrorValidation(data);
  };

  let formik = useFormik({
    initialValues: {
      address: "",
      phone: "",
      note: "",
    },
    validationSchema,
    onSubmit: handelSubmit,
  });
  return {
    formik,
    errorValidation,
  };
};

export default ApisPayment;
