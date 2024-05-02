import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer'; // importing it here because it is a shared component!

function App() {

  return (
    <>
    <NavBar/>
    <div className="min-vh-100">
      <Outlet/>
      <Footer/>
    </div>
    </>
  )
}

export default App
