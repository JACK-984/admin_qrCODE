import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { database } from "./firebase"; // Importing the database reference from the firebase.js file

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      setError("Please fill out all required fields");
      return;
    }

    try {
      const auth = getAuth();
      const firestore = getFirestore();

      // Create user in Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user details to Firestore users collection
      await addDoc(collection(firestore, "users"), {
        userID: user.uid,
        name,
        role,
      });

      // Clear form fields and error message after adding user
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setError("");

      // Set success message
      setSuccessMessage("User added successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Failed to add user. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
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
          placeholder="Password"
        />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
        />
        <button type="submit">Add User</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default AddUserForm;
