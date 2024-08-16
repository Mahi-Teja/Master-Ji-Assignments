import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserCard from "../src/components/Random-User/UserCard";
import { JokeTweet } from "../src/components/Random-Joke/JokeTweet";
import App from "../src/components/App";
import { CatListing } from "./components/Cat-Listing/CatListing";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserCard />} />
      <Route path="/random-user" element={<UserCard />} />
      <Route path="/random-joke" element={<JokeTweet />} />
      <Route path="/cats-listing" element={<CatListing />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
