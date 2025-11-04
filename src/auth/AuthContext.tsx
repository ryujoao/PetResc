import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import api from '../services/api'; // O Contexto importa o Axios
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirecionar

// 1. Interface para os dados do usuário (vem do backend)
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Efeito para carregar o usuário do localStorage ao iniciar
  useEffect(() => {
    async function loadStoragedData() {
      const storedToken = localStorage.getItem('@AuthData:token');
      const storedUser = localStorage.getItem('@AuthData:user');

      if (storedToken && storedUser) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }
    loadStoragedData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password, 
      });

      const { token, usuario } = response.data;

      localStorage.setItem('@AuthData:token', token);
      localStorage.setItem('@AuthData:user', JSON.stringify(usuario));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(usuario);

      if (usuario.role === 'ADMIN') {
        navigate('/admin/dashboard'); 
      } else {
        navigate('/'); 
      }

    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(err.response.data.error || 'E-mail ou senha inválidos.');
      }
      throw new Error('Erro de conexão. Tente novamente.');
    }
  };

  const logout = () => {
    localStorage.removeItem('@AuthData:token');
    localStorage.removeItem('@AuthData:user');
    api.defaults.headers.common['Authorization'] = undefined;
    setUser(null);
    navigate('/login'); 
  };

  if (isLoading) {
    return null; // ou um componente de splash screen/loading global
  }

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};