import { Navigate } from "react-router";
import { useAuthContext } from "./providers/AuthProvider";
import LayoutMain from "./LayoutMain";

export default function ProtectedRoute() {
    const { token } = useAuthContext();

    // verifica se tem usuário logado
    if (!token) {
        // Se não tem, redireciona para o login
        return <Navigate to="/login" />;
    }

    // Se está autenticado, exibe as rotas
    return <LayoutMain />;
};
