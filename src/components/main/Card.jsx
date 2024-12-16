export default function Card({
  title,
  originalTitle,
  originalLanguage,
  vote,
  overview,
  posterImage,
}) {
  //* function languages flags management
  function languagesManagement(language) {
    let newLang = language;

    if (newLang == "en") newLang = "GB";
    if (newLang == "sv") newLang = "SE";
    if (newLang == "hi") newLang = "IN";

    return newLang.toUpperCase();
  }

  function rateManagement(rate) {}

  const posterPath = import.meta.env.VITE_API_URL_POSTER_IMAGES;

  const language = languagesManagement(originalLanguage);
  const flagImgPath = `https://flagsapi.com/${language}/flat/64.png`;

  return (
    <div className="card h-100">
      <div className="overlay">
        {posterImage ? (
          <img
            src={`${posterPath}${posterImage}`}
            className="card-img-top img-fluid rounded"
          />
        ) : (
          <div className="rounded bg-white position-absolute w-100 h-100">
            <h2 className="position-absolute top-50 start-50 translate-middle fw-semibold">
              {title}
            </h2>
          </div>
        )}
      </div>

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6>({originalTitle})</h6>
        <div className="language text-center">
          <img src={flagImgPath} />
        </div>
        <div className="rate text-center pb-2">{vote}</div>
        <p className="card-text">{overview}</p>
      </div>
    </div>
  );
}
