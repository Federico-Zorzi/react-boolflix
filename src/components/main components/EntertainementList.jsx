export default function EntertainementList({
  name,
  nameAttributes,
  entertainementList,
  isLoading,
  printCard,
}) {
  return (
    <section className={nameAttributes + "-section"}>
      <h2 className="py-3">{name}</h2>

      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {entertainementList &&
          Array.isArray(entertainementList) &&
          entertainementList.length > 0 ? (
            entertainementList.map((entertainementItem) =>
              printCard({
                id: entertainementItem.id,
                title: entertainementItem.title,
                original_title: entertainementItem.original_title,
                original_language: entertainementItem.original_language,
                vote_average: entertainementItem.vote_average,
                overview: entertainementItem.overview,
                poster_path: entertainementItem.poster_path,
              })
            )
          ) : (
            <p>No {name} founded </p>
          )}
        </div>
      )}
    </section>
  );
}
