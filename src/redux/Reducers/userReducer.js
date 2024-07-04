const getWatchlistFromLocalStorage = () => {
    try {
      const storedWatchlist = localStorage.getItem('watchlist');
      return storedWatchlist ? JSON.parse(storedWatchlist) : {};
    } catch (error) {
      console.error('Error parsing watchlist from localStorage:', error);
      return {};
    }
  };
  
  const initialState = {
    email: localStorage.getItem("email") ? localStorage.getItem("email") : null,
    searchResults: [],
    movieDetails: null,
    watchlist: getWatchlistFromLocalStorage()
  };
  
  const userReducer = (state = initialState, action) => {
    console.log("userreducer", state)
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('email', action.payload);
        return { ...state, email: action.payload };
      case 'LOGOUT':

        console.log(state, "logout reducer")
        localStorage.removeItem('email');
        localStorage.removeItem('watchlist');
       console.log(state, "logout defined", state.searchResults, )
        // localStorage.removeItem('searchResults');
        

        return { ...state, email: null, watchlist: {},  };
      default:
        return state;
    }
  };
  
  export default userReducer;
  