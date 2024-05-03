import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"; // Importing Firestore functionalities

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const firestore = getFirestore(); // Initialize Firestore

      // Sign in with email and password
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Check if the user's role is admin in Firestore
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("userID", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User not found.");
      }

      let isAdmin = false;

      // Check user role
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.role === "admin") {
          isAdmin = true;
        }
      });

      if (!isAdmin) {
        // If user is not admin, sign them out and show error message
        await auth.signOut();
        throw new Error("You do not have admin privileges.");
      }

      // If user has admin privileges, proceed with login
      console.log("Login successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div id="login-screen">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginScreen;
