import { createContext, useContext, useState } from "react";

const MoviesContext = createContext();

//* export context for consumers
export const useMoviesContext = () => useContext(MoviesContext);

//* export context for provider
export const MoviesContextProvider = ({ children }) => {
  const apiPath = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [moviesList, setMoviesList] = useState(null);
  const [seriesList, setSeriesList] = useState(null);

  const fetchSearch = (e, formData) => {
    e.preventDefault();

    const url = `${apiPath}?query=${formData.title}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    };

    /*  0: Object { adult: false, backdrop_path: "/hziiv14OpD73u9gAak4XDDfBKa2.jpg", id: 671, … }
    ​​    adult: false
    ​​​    backdrop_path: "/hziiv14OpD73u9gAak4XDDfBKa2.jpg"
    ​​​    genre_ids: Array [ 12, 14 ]
    ​​​    id: 671
    ​​​    original_language: "en"
    ​​​    original_title: "Harry Potter and the Philosopher's Stone"
    ​​​    overview: "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths—and about the villain who's to blame."
    ​​​    popularity: 235.719
    ​​​    poster_path: "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg"
    ​​​    release_date: "2001-11-16"
    ​​​    title: "Harry Potter and the Philosopher's Stone"
    ​​​    video: false
    ​​​    vote_average: 7.908
    ​​​    vote_count: 27492 */

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

        console.log(moviesList);
        setMoviesList(moviesList);
      })
      .catch((err) => console.error(err));
  };

  const contextData = {
    movies: moviesList,
    search: fetchSearch,
  };

  return (
    <MoviesContext.Provider value={contextData}>
      {children}
    </MoviesContext.Provider>
  );
};
