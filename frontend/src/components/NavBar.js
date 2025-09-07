import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ user, onLogout }){


  let quantity = user?.cart?.reduce((t, i)=> (t + i?.quantity || 0), 0) || 0;

  return (
    <nav style={{ display:'flex', gap:15, padding:12, borderBottom:'1px solid #eee' }}>
      <Link to="/">Products</Link>
      <Link to="/cart">Cart({quantity})</Link>
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
