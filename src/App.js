import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Login from './LoginScreen';
import Description from './Description';
import TV from './TV';
import TV_Description from './tv_description';
import Search from './Search'; // Import the Search component
import { auth } from './Firebase.js';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../src/features/userSlice.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInScreen from './SignInScreen';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // Logged out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <Routes>
          {!user ? (
            <Route path="/" element={<Login />} />
          ) : (
            <>
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/tv" element={<TV />} />
              <Route path="/description/:movieId" element={<Description />} />
              <Route
                path="/tv_description/:movieId"
                element={<TV_Description />}
              />
              <Route path="/search" element={<Search />} /> // Add the Search component route
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
