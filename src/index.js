import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import App from "./Component/App/App";
import ContainerContextProvider from "./Component/Context/Context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
let query = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <ContainerContextProvider>
        <App />
      </ContainerContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
