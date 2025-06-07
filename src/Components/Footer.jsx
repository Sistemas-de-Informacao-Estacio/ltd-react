import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaRocket, FaShieldAlt, FaBrain, FaCode } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 mt-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          {/* Seção Principal */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity group">
              <div className="relative">
                <img 
                  src="/estacio.jpeg" 
                  alt="Estácio Logo" 
                  className="w-12 h-12 rounded-xl object-cover border-2 border-blue-400 shadow-lg group-hover:scale-110 transition-transform"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center text-white font-bold text-lg hidden">
                  LTD
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                  TechPrefeitura
                </span>
                <p className="text-sm text-gray-400 -mt-1">Laboratório de Transformação Digital • Estácio</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 max-w-lg leading-relaxed">
              Criando soluções inovadoras para o setor público através da parceria entre a Estácio e as 
              prefeituras de São José e Florianópolis. Nossa missão é modernizar a gestão pública com tecnologia de ponta.
            </p>
            
            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
                <div className="text-2xl font-bold text-blue-400">15+</div>
                <div className="text-xs text-gray-400">Aplicativos</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
                <div className="text-2xl font-bold text-green-400">2</div>
                <div className="text-xs text-gray-400">Prefeituras</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                <div className="text-2xl font-bold text-purple-400">7+</div>
                <div className="text-xs text-gray-400">Especialistas</div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="flex gap-4">
              <a 
                href="https://github.com/LTD-2025-1-Cyber-Security-Project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg border border-gray-600 hover:border-gray-500"
              >
                <FaGithub className="text-xl text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.instagram.com/estacio.florianopolis/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <FaInstagram className="text-xl text-white" />
              </a>
              <a 
                href="https://www.linkedin.com/school/estacio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <FaLinkedin className="text-xl text-white" />
              </a>
              <a 
                href="mailto:contato@ltd.gov.br"
                className="group flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <FaEnvelope className="text-xl text-white" />
              </a>
            </div>
          </div>

          {/* Navegação Rápida */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaRocket className="text-blue-400" />
              Navegação
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/sobre", label: "Sobre" },
                { to: "/quem-somos", label: "Quem Somos" },
                { to: "/apps", label: "Aplicativos" },
                { to: "/tecnologias", label: "Tecnologias" },
                { to: "/admin", label: "Admin" },
                { to: "/documentos", label: "Documentos" },
                { to: "/noticias", label: "Notícias" },
                { to: "/contato", label: "Contato" }
              ].map((item) => (
                <li key={item.to}>
                  <Link 
                    to={item.to} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all duration-200"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Áreas de Especialidade */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaCode className="text-purple-400" />
              Especialidades
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <FaShieldAlt className="text-red-400 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-semibold text-gray-200">Cibersegurança</h4>
                  <p className="text-sm text-gray-400">Proteção digital para o setor público</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <FaBrain className="text-purple-400 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-semibold text-gray-200">Inteligência Artificial</h4>
                  <p className="text-sm text-gray-400">Automação e análise inteligente</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <FaCode className="text-blue-400 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-semibold text-gray-200">Desenvolvimento</h4>
                  <p className="text-sm text-gray-400">Soluções web e mobile personalizadas</p>
                </div>
              </div>
            </div>

            {/* Contato */}
            <div className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <h4 className="font-bold text-white mb-4">Contato Institucional</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Rua Coronel Pedro Demoro, 2447<br />
                    Estreito, Florianópolis - SC
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-green-400" />
                  <span className="text-gray-300 text-sm">(48) 3271-3900</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-400" />
                  <span className="text-gray-300 text-sm">contato@ltd.gov.br</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© {currentYear} Laboratório de Transformação Digital - Estácio Florianópolis.</p>
              <p className="mt-1">Todos os direitos reservados. Desenvolvido com ❤️ para o setor público.</p>
            </div>

            {/* Links Legais */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <Link to="/contato" className="hover:text-white transition-colors flex items-center gap-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                Política de Privacidade
              </Link>
              <Link to="/contato" className="hover:text-white transition-colors flex items-center gap-1">
                <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                Termos de Uso
              </Link>
              <Link to="/contato" className="hover:text-white transition-colors flex items-center gap-1">
                <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                Suporte
              </Link>
            </div>
          </div>

          {/* Badge de Tecnologia */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30">
              <img src="/estacio.jpeg" alt="Estácio" className="w-4 h-4 rounded-full" />
              <span className="text-xs text-gray-300">Powered by</span>
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Estácio • React • Supabase • TailwindCSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;