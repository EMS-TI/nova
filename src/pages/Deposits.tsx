import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import type { Deposit } from '../types';

const TOTAL_AMOUNT = 5050;

export function Deposits() {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [totalDeposited, setTotalDeposited] = useState(0);
  const navigate = useNavigate();
  const username = localStorage.getItem('currentUser');

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/login');
      return;
    }

    const savedDeposits = JSON.parse(
      localStorage.getItem(`${username}_deposits`) || '[]'
    );
    
    if (savedDeposits.length === 0) {
      const initialDeposits = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        amount: i + 1,
        date: '',
        marked: false,
      }));
      setDeposits(initialDeposits);
    } else {
      setDeposits(savedDeposits);
    }
  }, [username, navigate]);

  useEffect(() => {
    const total = deposits.reduce(
      (sum, deposit) => sum + (deposit.marked ? deposit.amount : 0),
      0
    );
    setTotalDeposited(total);
  }, [deposits]);

  const handleDeposit = (deposit: Deposit) => {
    const newDeposits = deposits.map((d) => {
      if (d.id === deposit.id) {
        return {
          ...d,
          marked: !d.marked,
          date: !d.marked ? new Date().toISOString() : '',
        };
      }
      return d;
    });

    setDeposits(newDeposits);
    localStorage.setItem(`${username}_deposits`, JSON.stringify(newDeposits));
  };

  const handleReset = () => {
    const newDeposits = deposits.map((d) => ({
      ...d,
      marked: false,
      date: '',
    }));
    setDeposits(newDeposits);
    localStorage.setItem(`${username}_deposits`, JSON.stringify(newDeposits));
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const progress = (totalDeposited / TOTAL_AMOUNT) * 100;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gray-800 p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Controle de Depósitos</h2>
            <div className="space-x-4">
              <Button variant="secondary" onClick={handleReset}>
                Reiniciar
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </div>

          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Total Depositado</p>
              <p className="text-2xl font-bold">
                R$ {totalDeposited.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400">Falta Depositar</p>
              <p className="text-2xl font-bold">
                R$ {(TOTAL_AMOUNT - totalDeposited).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {deposits.map((deposit) => (
            <button
              key={deposit.id}
              onClick={() => handleDeposit(deposit)}
              className={`
                aspect-square rounded-lg font-medium transition-colors
                ${
                  deposit.marked
                    ? 'bg-blue-500 hover:bg-red-600'
                    : 'bg-gray-600'
                }
              `}
              title={deposit.date ? new Date(deposit.date).toLocaleDateString() : ''}
            >
              {deposit.id}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}