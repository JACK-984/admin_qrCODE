import React, { useState } from "react";
import { auth } from "./firebase";
import AddUserForm from "./AddUserForm";

const Dashboard = ({ user }) => {
  const [userEmail, setUserEmail] = useState(user ? user.email : ""); // Initialize userEmail state with the initial user email

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleUserAdded = (addedUserEmail) => {
    // Update userEmail state when a user is added
    setUserEmail(addedUserEmail);
  };

  return (
    <div id="dashboard">
      <h1>Welcome, {userEmail}</h1>
      <AddUserForm onUserAdded={handleUserAdded} />{" "}
      {/* Pass the handleUserAdded function as a prop */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
