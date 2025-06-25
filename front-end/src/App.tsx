import { BrowserRouter, Route, Routes } from "react-router";

import LayoutMain from "./LayoutMain";
import ContatosPage from "./pages/ContatosPage";
import HomePage from "./pages/HomePage";
import PessoasPage from "./pages/PessoasPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/contatos" element={<ContatosPage />} />
          <Route path="/pessoas" element={<PessoasPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
