import { createContext, useContext, useState } from "react";

const EntertainmentContext = createContext();

//* export context for consumers
export const useEntertainmentContext = () => useContext(EntertainmentContext);

//* export context for provider
export const EntertainmentContextProvider = ({ children }) => {
  const apiPath = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [moviesList, setMoviesList] = useState(null);
  const [seriesList, setSeriesList] = useState(null);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  const fetchSearch = (e, formData) => {
    e.preventDefault();
    setIsLoadingMovies(true);

    const url = `${apiPath}?query=${formData.title}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        //* take array of movies
        const { results } = data;

        //* mapping for take only essential information
        const moviesList = results.map((movie) => {
          const {
            id,
            title,
            original_title,
            original_language,
            overview,
            poster_path,
            vote_average,
          } = movie;

          return {
            id,
            title,
            original_title,
            original_language,
            overview,
            poster_path,
            vote_average,
          };
        });

        setMoviesList(moviesList);
        setIsLoadingMovies(false);
      })
      .catch((err) => console.error(err));
  };

  const entertainmentContextData = {
    movies: moviesList,
    search: fetchSearch,
    isLoadingMovies,
  };

  return (
    <EntertainmentContext.Provider value={entertainmentContextData}>
      {children}
    </EntertainmentContext.Provider>
  );
};
