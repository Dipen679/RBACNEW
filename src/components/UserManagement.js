import React, { useState } from "react";
import { useRBAC } from "../context/RBACContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUserPlus, faSearch } from "@fortawesome/free-solid-svg-icons";






const UserManagement = () => {
  const { users, roles, addUser, deleteUser } = useRBAC();
  const [newUser, setNewUser] = useState({ name: "", role: "", status: "Active" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleAddUser = () => {
    const id = Date.now();
    addUser({ ...newUser, id });
    setNewUser({ name: "", role: "", status: "Active" });
  };

  // Filter users based on search query, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="user-management">
      <h2>
        <FontAwesomeIcon icon={faUserPlus} /> User Management
      </h2>

      {/* Search and Filters */}
      <div className="search-filter">
        <div className="search-input">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* User List */}
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <span>
              {user.name} - {user.role} ({user.status})
            </span>
            <button onClick={() => deleteUser(user.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />  Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add User Section */}
      <h3>
        <FontAwesomeIcon icon={faUserPlus} /> Add User
      </h3>
      <div className="add-user">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddUser}>
          <FontAwesomeIcon icon={faUserPlus} /> Add User
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
