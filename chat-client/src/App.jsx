import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const getWebSocketUrl = (usePortReplacement) => {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = window.location.host;

  if (usePortReplacement) {
    const newHost = host.replace(/-\d+(?=\.app\.github\.dev)/, '-8081');
    return `${protocol}://${newHost}/ws`;
  } else {
    return `${protocol}://${window.location.hostname}:8081/ws`;
  }
};

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username] = useState('react-client');
  const ws = useRef(null);
  const [usePortReplacement, setUsePortReplacement] = useState(() => {
    return localStorage.getItem('usePortReplacement') === 'true';
  });
  const bottomRef = useRef(null);

  useEffect(() => {
    
    const url = getWebSocketUrl(usePortReplacement);
    const socket = new WebSocket(url);
    ws.current = socket;

    ws.current.onopen = () => {
      setMessages(() => [{ system: true, text: 'Connected to chat server.' }]);
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (!data.text || !data.user) return;

        if (data.user === username) return; // filter own echoed messages
        setMessages((prev) => [...prev, { ...data }]);
      } catch {
        setMessages((prev) => [...prev, { system: true, text: event.data }]);
      }
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    };

    ws.current.onclose = () => {
      setMessages((prev) => [
        ...prev,
        {
          system: true,
          text: `WebSocket: ${ws.current?.url ?? 'N/A'} closed.`,
        },
      ]);
    };
    ws.current.onerror = () => {
      setMessages((prev) => [...prev, { system: true, text: 'WebSocket error.' }]);
    };

    return () => ws.current?.close();
  }, [usePortReplacement, username]);

  const sendMessage = () => {
    if (ws.current?.readyState === WebSocket.OPEN && input.trim()) {
      const msg = {
        user: username,
        text: input.trim(),
        room: 'general',
      };
      ws.current.send(JSON.stringify(msg));
      setMessages((prev) => [...prev, { ...msg, local: true }]);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <h3>go-chat [client]
        <div style={{ float: 'right' }}>
          <label>
            <input
              type="checkbox"
              checked={usePortReplacement}
              onChange={(e) => {
                const checked = e.target.checked;
                setUsePortReplacement(checked);
                localStorage.setItem('usePortReplacement', checked);
              }}
            />
            codespace
          </label>
        </div>
      </h3>
      <div className="chat-log">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.system ? 'system' : msg.local ? 'self' : msg.user === 'ai-bot' ? 'ai' : 'other'}`}>
            <span className="user-label">{msg.user && !msg.system ? `${msg.user}: ` : ''}</span>
            <span>{msg.text}</span>
          </div>
        ))}
         <div ref={bottomRef} />
      </div>
      <div className="input-row">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;