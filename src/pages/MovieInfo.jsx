import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { FaChevronRight, FaPlayCircle, FaPlus, FaStar } from "react-icons/fa";

function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?apikey=59334251&i=${id}`
        );
        setMovie(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

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
    return <div>Loading...</div>;
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
              <h2 className="movie__title">{movie.Title}</h2>
              <p className="movie__year">({movie.Year})</p>
            </div>
            <p className="movie--genre">
              <b>Genre - </b> {movie.Genre}
            </p>
            <p className="ratings__wrapper">
              <b>
                {" "}
                <FaStar className="star" />
              </b>{" "}
              {movie.imdbRating} / 10
            </p>
          </div>
          <div className="movie--details__wrapper">
            <p className="movie--subtitle movie--subtitle__margin-right">
              <b>Running Time</b>
              <div className="movie--info__wrapper">
                {movie.Runtime} <FaChevronRight />
              </div>
            </p>
            <p className="movie--subtitle movie--subtitle__margin-right box-office">
              <b>Box Office</b>
              <div className="movie--info__wrapper">
                {movie.BoxOffice} <FaChevronRight />
              </div>
            </p>
            <p className="movie--subtitle">
              <b>Released</b>
              <div className="movie--info__wrapper">{movie.Released}</div>
            </p>
          </div>
        </div>
        <div className="border__line"></div>
        <div className="movie-info__container">
          <div className="movie-info">
            <figure className="movie-info--poster__wrapper">
              <img className="movie-info--poster" src={movie.Poster} alt="" />
            </figure>
            <div className="movie__content--wrapper">
              <p className="movie__description movie__mb">
                <b>Director:</b> {movie.Director}
              </p>
              <p className="movie__description movie__mb">
                <b>Writers:</b> {movie.Writer}
              </p>
              <p className="movie__description movie__mb">
                <b>Actors:</b> {movie.Actors}
              </p>
              <p className="movie__description">
                <b>Plot:</b> {movie.Plot}
              </p>
              {/* Render other movie details as needed */}
            </div>
          </div>
          <div className="btn__wrapper">
            <button className="btn__wishlist">
              <FaPlus className="plus--icon" /> Add to Wishlist
            </button>
            <button className="btn__watch-now">
              <FaPlayCircle className="play--icon" /> Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
