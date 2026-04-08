import { Navigate } from 'react-router-dom'
import { useSession } from '../../context/SessionContext.jsx'

function ProtectedRoute({ children, requireAdmin = false }) {
  const { session } = useSession()

  if (!session.token) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !session.isAdmin) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute