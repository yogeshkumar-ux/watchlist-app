const getWatchlistFromLocalStorage = () => {
    try {
      const storedWatchlist = localStorage.getItem('watchlist');
      return storedWatchlist ? JSON.parse(storedWatchlist) : {

      };
    } catch (error) {
      console.error('Error parsing watchlist from localStorage:', error);
      return {};
    }
  };
  
  const initialState = {
    email: localStorage.getItem("email") ? localStorage.getItem("email") : null,

    searchResults: [],
    movieDetails: null,
    watchlist: getWatchlistFromLocalStorage(),
    currentPage: 1,
    hasMore: true,
  };
  
  const movieReducer = (state = initialState, action) => {
    console.log( "movieaction", action, state)
    switch (action.type) {
      case 'SEARCH_MOVIES':
        const hasMore = state.searchResults.length + action.payload.movies.length < action.payload.totalResults;
        console.log(hasMore, "inside")
        return {
          ...state,
          searchResults: action.payload.page === 1
            ? action.payload.movies
            : [...state.searchResults, ...action.payload.movies],
          currentPage: action.payload.page,
          totalResults: action.payload.totalResults,
          hasMore,
        };
      // case 'SEARCH_MOVIES':
      //   return { ...state, searchResults: action.payload };
      case 'GET_MOVIE_DETAILS':
        console.log("getmoviedetails")
        return { ...state, movieDetails: action.payload };
        case 'ADD_TO_WATCHLIST': {
            const { email, userWatchlists } = action.meta;
            console.log(userWatchlists, "watchlistName")
            const userWatchlistsmail = state.watchlist[email] || {};
            const targetWatchlist = userWatchlistsmail[userWatchlists] || { description: '', movies: [] };
      console.log(userWatchlistsmail, "userWatchlists" ,targetWatchlist, "targetWatchlist" )
            if (targetWatchlist.movies.some(movie => movie.imdbID === action.payload.imdbID)) {
                console.log("already inwatchlist")
              return state;
            }
      
            const updatedWatchlist = {
              ...state.watchlist,
              [email]: {
                ...userWatchlistsmail,
                [userWatchlists]: {
                  ...targetWatchlist,
                  movies: [...targetWatchlist.movies, action.payload]
                }
              }
            };

      
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
            console.log(updatedWatchlist,)
            return { ...state, watchlist: updatedWatchlist };
          }
          case 'REMOVE_FROM_WATCHLIST': {
            const { email, watchlistName } = action.meta || {};
            if (!email || !watchlistName) return state;
      
            const userWatchlists = state.watchlist[email] || {};
            const watchlist = userWatchlists[watchlistName] || { description: '', movies: [] };
      
            const updatedWatchlist = {
              ...state.watchlist,
              [email]: {
                ...userWatchlists,
                [watchlistName]: {
                  ...watchlist,
                  movies: watchlist.movies.filter(movie => movie.imdbID !== action.payload)
                }
              }
            };
      
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
            return { ...state, watchlist: updatedWatchlist };
          }
      case 'EDIT_WATCHLIST_TITLE': {
        console.log("reducer");
        const { email } = action.meta || {};
        if (!email) return state;
    
        const { title } = action.payload;
        console.log(email, title, "movielistreducertitle");
    
        const updatedWatchlist = {
            ...state.watchlist,
            [email]: {
                ...state.watchlist[email],
                title: title
            }
        };
    
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        console.log(updatedWatchlist, "finalupdatedtitle");
        return { ...state, watchlist: updatedWatchlist };
    }
      case 'EDIT_WATCHLIST_DESCRIPTION': {
        console.log("reducer");
        const { email } = action.meta || {};
        if (!email) return state;
    
        const { description } = action.payload;
        console.log(email, description, "movielistreducertitle");
    
        const updatedWatchlist = {
            ...state.watchlist,
            [email]: {
                ...state.watchlist[email],
                description: description
            }
        };
    
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        console.log(updatedWatchlist, "finalupdatedtitle");
        return { ...state, watchlist: updatedWatchlist };
      }

      case 'CREATE_WATCHLIST': {
        const { email } = action.meta || {};
        const { title, description } = action.payload;
        if (!email || !title) return state;
  
        const userWatchlists = state.watchlist[email] || {};
  
        console.log(userWatchlists, "userWatchlistscreate")
        if (userWatchlists[title]) {
          return state; // Watchlist already exists
        }
  
        const updatedWatchlist = {
          ...state.watchlist,
          [email]: {
            ...userWatchlists,
            [title]: {
              description: description || '',
              movies: []
            }
          }
        }
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        console.log(updatedWatchlist, "updatedWatchlist")
      return { ...state, watchlist: updatedWatchlist };
    }
     
    case 'DELETE_WATCHLIST': {
        const { email } = action.meta || {};
        const  {watchlistName}  = action.payload
        console.log(watchlistName, "watchlistNamedelete")
        if (!email || !watchlistName) return state;
  
        const userWatchlists = { ...state.watchlist[email] };
        delete userWatchlists[watchlistName];
  
        const updatedWatchlist = {
          ...state.watchlist,
          [email]: userWatchlists
        };
  
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        return { ...state, watchlist: updatedWatchlist };
      }

      case 'CLEAR_SEARCH_RESULTS':
        console.log("insideclearsearchresul")
      return {
        ...state,
        searchResults: [],
      };
      

     
      
      default:
        console.log(state, "defaultstate")
        return state;

    
    }
  };
  
  export default movieReducer;
  