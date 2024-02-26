
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navvar from './component/Navvar'
import JournalSubmitForm from './pages/JournalSubmitForm';
import { Toaster } from "react-hot-toast";
import { Outlet } from 'react-router-dom';
import Footer from './component/Footer';
import Home from './pages/Home';

function App() {
  return (
    <> 
      <Toaster/>
      <Navvar/>
      <Outlet/>
       {/* <Login/> */}
       {/* <JournalSubmitForm/> */}
       <Home/>
      <Footer/>
    </>
   

  );
}

export default App;
