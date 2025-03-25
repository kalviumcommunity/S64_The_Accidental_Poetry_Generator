import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

function Admin() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);  // ✅ Default empty array
  const [selectedUser, setSelectedUser] = useState("");
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    if (!token) return;
    console.log("📢 Fetching users...");

    fetch("http://localhost:4000/api/users", {  // ✅ Correct API endpoint
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Users fetched:", data);
        setUsers(Array.isArray(data) ? data : []);  // ✅ Ensure it's an array
      })
      .catch((err) => console.error("❌ Error fetching users:", err));
  }, [token]);

  useEffect(() => {
    if (!selectedUser) return;
    console.log(`📢 Fetching poems by user: ${selectedUser}`);

    fetch(`http://localhost:4000/api/poems?created_by=${selectedUser}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Poems fetched:", data);
        setPoems(Array.isArray(data) ? data : []);  // ✅ Ensure it's an array
      })
      .catch((err) => console.error("❌ Error fetching poems:", err));
  }, [selectedUser, token]);

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h1>🔧 Admin Panel</h1>

      {/* Prevent errors by ensuring `users` is always an array */}
      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      )}

      <div>
        {poems.length > 0 ? (
          poems.map((poem) => (
            <div key={poem._id}>
              <h3>{poem.title}</h3>
              <p>{poem.content}</p>
            </div>
          ))
        ) : (
          selectedUser && <p>No poems found for this user.</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
