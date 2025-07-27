import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Contect from './components/Contect/Contect';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/skills' element={<Skills/>}/>
        <Route path='/experience' element={<Experience/>}/>
        <Route path='/projects' element={<Projects />} />
        <Route path='/contect' element={<Contect />} />


      </Routes>
    </Router>
  );
}

export default App;
