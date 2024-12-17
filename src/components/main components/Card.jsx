export default function Card({
  title,
  originalTitle,
  originalLanguage,
  vote,
  overview,
  posterImage,
}) {
  //* function languages flags management
  const languagesManagement = (language) => {
    let newLang = language;

    if (newLang == "en") newLang = "GB";
    if (newLang == "sv") newLang = "SE";
    if (newLang == "hi") newLang = "IN";
    if (newLang == "ja") newLang = "JP";
    if (newLang == "zh") newLang = "CN";

    return newLang.toUpperCase();
  };

  const rateStarsConversion = (rate) => {
    let decodStars = [];
    const numbTrunc = Math.trunc(rate / 2);
    const numOfStars = Math.round(rate / 2);

    for (let i = 1; i <= 5; i++) {
      if (i <= numOfStars) {
        if (i == numOfStars && rate / 2 - numbTrunc >= 0.5) {
          decodStars.push("semi-empty");
        } else {
          decodStars.push("full");
        }
      } else {
        decodStars.push("empty");
      }
    }

    return decodStars;
  };

  const posterPath = "https://image.tmdb.org/t/p/w342";

  const language = languagesManagement(originalLanguage);
  const flagImgPath = `https://flagsapi.com/${language}/flat/64.png`;
  const startsConv = rateStarsConversion(vote);

  return (
    <div className="card h-100">
      <div className="overlay h-100">
        {posterImage ? (
          <img
            src={`${posterPath}${posterImage}`}
            className="card-img-top img-fluid rounded h-100"
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
        <div className="rate text-center pb-2">
          {startsConv && Array.isArray(startsConv)
            ? startsConv.map((star, index) => {
                if (star === "full") {
                  return <i key={index} className="fa-solid fa-star"></i>;
                } else if (star === "empty") {
                  return <i key={index} className="fa-regular fa-star"></i>;
                } else
                  return (
                    <i key={index} className="fa-solid fa-star-half-stroke"></i>
                  );
              })
            : ""}
        </div>
        <p className="card-text">{overview}</p>
      </div>
    </div>
  );
}
