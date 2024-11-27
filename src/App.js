import React from "react";
import { RBACProvider } from "./context/RBACContext";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import "./App.css";

function App() {
  return (
    <RBACProvider>
      <div className="App">
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "900",
            color: "#2c3e50",
            textAlign: "center",
            marginBottom: "30px",
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
            background: "linear-gradient(135deg, #3498db, #8e44ad)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          RBAC Admin Dashboard
        </h1>

        <div className="dashboard">
          <UserManagement />
          <RoleManagement />
        </div>
      </div>
    </RBACProvider>
  );
}

export default App;
