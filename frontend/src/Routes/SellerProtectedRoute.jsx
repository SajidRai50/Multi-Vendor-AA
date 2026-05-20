


import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "../styles/loader.css"; // 👈 correct path

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  // 🟡 Loader
  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  // 🔴 Not seller
  if (!isSeller) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SellerProtectedRoute;