import { useState } from 'react';
import { BiSend } from "react-icons/bi";
import './Chatbox.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChat } from '../../api/index';
import Response from '../Response/Response';

const Chatbox = ({ content, setContent }) => {
  const [chatData, setChatData] = useState([]);

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const chatHandler = async (e) => {
    e.preventDefault();

    const newChat = {
      id: user._id,
      content: content,
    };

    await fetchChat(dispatch, newChat, setChatData, chatData);
    setContent(""); // Clear the content state
  };

  return (
    <div className="chatbox-wrapper">
      <header className="chatbox-title">MehmetGPT</header>
      <div className="chatbox-area">
        <div className="conversation">
          {chatData.map((chat, index) => (
            <Response key={index} userMessage={chat.userPrompt} data={chat.choices} />
          ))}
        </div>
      </div>

      <div className="input-section">
        <div className="input-wrapper">
          <textarea rows="1" cols="80" className="message-input" placeholder="Send Message...." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
          <div className="send-icon-container">
            <BiSend className="send-icon" onClick={chatHandler}></BiSend>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
