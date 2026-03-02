import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [videos, setVideos] = useState([])
  const [searchTerm, setSearchTerm] = useState("") // THE SEARCH STATE
  const [logs, setLogs] = useState([
    "[OK] MONGODB_ATLAS_NODE_CONNECTED",
    "[OK] DISTRIBUTED_CRAWLER_BYPASS: ON",
    "[OK] TERRAFORM_INFRA_STABLE"
  ])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get('http://localhost:5000/api/videos')
      .then(res => setVideos(res.data))
      .catch(err => setLogs(prev => [...prev, "[ERROR] SIGNAL_LOST: DB_UNREACHABLE"]))
  }

  const handleDecrypt = (id, title) => {
    axios.put(`http://localhost:5000/api/videos/decrypt/${id}`)
      .then(() => {
        setLogs(prev => [...prev, `[!] DECRYPTED: ${title}`, `[SUCCESS] BREACH_CONFIRMED_${new Date().toLocaleTimeString()}`])
        fetchData()
      })
      .catch(() => setLogs(prev => [...prev, `[FAIL] BREACH_BLOCKED: ${title}`]))
  }

  const handleReset = () => {
    axios.put('http://localhost:5000/api/videos/reset-all')
      .then(() => {
        setLogs(prev => [...prev, "[!] SYSTEM_KILL_SWITCH_ACTIVATED", "[REBOOT] RE-ENCRYPTING_GLOBAL_PROTOCOLS..."])
        fetchData()
      })
      .catch(() => setLogs(prev => [...prev, "[ERROR] RESET_SEQUENCE_ABORTED"]))
  }

  // ALGORITHM: Linear Search Filter
  const filteredVideos = videos.filter(vid => 
    vid.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', display: 'flex', fontFamily: '"Courier New", Courier, monospace', overflow: 'hidden' }}>
      
      {/* LEFT SIDE: COMMAND FEED */}
      <div style={{ width: '60%', padding: '40px', borderRight: '2px solid #1a1a1a', overflowY: 'auto' }}>
        <h1 style={{ color: '#ff0000', fontSize: '52px', letterSpacing: '-3px', margin: '0' }}>▶ YT_DISRUPTOR_V1.0</h1>
        
        {/* SEARCH BAR INTERFACE */}
        <div style={{ marginBottom: '40px', marginTop: '20px' }}>
          <input 
            type="text"
            placeholder="SEARCH_FOR_TARGET_PROTOCOL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#0a0a0a',
              border: '1px solid #333',
              color: '#00ff00',
              padding: '15px',
              fontSize: '18px',
              fontFamily: 'inherit',
              outline: 'none',
              boxShadow: 'inset 0 0 10px #000'
            }}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          {filteredVideos.map((vid, index) => (
            <div key={index} style={{ 
              backgroundColor: '#0a0a0a', 
              padding: '25px', 
              border: vid.isZeroEncrypted ? '2px solid #00ff00' : '1px solid #ff0000',
              boxShadow: vid.isZeroEncrypted ? '0 0 15px #00ff0033' : 'none' 
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '15px', color: vid.isZeroEncrypted ? '#00ff00' : '#eee' }}>{vid.title}</h3>
              <button 
                onClick={() => handleDecrypt(vid._id, vid.title)}
                disabled={vid.isZeroEncrypted}
                style={{ 
                  backgroundColor: vid.isZeroEncrypted ? '#111' : '#ff0000', 
                  color: vid.isZeroEncrypted ? '#00ff00' : 'white', 
                  border: vid.isZeroEncrypted ? '1px solid #00ff00' : 'none', 
                  padding: '10px 20px', fontSize: '14px', fontWeight: 'bold', width: '100%', cursor: vid.isZeroEncrypted ? 'default' : 'pointer' 
                }}>
                {vid.isZeroEncrypted ? 'BREACHED' : 'DECRYPT_PROTOCOL'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: SYSTEM MONITOR */}
      <div style={{ width: '40%', padding: '40px', backgroundColor: '#020202', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#00ff00', fontSize: '28px', borderBottom: '2px solid #00ff00', paddingBottom: '10px', marginBottom: '30px' }}>SYSTEM_MONITOR</h2>
        
        <div style={{ color: '#00ff00', fontSize: '15px', lineHeight: '1.6', flexGrow: 1, overflowY: 'hidden' }}>
          {logs.slice(-10).map((log, i) => (
            <p key={i} style={{ margin: '5px 0', borderLeft: '3px solid #00ff00', paddingLeft: '10px' }}>{log}</p>
          ))}
          
          <div style={{ marginTop: '30px', padding: '15px', border: '1px solid yellow', color: 'yellow', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>
            [!] WINDOWS_NOT_ACTIVATED_DETECTION_RISK
          </div>

          <button 
            onClick={handleReset}
            style={{ 
              marginTop: '20px', padding: '12px', backgroundColor: 'transparent', color: '#00ff00', border: '2px solid #00ff00', 
              fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', width: '100%', textTransform: 'uppercase' 
            }}>
            Execute_System_Reset
          </button>
          
          <p style={{ color: '#ff0000', fontSize: '18px', fontWeight: 'bold', marginTop: 'auto', animation: 'blink 1.5s infinite' }}>{">"} AWAITING_VARIANT_COMMAND_INPUT...</p>
        </div>
      </div>

      <style>{`@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.1; } 100% { opacity: 1; } }`}</style>
    </div>
  );
}

export default App;