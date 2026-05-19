import { Navigate } from "react-router-dom"


const SellerProtectedRoute = ({ isSeller, loading, children }) => {
  if (loading) return <div>Loading...</div>;

  if (!isSeller) {
    return <Navigate to={`/`} replace />;
  }

  return children;
};

export default SellerProtectedRoute