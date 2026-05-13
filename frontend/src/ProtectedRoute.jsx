import { Navigate } from "react-router-dom"


const ProtectedRoute = ({ isAuthenticated, loading, children }) => {
  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute