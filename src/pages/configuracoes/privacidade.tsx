import styles from "./privacidade.module.css";

export default function Privacidade() {
  return (
    <div className={styles.paginaPrivacidade}>
      <h1 className={styles.tituloPrincipal}>Privacidade</h1>

      <div className={styles.texto}>
        <h2 className={styles.subtitulo}>
          Política de Privacidade e Termos de Serviço - PetResc
        </h2>

        <section>
          <h3 className={styles.titulo}>1. Introdução</h3>
          <p>
            O PetResc é uma plataforma digital desenvolvida com o objetivo de
            conectar ONGs, protetores independentes e a comunidade em prol da
            proteção e do bem-estar animal. Através dela, usuários podem
            registrar animais em situação de vulnerabilidade, oferecer abrigo
            temporário, apoiar iniciativas de adoção e realizar doações de
            suprimentos. Ao acessar e utilizar o PetResc, você concorda com
            os presentes Termos de Serviço e com a nossa Política de
            Privacidade, que estabelecem as regras para o uso da plataforma e o
            tratamento das informações fornecidas pelos usuários.
          </p>
        </section>

        <section>
          <h3 className={styles.titulo}>2. Coleta de Informações</h3>
          <p>
            Para garantir a melhor experiência possível, o PetResc poderá
            coletar os seguintes dados:
          </p>
          <ul className={styles.lista}>
            <li>
              <strong>
                Dados de cadastro: nome, e-mail, telefone, endereço e
                informações de login.
              </strong>
            </li>
            <li>
              <strong>
                Informações de perfil: preferências, disponibilidade para
                adoção, lar temporário ou doações.
              </strong>
            </li>
            <li>
              <strong>
                Dados de uso: registros de acesso, páginas visitadas e
                interações na plataforma.
              </strong>
            </li>
            <li>
              <strong>
                Informações adicionais: em casos de adoção, poderão ser
                solicitados dados complementares, como documentos pessoais, para
                análise de perfil.
              </strong>
            </li>
          </ul>
        </section>

        <section>
          <h3 className={styles.titulo}>3. Uso das Informações</h3>
          <p>As informações coletadas são utilizadas para:</p>
          <ul className={styles.lista}>
            <li>
              <strong>
                Facilitar o contato entre usuários, ONGs e protetores.
              </strong>
            </li>
            <li>
              <strong>
                Processar cadastros de adoção, lar temporário ou doações.
              </strong>
            </li>
            <li>
              <strong>
                Garantir maior segurança e confiabilidade no processo de adoção.
              </strong>
            </li>
            <li>
              <strong>
                Melhorar a usabilidade e as funcionalidades da plataforma.
              </strong>
            </li>
            <li>
              <strong>Cumprir obrigações legais e normativas.</strong>
            </li>
          </ul>
        </section>

        <section>
          <h3 className={styles.titulo}>4. Compartilhamento de Informações</h3>
          <p>
            O PetResc não vende, aluga ou comercializa dados pessoais. As
            informações só poderão ser compartilhadas com:
          </p>
          <ul className={styles.lista}>
            <li>
              ONGs e protetores parceiros, para viabilizar processos de adoção
              ou acolhimento.
            </li>
            <li>
              Autoridades legais, quando houver determinação judicial ou
              obrigação legal.
            </li>
            <li>
              Serviços de hospedagem e tecnologia, apenas quando necessário para
              funcionamento da plataforma.
            </li>
          </ul>
        </section>

        <section>
          <h3 className={styles.titulo}>5. Segurança das Informações</h3>
          <p>
            Adotamos medidas técnicas e administrativas para proteger os dados
            pessoais contra acessos não autorizados, perda, alteração ou
            divulgação. Apesar dos esforços, nenhum sistema é totalmente imune,
            e o usuário também é responsável por manter a confidencialidade de
            suas credenciais de acesso.
          </p>
        </section>

        <section>
          <h3 className={styles.titulo}>6. Responsabilidades do Usuário</h3>
          <p>Ao utilizar a plataforma, o usuário se compromete a:</p>
          <ul className={styles.lista}>
            <li>Fornecer informações verdadeiras e atualizadas.</li>
            <li>
              Utilizar o sistema apenas para fins legítimos relacionados à
              proteção e adoção animal.
            </li>
            <li>Respeitar outros usuários, ONGs e protetores.</li>
            <li>
              Não utilizar a plataforma para fins ilícitos, abusivos ou que
              possam prejudicar terceiros.
            </li>
          </ul>
        </section>

        <section>
          <h3 className={styles.titulo}>
            7. Adoção e Disponibilidade de Animais
          </h3>
          <p>
            O cadastro para adoção não garante a imediata disponibilidade do
            animal escolhido.
          </p>
          <ul className={styles.lista}>
            <li>
              ONGs e protetores independentes têm autonomia para avaliar os
              candidatos e decidir sobre a adoção.
            </li>
            <li>
              O PetResc atua como intermediador digital, não sendo
              responsável direto por decisões de adoção ou disponibilidade dos
              animais.
            </li>
          </ul>
        </section>

        <section>
          <h3 className={styles.titulo}>8. Doações e Apoio</h3>
          <p>
            Usuários podem realizar doações financeiras ou de suprimentos,
            direcionadas a ONGs parceiras.
          </p>
          <ul className={styles.lista}>
            <li>
              O PetResc não retém doações indevidamente e garante
              transparência no encaminhamento aos beneficiários.
            </li>
            <li>
              Doações não são reembolsáveis, exceto em casos de falha comprovada
              do sistema.
            </li>
          </ul>
        </section>

        <section>
          <h3 className={styles.titulo}>9. Alterações nos Termos</h3>
          <p>
            O PetResc poderá atualizar esta Política de Privacidade e os
            Termos de Serviço sempre que necessário. As alterações entrarão em
            vigor após sua publicação na plataforma.
          </p>
        </section>

        <section>
          <h3 className={styles.titulo}>10. Direitos dos Usuários</h3>
          <p>De acordo com a legislação vigente, os usuários têm direito a:</p>
          <ul className={styles.lista}>
            <li>
              Solicitar acesso, correção ou exclusão de seus dados pessoais.
            </li>
            <li>
              Revogar o consentimento para uso das informações, a qualquer
              momento.
            </li>
            <li>
              Obter informações claras sobre a finalidade da coleta de dados.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
