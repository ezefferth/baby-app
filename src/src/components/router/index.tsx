import { Route, Routes } from "react-router-dom";

import Page1 from "../../pages/page1";
import Page2 from "../../pages/page2";
import Page3 from "../../pages/page3";
import Page4 from "../../pages/page4";
import Page5 from "../../pages/page5";
import Page6 from "../../pages/page6";
import Page7 from "../../pages/page7";

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Page1 />}
      />
      <Route
        path="/2"
        element={<Page2 />}
      />
      <Route
        path="/3"
        element={<Page3 />}
      />
      <Route
        path="/4"
        element={<Page4 />}
      />
      <Route
        path="/5"
        element={<Page5 />}
      />
      <Route
        path="/6"
        element={<Page6 />}
      />
      <Route
        path="/7"
        element={<Page7 />}
      />
    </Routes>
  );
}
