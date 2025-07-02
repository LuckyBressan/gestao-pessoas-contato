import type { ErrorResponse, SuccessResponse } from "@/@types/Response";
import type { User } from "@/@types/User";
import api from "@/services/api";
import type { AxiosError, AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAlert } from "./AlertProvider";

type TokenType = string | null;

type AuthContextype = {
  token: TokenType;
  setToken: (token: TokenType) => void;
  user: User | null;
  login: (user: User) => Promise<boolean>;
  logout: () => void;
  register: (user: User) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextype | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro do AuthProvider");
  }
  return context;
}

interface UserWithToken {
  token: string;
  user: User;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const errorResponseDefault: (action: string) => ErrorResponse = (
  action: string
) => {
  return {
    error: {
      title: `Erro ao ${action} usuário!`,
    },
  };
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const keyStorage = "gestao-pessoas-contatos";
  const keyTokenStorage = `${keyStorage}:token`;
  const keyUserStorage = `${keyStorage}:user`;

  const userJson = localStorage.getItem(keyUserStorage);

  const { showAlert } = useAlert();

  const [token, _setToken] = useState<TokenType>(
    localStorage.getItem(keyTokenStorage)
  );
  const [user, setUser] = useState<User | null>(
    userJson ? JSON.parse(userJson) : null
  );

  const setToken = (newToken: TokenType) => {
    _setToken(newToken);
  };

  const setAuthorizationHeader = () => api.defaults.headers.common["authorization"] = `Bearer ${token}`;
  setAuthorizationHeader()

  useEffect(() => {
    if (token) {
      setAuthorizationHeader()
      localStorage.setItem(keyTokenStorage, token);
    } else {
      delete api.defaults.headers.common["authorization"];
      localStorage.removeItem(keyTokenStorage);
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(keyUserStorage, JSON.stringify(user));
    } else {
      localStorage.removeItem(keyUserStorage);
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
    }),
    [token]
  );

  const login = (user: User) => {
    if (!user) {
      showAlert({
        title: "Erro ao fazer login!",
        description: "Não foi possível fazer login por iconsistência de dados.",
        variant: "error",
      });
      return Promise.reject(false);
    }

    return api
      .post("auth/login", user)
      .then((res: AxiosResponse<UserWithToken>) => {
        const { token, user } = res.data;
        setToken(token);
        setUser(user);
        return true;
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        const data = err.response?.data;
        const { error } = data ?? errorResponseDefault("logar");
        showAlert({
          ...error,
          variant: "error",
        });
        console.error(error.trace);
        return false;
      });
  };

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  const register = (user: User) => {
    if (!user) {
      showAlert({
        title: "Erro ao registrar!",
        description: "Não foi possível registrar por inconsistência de dados.",
        variant: "error",
      });
      return Promise.reject(false);
    }

    return api
      .post("auth/register", user)
      .then((res: AxiosResponse<SuccessResponse>) => {
        showAlert({
            title: res.data.message,
            variant: 'success'
        })
        return true;
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        const data = err.response?.data;
        const { error } = data ?? errorResponseDefault("registrar");
        showAlert({
          ...error,
          variant: "error",
        });
        console.error(error.trace);
        return false;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        ...contextValue,
        login,
        logout,
        register
      }}>
      {children}
    </AuthContext.Provider>
  );
}
