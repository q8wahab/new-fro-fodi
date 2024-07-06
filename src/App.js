import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./Context/userContext";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(false);

  // // Mock function to check token, replace with actual implementation
  // const checkToken = () => {
  //   // Check local storage or make an API call to verify token
  //   // Returning true for demonstration purposes
  //   return true;
  // };

  // useEffect(() => {
  //   setUser(checkToken());
  // }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <div className="h-screen flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
