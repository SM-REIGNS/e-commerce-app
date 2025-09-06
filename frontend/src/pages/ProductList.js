import React from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function ProductList({ user }){
  const [products, setProducts] = React.useState([]);
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [q, setQ] = React.useState('');
  const [total, setTotal] = React.useState(0);

  const fetch = async () => {
    const { data } = await api.products.list({ minPrice, maxPrice, category, q });
    setProducts(data.products);
    setTotal(data.total);
  };

  React.useEffect(()=>{ fetch(); }, []);

  const addToCart = async (id) => {
    try {
      await api.cart.add({ productId: id, quantity: 1 });
      alert('Added to cart');
    } catch (e) {
      alert('Please login to add to cart');
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display:'flex', gap:10, marginBottom:12 }}>
        <input placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
        <input placeholder="Min price" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
        <input placeholder="Max price" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
        <button onClick={fetch}>Filter</button>
      </div>
      <div>Total: {total}</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:16 }}>
        {products.map(p => (
          <div key={p._id} style={{ border:'1px solid #eee', padding:12, borderRadius:6 }}>
            <img src={p.image || 'https://via.placeholder.com/200'} alt={p.title} style={{ width:'100%', height:140, objectFit:'cover' }} />
            <h3>{p.title}</h3>
            <div>{p.category}</div>
            <div>₹ {p.price}</div>
            <div style={{ display:'flex', gap:8, marginTop:8 }}>
              <button onClick={()=>addToCart(p._id)}>Add to cart</button>
              <Link to={`/product/${p._id}`}>View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
