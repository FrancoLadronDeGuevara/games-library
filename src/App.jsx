import "./App.css";

import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  AboutUsPage,
  ContactPage,
  BrowsePage,
  GameDetailsPage,
  NotFound,
} from "@/pages";

import { Layout } from "@/components";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/game/:id" element={<GameDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
