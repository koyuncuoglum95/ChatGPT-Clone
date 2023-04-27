import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Signin, Home, ChatDetails } from './pages/index';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user.currentUser);
;
  return (
    <div className='App'>
      <Router>
        <Routes>
          {user ? (
          <Route index path='/' element={<Home />} />
          ) : (
          <Route path='/' element={<Navigate to='/signin' replace />} />
        )}
         <Route path='/signin' element={<Signin />} />
         <Route path='/chat/:id' element={<ChatDetails />} /> {/* Add this line */}

        </Routes>
      </Router>
    </div>
  )
}

export default App
