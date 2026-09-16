import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ onSignup }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("https://xblogapp-jz82.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token || "");
      localStorage.setItem("user", JSON.stringify(data.user));

      onSignup(data.user);
      navigate("/");
    } else {
      alert(data.message || "Signup failed");
    }
  };

    return (
    <main className="auth-page">
      <h1>Signup</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
        />

        <button type="submit">Signup</button>
      </form>

      <button className="google-button" type="button">
        Sign Up with Google
      </button>
    </main>
  );
}

export default Signup;
