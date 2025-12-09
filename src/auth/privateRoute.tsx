import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importando do mesmo diretório

export default function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{display:'flex', justifyContent:'center', padding:'50px'}}>Carregando...</div>;
  }

  // Se não estiver logado, manda para o Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, libera o acesso à rota filha (Outlet)
  return <Outlet />;
}