// Este componente englobara las rutas que tienen que estar protegidas, con el fin de no poder acceder a ellas desde el header.

// outlet sirve para continuar con el componente que este adentro
import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {
  const {loading, isAuthenticated} = useAuth();

  if (loading) return <h1>
    Loading...
  </h1>

  if (!loading && !isAuthenticated) return <Navigate to= '/login' replace/>

  return (
    <Outlet/>
  )
}

export default ProtectedRoute;