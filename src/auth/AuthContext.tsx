import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import api from "../services/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  nome: string;
  email: string;
  role: "ADMIN" | "ONG" | "PUBLICO";
  nomeOng?: string;
  cpf?: string;
  cnpj?: string;
  cep?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  telefone?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null; // <--- 1. ADICIONADO AQUI
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: User["role"][]) => boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); // <--- 2. ESTADO DO TOKEN ADICIONADO
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // const isTokenValid = (token: string): boolean => {
  //   try {
  //     const [, payload] = token.split('.');
  //     const decodedPayload = JSON.parse(atob(payload));
  //     return decodedPayload.exp * 1000 > Date.now();
  //   } catch {
  //     return false;
  //   }
  // };

  const isTokenValid = (token: string): boolean => {
    try {
      const [, payload] = token.split('.');
      
      // Correção para suportar caracteres UTF-8 (acentos)
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const decodedPayload = JSON.parse(jsonPayload);
      return decodedPayload.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Erro na validação do token:", error);
      return false;
    }
  };

  useEffect(() => {
    async function loadStoragedData() {
      const storedToken = localStorage.getItem("@AuthData:token");
      const storedUser = localStorage.getItem("@AuthData:user");

      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

        if (!isTokenValid(storedToken)) {
          logout();
          setIsLoading(false); // Importante desligar aqui também
          return;
        }

        try {
          console.log("Buscando dados atualizados do usuário...");
          const response = await api.get("/auth/me");

          setUser(response.data);
          localStorage.setItem("@AuthData:user", JSON.stringify(response.data));
        } catch (error) {
          console.error("Erro ao validar token:", error);
          // Se falhar (ex: sem internet), tenta usar o cache antigo
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            logout();
          }
        } finally {
          // O SEGREDO: Isso garante que o loading SEMPRE para
          setIsLoading(false);
        }
      } else {
        // Se não tem token, também para de carregar
        setIsLoading(false);
      }
    }

    loadStoragedData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api({
        method: "post",
        url: "/auth/login",
        data: { email, password },
      });
      console.log("Resposta do login:", response);

      const { token, usuario } = response.data;

      localStorage.setItem("@AuthData:token", token);
      localStorage.setItem("@AuthData:user", JSON.stringify(usuario));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Atualiza os estados
      setUser(usuario);
      setToken(token); // <--- 4. ATUALIZA O TOKEN NO LOGIN

      if (usuario.role === 'ADMIN') {
        navigate('/admin'); 
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(
          err.response.data.error || "E-mail ou senha inválidos."
        );
      }
      throw new Error("Erro de conexão. Tente novamente.");
    }
  };

  const logout = () => {
    localStorage.removeItem("@AuthData:token");
    localStorage.removeItem("@AuthData:user");
    api.defaults.headers.common["Authorization"] = undefined;

    // Limpa os estados
    setUser(null);
    setToken(null); // <--- 5. LIMPA O TOKEN NO LOGOUT

    navigate("/login");
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const isAuthenticated = !!user;

  const hasPermission = (requiredRoles: User["role"][]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token, // <--- 6. EXPORTA O TOKEN PARA O CONTEXTO
        isLoading,
        isAuthenticated,
        login,
        logout,
        hasPermission,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
