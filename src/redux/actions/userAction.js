export const login = (email) => ({
    type: 'LOGIN',
    payload: email,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  

  export const clearSearchResults  = () => ({
    type: 'CLEAR_SEARCH_RESULTS',
  });
  
  
