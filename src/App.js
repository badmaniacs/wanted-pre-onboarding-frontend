import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js'
import Todo from './pages/Todo.js'
import Join from './pages/Join.js'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/join" element={<Join/>}/>
      </Routes>
  );
}

export default App;
