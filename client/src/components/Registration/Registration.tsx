import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../../context/UserContext";
interface RegistrationErrors {
  name?: string[];
  email?: string[];
  password?: string[];
}

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const navigate = useNavigate();
  const { setUser } = useUser();
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', { name, email, password });
      console.log('Registration successful:', response.data);
      setErrors({}); // Clear any previous errors
      const token = response.data.token;
      localStorage.setItem('token', token);
      const {user} = response.data;
      setUser(user);
      console.log(response.data)
      // Redirect to the home page
      navigate('/');
    } catch (error: any) {
      console.error('Registration failed:', error.response.data);
      setErrors(error.response.data.error || {});
    }
  };

  return (
      <div className={"auth_form"}>
        <h2>Registration</h2>
        {errors.name && <div style={{color: 'red'}}>{errors.name[0]}</div>}
        {errors.email && <div style={{color: 'red'}}>{errors.email[0]}</div>}
        {errors.password && <div style={{color: 'red'}}>{errors.password[0]}</div>}
        <form>
          <div className={"form_group"}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className={"form_group"}>
            <label htmlFor={"email"}>Email:</label>
            <input type="email" id={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className={"form_group"}>
            <label htmlFor={"pass"}>Password:</label>
            <input id={"pass"} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="button" onClick={handleRegistration}>
            Register
          </button>
          <Link to={"/login"}>Want to login!!</Link>
        </form>
      </div>
  );
};

export default Registration;