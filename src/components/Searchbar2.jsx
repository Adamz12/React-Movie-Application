import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import appLogo from "../assets/app-store.png";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BasicPagination from "./Pagination";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/system";
import { FaCircleNotch, FaSpinner, FaTruckLoading } from "react-icons/fa/";
import MovieInfo from "../pages/MovieInfo";

function Searchbar2() {
  const [clicked, setClicked] = useState(false);
  const [searchId, setSearchId] = useState("");
  const location = useLocation();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [movies, setMovies] = useState(() => {
    // Retrieve search results from local storage
    const storedMovies = localStorage.getItem("searchResults");
    return storedMovies
      ? JSON.parse(storedMovies)
      : location.state?.movies || null;
  });
  const [searchId1, setSearchId1] = useState(location.state?.searchId1 || "");

  async function search() {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?i=tt3896198&apikey=59334251&s=${searchId}`
    );
    setFilms(data.Search || []);
    setMovies(data.Search ? [] : data.Movies || []);
    console.log(data);

    localStorage.setItem("searchResults", JSON.stringify(data.Search));
    setCurrentPage(1);
  }

  useEffect(() => {
    if (clicked && searchId) {
      setSearchId1(""); // Reset searchId after performing a new search
      search();
    }
  }, [clicked, searchId]);

  useEffect(() => {
    return () => {
      // Clear search results when navigating away from Searchbar2 component
      localStorage.removeItem("searchResults");
    };
  }, []);

  const handleClick = async () => {
    if (!searchId) {
      return null;
    }

    setCurrentPage(1);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=59334251&s=${searchId}`
      );
      const data = response.data;
      const { Search } = data;
      setFilms(Search || []);
      setMovies(Search ? [...Search] : []);
      localStorage.setItem("searchResults", JSON.stringify(Search));
      setClicked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event, page) => {
    console.log("Page:", page);
    setCurrentPage(page);
  };

  console.log(currentPage);

  // Calculate the starting and ending index of the films or movies to be displayed
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedData = clicked
    ? films
    : movies || location.state?.displayedData || [];

  function sortFilms(filter) {
    let sortedData = [];
    if (filter === "OLDEST") {
      sortedData = [...displayedData].sort(
        (a, b) => parseInt(a.Year) - parseInt(b.Year)
      );
    } else if (filter === "Latest") {
      sortedData = [...displayedData].sort(
        (a, b) => parseInt(b.Year) - parseInt(a.Year)
      );
    }
    setMovies(sortedData);
    setFilms(sortedData); // Update the films state with the sorted array
  }

  function filter(event) {
    sortFilms(event.target.value);
  }

  console.log(filter);

  console.log(movies);

  console.log("Searchbar2 displayedData:", displayedData);

  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`, {
      state: { displayedData: [...films, ...movies] },
    });

    localStorage.setItem("searchResults", JSON.stringify(displayedData));
  };

  return (
    <div className="container">
      <div className="content__wrapper">
        <div className="border__line"></div>
        <h3 className="sub-title__white--header">WELCOME TO THE</h3>
        <h1 className="logo__title--white">DIAMOND HUB</h1>
        <h3 className="sub-title__white">
          <span className="white">EXPEREINCE</span>
        </h3>
        <div className="searchbar__wrapper">
          <input
            type="search"
            placeholder="Search..."
            className="searchbar"
            onKeyPress={(event) => event.key === "Enter" && handleClick()}
            value={searchId}
            onChange={(event) => setSearchId(event.target.value)}
          ></input>
          <button
            onClick={handleClick}
            className="search__btn"
            disabled={!searchId}
          >
            <MagnifyingGlassIcon className="search__icon" />
          </button>
        </div>
        <div className="search__results--wrapper">
          <div>
            <select id="filter" onChange={filter} defaultValue="">
              <option value="" disabled>
                Sort By
              </option>
              <option value="OLDEST">Oldest</option>
              <option value="Latest">Latest</option>
            </select>
          </div>
        </div>

        <div className="results__container">
          <h2>Search Results:{searchId1 ? searchId1 : searchId}</h2>
          {clicked ? (
            <div className="movie__container">
              <div className="movie__list">
                {displayedData &&
                  displayedData.slice(startIndex, endIndex).map((film) => (
                    <div
                      key={film.imdbID}
                      onClick={() => handleMovieClick(film.imdbID)}
                      className="movie"
                    >
                      <div className="movie-card__container">
                        <div className="poster__wrapper">
                          <img src={film?.Poster} alt="" />
                        </div>
                        <div className="title__wrapper">
                          <h3>{film.Title}</h3>
                          <div>
                            <b>Year: </b>
                            {film.Year}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="results__container">
              <div className="movie__container">
                <div className="movie__list">
                  {displayedData &&
                    displayedData.slice(startIndex, endIndex).map((movie) => (
                      <div
                        key={movie.imdbID}
                        onClick={() => handleMovieClick(movie.imdbID)}
                        className="movie"
                      >
                        <div className="movie-card__container">
                          <div className="poster__wrapper">
                            <img
                              className="poster__img"
                              src={movie?.Poster}
                              alt=""
                            />
                          </div>
                          <div className="title__wrapper">
                            <h3>{movie.Title}</h3>
                            <div>
                              <b>Year: </b>
                              {movie.Year}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={Math.ceil(displayedData.length / itemsPerPage)}
              shape="rounded"
              sx={{
                "& .MuiPagination-ul": {
                  marginTop: 1, // Remove the default margin-top
                },
                "& .MuiPaginationItem-root": {
                  color: "white",
                },
                "& .Mui-selected": {
                  color: "white",
                },
                "& .MuiPaginationItem-root:hover": {
                  color: "gold",
                },
              }}
              onChange={(event, page) => handlePageChange(event, page)} // Pass the page value to handlePageChange function
            />
          </Box>
        </div>

        <div className="app__logo--wrapper">
          <img className="app__logo--searchbar2" src={appLogo} />
        </div>
      </div>
    </div>
  );
}

export default Searchbar2;
