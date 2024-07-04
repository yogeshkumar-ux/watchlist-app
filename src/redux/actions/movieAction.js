import axios from 'axios';

const API_KEY = '233c90ba';



export const searchMovies = (title, page = 1) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}&page=${page}`);
    const movies = res.data.Search || []; // Handle case where Search is undefined
    console.log(res, "totalres")
    const totalResults = parseInt(res.data.totalResults, 10); // Get total results

    dispatch({
      type: 'SEARCH_MOVIES',
      payload: {
        movies,
        page,
        totalResults,
      },
    });
  } catch (error) {
    console.error('Error searching movies:', error);
    // You can dispatch an error action here if needed
  }
};
 
export const getMovieDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    console.log(res.data, "responseinmoviedetails")
    dispatch({ type: 'GET_MOVIE_DETAILS', payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const addToWatchlist = (movie, email,userWatchlists) => {
console.log(userWatchlists, "userWatchlistsinaction")
    return {
      type: 'ADD_TO_WATCHLIST',
      payload: movie,
      meta: { email,userWatchlists },
    };
  };
  
  export const removeFromWatchlist = (imdbID, email, watchlistName) => ({
    type: 'REMOVE_FROM_WATCHLIST',
    payload: imdbID,
    meta: { email, watchlistName }
  });

  export const editWatchlistTitle = (title, email) => {
    console.log("action",title, email)
    return {
      type: 'EDIT_WATCHLIST_TITLE',
      payload: { title },
      meta: { email }

    };
  };
  
  export const editWatchlistDescription = (description, email) => {
    return {
      type: 'EDIT_WATCHLIST_DESCRIPTION',
      payload: { description },
      meta : {email}
    };
  };
  

  export const createWatchlist = (title, email, description) => ({
    type: 'CREATE_WATCHLIST',
    meta: { email },
    payload: { title, description },
  });
  
  export const deleteWatchlist = (email, watchlistName) => ({
    type: 'DELETE_WATCHLIST',
    meta: { email },
    payload: { watchlistName },
  });
  
