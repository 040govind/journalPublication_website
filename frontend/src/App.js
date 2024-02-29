
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import JournalSubmitForm from './pages/JournalSubmitForm';
import { Toaster } from "react-hot-toast";
import {Protected,Public,Admin,Reviewer} from "./middleware/auth.js";
import Home from './pages/Home';


function App() {
  return (
    <> 
      <Router>
      <Toaster/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={
            <Public>
              <Signup/>
            </Public>
          } />
          <Route path="/login" element={ 
          <Public>
              <Login/>
          </Public>} />
          <Route path="/submit-paper" element={
            <Protected>
              <JournalSubmitForm/>
            </Protected>
          } />
        </Routes>
      </Router>
    </>
   

  );
}

export default App;
