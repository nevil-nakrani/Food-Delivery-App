import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      newestOnTop={true}
      closeOnClick
      pauseOnFocusLoss
      draggable
    />
  </BrowserRouter>
);
