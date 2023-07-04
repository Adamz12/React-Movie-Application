import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import appLogo from "../assets/app-store.png";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCircleNotch, FaSpinner, FaTruckLoading } from "react-icons/fa/";
import { Bars } from "react-loading-icons";

function Searchbar() {
  const [films, setFilms] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [searchId1, setSearchId1] = useState("");
  const navigate = useNavigate();

  async function search() {
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=59334251&s=${searchId1}`
      );
      if (data.Response === "True") {
        setFilms(data.Search);
        console.log(data);
        navigate("/search", { state: { movies: data.Search, searchId1 } }); // Pass films as state to the search page
      } else {
        console.error("Search request failed:", data.Error);
      }
    } catch (error) {
      console.error("Search request failed:", error);
    }
  }

  useEffect(() => {
    if (clicked && searchId1) {
      search();
    }
  }, []);

  const handleClick = () => {
    if (!searchId1) {
      return null;
    }

    setClicked(true);

    setTimeout(() => {
      search();
      setClicked(false);
    }, 3000);
  };

  return (
    <div className="container">
      <div className="content__wrapper">
        <div className="border__line"></div>
        <h1 className="logo__title">DIAMOND HUB</h1>
        <h3 className="sub-title">
          Explore a Universe of Entertainment with just a Click
        </h3>
        <div className="searchbar__wrapper">
          <input
            type="search"
            placeholder="Search..."
            className="searchbar"
            onKeyPress={(event) => event.key === "Enter" && handleClick()}
            value={searchId1}
            onChange={(event) => setSearchId1(event.target.value)}
          ></input>
          <button
            onClick={handleClick}
            className="search__btn"
            disabled={!searchId1}
          >
            {clicked ? (
              <FaCircleNotch className="loading__state" />
            ) : (
              <MagnifyingGlassIcon className="search__icon" />
            )}
          </button>
        </div>
        <div className="results__container">
          {clicked && (
            <div className="movie__container">
              <div className="movie__list">
                {films.map((film) => (
                  <div key={film.imdbID} className="movie">
                    <div className="movie-card__container">
                      <div className="poster__wrapper">
                        <img src={film?.Poster} alt="" />
                      </div>
                      <div className="title__wrapper">
                        <h3>{film.Title}</h3>
                        <p>
                          <b>Year: </b>
                          {film.Year}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="app__logo--wrapper">
          <img className="app__logo" src={appLogo} />
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
