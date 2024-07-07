import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./Context/userContext";

import Profile from "./pages/Profile";
import { checkToken } from "./api/auth";
import NavBar from "./components/NavBar";
import List from "./pages/list";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(checkToken());
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="h-screen flex flex-col">
        <NavBar />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
