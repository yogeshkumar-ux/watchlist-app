import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToWatchlist } from '../../redux/actions/movieAction';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './MovieList.css';

const MovieList = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showWatchlistOptions, setShowWatchlistOptions] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  const userWatchlists = useSelector((state) => state.movies.watchlist[userEmail] || {});

  const handleWatchlistClick = (movie) => {
    setSelectedMovie(movie);
    setShowWatchlistOptions(true);
  };

  const handleSelectWatchlist = (watchlistName) => {
    if (userWatchlists[watchlistName].movies.some(movie => movie.imdbID === selectedMovie.imdbID)) {
      setSnackbarMessage('Movie is already in the watchlist');
    } else {
      dispatch(addToWatchlist(selectedMovie, userEmail, watchlistName));
      setSnackbarMessage(`Movie added to the ${watchlistName} watchlist`);
    }
    setSnackbarOpen(true);
    setShowWatchlistOptions(false);
    setSelectedMovie(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseModal = () => {
    setShowWatchlistOptions(false);
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <Card key={movie.imdbID} className="movie-item">
          <Link to={`/movies/${movie.imdbID}`} className="movie-link">
            <CardMedia
              component="img"
              height="300"
              image={movie.Poster}
              alt={movie.Title}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {movie.Title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.Year}
              </Typography>
            </CardContent>
          </Link>
          <CardActions className="card-actions">
            <IconButton
              onClick={() => handleWatchlistClick(movie)}
              className="add-to-watchlist-button"
              color="primary"
            >
              <AddCircleIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}

      <Modal
        open={showWatchlistOptions}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: 400, 
            bgcolor: 'background.paper', 
            boxShadow: 24, 
            p: 4 
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Watchlist
          </Typography>
          {Object.keys(userWatchlists).map((watchlistName) => (
            <Button
              key={watchlistName}
              onClick={() => handleSelectWatchlist(watchlistName)}
              sx={{ mt: 2 }}
              fullWidth
              variant="contained"
            >
              {watchlistName}
            </Button>
          ))}
          <Button onClick={handleCloseModal} sx={{ mt: 2 }} fullWidth>
            Cancel
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default MovieList;
