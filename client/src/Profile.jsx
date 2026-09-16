import { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      });
  }, []);

  if (!profile) {
    return <main>Loading...</main>;
  }

  return (
  <main className="profile-page">
    <h1>Profile</h1>

    <div className="profile-card">
      <p>{profile.name}</p>
      <p>{profile.email}</p>
      <p>Total Posts: {profile.postCount}</p>
    </div>
  </main>
);
}

export default Profile;