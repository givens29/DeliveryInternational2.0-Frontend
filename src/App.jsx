import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navbar/Navbar";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import MainPage from "./Pages/MainPage";
import Profile from "./Pages/Profile";
import Cart from "./Components/Cart/Cart";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
