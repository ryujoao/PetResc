import { Routes, Route } from "react-router-dom";

// --- IMPORTS DE PROTEÇÃO ---
import AdminRoute from "./auth/adminRoute";
import PrivateRoute from "./auth/privateRoute";

// --- IMPORTS DAS PÁGINAS ---
import Home from "./pages/home/home";
import Doar from "./pages/doar/doar";
import Adotar from "./pages/adotar/adotar";
import LarTemporario from "./pages/larTemporario/larTemporario";
import RegistrarAnimal from "./pages/registrarAnimal/registrarAnimal";
import CentralAdocao from "./pages/centralAdocao/centralAdocao";
import Perfil from "./pages/perfil/perfil";
import PerfilAnimal from "./pages/perfilAnimal/perfilAnimal";
import Institutos from "./pages/institutos/institutos";
import Login from "./pages/cadastro/login";
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
import RecuperarSenha from "./pages/cadastro/recuperarSenha";
import NovaCampanha from "./pages/campanhas/novaCampanha";
import GerenciarAdocao from "./pages/gerenciar/gerenciarAdocao";
import CampanhasAnteriores from "./pages/campanhas/campanhasAnteriores";
import AdminGerenciamento from "./pages/admin/adminGerenciamento";
import AdminHome from "./pages/admin/admin";
import AdminOngs from "./pages/admin/adminOngs";
import AdminPets from "./pages/admin/adminPets";
import AdminUsuarios from "./pages/admin/adminUsuarios";
import AdminOngsDetalhes from "./pages/admin/adminOngDetalhes";
import AdminGerenciarPetsOng from "./pages/admin/adminOngPets";
import AdminHistoricoPets from "./pages/admin/adminPetsHistorico";
import AdminLogs from "./pages/admin/adminLogs";
import AdminMonitoramento from "./pages/admin/adminMonitoramento";
import AvaliarAnimal from "./pages/avaliarAnimal/avaliarAnimal";
import GerenciarRegistro from "./pages/gerenciar/gerenciarRegistro";
import VoluntariosLar from "./pages/voluntarios";
import AdminOngTemperatura from "./pages/admin/adminOngTemperatura";

function App() {
  return (
    <Routes>
      {/* ====================================================== */}
      {/* 🟢 ROTAS PÚBLICAS                                     */}
      {/* ====================================================== */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      
      <Route path="/adotar" element={<Adotar />} />
      <Route path="/lar-temporario" element={<LarTemporario />} />
      <Route path="/doar" element={<Doar />} />
      <Route path="/central-adocao" element={<CentralAdocao />} />
      
      {/* Perfis públicos de visualização */}
      <Route path="/animal/:id" element={<PerfilAnimal />} />
      <Route path="/instituto/:id" element={<Institutos />} />

      {/* ====================================================== */}
      {/* 🔒 ROTAS PRIVADAS (Requer Login)                       */}
      {/* ====================================================== */}
      <Route element={<PrivateRoute />}>
        
        {/* Perfil e Configurações */}
        <Route path="/perfil" element={<Perfil />} />
        
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

        {/* Formulários e Ações */}
        <Route path="/registrar-animal" element={<RegistrarAnimal />} />
        <Route path="/formulario-adotar" element={<FormularioAdotar />} />
        <Route path="/formulario-adotar/:id" element={<FormularioAdotar />} />
        <Route path="/formulario-lar-temporario" element={<FormularioLarTemporario />} />
        
        {/* Gestão (ONG/Protetor) */}
        <Route path="/nova-campanha" element={<NovaCampanha />} />
        <Route path="/campanhas-anteriores" element={<CampanhasAnteriores />} />
        <Route path="/gerenciar-adocao/:id" element={<GerenciarAdocao />} />
        <Route path="/gerenciar-registro" element={<GerenciarRegistro />} />
        <Route path="/avaliar-animal" element={<AvaliarAnimal />} />
        <Route path="/voluntarios" element={<VoluntariosLar />} />
      </Route>

      {/* ====================================================== */}
      {/* 🛡️ ROTAS DE ADMIN (Só entra se role === 'ADMIN')       */}
      {/* ====================================================== */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/gerenciamento" element={<AdminGerenciamento />} />
        <Route path="/admin/pets" element={<AdminPets />} />
        <Route path="/admin/ongs" element={<AdminOngs />} />
        <Route path="/admin/ongs/:id" element={<AdminOngsDetalhes />} />
        <Route path="/admin/ongs/:id/pets" element={<AdminGerenciarPetsOng />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/monitoramento" element={<AdminMonitoramento />} />
        <Route path="/admin/monitoramento/ong" element={<AdminOngTemperatura />} />
        <Route path="/admin/historico-pets" element={<AdminHistoricoPets />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
      </Route>

    </Routes>
  );
}

export default App;