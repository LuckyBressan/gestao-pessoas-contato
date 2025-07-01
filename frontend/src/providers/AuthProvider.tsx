import api from "@/services/api";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextype = {
    token: string|null;
    setToken: (token: string) => void
}

const AuthContext = createContext<AuthContextype|undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro do AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [token, _setToken] = useState('teste');

    const setToken = (newToken: string) => {
        _setToken(newToken);
    };

    useEffect(() => {
        if (token) {
        api.defaults.headers.common["Authorization"] = "Bearer " + token;
        localStorage.setItem('gestao-pessoas-contatos:token',token);
        } else {
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem('gestao-pessoas-contatos:token')
        }
    }, [token]);

    const contextValue = useMemo(() => ({
        token,
        setToken,
    }), [token]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};