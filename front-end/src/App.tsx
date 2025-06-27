import { BrowserRouter, Route, Routes } from "react-router";

import LayoutMain from "./LayoutMain";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import ContactsPage from "./pages/ContactsPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/contatos" element={<ContactsPage />} />
          <Route path="/pessoas" element={<PeoplePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
