import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/users/me/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
  <main className="dashboard-page">
    <div className="dashboard-header">
      <h1>My Posts</h1>

      <Link className="create-post-button" to="/create">
        + Create Post
      </Link>
    </div>

    <section className="posts-list">
      {posts.map((post) => (
        <article className="post-card" key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>

          <div className="post-actions">
            <button type="submit">View</button>
            <button type="submit">Edit</button>
            <button type="submit">Delete</button>
          </div>
        </article>
      ))}
    </section>
  </main>
    );
}

export default Dashboard;