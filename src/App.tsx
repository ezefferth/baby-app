import { BrowserRouter } from "react-router-dom";
import Router from "./src/components/router";
import { ProgressProvider } from "./src/components/context/progressContext";
import { DataProvider } from "./src/components/context/data";
import ProgressBar from "./src/components/progressBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <ProgressProvider>
          <DataProvider>
            <Router />
            <ProgressBar/>
          </DataProvider>
        </ProgressProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
