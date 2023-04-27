import { useState } from 'react';
import { BiSend } from "react-icons/bi";
import './DetailChatbox.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChat } from '../../api/index';
import chatGPT from '../../assets/ChatGPT.png';


const DetailChatbox = ({ content, setContent, details }) => {
  const [chatData, setChatData] = useState([]);

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const detailsArray = details ? [details] : [];

  const chatHandler = async (e) => {
    e.preventDefault();

    const newChat = {
      id: user._id,
      content: content,
    };

    await fetchChat(dispatch, newChat, setChatData, chatData);
    setContent(""); // Clear the content state
  };

  console.log('Details:', details);


  return (
    <div className="chatbox-wrapper">
      <header className="chatbox-title">MehmetGPT</header>
      <div className="chatbox-area">
        <div className="conversation">
        {detailsArray.map((chat, index) => (
            <div key={index}>
              <div className="user-message">
                <img src={user.imageUrl} alt="Profile" className="user-avatar" />
                <p className="message-text">{chat.userPrompt}</p>
              </div>
              {chat.choices && chat.choices.length > 0 && (
                <div className="response">
                  <div className='rsp'>
                  <img src={chatGPT} alt="Profile" className="chatImg" />
                  <p>{chat.choices[0].message.content}</p>
                  </div>
                </div>
              )}
            </div>
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

export default DetailChatbox;
