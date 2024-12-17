import EntertainementList from "../components/main components/EntertainementList";

import { useEntertainmentContext } from "../context/EntertainmentContext";

import Card from "../components/main components/Card";

export default function HomePage() {
  //* print cards function
  const printCard = ({
    id,
    title,
    original_title,
    original_language,
    vote_average,
    overview,
    poster_path,
  }) => {
    return (
      <div key={id} className="col">
        <Card
          title={title}
          originalTitle={original_title}
          originalLanguage={original_language}
          vote={vote_average}
          overview={overview}
          posterImage={poster_path}
        ></Card>
      </div>
    );
  };

  //* variables from context for print cards
  const { movies, series, isLoadingMovies, isLoadingSeries } =
    useEntertainmentContext();

  return (
    <main>
      <div className="container">
        <EntertainementList
          name="Movies"
          nameAttributes="movies"
          entertainementList={movies}
          isLoading={isLoadingMovies}
          printCard={printCard}
        ></EntertainementList>

        <EntertainementList
          name="Series"
          nameAttributes="series"
          entertainementList={series}
          isLoading={isLoadingSeries}
          printCard={printCard}
        ></EntertainementList>
      </div>
    </main>
  );
}
