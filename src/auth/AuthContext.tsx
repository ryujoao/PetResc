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

// =========================================================
// TIPAGEM DO USUÁRIO
// =========================================================
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
  photoURL?: string;

  ong?: {
    id: number;
    nome: string; 
    cnpj: string;
   
  };
  
  publico?: any;
  admin?: any;
}



// =========================================================
// TIPAGEM DO CONTEXTO
// =========================================================
interface AuthContextType {
  user: User | null;
  token: string | null;

  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: User["role"][]) => boolean;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =========================================================
// PROVIDER
// =========================================================
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // =========================================================
  // Função de validação do token
  // =========================================================
  const isTokenValid = (token: string): boolean => {
    try {
      const [, payload] = token.split(".");

      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const decodedPayload = JSON.parse(jsonPayload);

      return decodedPayload.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Erro na validação do token:", error);
      return false;
    }
  };

  // =========================================================
  // Carregar dados do storage ao iniciar
  // =========================================================
  useEffect(() => {
    async function loadStoragedData() {
      const storedToken = localStorage.getItem("@AuthData:token");
      const storedUser = localStorage.getItem("@AuthData:user");

      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

        // Se token expirou → logout
        if (!isTokenValid(storedToken)) {
          logout();
          setIsLoading(false);
          return;
        }

        try {
          console.log("Buscando dados atualizados do usuário...");
          const response = await api.get("/auth/me");

          setUser(response.data);
          localStorage.setItem("@AuthData:user", JSON.stringify(response.data));
        } catch (error) {
          console.error("Erro ao validar token:", error);

          // Se não tiver internet → usa o cache
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            logout();
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }

    loadStoragedData();
  }, []);

  // =========================================================
  // LOGIN
  // =========================================================
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      console.log("Resposta do login:", response);

      const { token, usuario } = response.data;

      // Salva no localStorage
      localStorage.setItem("@AuthData:token", token);
      localStorage.setItem("@AuthData:user", JSON.stringify(usuario));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(usuario);
      setToken(token);

      if (usuario.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(err.response.data.error || "E-mail ou senha inválidos.");
      }

      throw new Error("Erro de conexão. Tente novamente.");
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================
  const logout = () => {
    localStorage.removeItem("@AuthData:token");
    localStorage.removeItem("@AuthData:user");

    api.defaults.headers.common["Authorization"] = undefined;

    setUser(null);
    setToken(null);

    navigate("/login");
  };

  // =========================================================
  // PERMISSÕES
  // =========================================================
  const isAuthenticated = !!user;

  const hasPermission = (requiredRoles: User["role"][]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // =========================================================
  // PROVIDER
  // =========================================================
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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

// =========================================================
// HOOK DE AUTENTICAÇÃO
// =========================================================
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
