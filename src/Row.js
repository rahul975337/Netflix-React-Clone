import React, { useState, useEffect } from "react";
import axios from "./axios";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

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
  console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
          {movies.map(movie=>(
            <img src={movie.poster_path}></img>
          ))}
      </div>
    </div>
  );
}

export default Row;
