import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Admin() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>Panel de administración</h1>
      <p>Administra tus productos, pedidos y usuarios aquí</p>
    </div>
  );
}

export default Admin;
