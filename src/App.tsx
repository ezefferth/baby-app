import { BrowserRouter } from "react-router-dom";
import Router from "./src/components/router";
import { ProgressProvider } from "./src/components/context/progressContext";
import { DataProvider } from "./src/components/context/data";
import ProgressBar from "./src/components/progressBar";
import Music from "./src/components/music";

function App() {
  return (
    <>
      <BrowserRouter>
        <ProgressProvider>
          <DataProvider>
            <Router />
            <Music />
            <ProgressBar />
          </DataProvider>
        </ProgressProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
