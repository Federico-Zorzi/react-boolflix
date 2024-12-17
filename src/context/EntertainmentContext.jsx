import { createContext, useContext, useState } from "react";

const EntertainmentContext = createContext();

//* export context for consumers
export const useEntertainmentContext = () => useContext(EntertainmentContext);

//* export context for provider
export const EntertainmentContextProvider = ({ children }) => {
  const apiPath = "https://api.themoviedb.org/3/search";
  const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGFkYzZhN2M1Mjc0MGI1MGRjY2MzYzQ2YzFkODVmNSIsIm5iZiI6MTczNDM0MDI2Ny4xNjgsInN1YiI6IjY3NWZlZWFiNWJkM2M3MmE4MmMxYzExYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gSItpMlGqXKWPWwj8y_NVsW-APqIBzj80I_pJY2wR_E";

  const [moviesList, setMoviesList] = useState(null);
  const [seriesList, setSeriesList] = useState(null);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isLoadingSeries, setIsLoadingSeries] = useState(false);

  const fetchSearch = (e, formData) => {
    e.preventDefault();
    setIsLoadingMovies(true);
    setIsLoadingSeries(true);

    const urlMovies = `${apiPath}/movie?query=${formData.title}`;
    const urlSeries = `${apiPath}/tv?query=${formData.title}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    };

    fetch(urlMovies, options)
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

    fetch(urlSeries, options)
      .then((res) => res.json())
      .then((data) => {
        //* take array of movies
        const { results } = data;

        //* mapping for take only essential information
        const seriesList = results.map((serie) => {
          const {
            id,
            name,
            original_name,
            original_language,
            overview,
            poster_path,
            vote_average,
          } = serie;

          return {
            id,
            title: name,
            original_title: original_name,
            original_language,
            overview,
            poster_path,
            vote_average,
          };
        });

        setSeriesList(seriesList);
        setIsLoadingSeries(false);
      })
      .catch((err) => console.error(err));
  };

  const entertainmentContextData = {
    movies: moviesList,
    series: seriesList,
    search: fetchSearch,
    isLoadingMovies,
    isLoadingSeries,
  };

  return (
    <EntertainmentContext.Provider value={entertainmentContextData}>
      {children}
    </EntertainmentContext.Provider>
  );
};
