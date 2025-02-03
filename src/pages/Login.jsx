import React, { useState, useContext } from 'react';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';
import Button from '../components/common/Button';
import { login as loginService } from '../services/auth';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginService({ email, password });
      login(data.user, data.token);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-2xl border border-green-500">
        <h1 className="text-3xl font-mono font-bold text-center mb-6 text-green-400">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your-email@example.com"
            className="bg-gray-800 text-green-300 border-green-500"
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="bg-gray-800 text-green-300 border-green-500"
          />
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Login
          </Button>
        </form>
        <p className="mt-4 text-center text-green-300">
          Belum punya akun?{' '}
          <Link to="/register" className="text-green-500 hover:underline">
            Daftar disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
