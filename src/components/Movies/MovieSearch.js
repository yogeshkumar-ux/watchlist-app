import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../../redux/actions/movieAction';
import MovieList from './MovieList';
import InfiniteScroll from 'react-infinite-scroll-component';
import './MovieSearch.css';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

const MovieSearch = () => {
  const [title, setTitle] = useState('');
  const [searched, setSearched] = useState(false); // Track if a search has been performed
  const dispatch = useDispatch();
  const { searchResults, currentPage, hasMore } = useSelector((state) => state.movies);

  useEffect(() => {
    if (searchResults.length > 0) {
      setSearched(true); // Restore searched state if there are existing search results
    }
  }, [searchResults]);

  const handleSearch = async () => {
    setSearched(true); // Set searched to true when a search is performed
    await dispatch(searchMovies(title, 1)); // Reset to page 1 on new search
  };

  const fetchMoreMovies = async () => {
    await dispatch(searchMovies(title, currentPage + 1)); // Fetch next page
  };

  return (
    <div className="movie-search">
      <Typography variant="h1">Welcome to Watchlists</Typography>
      <Typography variant="body1">
        Browse movies, add them to watchlists and share them with friends.
      </Typography>
      <div className="search-bar">
        <TextField
        
          type="text"
          size='medium'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search for movies"
          fullWidth 
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {searched ? (
        <InfiniteScroll
          dataLength={searchResults.length} // This is important field to render the next data
          next={fetchMoreMovies} // Function to call when reaching bottom of scroll
          hasMore={hasMore} // Set this based on whether there are more results
          loader={<CircularProgress style={{ margin: '20px auto', display: 'block' }} />} // Loader element while loading more data
          endMessage={<Typography variant="body1">No more movies to show</Typography>} // Message when all data is loaded
        >
          <MovieList movies={searchResults} />
        </InfiniteScroll>
      ) : (
        <Typography variant="body1">Search for movies to get started</Typography>
      )}
    </div>
  );
};

export default MovieSearch;
