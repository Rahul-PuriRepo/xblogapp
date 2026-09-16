import { Link, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import CreatePost from "./CreatePost";
import { useState } from "react";

function Home() {
  return (
    <main className="home-page">
      <h1>Explore Posts</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by keyword..."
        />

        <input
          type="text"
          placeholder="Filter by tags (comma-separated)"
        />
      </div>
    </main>
  );
}

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      <nav className="navbar">
  <Link className="navbar-brand" to="/">
    Blog App
  </Link>

  <Link to="/">Home</Link>

  {user ? (
    <>
      <Link to="/profile">Profile</Link>
      <Link to="/dashboard">Dashboard</Link>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login">Login</Link>
      <Link id="signup-link" to="/signup">Signup</Link>
    </>
  )}
</nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup onSignup={setUser} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
