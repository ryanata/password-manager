import './App.css';
import Landing from './pages/Landing';
import About from './pages/About';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Welcome to password manager</h1>
        <nav className='PageNavigation'>
          <Link to="/">Home</Link>
          <Link to="about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="about" element={<About/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
