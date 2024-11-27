import React, { useState } from "react";
import { useRBAC } from "../context/RBACContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const RoleManagement = () => {
  const { roles, addRole, deleteRole } = useRBAC();
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPermission, setFilterPermission] = useState("");

  const handleAddRole = () => {
    const id = Date.now();
    addRole({ ...newRole, id });
    setNewRole({ name: "", permissions: [] });
  };

  // Filter roles based on search query and selected permission
  const filteredRoles = roles.filter((role) => {
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPermission =
      !filterPermission || role.permissions.includes(filterPermission);
    return matchesSearch && matchesPermission;
  });

  return (
    <div className="role-management">
            <hr style={{
        border: "none",
        height: "2px",
        background: "linear-gradient(90deg, #3498db, #8e44ad)",
        margin: "40px 0",
        }} />
      <h2>Role Management</h2>
      <div className="search-filter">
        {/* Search Input */}
        <div className="search-input">
          <FontAwesomeIcon icon={faSearch} className="icon" />
          <input
            type="text"
            placeholder="Search by role name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter by Permission */}
        <div className="search-input">
          <FontAwesomeIcon icon={faSearch} className="icon" />
          <input
            type="text"
            placeholder="Filter by permission"
            value={filterPermission}
            onChange={(e) => setFilterPermission(e.target.value)}
          />
        </div>
      </div>

      <ul>
        {filteredRoles.map((role) => (
          <li key={role.id}>
            {role.name} - Permissions: {role.permissions.join(", ")}
            <button onClick={() => deleteRole(role.id)}>
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>
          </li>
        ))}
      </ul>

      <h3>Add Role</h3>
      <div className="add-role">
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Permissions (comma-separated)"
          value={newRole.permissions.join(", ")}
          onChange={(e) =>
            setNewRole({ ...newRole, permissions: e.target.value.split(",").map((perm) => perm.trim()) })
          }
        />
        <button onClick={handleAddRole}>
          <FontAwesomeIcon icon={faPlusCircle} /> Add Role
        </button>
      </div>
    </div>
  );
};

export default RoleManagement;
