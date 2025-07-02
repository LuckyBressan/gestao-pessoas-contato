import { createBrowserRouter, Navigate, RouterProvider, type RouteObject } from "react-router";
import LoginPage from "./pages/LoginPage";
import { useAuthContext } from "./providers/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import PeoplePage from "./pages/PeoplePage";
import ContactsPage from "./pages/ContactsPage";
import LayoutMain from "./LayoutMain";

export default function Routes() {
  const { token, logout } = useAuthContext();

  // Rotas disponíveis somente para usuários autenticados
  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: "/",
      element: <ProtectedRoute />, // Componente responsável pela verificação de autenticação
      children: [
        {
          index: true,
          element: <Navigate to="/pessoas" replace />
        },
        {
          path: "/pessoas",
          element: <PeoplePage />,
        },
        {
          path: "/contatos",
          element: <ContactsPage />,
        },
        {
          path: "/logout",
          action: () => logout()
        },
        {
          path: "/login",
          element: <Navigate to="/pessoas" replace />
        },
      ],
    },
  ];

  // Rotas disponíveis apenas para usuários não autenticados
  const routesForNotAuthenticatedOnly: RouteObject[] = [
    {
        path: '/',
        element: <LayoutMain />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            }
        ]
    }
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};