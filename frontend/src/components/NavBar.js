import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ user, onLogout, qty }){

  // const cart = localStorage.getItem('cart')
  // console.log("CART FRPM NAVBAR :: ", cart)
  // const qty = 99 || 0;
  // console.log("QUANTITY : ", qty);

  return (
    <nav style={{ display:'flex', gap:15, padding:12, borderBottom:'1px solid #eee' }}>
      <Link to="/">Products</Link>
      <Link to="/cart">Cart({qty})</Link>
      {
        user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); onLogout(); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )
      }
    </nav>
  );
}
