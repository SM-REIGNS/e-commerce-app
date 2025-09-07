import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import NavBar from './components/NavBar';

function App(){
  const [user, setUser] = React.useState(() => {
    const u = localStorage.getItem('user'); return u ? JSON.parse(u) : null;
  });

  const setAuth = (token, user) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      let cartList  = []
      user?.cart.forEach((c) => (cartList.push({ product: c?.product?._id, quantity: Number(c?.quantity)})));
      localStorage.setItem('cart',  JSON.stringify(cartList))
    }
    else localStorage.removeItem('user');
    setUser(user);
  };

  const cart = localStorage.getItem('cart')
  console.log("CART FRPM NAVBAR :: ", cart)
  const qty = cart?.length || 0;
  console.log("QUANTITY : ", qty);

  return (
    <BrowserRouter>
      <NavBar user={user} onLogout={() => setAuth(null,null)} quantity = {qty} />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<ProductList user={user} />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/signup" element={<Signup setAuth={setAuth} />} />
          <Route path="/cart" element={<Cart user={user} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
