import React, {useEffect, useState} from 'react';
import { DetailChatbox, Sidebar } from '../../components/index';
import { useParams } from 'react-router-dom';
import { oneChat } from '../../api';
import { useSelector } from 'react-redux'; 


const ChatDetails = () => {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [details, setDetails] = useState([]);

  const chat = useSelector((state) => state.chat.currentChat);

  useEffect(() => {
    const fetchChatDetails = async () => {
      if (id !== chat._id) {
        const chatDetails = await oneChat(id); // Await the response from oneChat
        setDetails(chatDetails || []); // Update details with the response
        console.log(details);
      }
    };

    if (id !== chat._id) {
    fetchChatDetails();
    }
  }, [id, chat]); // Remove 'details' from the dependency array and add 'chat'

  return (
    <>
    <Sidebar />
    <DetailChatbox content={content} setContent={setContent} details={details}/>
    </>
  )
}

export default ChatDetails