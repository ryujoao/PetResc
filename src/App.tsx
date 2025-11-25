import { Routes, Route } from "react-router-dom";
// ...existing code...
import Home from "./pages/home/home";
import Doar from "./pages/doar/doar";
import Adotar from "./pages/adotar/adotar";
import LarTemporario from "./pages/larTemporario/larTemporario";
//import CadastroUsu from "./pages/cadastro/cadastro";
import RegistrarAnimal from "./pages/registrarAnimal/registrarAnimal";
import CentralAdocao from "./pages/centralAdocao/centralAdocao";
import Perfil from "./pages/perfil/perfil";
import PerfilAnimal from "./pages/perfilAnimal/perfilAnimal";
import Institutos from "./pages/institutos/institutos";
//import CadastroNext from "./pages/cadastro/cadastroNext";
//import CadastroOng from "./pages/cadastro/cadastroOng";
import Login from "./pages/cadastro/login";
//import CadastroFinal from "./pages/cadastro/cadastroFinal";
import FormularioLarTemporario from "./pages/larTemporario/formularioLarTemporario";
import FormularioAdotar from "./pages/adotar/formularioAdotar";
import ConfigLayout from "./pages/configuracoes/configLayout";
import ConfigMenu from "./pages/configuracoes/configMenu";
import Conta from "./pages/configuracoes/conta/conta";
import Endereco from "./pages/configuracoes/endereco/endereco";
import Notificacoes from "./pages/configuracoes/notificacoes/notificacoes";
import Privacidade from "./pages/configuracoes/privacidade";
import Seguranca from "./pages/configuracoes/seguranca/seguranca";
import AlterarSenha from "./pages/configuracoes/seguranca/alterarSenha";
import Historico from "./pages/configuracoes/seguranca/historico";
import HistoricoAnimais from "./pages/configuracoes/seguranca/historicoAnimais";
import FAQ from "./pages/configuracoes/ajuda/faq";
import Contato from "./pages/configuracoes/ajuda/contato";
import Cadastro from "./pages/cadastro/cadastro";


// ...existing code...
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adotar" element={<Adotar />} />
      <Route path="/lar-temporario" element={<LarTemporario />} />
      <Route path="/doar" element={<Doar />} />
      <Route path="/cadastro" element={<Cadastro/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar-animal" element={<RegistrarAnimal />} />
      <Route path="/central-adocao" element={<CentralAdocao />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/animal/:id" element={<PerfilAnimal />} />
      <Route path="/instituto/:id" element={<Institutos />} />
      
      <Route
        path="/formulario-lar-temporario"
        element={<FormularioLarTemporario />}
      />
      <Route path="/formulario-adotar" element={<FormularioAdotar />} />

      <Route path="/config" element={<ConfigMenu />} />

      <Route element={<ConfigLayout />}>
        <Route path="/config/conta" element={<Conta />} />
        <Route path="/config/endereco" element={<Endereco />} />
        <Route path="/config/notificacoes" element={<Notificacoes />} />
        <Route path="/config/privacidade" element={<Privacidade />} />
        <Route path="/config/seguranca" element={<Seguranca />} />
        <Route path="/config/alterar-senha" element={<AlterarSenha />} />
        <Route path="/config/historico" element={<Historico />} />
        <Route path="/config/historico-animais" element={<HistoricoAnimais />} />
        <Route path="/config/faq" element={<FAQ />} />
        <Route path="/config/contate-nos" element={<Contato />} />
        
      </Route>
    </Routes>
  );
}

export default App;
