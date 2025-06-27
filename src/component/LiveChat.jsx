// ChatSidebar.jsx
import React, { useState } from 'react';

const stickers = [
  '😀', '😂', '😍', '😎', '😭', '😡', '👍', '🙏', '🎉', '🔥','😀','🙂','😉','😍','🥰','☠️','🤡','🫶','😍','🧐','🙇‍♂️','😂','✌️','💪','🙆‍♂️','🙅🏼‍♂️','💁🏽‍♂️','🤦🏽‍♂️','🤦‍♀️','💆‍♂️','💆‍♀️','💃','🕺🏼','👯‍♀️','👯‍♂️','🧙🏽‍♂️','🧙🏽‍♀️','🧑🏽‍🎄','🎅🏽','👑','🥾','🧦','🧤','👜','🧣','🎩','🩴','👡','👠','👗','🐼','🙈','🙉','🙊','🐹'
];

const ChatSidebar = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showStickers, setShowStickers] = useState(false);

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, input]);
    setInput('');
    setShowStickers(false);
  };

  const handleStickerClick = (sticker) => {
    setInput((prev) => prev + sticker);
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>Live Chat 💬</div>

      <div style={styles.messages}>
        {messages.map((msg, idx) => (
          <div key={idx} style={styles.messageBubble}>
            {msg}
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button style={styles.sendBtn} onClick={sendMessage}>Send</button>
        <button style={styles.stickerBtn} onClick={() => setShowStickers(!showStickers)}>😊</button>
      </div>

      {showStickers && (
        <div style={styles.stickerPanel}>
          {stickers.map((sticker, idx) => (
            <span
              key={idx}
              style={styles.sticker}
              onClick={() => handleStickerClick(sticker)}
            >
              {sticker}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  chatContainer: {
    width: '30vw',
    height: '100vh',
    backgroundColor: '#1e1e2f',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    right: 0,
    top: 0,
    padding: '10px',
    boxSizing: 'border-box',
    borderLeft: '2px solid #444'
  },
  header: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '10px',
    padding: '5px',
  },
  messageBubble: {
    background: '#333',
    padding: '8px 12px',
    borderRadius: '12px',
    margin: '4px 0',
    maxWidth: '90%',
    wordWrap: 'break-word',
  },
  footer: {
    display: 'flex',
    gap: '5px',
  },
  input: {
    flex: 1,
    padding: '8px',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
  },
  sendBtn: {
    padding: '8px 10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4caf50',
    color: '#fff',
    cursor: 'pointer',
  },
  stickerBtn: {
    height: '40px',
    width: '40px',
    padding: '8px 10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2196f3',
    color: '#fff',
    cursor: 'pointer',
  },
  stickerPanel: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    backgroundColor: '#2d2d3a',
    padding: '10px',
    borderRadius: '10px',
    marginTop: '10px',
  },
  sticker: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'transform 0.1s',
  }
};

export default ChatSidebar;
