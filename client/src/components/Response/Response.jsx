import { useEffect, useState } from "react";
import './Response.css';
import chatGPT from '../../assets/ChatGPT.png';
import { useSelector } from 'react-redux';

const Response = ({ userMessage, data }) => {
  const user = useSelector((state) => state.user.currentUser);

  const [answer, setAnswer] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    const currentAnswer = data.length > 0 ? data[0].message.content : '';
    setAnswer(currentAnswer);
    setDisplayedText('');
  }, [data]);

  useEffect(() => {
    if (userMessage) {
      setTimeout(() => {
        setShowResponse(true);
      }, 1000); // Show response after 1 second
    }
  }, [userMessage]);

  useEffect(() => {
    if (!showResponse) return;

    const typingInterval = setInterval(() => {
      if (displayedText === answer) {
        clearInterval(typingInterval);
      } else {
        const nextCharacter = answer[displayedText.length];
        setDisplayedText(displayedText + nextCharacter);
      }
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };

  }, [answer, displayedText, showResponse]);

  return (
    <div>
      <div className="user-message">
        <img src={user.imageUrl} alt="Profile" className="user-avatar" />
        <p className="message-text">{userMessage}</p>
      </div>
      {showResponse && (
        <div className="response">
          {data.map((choice, index) => (
            <div key={choice._id} className="rsp">
              <img src={chatGPT} alt="Profile" className="chatImg" />
              <p>{displayedText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Response;
