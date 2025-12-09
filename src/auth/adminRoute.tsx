import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function AdminRoute() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{display:'flex', justifyContent:'center', padding:'50px'}}>Carregando...</div>;
  }

  // Se não está logado OU a role não é ADMIN, chuta para a Home
  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  // Se for Admin, libera o acesso
  return <Outlet />;
}