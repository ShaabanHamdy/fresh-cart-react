import Swal from "sweetalert2";

const sweetAlertError = (tokenMsg) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: tokenMsg,
  });
};
const sweetAlertErrorQuantity = (tokenMsg) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: tokenMsg,
  });
};
export { sweetAlertErrorQuantity, sweetAlertError };
