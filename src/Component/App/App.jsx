import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Cart from "../Cart/Cart";
import Home from "../Home/Home";
import MasterLayout from "../MasterLayout/MasterLayout";
import NotFound from "../NotFound/NotFound";
import PaymentOnline from "../PaymentOnline/PaymentOnline";
import Products from "../Products/Products";
import ProductDetails from "../productDetails/ProductDetails";
import Login from "../Inputs/Login/Login";
import Register from "../Inputs/Register/Register";

const App = () => {
  const routes = createHashRouter([
    {
      path: "/",
      element: <MasterLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "Cart", element: <Cart /> },
        { path: "Products", element: <Products /> },
        { path: "Login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "PaymentOnline", element: <PaymentOnline /> },
        { path: "productDetails/:id", element: <ProductDetails /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
