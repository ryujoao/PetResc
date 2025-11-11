import { Routes, Route } from "react-router-dom";
// ...existing code...
import Home from "./pages/home/home";
import Doar from "./pages/doar/doar";
import Adotar from "./pages/adotar/adotar";
import LarTemporario from "./pages/larTemporario/larTemporario";
import CadastroUsu from "./pages/cadastro/cadastroUsu";
import RegistrarAnimal from "./pages/registrarAnimal/registrarAnimal";
import CentralAdocao from "./pages/centralAdocao/centralAdocao";
import Perfil from "./pages/perfil/perfil";
import PerfilAnimal from "./pages/perfilAnimal/perfilAnimal";
import Institutos from "./pages/institutos/institutos";
import CadastroNext from "./pages/cadastro/cadastroNext";
import CadastroOng from "./pages/cadastro/cadastroOng";
import Login from "./pages/cadastro/login";
import CadastroFinal from "./pages/cadastro/cadastroFinal";
import FormularioLarTemporario from "./pages/larTemporario/formularioLarTemporario";
import FormularioAdotar from "./pages/adotar/formularioAdotar";
import Config from "./pages/configuracoes/configMenu";
import ConfigLayout from "./pages/configuracoes/configLayout";
import ConfigMenu from "./pages/configuracoes/configMenu";
import Conta from "./pages/configuracoes/conta";

// ...existing code...
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
      <Route path="/cadastroFinal" element={<CadastroFinal />} />
      <Route
        path="/formularioLarTemporario"
        element={<FormularioLarTemporario />}
      />
      <Route path="/formularioAdotar" element={<FormularioAdotar />} />

      <Route path="/config" element={<ConfigMenu />} />

      <Route element={<ConfigLayout />}>
        <Route path="/config/conta" element={<Conta />} />
        {/* <Route path="endereco" element={<PaginaEndereco />} /> */}
        {/* <Route path="seguranca" element={<PaginaSeguranca />} /> */}
        {/* <Route path="notificacao" element={<PaginaNotificacao />} /> */}
        {/* ... etc ... */}
      </Route>
    </Routes>
  );
}

export default App;
