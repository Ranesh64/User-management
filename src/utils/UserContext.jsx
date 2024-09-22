import { createContext, useEffect, useState } from "react";
import { FETCH_USERS } from "./constant";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await fetch(FETCH_USERS);
      const response = await data.json();
      setUsers(response);
    } catch (err) {
      setError(err);
    }
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) => {
      const userToUpdate = prevUsers.find((user) => user.id === updatedUser.id);
      if (userToUpdate) {
        return prevUsers.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        );
      }
      return prevUsers;
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, error, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
