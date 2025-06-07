import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FaSearch, FaTimes, FaDownload, FaInfoCircle, FaRocket, FaShieldAlt, FaBrain, FaChartBar, FaStar } from 'react-icons/fa';

function Apps() {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApps(data || []);
    } catch (error) {
      console.error('Erro ao buscar aplicativos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["Todos", ...new Set(apps.map(app => app.category))];

  const showAppDetails = (app) => {
    setSelectedApp(app);
    document.body.style.overflow = 'hidden';
  };

  const closeDetails = () => {
    setSelectedApp(null);
    document.body.style.overflow = 'auto';
  };

  const downloadApp = (app) => {
    const link = document.createElement('a');
    link.href = app.download_url;
    link.setAttribute('download', '');
    link.setAttribute('target', '_blank');
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    displayNotification(`Iniciando download de ${app.name} (${app.size})`);
  };

  const displayNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };
  
  const sortApps = (apps, sortType) => {
    switch(sortType) {
      case 'name':
        return [...apps].sort((a, b) => a.name.localeCompare(b.name));
      case 'size': 
        return [...apps].sort((a, b) => {
          const sizeA = parseFloat(a.size);
          const sizeB = parseFloat(b.size);
          return sizeB - sizeA;
        });
      case 'latest':
        return [...apps].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      default:
        return apps;
    }
  };
  
  const filteredApps = apps.filter(app => {
    const categoryMatch = selectedCategory === "Todos" || app.category === selectedCategory;
    
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = app.name.toLowerCase().includes(searchLower);
    const descMatch = app.description.toLowerCase().includes(searchLower);
    const featureMatch = app.features ? app.features.some(feature => 
      feature.toLowerCase().includes(searchLower)
    ) : false;
    
    return categoryMatch && (nameMatch || descMatch || featureMatch);
  });

  const sortedAndFilteredApps = sortApps(filteredApps, sortBy);

  const getCategoryIcon = (category) => {
    const icons = {
      "Cyber Segurança": <FaShieldAlt />,
      "Desenvolvimento de Software": <FaRocket />,
      "Inteligência Artificial": <FaBrain />,
      "Análise de Dados": <FaChartBar />
    };
    return icons[category] || <FaRocket />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Cyber Segurança": "from-red-500 to-red-700",
      "Desenvolvimento de Software": "from-blue-500 to-blue-700", 
      "Inteligência Artificial": "from-purple-500 to-purple-700",
      "Análise de Dados": "from-green-500 to-green-700"
    };
    return colors[category] || "from-gray-500 to-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            🚀 Nossos Aplicativos
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubra nossa coleção de aplicativos desenvolvidos para facilitar e modernizar a gestão pública municipal
          </p>
        </header>
        
        {/* Filtros */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full lg:w-auto">
              <label className="block text-sm font-medium text-white mb-2">Categoria:</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 w-full lg:w-auto">
              <label className="block text-sm font-medium text-white mb-2">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Nome</option>
                <option value="size">Tamanho</option>
                <option value="latest">Mais recentes</option>
              </select>
            </div>
            
            <div className="flex-1 w-full lg:w-auto">
              <label className="block text-sm font-medium text-white mb-2">Buscar:</label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar aplicativos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchTerm && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white" 
                    onClick={() => setSearchTerm("")}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Informações de resultados */}
        <div className="text-center mb-8">
          <p className="text-gray-300">
            {filteredApps.length === 0 ? 
              'Nenhum aplicativo encontrado' : 
              `${filteredApps.length} ${filteredApps.length === 1 ? 'aplicativo encontrado' : 'aplicativos encontrados'}`
            }
          </p>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-300">Carregando aplicativos...</p>
          </div>
        ) : (
          /* Grid de aplicativos */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedAndFilteredApps.map((app) => (
              <div key={app.id} className="group relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Badge de categoria */}
                <div className="absolute top-3 right-3 z-10">
                  <div className={`bg-gradient-to-r ${getCategoryColor(app.category)} text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1`}>
                    {getCategoryIcon(app.category)}
                    <span className="hidden lg:inline">{app.category}</span>
                  </div>
                </div>
                
                {/* Ícone do app */}
                <div className="flex justify-center pt-8 pb-4">
                  <div className="w-20 h-20 text-6xl flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/20 to-white/10 group-hover:scale-110 transition-transform duration-300">
                    {app.icon}
                  </div>
                </div>
                
                <div className="p-6 pt-2">
                  <h3 className="text-xl font-bold text-white mb-2 text-center group-hover:text-blue-300 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-blue-300 text-sm text-center mb-3 font-medium">
                    Versão {app.version}
                  </p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {app.description}
                  </p>
                  
                  <div className="flex items-center justify-center mb-4">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      📦 {app.size}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={() => showAppDetails(app)}
                    >
                      <FaInfoCircle />
                      Detalhes
                    </button>
                    <button 
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={() => downloadApp(app)}
                    >
                      <FaDownload />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estatísticas */}
        {!isLoading && apps.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              📊 Estatísticas dos Aplicativos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-blue-500/20 p-6 rounded-xl border border-blue-500/30">
                <div className="text-3xl font-bold text-blue-400 mb-2">{apps.length}</div>
                <div className="text-gray-300">Total de Apps</div>
              </div>
              <div className="bg-red-500/20 p-6 rounded-xl border border-red-500/30">
                <div className="text-3xl font-bold text-red-400 mb-2">
                  {apps.filter(app => app.category === 'Cyber Segurança').length}
                </div>
                <div className="text-gray-300">Cyber Segurança</div>
              </div>
              <div className="bg-purple-500/20 p-6 rounded-xl border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {apps.filter(app => app.category === 'Inteligência Artificial').length}
                </div>
                <div className="text-gray-300">IA</div>
              </div>
              <div className="bg-green-500/20 p-6 rounded-xl border border-green-500/30">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {apps.filter(app => app.category === 'Análise de Dados').length}
                </div>
                <div className="text-gray-300">Análise de Dados</div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de detalhes */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedApp.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedApp.name}</h2>
                    <p className="text-blue-100">v{selectedApp.version} • {selectedApp.size}</p>
                  </div>
                </div>
                <button
                  onClick={closeDetails}
                  className="text-white hover:text-gray-300 text-2xl p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <FaInfoCircle className="text-blue-400" />
                    Sobre o Aplicativo
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{selectedApp.description}</p>
                </div>
                
                {selectedApp.features && selectedApp.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      Funcionalidades
                    </h3>
                    <div className="grid gap-3">
                      {selectedApp.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedApp.requirements && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Requisitos do Sistema</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-blue-400 font-semibold mb-1">Sistema Operacional</div>
                        <div className="text-gray-300">{selectedApp.requirements.os}</div>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-blue-400 font-semibold mb-1">Memória RAM</div>
                        <div className="text-gray-300">{selectedApp.requirements.ram}</div>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-blue-400 font-semibold mb-1">Espaço em Disco</div>
                        <div className="text-gray-300">{selectedApp.requirements.disk}</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="text-center pt-6 border-t border-gray-700">
                  <button 
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 mx-auto transition-all duration-300 hover:scale-105"
                    onClick={() => downloadApp(selectedApp)}
                  >
                    <FaDownload />
                    Baixar {selectedApp.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notificação */}
        {showNotification && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-pulse">
            <FaDownload />
            <span>{notificationMessage}</span>
            <button onClick={() => setShowNotification(false)} className="text-white hover:text-gray-300">
              <FaTimes />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Apps;