import { createContext, useContext } from "react";

const MoviesContext = createContext();

//* export context for consumers
export const useMoviesContext = () => useContext(MoviesContext);

//* export context for provider
export const MoviesContextProvider = ({ children }) => {
  const backendPath = import.meta.env.VITE_BACKEND_URL;

  const fetchSearch = () => {};

  const ContextData = {
    movies,
    series,
    search: fetchSearch,
    isLoading,
    selectGenre,
    setSelectGenre,
  };

  return (
    <MoviesContext.Provider value={MoviesData}>
      {children}
    </MoviesContext.Provider>
  );
};
