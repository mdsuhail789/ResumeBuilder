import API from './api';

export const registerUser = async (userData) => {
  const response = await API.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('resumecraft_token', response.data.token);
    localStorage.setItem('resumecraft_user', JSON.stringify(response.data));
  }
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('resumecraft_token', response.data.token);
    localStorage.setItem('resumecraft_user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('resumecraft_token');
  localStorage.removeItem('resumecraft_user');
};

export const getCurrentUser = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};
