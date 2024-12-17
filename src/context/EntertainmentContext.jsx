import { createContext, useContext, useState } from "react";

const EntertainmentContext = createContext();

//* export context for consumers
export const useEntertainmentContext = () => useContext(EntertainmentContext);

//* export context for provider
export const EntertainmentContextProvider = ({ children }) => {
  const apiPath = "https://api.themoviedb.org/3/search";
  const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGFkYzZhN2M1Mjc0MGI1MGRjY2MzYzQ2YzFkODVmNSIsIm5iZiI6MTczNDM0MDI2Ny4xNjgsInN1YiI6IjY3NWZlZWFiNWJkM2M3MmE4MmMxYzExYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gSItpMlGqXKWPWwj8y_NVsW-APqIBzj80I_pJY2wR_E";

  const [defultMoviesList, setDefaultMoviesList] = useState([]);
  const [defultSeriesList, setDefaultSeriesList] = useState([]);

  const [moviesList, setMoviesList] = useState(null);
  const [seriesList, setSeriesList] = useState(null);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isLoadingSeries, setIsLoadingSeries] = useState(false);

  //* search movies & series by searchbar
  const fetchSearch = (e, formData, setFormData) => {
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
            genre_ids,
          } = movie;

          return {
            id,
            title,
            original_title,
            original_language,
            overview,
            poster_path,
            vote_average,
            genre: genre_ids,
          };
        });

        setMoviesList(moviesList);
        setDefaultMoviesList(moviesList);
        setIsLoadingMovies(false);

        //* reinizialization form data
        const defaultFormData = {
          title: "",
          genre: "",
        };
        setFormData(defaultFormData);
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
            genre_ids,
          } = serie;

          return {
            id,
            title: name,
            original_title: original_name,
            original_language,
            overview,
            poster_path,
            vote_average,
            genre: genre_ids,
          };
        });

        setSeriesList(seriesList);
        setDefaultSeriesList(seriesList);
        setIsLoadingSeries(false);
      })
      .catch((err) => console.error(err));
  };

  //* filter movies & series by genre
  const selectGenre = (id) => {
    let moviesListFiltered = defultMoviesList;
    let seriesListFiltered = defultSeriesList;

    if (defultMoviesList && id) {
      moviesListFiltered = defultMoviesList.filter((movie) =>
        movie.genre.includes(parseInt(id))
      );

      setMoviesList(moviesListFiltered);
    } else setSeriesList(defultSeriesList);

    if (defultSeriesList && id) {
      seriesListFiltered = defultSeriesList.filter((serie) =>
        serie.genre.includes(parseInt(id))
      );

      setSeriesList(seriesListFiltered);
    } else setMoviesList(defultMoviesList);
  };

  //* context data for App
  const entertainmentContextData = {
    movies: moviesList,
    series: seriesList,
    isLoadingMovies,
    isLoadingSeries,
    selectGenre,
    search: fetchSearch,
    defultMoviesList,
    defultSeriesList,
  };

  return (
    <EntertainmentContext.Provider value={entertainmentContextData}>
      {children}
    </EntertainmentContext.Provider>
  );
};
