import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { removeFromWatchlist } from '../../redux/actions/movieAction';

const Watchlist = () => {
  const { watchlistName } = useParams();
  const userEmail = useSelector((state) => state.user.email);
  const userWatchlists = useSelector((state) => state.movies.watchlist[userEmail] || {});
  const dispatch = useDispatch();

  const watchlist = userWatchlists[watchlistName] || { description: '', movies: [] };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleRemoveFromWatchlist = (movie) => {
    dispatch(removeFromWatchlist(movie.imdbID, userEmail, watchlistName));
    setSnackbarMessage('Movie removed from watchlist');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <h1>{watchlistName}</h1>
      <p>{watchlist.description}</p>
      <div className="movie-list">
        {watchlist.movies.map((movie) => (
          <div key={movie.imdbID} className="movie-item">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <IconButton onClick={() => handleRemoveFromWatchlist(movie)} style={{ color: 'green' }}>
      <CheckIcon />
    </IconButton>
            </div>
          </div>
        ))}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CheckIcon  fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default Watchlist;
