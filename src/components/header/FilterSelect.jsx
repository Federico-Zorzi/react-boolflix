import { useState, useEffect } from "react";
import { useEntertainmentContext } from "../../context/EntertainmentContext";

export default function FilterSelect({ handleFormData, formData }) {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGFkYzZhN2M1Mjc0MGI1MGRjY2MzYzQ2YzFkODVmNSIsIm5iZiI6MTczNDM0MDI2Ny4xNjgsInN1YiI6IjY3NWZlZWFiNWJkM2M3MmE4MmMxYzExYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gSItpMlGqXKWPWwj8y_NVsW-APqIBzj80I_pJY2wR_E",
    },
  };

  const { selectGenre } = useEntertainmentContext();

  const [genresList, setGenresList] = useState([]);

  const categoriesList = () => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        const { genres } = data;
        setGenresList(genres);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => categoriesList(), []);

  useEffect(() => selectGenre(formData.genre), [formData.genre]);

  return (
    <select
      className="form-select me-2"
      aria-label="Default select example"
      value={formData.genre}
      onChange={handleFormData}
      name="genre"
    >
      <option value="">Select genre...</option>
      {genresList && Array.isArray(genresList)
        ? genresList.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))
        : ""}
    </select>
  );
}
