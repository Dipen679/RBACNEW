import React, { createContext, useState, useContext } from "react";

const RBACContext = createContext();

export const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", role: "Admin", status: "Active" },
    { id: 2, name: "Guest User", role: "Guest", status: "Inactive" },
  ]);

  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Guest", permissions: ["Read"] },
  ]);

  const addUser = (user) => setUsers([...users, user]);
  const updateUser = (updatedUser) =>
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  const deleteUser = (id) => setUsers(users.filter((user) => user.id !== id));

  const addRole = (role) => setRoles([...roles, role]);
  const updateRole = (updatedRole) =>
    setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
  const deleteRole = (id) => setRoles(roles.filter((role) => role.id !== id));

  return (
    <RBACContext.Provider
      value={{
        users,
        roles,
        addUser,
        updateUser,
        deleteUser,
        addRole,
        updateRole,
        deleteRole,
      }}
      
    >
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => useContext(RBACContext);
