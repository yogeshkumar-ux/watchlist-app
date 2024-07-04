import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Login from './components/Auth/Login';
import MovieSearch from './components/Movies/MovieSearch';
import MovieDetails from './components/Movies/MovieDetails';
import Watchlist from './components/Movies/WatchList';
import Sidebar from './components/Layout/sidebar';
import ProtectedRoute from './components/Auth/protectedRoute';
import './App.css';
import './components/Movies/MovieSearch.css';

const AppContent = () => {
  const email = useSelector((state) => state.user.email);

  return (
    <div className="app">
      {email && <Sidebar />}
      <div className="content">
        <Routes>
          <Route path="/login" element={!email ? <Login /> : <Navigate to="/search" />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/search" element={<MovieSearch />} />
            <Route path="/watchlist/:watchlistName" element={<Watchlist/>} />


            {/* <Route path="/watchlist" element={<Watchlist />} /> */}
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Route>
          <Route path="/" element={!email ? <Login /> : <Navigate to="/search" />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppContent />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
