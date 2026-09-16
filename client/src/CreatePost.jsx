import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate("/dashboard");
    } else {
      alert(data.message || "Failed to create post");
    }
  };

    return (
    <main className="create-page">
      <h1>Create Post</h1>

      <form className="create-form" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
        />

        <input
          name="tags"
          type="text"
          placeholder="Tags"
          value={formData.tags}
          onChange={handleChange}
        />

        <button type="submit">Create Post</button>
      </form>
    </main>
  );
}

export default CreatePost;