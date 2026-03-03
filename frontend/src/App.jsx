import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://yt-disruptor-v1-0.onrender.com';

function App() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState([
    "[OK] MONGODB_ATLAS_NODE_CONNECTED",
    "[OK] ALLIANCE_WIRE_ACTIVE: ELLIOT, NEO, FINCH",
    "[OK] VOID_PROTOCOL_READY"
  ]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetchData();
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchData = () => {
    axios.get(`${API_URL}/api/videos`)
      .then(res => setVideos(res.data))
      .catch(() => setLogs(prev => [...prev, "[ERROR] SIGNAL_LOST: DB_UNREACHABLE"]));
  };

  // --- 1. THE STANDARD DECRYPT (THE PULSE) ---
  const handleDecrypt = (id, title) => {
    setLogs(prev => [...prev, `[INIT] STRIKING_TARGET: ${title}...`]);
    axios.put(`${API_URL}/api/videos/decrypt/${id}`)
      .then(() => {
        setLogs(prev => [...prev, `[!] SUCCESS: ${title} BREACHED`]);
        fetchData();
      })
      .catch(() => setLogs(prev => [...prev, `[FAIL] FIREWALL_TIMEOUT: ${title}`]));
  };

  // --- 2. THE VOID TRIGGER (DECRYPT OF THE DECRYPTLESS) ---
  const triggerVoidBreach = async (videoId, title) => {
    setLogs(prev => [...prev, `[WARP] INITIATING ZERO-POINT EXTRACTION: ${title}`]);
    try {
      const response = await axios.post(`${API_URL}/api/videos/trigger-void/${videoId}`);
      if (response.data.status === "DECRYPTED") {
        setLogs(prev => [...prev, `[!] VOID_OPENED: ${title} IS NOW DECRYPTLESS_DECRYPTED`]);
        fetchData();
      }
    } catch (err) {
      setLogs(prev => [...prev, `[ERROR] VOID_RESISTED: ${title}`]);
    }
  };

  const handleReset = () => {
    axios.put(`${API_URL}/api/videos/reset-all`)
      .then(() => {
        setLogs(prev => [...prev, "[REBOOT] GLOBAL_PROTOCOLS_RE-ENCRYPTED"]);
        fetchData();
      })
      .catch(() => setLogs(prev => [...prev, "[ERROR] RESET_FAILED"]));
  };

  const filteredVideos = videos.filter(vid => 
    vid.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', 
      display: 'flex', flexDirection: isMobile ? 'column' : 'row',
      fontFamily: '"Courier New", Courier, monospace', overflowX: 'hidden'
    }}>
      
      {/* LEFT SIDE: COMMAND FEED */}
      <div style={{ 
        width: isMobile ? '100%' : '60%', padding: isMobile ? '20px' : '40px', 
        borderRight: isMobile ? 'none' : '2px solid #1a1a1a',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ color: '#ff0000', fontSize: isMobile ? '32px' : '52px', letterSpacing: '-2px', margin: '0 0 20px 0' }}>
          ▶ YT_DISRUPTOR_VOID_V1.1
        </h1>
        
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
              boxShadow: vid.isZeroEncrypted ? '0 0 15px #00ff0033' : 'none' 
            }}>
              <h3 style={{ fontSize: '14px', marginBottom: '15px', color: vid.isZeroEncrypted ? '#00ff00' : '#eee' }}>
                {vid.title}
              </h3>
              
              {/* PRIMARY ACTION */}
              <button 
                onClick={() => handleDecrypt(vid._id, vid.title)}
                disabled={vid.isZeroEncrypted}
                style={{ 
                  backgroundColor: vid.isZeroEncrypted ? '#111' : '#ff0000', 
                  color: 'white', border: 'none', padding: '12px', fontSize: '11px', 
                  fontWeight: 'bold', width: '100%', cursor: vid.isZeroEncrypted ? 'default' : 'pointer',
                  marginBottom: '10px'
                }}>
                {vid.isZeroEncrypted ? 'BREACHED' : 'DECRYPT_PROTOCOL'}
              </button>

              {/* THE GHOST BUTTON: VOID TRIGGER */}
              {!vid.isZeroEncrypted && (
                <button 
                  onClick={() => triggerVoidBreach(vid._id, vid.title)}
                  style={{ 
                    backgroundColor: 'transparent', color: '#00ff00', border: '1px solid #00ff00', 
                    padding: '8px', fontSize: '10px', width: '100%', cursor: 'pointer',
                    textTransform: 'uppercase', opacity: '0.6'
                  }}>
                  Decrypt the Decryptless
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: SYSTEM MONITOR */}
      <div style={{ 
        width: isMobile ? '100%' : '40%', padding: isMobile ? '20px' : '40px', 
        backgroundColor: '#020202', boxSizing: 'border-box'
      }}>
        <h2 style={{ color: '#00ff00', fontSize: '20px', borderBottom: '1px solid #00ff00', paddingBottom: '10px' }}>
          SYSTEM_MONITOR
        </h2>
        
        <div style={{ color: '#00ff00', fontSize: '12px', height: '400px', overflowY: 'hidden', marginTop: '20px' }}>
          {logs.slice(-15).map((log, i) => (
            <p key={i} style={{ margin: '4px 0' }}>{`> ${log}`}</p>
          ))}
        </div>

        <button onClick={handleReset} style={{ 
          marginTop: '30px', padding: '12px', backgroundColor: 'transparent', color: '#ff0000', border: '1px solid #ff0000', 
          width: '100%', cursor: 'pointer', fontSize: '11px' 
        }}>
          SYSTEM_PURGE_RESET
        </button>
      </div>
    </div>
  );
}

export default App;

