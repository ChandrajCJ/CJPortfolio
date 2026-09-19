import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Project from './pages/Project'
import Contact from './pages/Contact'
import Cursor from './components/Cursor'

function App() {

  return (
    
    <div className='app'>
      <Cursor/>
      
      <Navbar/>
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="project"><Project /></section>
      <section id="contact"><Contact /></section>

    </div>
  )
}

export default App
