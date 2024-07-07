import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./Context/userContext";

import Profile from "./pages/Profile";
import { checkToken } from "./api/auth";
import NavBar from "./components/NavBar";
import List from "./pages/list";
import LandingPage from "./pages/LandingPage";
import CategoryRecipes from "./pages/CategoryRecipes";
import UserRecipe from "./pages/UserRecipe";

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/category/:categoryId" element={<CategoryRecipes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/list" element={<List />} />
          <Route path="/user/:userId" element={<UserRecipe />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
