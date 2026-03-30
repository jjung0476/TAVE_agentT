import { useState, useEffect } from 'react'

function UserProfile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    setUser(null)
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()
    setUser(data.results[0])
  }

  // 로딩 중이면 즉시 반환
  if (!user) return <p className="loading-text">사용자 정보를 불러오는 중...</p>

return (
    <div>
      <img src={user.picture.medium} alt="user" />
      <div>
        <strong>{user.name.first} {user.name.last}</strong>
        <p>{user.email}</p>
      </div>
      <button onClick={fetchUser}>새로고침</button>
      <button onClick={() => navigate('/settings')} style={{ marginLeft: '8px' }}>설정</button>
    </div>
  )
}

export default UserProfile