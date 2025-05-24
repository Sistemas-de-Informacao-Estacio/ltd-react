import { useState, useEffect } from 'react';
import { FaCookie, FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';

function CookieManager() {
  const [cookieConsent, setCookieConsent] = useState(null);
  const [showManager, setShowManager] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('techprefeitura-cookie-consent');
    if (consent) {
      setCookieConsent(JSON.parse(consent));
    }
  }, []);

  const resetCookies = () => {
    localStorage.removeItem('techprefeitura-cookie-consent');
    setCookieConsent(null);
    window.location.reload();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Não definido';
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getConsentStatus = () => {
    if (!cookieConsent) return 'Não configurado';
    const activeTypes = Object.entries(cookieConsent)
      .filter(([key, value]) => key !== 'timestamp' && value)
      .map(([key]) => key);
    return `${activeTypes.length} tipos ativos`;
  };

  if (!cookieConsent) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
        <div className="flex items-center gap-3 mb-4">
          <FaCookie className="text-orange-400 text-2xl" />
          <h3 className="text-xl font-bold text-white">Configurações de Cookies</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Nenhuma preferência de cookie foi definida ainda. As configurações serão exibidas após você definir suas preferências.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Atualizar Página
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaCookie className="text-orange-400 text-2xl" />
          <div>
            <h3 className="text-xl font-bold text-white">Suas Preferências de Cookies</h3>
            <p className="text-gray-300 text-sm">{getConsentStatus()} • Configurado em {formatDate(cookieConsent.timestamp)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowManager(!showManager)}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            title="Ver detalhes"
          >
            <FaInfoCircle />
          </button>
          <button
            onClick={resetCookies}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            title="Redefinir cookies"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {showManager && (
        <div className="border-t border-gray-600 pt-6">
          <div className="grid gap-4">
            {[
              { key: 'necessary', name: 'Necessários', icon: '🔧', color: 'green' },
              { key: 'analytics', name: 'Analíticos', icon: '📊', color: 'blue' },
              { key: 'marketing', name: 'Marketing', icon: '🎯', color: 'purple' },
              { key: 'functional', name: 'Funcionais', icon: '⚙️', color: 'gray' }
            ].map((type) => (
              <div key={type.key} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{type.icon}</span>
                  <div>
                    <span className="text-white font-medium">{type.name}</span>
                    <div className="text-xs text-gray-400">
                      Cookies de {type.name.toLowerCase()}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  cookieConsent[type.key] 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {cookieConsent[type.key] ? 'Ativo' : 'Inativo'}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-white font-medium mb-2">Informações Técnicas</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>Configurado em: {formatDate(cookieConsent.timestamp)}</div>
              <div>Armazenamento: localStorage do navegador</div>
              <div>Expiração: Até ser redefinido manualmente</div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={resetCookies}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
            >
              <FaTrash className="inline mr-2" />
              Redefinir Todas as Preferências
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
            >
              <FaEdit className="inline mr-2" />
              Reconfigurar Cookies
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CookieManager;