import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavbarComp from "./components/NavbarComp";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Show from "./pages/Show";

export const DataContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const tokenCookie = Cookies.get("access_token");
    if (tokenCookie) {
      const cokie = JSON.parse(tokenCookie);
      if (cokie) {
        setAuth(cokie);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <DataContext.Provider value={{ isLogin, setIsLogin, auth }}>
        <Routes>
          <Route exact path="/" element={<NavbarComp />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/edit/:slug" element={<Edit />} />
          <Route path="/dashboard/show/:slug" element={<Show />} />
        </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
