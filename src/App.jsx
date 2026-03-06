import "./App.css";

import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  AboutUsPage,
  ContactPage,
  PcGamesPage,
  WebBrowserGamesPage,
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
          <Route path="/pc-games" element={<PcGamesPage />} />
          <Route path="/web-games" element={<WebBrowserGamesPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
