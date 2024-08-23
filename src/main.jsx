import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import UniqueCode from "./UniqueCode";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/unique-code" element={<UniqueCode />} />{" "}
    </Routes>
  </BrowserRouter>
);
