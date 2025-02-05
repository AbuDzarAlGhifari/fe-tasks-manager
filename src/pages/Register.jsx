import React, { useState } from 'react';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';
import Button from '../components/common/Button';
import { register as registerService } from '../services/auth';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerService({ username, email, password });
      toast.success('Registrasi berhasil');
      navigate('/login');
    } catch (error) {
      toast.error('Registrasi gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 font-mono">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="bg-gray-50 text-gray-900 border-gray-300"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="bg-gray-50 text-gray-900 border-gray-300"
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="bg-gray-50 text-gray-900 border-gray-300"
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Register
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-600 font-mono">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
