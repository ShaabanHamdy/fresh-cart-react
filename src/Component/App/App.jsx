import React from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import MasterLayout from "../MasterLayout/MasterLayout";
import Home from "../Home/Home";
import Cart from "../Cart/Cart";
import Products from "../Products/Products";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ProductDetails from "../productDetails/ProductDetails";
import PaymentOnline from "../PaymentOnline/PaymentOnline";


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
