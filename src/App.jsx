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
import Order from "./Components/Order/Order";
import CreateOrder from "./Components/Order/CreateOrder";
import DetailOrder from "./Components/Order/DetailOrder";
import DetailDish from "./Components/MainPageComponent/DetailDish";
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
            <Route path="/order" element={<Order />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/detail-order/:idOrder" element={<DetailOrder />} />
            <Route path="/detail-dish/:idDish" element={<DetailDish />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
