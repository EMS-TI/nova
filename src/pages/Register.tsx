import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Preencha todos os campos');
      return;
    }

    if (localStorage.getItem(username)) {
      setError('Usuário já existe');
      return;
    }

    localStorage.setItem(username, password);
    navigate('/main');
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-lg space-y-6">
          <h1 className="text-2xl font-bold text-center">Cadastro</h1>
          
          <Input
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error}
          />

          <div className="relative">
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button type="submit" className="w-full">
            Cadastrar
          </Button>

          <p className="text-center text-gray-400">
            Já tem uma conta?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline"
            >
              Fazer login
            </button>
          </p>
        </form>
      </div>
    </Layout>
  );
}