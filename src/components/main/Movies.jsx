import { useEntertainmentContext } from "../../context/EntertainmentContext";

import Card from "./Card";

export default function Movies() {
  const { movies } = useEntertainmentContext();

  return (
    <section className="movies-section">
      <h2 className="py-3">Movies</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {movies && Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="col">
              <Card
                title={movie.title}
                originalTitle={movie.original_title}
                originalLanguage={movie.original_language}
                vote={movie.vote_average}
                overview={movie.overview}
                posterImage={movie.poster_path}
              ></Card>
            </div>
          ))
        ) : (
          <p>No movies founded </p>
        )}
      </div>
    </section>
  );
}
