import './App.css';
import { Route,Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import ChatPage from './pages/Chat/ChatPage';


function App() {
  return (
     <div className="App">
     <Routes>
     <Route path='/' element={<HomePage/>}/>
     <Route path='/chats' element={<ChatPage/>}/>
     </Routes>
     </div>
  )
}

export default App
