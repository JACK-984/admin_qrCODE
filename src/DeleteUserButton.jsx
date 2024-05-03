import React from 'react';
import { database } from './firebase';// Importing the database reference from the firebase.js file

const DeleteUserButton = ({ userId }) => {
  const handleDeleteUser = async () => {
    try {
      await database.ref(`users/${userId}`).remove(); // Using the database reference to remove the user
      console.log('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <button onClick={handleDeleteUser}>Delete</button>
  );
};

export default DeleteUserButton;
