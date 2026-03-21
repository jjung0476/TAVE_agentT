import { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    setUser(data.results[0]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <p>사용자 정보를 불러오는 중...</p>;

  return (
    <div className="user-profile">
      <img src={user.picture.medium} alt="user" />
      <div>
        <strong>{user.name.first} {user.name.last}</strong>
        <p>{user.email}</p>
      </div>
      <button onClick={fetchUser}>새로고침</button>
    </div>
  );
}

export default UserProfile;