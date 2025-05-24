import { useState, useEffect } from 'react';
import { FaCookie, FaTimes, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('techprefeitura-cookie-consent');
    if (!cookieConsent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000); // Mostra após 2 segundos para melhor UX
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('techprefeitura-cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    document.body.style.overflow = 'auto';
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('techprefeitura-cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    document.body.style.overflow = 'auto';
  };

  const handleCustomize = () => {
    setShowDetails(true);
    document.body.style.overflow = 'hidden';
  };

  const handleSaveCustom = (preferences) => {
    localStorage.setItem('techprefeitura-cookie-consent', JSON.stringify({
      ...preferences,
      necessary: true, // Sempre necessário
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    setShowDetails(false);
    document.body.style.overflow = 'auto';
  };

  const closeBanner = () => {
    setShowBanner(false);
    document.body.style.overflow = 'auto';
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Banner Principal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 shadow-2xl">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <FaCookie className="text-orange-400 text-2xl mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-2">
                  Nós valorizamos sua privacidade
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. 
                  Você pode escolher quais cookies aceitar ou gerenciar suas preferências.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-green-600 text-white px-2 py-1 rounded">✓ Necessários</span>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded">📊 Analíticos</span>
                  <span className="bg-purple-600 text-white px-2 py-1 rounded">🎯 Marketing</span>
                  <span className="bg-gray-600 text-white px-2 py-1 rounded">⚙️ Funcionais</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={handleCustomize}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium border border-gray-600"
              >
                <FaInfoCircle className="inline mr-2" />
                Personalizar
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm font-medium"
              >
                Apenas Necessários
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Aceitar Todos
              </button>
            </div>

            <button
              onClick={closeBanner}
              className="absolute top-4 right-4 lg:relative lg:top-0 lg:right-0 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {showDetails && <CookieDetailsModal onSave={handleSaveCustom} onClose={() => setShowDetails(false)} />}
    </>
  );
}

function CookieDetailsModal({ onSave, onClose }) {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: true,
    functional: true
  });

  const handleToggle = (type) => {
    if (type === 'necessary') return; // Não pode desabilitar necessários
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const cookieTypes = [
    {
      id: 'necessary',
      title: 'Cookies Necessários',
      description: 'Essenciais para o funcionamento básico do site. Não podem ser desabilitados.',
      icon: '🔧',
      color: 'text-green-400',
      required: true,
      examples: ['Sessão do usuário', 'Configurações de segurança', 'Funcionamento básico']
    },
    {
      id: 'analytics',
      title: 'Cookies Analíticos',
      description: 'Nos ajudam a entender como os visitantes interagem com o site coletando informações anonimamente.',
      icon: '📊',
      color: 'text-blue-400',
      required: false,
      examples: ['Google Analytics', 'Estatísticas de uso', 'Métricas de performance']
    },
    {
      id: 'marketing',
      title: 'Cookies de Marketing',
      description: 'Utilizados para personalizar anúncios e medir a eficácia de campanhas publicitárias.',
      icon: '🎯',
      color: 'text-purple-400',
      required: false,
      examples: ['Publicidade direcionada', 'Remarketing', 'Redes sociais']
    },
    {
      id: 'functional',
      title: 'Cookies Funcionais',
      description: 'Permitem funcionalidades aprimoradas e personalização, como idioma e região.',
      icon: '⚙️',
      color: 'text-gray-400',
      required: false,
      examples: ['Preferências do usuário', 'Configurações de idioma', 'Temas personalizados']
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-60 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-600">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-600 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-blue-400 text-2xl" />
            <div>
              <h2 className="text-2xl font-bold text-white">Configurações de Privacidade</h2>
              <p className="text-gray-300">Gerencie suas preferências de cookies</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-3">
              Sobre nossos cookies
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Usamos cookies e tecnologias similares para fornecer, proteger e melhorar nossos serviços, 
              personalizar conteúdo e anúncios, e analisar como nosso site é usado. Você pode gerenciar 
              suas preferências abaixo.
            </p>
          </div>

          <div className="space-y-6">
            {cookieTypes.map((cookie) => (
              <div key={cookie.id} className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cookie.icon}</span>
                    <div>
                      <h4 className={`text-lg font-bold ${cookie.color}`}>
                        {cookie.title}
                        {cookie.required && <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded">Obrigatório</span>}
                      </h4>
                      <p className="text-gray-300 text-sm mt-1">{cookie.description}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleToggle(cookie.id)}
                      disabled={cookie.required}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences[cookie.id] 
                          ? 'bg-blue-600' 
                          : 'bg-gray-600'
                      } ${cookie.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences[cookie.id] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5 className="text-sm font-semibold text-gray-200 mb-2">Exemplos:</h5>
                  <div className="flex flex-wrap gap-2">
                    {cookie.examples.map((example, index) => (
                      <span key={index} className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-500 transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={() => onSave(preferences)}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Salvar Preferências
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Suas preferências serão salvas localmente e você pode alterá-las a qualquer momento.
              <br />
              Para mais informações, consulte nossa{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;