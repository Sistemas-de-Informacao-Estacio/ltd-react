import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FaSearch, FaTimes, FaDownload, FaInfoCircle } from 'react-icons/fa';
import './Apps.css';

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

  const getCategoryClass = (category) => {
    const classes = {
      "Cyber Segurança": "cyber-security",
      "Desenvolvimento de Software": "software-development", 
      "Inteligência Artificial": "artificial-intelligence",
      "Análise de Dados": "data-analysis"
    };
    return classes[category] || "default";
  };

  return (
    <div className="apps-page">
      <div className="apps-container">
        {/* Header */}
        <header className="apps-header">
          <h1>Nossos Aplicativos</h1>
          <p>Descubra nossa coleção de aplicativos desenvolvidos para facilitar e modernizar a gestão pública municipal</p>
        </header>
        
        {/* Filtros */}
        <div className="apps-filters">
          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="category-select">Categoria:</label>
              <select 
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="sort-select">Ordenar por:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Nome</option>
                <option value="size">Tamanho</option>
                <option value="latest">Mais recentes</option>
              </select>
            </div>
            
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar aplicativos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search" 
                  onClick={() => setSearchTerm("")}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Informações de resultados */}
        <div className="results-info">
          <p>
            {filteredApps.length === 0 ? 
              'Nenhum aplicativo encontrado' : 
              `${filteredApps.length} ${filteredApps.length === 1 ? 'aplicativo encontrado' : 'aplicativos encontrados'}`
            }
          </p>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando aplicativos...</p>
          </div>
        ) : (
          /* Grid de aplicativos */
          <div className="apps-grid">
            {sortedAndFilteredApps.map((app) => (
              <div key={app.id} className="app-card">
                <div className="app-card-header">
                  <div className={`category-badge ${getCategoryClass(app.category)}`}>
                    {app.category}
                  </div>
                  <div className="app-icon-container">
                    <div className="app-icon">{app.icon}</div>
                  </div>
                </div>
                
                <div className="app-content">
                  <h2 className="app-title">{app.name}</h2>
                  <p className="app-version">Versão {app.version}</p>
                  <p className="app-description">{app.description}</p>
                  <div className="app-size">
                    📦 {app.size}
                  </div>
                  <div className="app-actions">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => showAppDetails(app)}
                    >
                      <FaInfoCircle />
                      Detalhes
                    </button>
                    <button 
                      className="btn btn-primary"
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

        {/* Modal de detalhes */}
        {selectedApp && (
          <div className="app-modal-overlay" onClick={closeDetails}>
            <div className="app-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <button className="modal-close" onClick={closeDetails}>
                  <FaTimes />
                </button>
                <div className="modal-app-info">
                  <div className="modal-app-icon">{selectedApp.icon}</div>
                  <div className="modal-app-details">
                    <h2>{selectedApp.name}</h2>
                    <div className="modal-app-meta">
                      <span>📱 Versão {selectedApp.version}</span>
                      <span>📦 {selectedApp.size}</span>
                      <span>🏷️ {selectedApp.category}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-content">
                <div className="modal-section">
                  <h3>Sobre o Aplicativo</h3>
                  <p>{selectedApp.description}</p>
                </div>
                
                {selectedApp.features && selectedApp.features.length > 0 && (
                  <div className="modal-section">
                    <h3>Funcionalidades</h3>
                    <ul className="features-list">
                      {selectedApp.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedApp.requirements && (
                  <div className="modal-section">
                    <h3>Requisitos do Sistema</h3>
                    <div className="requirements-grid">
                      <div className="requirement-item">
                        <div className="requirement-label">Sistema Operacional</div>
                        <div className="requirement-value">{selectedApp.requirements.os}</div>
                      </div>
                      <div className="requirement-item">
                        <div className="requirement-label">Memória RAM</div>
                        <div className="requirement-value">{selectedApp.requirements.ram}</div>
                      </div>
                      <div className="requirement-item">
                        <div className="requirement-label">Espaço em Disco</div>
                        <div className="requirement-value">{selectedApp.requirements.disk}</div>
                      </div>
                      {selectedApp.requirements.other && (
                        <div className="requirement-item">
                          <div className="requirement-label">Outros</div>
                          <div className="requirement-value">{selectedApp.requirements.other}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {selectedApp.installation_steps && selectedApp.installation_steps.length > 0 && (
                  <div className="modal-section">
                    <h3>Instruções de Instalação</h3>
                    <ol className="installation-steps">
                      {selectedApp.installation_steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                
                <div className="download-section">
                  <button 
                    className="download-button-large"
                    onClick={() => downloadApp(selectedApp)}
                  >
                    <FaDownload />
                    Baixar {selectedApp.name}
                  </button>
                  <p className="download-note">
                    Ao clicar no botão acima, o download iniciará automaticamente. 
                    Certifique-se de que seu sistema atende aos requisitos mínimos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notificação */}
        {showNotification && (
          <div className="notification">
            <div className="notification-content">
              <span className="notification-icon">📥</span>
              <span className="notification-message">{notificationMessage}</span>
            </div>
            <button className="notification-close" onClick={() => setShowNotification(false)}>
              <FaTimes />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Apps;