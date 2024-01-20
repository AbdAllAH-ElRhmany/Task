import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

interface LoginErrors {
  email?: string[];
  password?: string[];
  error?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      console.log('Login successful:', response.data);

      const token = response.data.token;

      const { user } = response.data;
      console.log(user);

      localStorage.setItem('token', token);

      setUser(user);

      navigate('/');
    } catch (error: any) {
      console.error('Login failed:', error.response.data);
      setErrors(error.response.data.error || {});
    }
  };

  return (
      <div className={"auth_form"}>
        <h2>Login</h2>
        {errors.email && <div style={{ color: 'red' }}>{errors.email[0]}</div>}
        {errors.password && <div style={{ color: 'red' }}>{errors.password[0]}</div>}
        {errors.error && <div style={{ color: 'red' }}>{errors.error}</div>}
        <form>
          <div className={"form_group"}>
            <label htmlFor={"email"}>Email:</label>
            <input type="email" id={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className={"form_group"}>
            <label htmlFor={"pass"}>Password:</label>
            <input id={"pass"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <Link to={"/register"}>Want to register!!</Link>
        </form>
      </div>
  );
};

export default Login;
