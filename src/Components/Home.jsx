import { Link } from "react-router-dom";
import ButtonSaibaMais from "../Components/ButtonSaibaMais";
import { FaDownload, FaAndroid, FaUsers, FaCity, FaCode, FaShieldAlt } from "react-icons/fa";

function Home() {
  const handleDownloadApp = () => {
    const link = document.createElement('a');
    link.href = "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.0.0/geradorcurriculo.exe";
    link.setAttribute('download', '');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      <section className="text-center p-8 mb-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-6 animate-pulse leading-tight">
          Laboratório de Tecnologia e Desenvolvimento
        </h1>
        <p className="text-2xl font-serif max-w-xl text-center mx-auto mb-8">
          Uma parceria entre a Estácio e as Prefeituras de São José e Florianópolis para inovação tecnológica no setor público
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link 
            to="/apps" 
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all duration-300 inline-block"
          >
            Nossos Aplicativos
          </Link>
          <Link to="/sobre">
            <ButtonSaibaMais />
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/quem-somos" className="group">
            <div className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-all duration-300 border border-gray-700 group-hover:scale-105">
              <FaUsers className="text-4xl text-blue-400 mx-auto mb-4 group-hover:animate-bounce" />
              <h3 className="text-xl font-bold text-blue-300 mb-2">Equipe Especializada</h3>
              <p className="text-gray-300">Estudantes e profissionais trabalhando em projetos reais para o setor público</p>
            </div>
          </Link>

          <Link to="/sobre" className="group">
            <div className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-all duration-300 border border-gray-700 group-hover:scale-105">
              <FaCity className="text-4xl text-green-400 mx-auto mb-4 group-hover:animate-bounce" />
              <h3 className="text-xl font-bold text-green-300 mb-2">Parcerias Municipais</h3>
              <p className="text-gray-300">Colaboração direta com as prefeituras de São José e Florianópolis</p>
            </div>
          </Link>

          <Link to="/tecnologias" className="group">
            <div className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-all duration-300 border border-gray-700 group-hover:scale-105">
              <FaCode className="text-4xl text-purple-400 mx-auto mb-4 group-hover:animate-bounce" />
              <h3 className="text-xl font-bold text-purple-300 mb-2">Tecnologias Modernas</h3>
              <p className="text-gray-300">Desenvolvimento com as mais avançadas tecnologias do mercado</p>
            </div>
          </Link>

          <Link to="/cybersec" className="group">
            <div className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-all duration-300 border border-gray-700 group-hover:scale-105">
              <FaShieldAlt className="text-4xl text-red-400 mx-auto mb-4 group-hover:animate-bounce" />
              <h3 className="text-xl font-bold text-red-300 mb-2">Segurança Digital</h3>
              <p className="text-gray-300">Soluções especializadas em cibersegurança para o setor público</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 mb-16">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl border border-gray-600">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            Nosso Impacto
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Link to="/apps" className="group hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-blue-400 mb-2 group-hover:animate-pulse">15+</div>
              <p className="text-gray-300">Aplicativos Desenvolvidos</p>
            </Link>
            <Link to="/sobre" className="group hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-green-400 mb-2 group-hover:animate-pulse">2</div>
              <p className="text-gray-300">Prefeituras Atendidas</p>
            </Link>
            <Link to="/quem-somos" className="group hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:animate-pulse">50+</div>
              <p className="text-gray-300">Estudantes Envolvidos</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            Áreas de Atuação
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/apps" className="group">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-105">
                <h3 className="text-xl font-bold text-blue-300 mb-3 group-hover:text-blue-200">Desenvolvimento de Software</h3>
                <p className="text-gray-300 text-left group-hover:text-gray-200">Criação de sistemas web e desktop personalizados para as necessidades específicas das prefeituras, incluindo geradores de documentos, sistemas de e-mail e ferramentas de produtividade.</p>
              </div>
            </Link>
            <Link to="/cybersec" className="group">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 group-hover:border-red-400 transition-all duration-300 group-hover:scale-105">
                <h3 className="text-xl font-bold text-red-300 mb-3 group-hover:text-red-200">Cibersegurança</h3>
                <p className="text-gray-300 text-left group-hover:text-gray-200">Desenvolvimento de ferramentas de segurança digital, incluindo geradores de senhas, sistemas de detecção de vulnerabilidades e simuladores de ataques para treinamento.</p>
              </div>
            </Link>
            <Link to="/apps" className="group">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 group-hover:border-purple-400 transition-all duration-300 group-hover:scale-105">
                <h3 className="text-xl font-bold text-purple-300 mb-3 group-hover:text-purple-200">Inteligência Artificial</h3>
                <p className="text-gray-300 text-left group-hover:text-gray-200">Implementação de soluções de IA para automação de processos, análise de dados e assistentes virtuais especializados para o setor público.</p>
              </div>
            </Link>
            <Link to="/apps" className="group">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 group-hover:border-orange-400 transition-all duration-300 group-hover:scale-105">
                <h3 className="text-xl font-bold text-orange-300 mb-3 group-hover:text-orange-200">Análise de Dados</h3>
                <p className="text-gray-300 text-left group-hover:text-gray-200">Desenvolvimento de dashboards e ferramentas de análise para visualização de dados públicos e tomada de decisões baseada em evidências.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 mb-16">
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-8 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            App Destaque: Gerador de Currículo
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Nosso assistente inteligente com interface futurista que ajuda na criação de currículos profissionais através de uma experiência de chatbot guiada.
          </p>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="text-blue-100">
              <div className="text-2xl font-bold">Disponível para Download</div>
              <div className="text-sm">Versão 2.0.0 • 48.78 MB</div>
            </div>
            <button 
              onClick={handleDownloadApp}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FaAndroid className="text-2xl" />
              <div className="text-left">
                <div className="font-bold">Baixar App</div>
                <div className="text-sm opacity-90">Para Windows</div>
              </div>
              <FaDownload className="text-xl" />
            </button>
          </div>
          <div className="mt-4 text-blue-100 text-sm">
            ✨ Interface de Chatbot • 📱 Design Responsivo • 💾 Exportação PDF • 🔄 Salvamento Automático
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 mb-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-300">
            "Transformando ideias em soluções digitais para um setor público mais eficiente e moderno"
          </h2>
          <div className="flex justify-center gap-8 text-sm text-gray-400 flex-wrap">
            <div>📍 Florianópolis, SC</div>
            <div>🎓 Estácio de Sá</div>
            <div>🤝 Parcerias Públicas</div>
            <div>💻 Open Source</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;