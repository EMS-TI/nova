import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const { username, email, password, fullName } = formData;

    if (!username || !email || !password || !fullName) {
      setError('Preencha todos os campos');
      return;
    }

    // Validação de email simples
    if (!email.includes('@')) {
      setError('Digite um email válido');
      return;
    }

    // Simulação de armazenamento
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((user: any) => user.username === username)) {
      setError('Usuário já existe');
      return;
    }

    users.push({ username, email, password, fullName });
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-lg space-y-6">
          <h1 className="text-2xl font-bold text-center">Cadastro</h1>

          <Input
            label="Nome Completo"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={error}
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <Input
            label="Usuário"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />

          <div className="relative">
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
