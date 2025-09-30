import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Denuncie from "./pages/denuncie";
import Doar from "./pages/doar";
import Adotar from "./pages/adotar";
import LarTemporario from "./pages/larTemporario";
import CadastroUsu from "./pages/cadastroUsu";
import Index from "./pages";
import RegistrarAnimal from "./pages/registrarAnimal";
import CentralAdocao from "./pages/centralAdocao";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/denuncie" element={<Denuncie />} />
        <Route path="/adotar" element={<Adotar />} />
        <Route path="/larTemporario" element={<LarTemporario />} />
        <Route path="/doar" element={<Doar />} />
        <Route path="/cadastro" element={<CadastroUsu />} />
        <Route path="/registrarAnimal" element={<RegistrarAnimal />} />
        <Route path="/centralAdocao" element={<CentralAdocao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
