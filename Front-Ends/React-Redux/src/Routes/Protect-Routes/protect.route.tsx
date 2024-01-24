import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../Utils/Storage/local.storage';
const ProtectedRoute = () => {
  const isAuthenticated = getToken();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
