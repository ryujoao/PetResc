import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import api from '../services/api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'ONG' | 'PUBLICO';
  cpf?: string;
  cnpj?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>; 
  logout: () => void;
  hasPermission: (requiredRole: User['role'][]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isTokenValid = (token: string): boolean => {
    try {
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  useEffect(() => {
    async function loadStoragedData() {
      const storedToken = localStorage.getItem('@AuthData:token');
      const storedUser = localStorage.getItem('@AuthData:user');

      if (storedToken && storedUser) {
        if (!isTokenValid(storedToken)) {
          logout();
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        console.log("Dados do usuário carregados:", parsedUser);
        
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setUser(parsedUser);
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

      console.log("=== Dados do Login ===");
      console.log("Usuario:", usuario);
      console.log("Role:", usuario.role);
      console.log("===================");

      if (!['ADMIN', 'ONG', 'PUBLICO'].includes(usuario.role)) {
        throw new Error('Role de usuário inválido');
      }

      const userData = {
        ...usuario,
        role: usuario.role
      };

      localStorage.setItem('@AuthData:token', token);
      localStorage.setItem('@AuthData:user', JSON.stringify(userData));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      navigate('/');

    } catch (err) {
      console.error('Erro no login:', err);
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

  const hasPermission = (requiredRoles: User['role'][]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated, 
        login, 
        logout,
        hasPermission 
      }}
    >
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