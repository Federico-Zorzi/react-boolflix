//* import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//* import context provider
import { EntertainmentContextProvider } from "./context/EntertainmentContext";

import DefaultLayout from "./layouts/DefaultLayout";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <EntertainmentContextProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route index Component={HomePage} />
            </Route>
          </Routes>
        </BrowserRouter>
      </EntertainmentContextProvider>
    </>
  );
}

export default App;
