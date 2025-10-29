import { Link } from 'react-router-dom';
import { 
  FaGithub, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, 
  FaRocket, FaShieldAlt, FaBrain, FaCode, FaNewspaper, FaBlog, FaFileAlt,
  FaMobileAlt, FaUsers, FaInfoCircle, FaClock, FaAward, FaHandshake, FaAndroid
} from 'react-icons/fa';

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
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-10">
          
          {/* Seção Principal - Sobre o LTD */}
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
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                  TechPrefeitura
                </span>
                <p className="text-xs text-gray-400 -mt-1">Estácio • LTD</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
              O Laboratório de Transformação Digital (LTD) é uma iniciativa pioneira que une academia, 
              governo e tecnologia. Desenvolvemos soluções inovadoras para modernizar a gestão pública 
              através de parcerias estratégicas com as prefeituras de São José e Florianópolis.
            </p>
            
            {/* Estatísticas Aprimoradas */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-600/10 to-blue-600/5 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all group">
                <FaMobileAlt className="mx-auto text-2xl text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-blue-400">15+</div>
                <div className="text-xs text-gray-400">Aplicativos</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-600/10 to-green-600/5 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all group">
                <FaHandshake className="mx-auto text-2xl text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-green-400">2</div>
                <div className="text-xs text-gray-400">Prefeituras</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-600/10 to-purple-600/5 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all group">
                <FaUsers className="mx-auto text-2xl text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-purple-400">7+</div>
                <div className="text-xs text-gray-400">Especialistas</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-yellow-600/10 to-yellow-600/5 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all group">
                <FaAward className="mx-auto text-2xl text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-yellow-400">100%</div>
                <div className="text-xs text-gray-400">Gratuito</div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Conecte-se Conosco</h4>
              <div className="flex gap-3">
                <a 
                  href="https://github.com/LTD-2025-1-Cyber-Security-Project" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-11 h-11 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg border border-gray-600 hover:border-gray-500"
                  title="GitHub"
                >
                  <FaGithub className="text-lg text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a 
                  href="https://www.instagram.com/estacio.florianopolis/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-11 h-11 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title="Instagram"
                >
                  <FaInstagram className="text-lg text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/school/estacio/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-11 h-11 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-lg text-white" />
                </a>
                <a 
                  href="mailto:contato@ltd.gov.br"
                  className="group flex items-center justify-center w-11 h-11 bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title="Email"
                >
                  <FaEnvelope className="text-lg text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Institucional - LTD */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <FaInfoCircle className="text-blue-400" />
              LTD
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/ltd/sobre", label: "Sobre o LTD", icon: FaInfoCircle },
                { to: "/ltd/quem-somos", label: "Quem Somos", icon: FaUsers },
                { to: "/ltd/contato", label: "Contato", icon: FaEnvelope }
              ].map((item) => (
                <li key={item.to}>
                  <Link 
                    to={item.to} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <item.icon className="text-blue-400 text-sm group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produtos */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <FaRocket className="text-purple-400" />
              Produtos
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/produtos/apps", label: "Aplicativos", icon: FaMobileAlt },
                { to: "/produtos/tecnologias", label: "Tecnologias", icon: FaCode },
                { to: "/produtos/docs", label: "Documentação", icon: FaFileAlt },
                { to: "/produtos/admin", label: "CyberSec", icon: FaShieldAlt },
                { to: "/produtos/apps-android", label: "Apps Android", icon: FaAndroid },
                { to: "/produtos/vscode-extensions", label: "Extensões VS Code", icon: FaCode }
              ].map((item) => (
                <li key={item.to}>
                  <Link 
                    to={item.to} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <item.icon className="text-purple-400 text-sm group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Horário de Atendimento */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <FaClock className="text-green-400" />
                <h4 className="font-semibold text-white text-sm">Atendimento</h4>
              </div>
              <div className="space-y-1 text-xs text-gray-400">
                <p>Seg - Sex: 8h às 18h</p>
                <p>Sáb: 9h às 12h</p>
                <p className="text-yellow-400 font-medium">Resposta em até 24h</p>
              </div>
            </div>
          </div>

          {/* Conteúdo & Contato */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <FaNewspaper className="text-green-400" />
              Conteúdo
            </h3>
            <ul className="space-y-3 mb-6">
              {[
                { to: "/outros/noticias", label: "Notícias", icon: FaNewspaper },
                { to: "/outros/blog", label: "Blog", icon: FaBlog }
              ].map((item) => (
                <li key={item.to}>
                  <Link 
                    to={item.to} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <item.icon className="text-green-400 text-sm group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contato Card */}
            <div className="p-4 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
              <h4 className="font-bold text-white mb-3 text-sm">Contato Institucional</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0 text-xs" />
                  <span className="text-gray-300 text-xs leading-relaxed">
                    Rua Coronel Pedro Demoro, 2447<br />
                    Estreito, Florianópolis - SC
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-green-400 text-xs" />
                  <span className="text-gray-300 text-xs">(48) 3271-3900</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-400 text-xs" />
                  <a href="mailto:contato@ltd.gov.br" className="text-gray-300 hover:text-white text-xs transition-colors">
                    contato@ltd.gov.br
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Especialidades - Seção Expandida */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
            <FaBrain className="text-purple-400" />
            Nossas Áreas de Especialidade
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-red-600/10 to-red-600/5 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaShieldAlt className="text-2xl text-red-400" />
                </div>
                <h4 className="font-bold text-white">Cibersegurança</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Proteção avançada de dados, treinamento de conscientização e ferramentas de segurança para o setor público.
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-600/10 to-purple-600/5 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaBrain className="text-2xl text-purple-400" />
                </div>
                <h4 className="font-bold text-white">Inteligência Artificial</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Soluções de IA para automação, análise preditiva e otimização de processos governamentais.
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-blue-600/10 to-blue-600/5 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaCode className="text-2xl text-blue-400" />
                </div>
                <h4 className="font-bold text-white">Desenvolvimento</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Aplicações web e mobile personalizadas, APIs robustas e sistemas de gestão integrados.
              </p>
            </div>
          </div>
        </div>

        {/* Linha Divisória Final */}
        <div className="border-t border-gray-700 mt-10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Copyright Aprimorado */}
            <div className="text-gray-400 text-sm text-center lg:text-left">
              <p className="font-semibold text-gray-300">
                © {currentYear} Laboratório de Transformação Digital - Estácio Florianópolis
              </p>
              <p className="mt-1 flex items-center justify-center lg:justify-start gap-2">
                Desenvolvido com 
                <span className="text-red-500 animate-pulse">❤️</span> 
                para transformar o setor público
              </p>
              <p className="mt-1 text-xs text-gray-500">
                CNPJ: 00.000.000/0001-00 • Todos os direitos reservados
              </p>
            </div>

            {/* Links Legais Aprimorados */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                to="/ltd/contato" 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform"></span>
                Política de Privacidade
              </Link>
              <Link 
                to="/ltd/contato" 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform"></span>
                Termos de Uso
              </Link>
              <Link 
                to="/ltd/contato" 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="w-2 h-2 bg-purple-400 rounded-full group-hover:scale-125 transition-transform"></span>
                LGPD
              </Link>
              <Link 
                to="/ltd/contato" 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full group-hover:scale-125 transition-transform"></span>
                Suporte
              </Link>
            </div>
          </div>

          {/* Badge de Tecnologia Aprimorado */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full border border-blue-500/30 hover:border-blue-500/50 transition-all group">
              <img 
                src="/estacio.jpeg" 
                alt="Estácio" 
                className="w-6 h-6 rounded-full group-hover:scale-110 transition-transform" 
                onError={(e) => e.target.style.display = 'none'}
              />
              <span className="text-xs text-gray-400">Powered by</span>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Estácio • React • Supabase • Tailwind
              </span>
            </div>
            
            {/* Selo de Qualidade */}
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema Online</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-400" />
                <span>Seguro & Confiável</span>
              </div>
              <div className="flex items-center gap-2">
                <FaAward className="text-yellow-400" />
                <span>Certificado ISO 27001</span>
              </div>
            </div>
          </div>

          {/* Mensagem Final */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 italic">
              "Transformando ideias em soluções digitais que impactam vidas"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;