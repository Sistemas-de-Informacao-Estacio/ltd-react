import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
              <FontAwesomeIcon icon={faCity} className="text-2xl text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                TechPrefeitura
              </span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Laboratório de Tecnologia e Desenvolvimento da Estácio, criando soluções inovadoras 
              para o setor público em parceria com as prefeituras de São José e Florianópolis.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/LTD-2025-1-Cyber-Security-Project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
              >
                <FaGithub className="text-xl" />
              </a>
              <a 
                href="https://www.instagram.com/estacio.florianopolis/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a 
                href="https://www.linkedin.com/school/estacio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/sobre" className="text-gray-300 hover:text-white transition-colors">Sobre</Link></li>
              <li><Link to="/quem-somos" className="text-gray-300 hover:text-white transition-colors">Quem Somos</Link></li>
              <li><Link to="/apps" className="text-gray-300 hover:text-white transition-colors">Aplicativos</Link></li>
              <li><Link to="/tecnologias" className="text-gray-300 hover:text-white transition-colors">Tecnologias</Link></li>
              <li><Link to="/cybersec" className="text-gray-300 hover:text-white transition-colors">Cibersegurança</Link></li>
              <li><Link to="/noticias" className="text-gray-300 hover:text-white transition-colors">Notícias</Link></li>
              <li><Link to="/contato" className="text-gray-300 hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-400" />
                <span className="text-gray-300 text-sm">
                  Rua Coronel Pedro Demoro, 2447<br />
                  Estreito, Florianópolis - SC
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-400" />
                <span className="text-gray-300">(48) 3271-3900</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400" />
                <span className="text-gray-300">atendimento.florianopolis@estacio.br</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Laboratório de Tecnologia e Desenvolvimento - Estácio Florianópolis. Todos os direitos reservados.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/contato" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link to="/contato" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link to="/contato" className="hover:text-white transition-colors">Suporte</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;