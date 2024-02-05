import React, { useState } from 'react';
import './ChatGenerator.css'; 
import sendMessageToChatGPT from './sendMessageToChatGPT';

const ChatGenerator = () => {
    const [userMessage, setUserMessage] = useState('');
    const [botResponse, setBotResponse] = useState('');
  
    const handleSendMessage = async () => {
      const response = await sendMessageToChatGPT(userMessage);
      setBotResponse(response);
    };
  
  return (
    <div className="chat-container">
      <div className="chat-messages">
      <p>User: {userMessage}</p>
        <p>Model: {botResponse}</p>
      </div>
      <div className="chat-input">
      <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatGenerator;
