import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { FaChevronRight, FaPlayCircle, FaPlus, FaStar } from "react-icons/fa";
import { Skeleton } from "@mui/material";
import { Slider } from "@mui/base";

function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();



  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios.get(
          `https://www.omdbapi.com/?apikey=59334251&i=${id}`
        );
        setMovie(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    fetchMovie();
  }, [id]);

  const handleGoBack = () => {
    const storedSearchResults = localStorage.getItem("searchResults");
    const searchResults = storedSearchResults
      ? JSON.parse(storedSearchResults)
      : [];
    navigate("/search", { state: { displayedData: searchResults } });
  };

  useEffect(() => {
    const storedSearchResults = localStorage.getItem("searchResults");
    const searchResults = storedSearchResults
      ? JSON.parse(storedSearchResults)
      : [];
    localStorage.setItem("searchResults", JSON.stringify(searchResults));
  }, []);

  useEffect(() => {
    const displayedData = location.state?.displayedData || [];
    localStorage.setItem("searchResults", JSON.stringify(displayedData));
  }, [location.state?.displayedData]);

  if (!movie) {
    return loading && <Skeleton />;
  }

  return (
    <div className="container__movieinfo">
      <div className="row">
        <Link to="/search" onClick={handleGoBack} className="movie__link">
          <ArrowLeftIcon className="arrow-left" />
        </Link>
        <div className="movie--overall__wrapper">
          <div className="movie--content__wrapper">
            <div className="movie--title__wrapper">
              {loading ? (
                <Skeleton
                  width={300}
                  height={40}
                  sx={{ bgcolor: "grey.600" }}
                />
              ) : (
                <>
                  <h2 className="movie__title">{movie.Title}</h2>
                  <p className="movie__year">({movie.Year})</p>
                </>
              )}
            </div>
            {loading ? (
              <Skeleton width={150} height={40} sx={{ bgcolor: "grey.600" }} />
            ) : (
              <p className="movie--genre">
                <b>Genre - </b> {movie.Genre}
              </p>
            )}
            {loading ? (
              <Skeleton width={100} height={40} sx={{ bgcolor: "grey.600" }} />
            ) : (
              <p className="ratings__wrapper">
                <b>
                  {" "}
                  <FaStar className="star" />
                </b>{" "}
                {movie.imdbRating} / 10
              </p>
            )}
          </div>
          <div className="movie--details__wrapper">
            <div className="movie--subtitle movie--subtitle__margin-right">
              {loading ? (
                <Skeleton width={60} height={25} sx={{ bgcolor: "grey.600" }} />
              ) : (
                <b>Running Time</b>
              )}
              {loading ? (
                <Skeleton width={80} height={25} sx={{ bgcolor: "grey.600" }} />
              ) : (
                <div className="movie--info__wrapper">
                  {movie.Runtime} <FaChevronRight />
                </div>
              )}
            </div>
            <div className="movie--subtitle movie--subtitle__margin-right box-office">
              {loading ? (
                <Skeleton width={60} height={25} sx={{ bgcolor: "grey.600" }} />
              ) : (
                <b>Box Office</b>
              )}
              {loading ? (
                <Skeleton width={80} height={25} sx={{ bgcolor: "grey.600" }} />
              ) : (
                <div className="movie--info__wrapper">
                  {movie.BoxOffice} <FaChevronRight />
                </div>
              )}
            </div>
            <div className="movie--subtitle">
              {loading ? (
                <Skeleton width={60} height={25} sx={{ bgcolor: "grey.600" }} />
              ) : (
                <b>Released</b>
              )}
              {loading ? (
                <Skeleton width={80} height={25} sx={{ bgcolor: "grey.600" }} />
              ) : (
                <div className="movie--info__wrapper">{movie.Released}</div>
              )}
            </div>
          </div>
        </div>
        <div className="border__line"></div>
        <div className="movie-info__container">
          <div className="movie-info">
            <figure className="movie-info--poster__wrapper">
              {loading ? (
                <Skeleton
                  width={350}
                  height={840}
                  sx={{
                    bgcolor: "grey.600",
                    marginTop: "-120px", // Adjust this value as needed
                  }}
                />
              ) : (
                <img className="movie-info--poster" src={movie.Poster} alt="" />
              )}
            </figure>

            <div className="movie__content--wrapper">
              <p className="movie__description movie__mb">
                {loading ? (
                  <Skeleton
                    width={60}
                    height={25}
                    sx={{ bgcolor: "grey.600" }}
                  />
                ) : (
                  <b>Director:</b>
                )}
                {loading ? (
                  <Skeleton
                    width={160}
                    height={25}
                    sx={{ bgcolor: "grey.600" }}
                  />
                ) : (
                  <>{movie.Director}</>
                )}
              </p>
              <p className="movie__description movie__mb">
                {loading ? (
                  <Skeleton
                    width={60}
                    height={25}
                    sx={{ bgcolor: "grey.600" }}
                  />
                ) : (
                  <b>Writers:</b>
                )}
                {loading ? (
                  <Skeleton
                    width={160}
                    height={25}
                    sx={{ bgcolor: "grey.600" }}
                  />
                ) : (
                  <>{movie.Writer}</>
                )}
              </p>
              <p className="movie__description movie__mb">
                {loading ? (
                  <Skeleton
                    width={60}
                    height={25}
                    sx={{ bgcolor: "grey.600" }}
                  />
                ) : (
                  <b>Actors:</b>
                )}
                {loading ? (
                  <Skeleton
                    width={160}
                    height={25}
                    sx={{ bgcolor: "grey.600" }}
                  />
                ) : (
                  <>{movie.Actors}</>
                )}
              </p>
              <p className="movie__description">
                {loading ? (
                  <Skeleton
                    width={60}
                    height={25}
                    sx={{ bgcolor: "grey.600" }}
                  />
                ) : (
                  <b>Plot:</b>
                )}
                {loading ? (
                  <>
                    <Skeleton
                      width={260}
                      height={25}
                      sx={{ bgcolor: "grey.600" }}
                    />
                    <Skeleton
                      width={260}
                      height={25}
                      sx={{ bgcolor: "grey.600" }}
                    />
                    <Skeleton
                      width={260}
                      height={25}
                      sx={{ bgcolor: "grey.600" }}
                    />
                  </>
                ) : (
                  <>{movie.Plot}</>
                )}
              </p>
              {/* Render other movie details as needed */}
            </div>
          </div>
          <div className="btn__wrapper">
            {loading ? (
              <Skeleton width={300} height={100} sx={{ bgcolor: "grey.600" }} />
            ) : (
              <button className="btn__wishlist">
                <FaPlus className="plus--icon" /> Add to Wishlist
              </button>
            )}
            {loading ? (
              <Skeleton width={120} height={100} sx={{ bgcolor: "grey.600" }} />
            ) : (
              <button className="btn__watch-now">
                <FaPlayCircle className="play--icon" /> Play
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
