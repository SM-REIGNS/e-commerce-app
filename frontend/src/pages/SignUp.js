import React from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup({ setAuth }){
  const nav = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [err, setErr] = React.useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.auth.signup({ name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuth(data.token, data.user);
      nav('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth:400 }}>
      <h2>Signup</h2>
      {err && <div style={{ color:'red' }}>{err}</div>}
      <div><input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required /></div>
      <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
      <div><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
      <button type="submit">Signup</button>
    </form>
  );
}
