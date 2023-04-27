import { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout, allChat, resetChat } from '../../api/index';
import { MdOutlineNightlight } from 'react-icons/md';
import { IoMdSunny, IoMdLogOut } from 'react-icons/io';
import { AiOutlinePlus, AiOutlineHistory } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);


  const user = useSelector((state) => state.user.currentUser);
  const chat = useSelector((state) => state.chat.currentChat);


  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleResetChat= () => {
    navigate('/');
  }

  const handleLogout = () => {
    Logout(dispatch, navigate);
    resetChat(dispatch, navigate);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    allChat(setHistory);
  },[]);

   // Add this useEffect to log the updated history state
   useEffect(() => {
    console.log(history);
  }, [history]);

  return (
    <>
      <div className="sidebar-container">
        <FiMenu
          className="hamburger-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <div className={`sidebar${menuOpen ? '' : ' sidebar-closed'}`}>
          <ul>
            <li>
              <p style={{ color: 'white', cursor: 'pointer', fontSize: '22px' }} className='newChat' onClick={handleResetChat}>
                <AiOutlinePlus className='plus-logo'/>
                New Chat
              </p>
            </li>

            <li>
              {theme === 'dark' ? 
               <p onClick={toggleTheme} style={{ color: 'white', cursor: 'pointer', marginLeft: '-2.8rem', fontSize: '20px', textAlign: 'center' }}>
               <IoMdSunny className='sunny-logo'/>Light</p>
                : 
                <p onClick={toggleTheme} style={{ color: 'white', cursor: 'pointer', marginLeft: '-2.8rem', fontSize: '20px', textAlign: 'center' }}>
                <MdOutlineNightlight className='dark-logo'/>Dark</p>
              }
            </li>

            <li>
              <p onClick={handleLogout} style={{ color: 'white', cursor: 'pointer', marginLeft: '-2.8rem', fontSize: '20px', textAlign: 'center' }}>
                <IoMdLogOut className='logout-logo'/>
                Logout
              </p>
            </li>
            <hr style={{width:'13rem', marginLeft: '-5rem'}}></hr>
            <li>
              <p style={{ color: 'white', cursor: 'pointer', fontSize: '22px' }}>Chat History</p>
              <ul className="sidebar-history-list">
                {history
                .filter((chat) => chat.userId === user._id)
                .map((chat, index) => (
                <li key={index} className="sidebar-history-item">
                  <p style={{ color: 'white', cursor: 'pointer', fontSize: '17px', marginLeft: '-5.2rem', width: '10rem' }}>
                    <AiOutlineHistory style={{marginRight: '0.7rem'}}/>
                  <Link to={`/chat/${chat._id}`} style={{color: 'white', textDecoration: 'none'}}>{chat.userPrompt}</Link>
                  </p>
                </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
