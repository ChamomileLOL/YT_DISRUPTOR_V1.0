import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState([
    "[OK] MONGODB_ATLAS_NODE_CONNECTED",
    "[OK] DISTRIBUTED_CRAWLER_BYPASS: ON",
    "[OK] PWA_LAYER_ACTIVE"
  ]);

  // STATE: Mobile Detection for Responsive Layout
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetchData();
    // THE RESPONSIVE LISTENER: Adapting to the physical world (Phone vs Desktop)
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchData = () => {
    axios.get('https://yt-disruptor-v1-0.onrender.com/api/videos')
      .then(res => setVideos(res.data))
      .catch(() => setLogs(prev => [...prev, "[ERROR] SIGNAL_LOST: DB_UNREACHABLE"]));
  };

  const handleDecrypt = (id, title) => {
    axios.put(`https://yt-disruptor-v1-0.onrender.com/api/videos/decrypt/${id}`)
      .then(() => {
        setLogs(prev => [
          ...prev, 
          `[!] DECRYPTED: ${title}`, 
          `[SUCCESS] BREACH_CONFIRMED_${new Date().toLocaleTimeString()}`
        ]);
        fetchData();
      })
      .catch(() => setLogs(prev => [...prev, `[FAIL] BREACH_BLOCKED: ${title}`]));
  };

  const handleReset = () => {
    axios.put('https://yt-disruptor-v1-0.onrender.com/api/videos/reset-all')
      .then(() => {
        setLogs(prev => [
          ...prev, 
          "[!] SYSTEM_KILL_SWITCH_ACTIVATED", 
          "[REBOOT] RE-ENCRYPTING_GLOBAL_PROTOCOLS..."
        ]);
        fetchData();
      })
      .catch(() => setLogs(prev => [...prev, "[ERROR] RESET_SEQUENCE_ABORTED"]));
  };

  // ALGORITHM: Linear Search Filter for Target Selection
  const filteredVideos = videos.filter(vid => 
    vid.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', 
      display: 'flex', flexDirection: isMobile ? 'column' : 'row', // DYNAMIC STACKING
      fontFamily: '"Courier New", Courier, monospace', overflowX: 'hidden'
    }}>
      
      {/* LEFT SIDE: COMMAND FEED */}
      <div style={{ 
        width: isMobile ? '100%' : '60%', padding: isMobile ? '20px' : '40px', 
        borderRight: isMobile ? 'none' : '2px solid #1a1a1a',
        borderBottom: isMobile ? '2px solid #1a1a1a' : 'none',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ color: '#ff0000', fontSize: isMobile ? '32px' : '52px', letterSpacing: '-2px', margin: '0 0 20px 0' }}>
          ▶ YT_DISRUPTOR_V1.0
        </h1>
        
        {/* SEARCH BAR */}
        <input 
          type="text"
          placeholder="SEARCH_FOR_TARGET_PROTOCOL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%', backgroundColor: '#0a0a0a', border: '1px solid #333',
            color: '#00ff00', padding: '15px', fontSize: '16px', fontFamily: 'inherit',
            outline: 'none', marginBottom: '30px', boxSizing: 'border-box'
          }}
        />
        
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
          {filteredVideos.map((vid, index) => (
            <div key={index} style={{ 
              backgroundColor: '#0a0a0a', padding: '20px', 
              border: vid.isZeroEncrypted ? '2px solid #00ff00' : '1px solid #ff0000',
              boxShadow: vid.isZeroEncrypted ? '0 0 10px #00ff0033' : 'none' 
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: vid.isZeroEncrypted ? '#00ff00' : '#eee' }}>
                {vid.title}
              </h3>
              <button 
                onClick={() => handleDecrypt(vid._id, vid.title)}
                disabled={vid.isZeroEncrypted}
                style={{ 
                  backgroundColor: vid.isZeroEncrypted ? '#111' : '#ff0000', 
                  color: vid.isZeroEncrypted ? '#00ff00' : 'white', 
                  border: vid.isZeroEncrypted ? '1px solid #00ff00' : 'none', 
                  padding: '12px', fontSize: '12px', fontWeight: 'bold', width: '100%',
                  cursor: vid.isZeroEncrypted ? 'default' : 'pointer' 
                }}>
                {vid.isZeroEncrypted ? 'BREACHED' : 'DECRYPT_PROTOCOL'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: SYSTEM MONITOR */}
      <div style={{ 
        width: isMobile ? '100%' : '40%', padding: isMobile ? '20px' : '40px', 
        backgroundColor: '#020202', display: 'flex', flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ color: '#00ff00', fontSize: '24px', borderBottom: '2px solid #00ff00', paddingBottom: '10px', marginBottom: '20px' }}>
          SYSTEM_MONITOR
        </h2>
        
        <div style={{ color: '#00ff00', fontSize: '13px', lineHeight: '1.4', flexGrow: 1 }}>
          {logs.slice(-12).map((log, i) => (
            <p key={i} style={{ margin: '4px 0', borderLeft: '2px solid #00ff00', paddingLeft: '8px' }}>{log}</p>
          ))}
          
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid yellow', color: 'yellow', fontSize: '14px', textAlign: 'center' }}>
            [!] WINDOWS_NOT_ACTIVATED_DETECTION_RISK
          </div>

          <button 
            onClick={handleReset}
            style={{ 
              marginTop: '20px', padding: '12px', backgroundColor: 'transparent', color: '#00ff00', border: '2px solid #00ff00', 
              fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', width: '100%', textTransform: 'uppercase' 
            }}>
            Execute_System_Reset
          </button>
          
          <p style={{ color: '#ff0000', fontSize: '16px', fontWeight: 'bold', marginTop: '20px', animation: 'blink 1.5s infinite' }}>
            {">"} AWAITING_VARIANT_COMMAND_INPUT...
          </p>
        </div>
      </div>

      <style>{`@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.1; } 100% { opacity: 1; } }`}</style>
    </div>
  );
}

export default App;