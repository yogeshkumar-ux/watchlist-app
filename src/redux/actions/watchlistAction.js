export const addToWatchlist = (movie, email) => {
    return {
      type: 'ADD_TO_WATCHLIST',
      payload: movie,
      meta: { email },
    };
  };
  
  export const removeFromWatchlist = (imdbID, email) => {
    return {
      type: 'REMOVE_FROM_WATCHLIST',
      payload: imdbID,
      meta: { email },
    };
  };

  export const editWatchlistTitle = (title, email) => {
    console.log("watchlistaction",title, email)

    return {
      type: 'EDIT_WATCHLIST_TITLE',
      payload: { title, email }
    };
  };
  
  export const editWatchlistDescription = (description, email) => {
    return {
      type: 'EDIT_WATCHLIST_DESCRIPTION',
      payload: { description, email }
    };
  };

  