import React, { useState, useEffect } from "react";
import { database } from "./firebase"; // Importing the database reference from the firebase.js file
import { ref, onValue } from "firebase/database"; // Importing the ref function from the Firebase Database SDK

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, "users"); // Using ref function to reference the 'users' node in the database
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const userList = Object.values(data);
          setUsers(userList);
        }
      });
    };

    fetchData();

    // Cleanup function
    return () => {
      // No need to unsubscribe from onValue listener since it's automatically removed when the component unmounts
    };
  }, []);

  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
