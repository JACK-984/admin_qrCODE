import React, { useState } from 'react';
import { database } from './firebase'; // Importing the database reference from the firebase.js file

const EditForm = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(user.role);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await database.ref(`users/${user.key}`).update({
        name,
        email,
        password: password || user.password,
        role,
      });
      console.log('User updated successfully.');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditForm;
