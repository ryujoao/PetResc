import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import Doar from "./pages/doar/doar";
import Adotar from "./pages/adotar/adotar";
import LarTemporario from "./pages/larTemporario/larTemporario";
import CadastroUsu from "./pages/cadastro/cadastroUsu";
import Index from "./pages/index/index";
import RegistrarAnimal from "./pages/registrarAnimal/registrarAnimal";
import CentralAdocao from "./pages/centralAdocao/centralAdocao";
import Perfil from "./pages/perfil/perfil";
import PerfilAnimal from "./pages/perfilAnimal/perfilAnimal";
import Institutos from "./pages/institutos/institutos";
import CadastroNext from "./pages/cadastro/cadastroNext";
import CadastroOng from "./pages/cadastro/cadastroOng";
import Login from "./pages/login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adotar" element={<Adotar />} />
        <Route path="/larTemporario" element={<LarTemporario />} />
        <Route path="/doar" element={<Doar />} />
        <Route path="/cadastro" element={<CadastroUsu />} />
        <Route path="/cadastroNext" element={<CadastroNext />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrarAnimal" element={<RegistrarAnimal />} />
        <Route path="/centralAdocao" element={<CentralAdocao />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfilAnimal/:id" element={<PerfilAnimal />} />
        <Route path="/instituto/:id" element={<Institutos />} />
        <Route path="/cadastroOng" element={<CadastroOng />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
