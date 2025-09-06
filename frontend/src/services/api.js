import axios from 'axios';

const BACKEND = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const instance = axios.create({ baseURL: BACKEND, withCredentials: false });

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  auth: {
    signup: (payload) => instance.post('/auth/signup', payload),
    login: (payload) => instance.post('/auth/login', payload)
  },
  products: {
    list: (params) => instance.get('/products', { params }),
    create: (payload) => instance.post('/products', payload)
  },
  cart: {
    get: () => instance.get('/cart'),
    add: (p) => instance.post('/cart/add', p),
    remove: (p) => instance.post('/cart/remove', p),
    update: (p) => instance.post('/cart/update', p)
  }
};
