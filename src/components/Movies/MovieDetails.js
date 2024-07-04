import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../redux/actions/movieAction';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => state.movies.movieDetails);

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {movieDetails && (
        <>
          <h2>{movieDetails.Title}</h2>
          <img src={movieDetails.Poster} alt={movieDetails.Title} />
          <p>{movieDetails.Plot}</p>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
