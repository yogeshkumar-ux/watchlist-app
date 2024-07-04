import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userAction';
import { Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { createWatchlist, deleteWatchlist } from '../../redux/actions/movieAction';
import '../../components/Layout/sidebar.css';
import { clearSearchResults } from '../../redux/actions/userAction';

const Sidebar = () => {
  const userEmail = useSelector((state) => state.user.email);
  const userWatchlists = useSelector((state) => state.movies.watchlist[userEmail] || {});
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [newWatchlistDescription, setNewWatchlistDescription] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogout = () => {
    console.log("handleLogout")
    dispatch(clearSearchResults());

    dispatch(logout());
  };

  const handleCreateWatchlist = () => {
    if (newWatchlistName.trim() && userEmail) {
      dispatch(createWatchlist(newWatchlistName, userEmail, newWatchlistDescription));
      setNewWatchlistName('');
      setNewWatchlistDescription('');
    } else {
      setSnackbarMessage('Please enter a watchlist title');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteWatchlist = (watchlistName) => {
    if (userEmail) {
      dispatch(deleteWatchlist(userEmail, watchlistName));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="brand">Watchlists</div>
      <div className="watchlist-title"><Link to="/search">Home <HomeIcon/></Link></div>
      <div className="separator"></div>
      <div className="watchlist-inputs">
        <TextField
          label="Watchlist Name"
          variant="outlined"
          value={newWatchlistName}
          onChange={(e) => setNewWatchlistName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newWatchlistDescription}
          onChange={(e) => setNewWatchlistDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          onClick={handleCreateWatchlist}
          variant="contained"
          color="error"
          size="small"
          sx={{ mt: 1 }}
        >
          Create Watchlist
        </Button>
      </div>
      <div className="watchlist-titles">
        {Object.keys(userWatchlists).map((watchlistName) => (
          <div key={watchlistName} className="watchlist-title">
            <Link to={`/watchlist/${watchlistName}`}>{watchlistName}</Link>
            <Button onClick={() => handleDeleteWatchlist(watchlistName)} size="small" color="error">
              <DeleteOutlinedIcon />
            </Button>
          </div>
        ))}
      </div>
      <div className="footer">
        <div>{userEmail ? userEmail : 'Guest'}</div>
        <div className="menu-dropdown">
          <div className="menu-item" onClick={handleLogout}>Logout<LogoutIcon/></div>
        </div>
      </div>
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

export default Sidebar;
