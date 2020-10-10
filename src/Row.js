import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  ////use effect runs based on specific conditions
  useEffect(() => {
    //if [],(if the square bracket is blank) run once when the row loads and dont run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // fetching this  url  https://api.themoviedb.org/3//discover/tv?api_key=${API_KEY}&with_networks=213
      setMovies(request.data.results);
      return request.data.results;
    }
    fetchData();
  }, [fetchUrl]);

  ////options for youtube trailer player
  const opts = {
    height: "390",
    width: "100%",

    playerVars: { autoplay: 1 },
  };
  ///
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          ///suppose https://youtube.com....../watch?v=hehxhidndiodn  is the url then hehxhidndiodn is the id
          // of that video and we need that only that's why we do the following
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          // console.log(error);
          setTrailerUrl('eN6AYHAT8UM');
        });
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
