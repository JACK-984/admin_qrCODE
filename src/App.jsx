import React, { useState, useEffect } from "react";
import LoginScreen from "./LoginScreen";
import Dashboard from "./Dashboard";
import { auth } from "./firebase"; // Importing the auth reference from the firebase.js file
import "./index.css"; // Import the global CSS file

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Introduce loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Set loading to false when authentication state is determined
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Render a loading indicator while authentication state is being determined
    return <div>Loading...</div>;
  }

  return <div>{user ? <Dashboard user={user} /> : <LoginScreen />}</div>;
};

export default App;
