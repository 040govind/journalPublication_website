import "./App.css";
// import './style/app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JournalSubmitForm from "./pages/JournalSubmitForm";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin, Reviewer } from "./middleware/auth.js";
import Home from "./pages/Home";
// import Circle from './component/Circle.jsx';
import Profile from "./pages/Profile.jsx";
import Navvar from "./component/Navvar.jsx";
import Footer from "./component/Footer.jsx";
import AllReviewer from "./pages/AllReviewer.jsx";
import AllJournal from "./pages/AllJournal.jsx";
import AddReviewer from "./component/AddReviewer.jsx";

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Navvar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              <Public>
                <Signup />
              </Public>
            }
          />
          <Route
            path="/login"
            element={
              <Public>
                <Login />
              </Public>
            }
          />
          <Route
            path="/submit_paper"
            element={
              <Protected>
                <JournalSubmitForm />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/all-submit-paper"
            element={
              <Protected>
                <JournalSubmitForm />
              </Protected>
            }
          />
           <Route
            path="/all-journal"
            element={
              <Admin>
                <AllJournal />
              </Admin>
            }
          />
          <Route
            path="/list-of-reviewer"
            element={
              <Admin>
                <AllReviewer />
              </Admin>
            }
          />
          <Route
            path="/journal/:id"
            element={
              <Admin>
                <AddReviewer />
              </Admin>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
