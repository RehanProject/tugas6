// src/axios.js

import axios from 'axios';

// Membuat instance Axios dengan baseURL yang sesuai
const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

export default instance;
