import { useNavigate } from 'react-router-dom'

function SettingsPage() {
  const navigate = useNavigate()

  return (
    <div id="center">
      <h1>설정</h1>
      <p style={{ color: '#888' }}>추후 기능이 추가될 예정입니다.</p>
      <button onClick={() => navigate('/')}>돌아가기</button>
    </div>
  )
}

export default SettingsPage