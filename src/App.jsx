//* import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//* import context provider
import { MoviesContextProvider } from "./context/MoviesContext";

import DefaultLayout from "./layouts/DefaultLayout";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <MoviesContextProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route index Component={HomePage} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MoviesContextProvider>
    </>
  );
}

export default App;
