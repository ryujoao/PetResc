import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Denuncie from "./pages/denuncie";
import Doar from "./pages/doar";
import Adotar from "./pages/adotar";
import Voluntarios from "./pages/voluntarios";
import CadastroUsu from "./pages/cadastroUsu";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/denuncie" element={<Denuncie />} />
        <Route path="/adotar" element={<Adotar />} />
        <Route path="/voluntarios" element={<Voluntarios />} />
        <Route path="/doar" element={<Doar />} />
        <Route path="/cadastro" element={<CadastroUsu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
