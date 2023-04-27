import React, {useState} from 'react';
import { Chatbox, Sidebar } from '../../components/index';

const Home = () => {
  const [content, setContent] = useState("");
 
  return (
    <>
    <Sidebar />
    <Chatbox content={content} setContent={setContent}/>
    </>
  )
}

export default Home