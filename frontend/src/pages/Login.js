import React from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ setAuth }){
  const nav = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [err, setErr] = React.useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.auth.login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuth(data.token, data.user);
      nav('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth:400 }}>
      <h2>Login</h2>
      {err && <div style={{ color:'red' }}>{err}</div>}
      <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
      <div><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
      <button type="submit">Login</button>
    </form>
  );
}
