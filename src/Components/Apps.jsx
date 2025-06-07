import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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

  // Lista de categorias disponíveis, extraídas dinamicamente dos apps
  const categories = ["Todos", ...new Set(apps.map(app => app.category))];

  // Função para exibir detalhes de um aplicativo
  const showAppDetails = (app) => {
    setSelectedApp(app);
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  };

  // Função para fechar a visualização detalhada
  const closeDetails = () => {
    setSelectedApp(null);
    document.body.style.overflow = 'auto';
  };

  // Função de download
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

  // Função para mostrar notificação
  const displayNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };
  
  // Ordenar aplicativos
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
  
  // Filtrar aplicativos por categoria e termo de busca
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

  // Aplicando a ordenação
  const sortedAndFilteredApps = sortApps(filteredApps, sortBy);

  // Formatando o ícone de ordenação
  const getSortIcon = (sortType) => {
    if (sortBy === sortType) {
      return "✓ ";
    }
    return "";
  };

  // Agrupar aplicativos por categoria para exibição
  const appsByCategory = {};
  categories.filter(cat => cat !== "Todos").forEach(category => {
    appsByCategory[category] = sortedAndFilteredApps.filter(app => app.category === category);
  });

  return (
    <div className="apps-container">
      <header className="apps-header">
        <h1>Nossos Aplicativos</h1>
        <p>Descubra nossa coleção de aplicativos desenvolvidos para facilitar seu trabalho</p>
      </header>
      
      {/* Filtros e busca */}
      <div className="filter-section">
        <div className="category-filter">
          <label htmlFor="category-select">Filtrar por categoria:</label>
          <select 
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="search-box">
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
              ×
            </button>
          )}
        </div>
        
        {/* Menu de ordenação */}
        <div className="sort-dropdown">
          <label htmlFor="sort-select">Ordenar por:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">{getSortIcon("name")}Nome</option>
            <option value="size">{getSortIcon("size")}Tamanho</option>
            <option value="latest">{getSortIcon("latest")}Mais recentes</option>
          </select>
        </div>
      </div>
      
      {/* Contagem de resultados */}
      <div className="results-count">
        {filteredApps.length === 0 ? (
          <p>Nenhum aplicativo encontrado</p>
        ) : (
          <p>Exibindo {filteredApps.length} {filteredApps.length === 1 ? 'aplicativo' : 'aplicativos'}</p>
        )}
      </div>

      {/* Estado de carregamento */}
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando aplicativos...</p>
        </div>
      ) : (
        /* Seções de aplicativos por categoria */
        selectedCategory === "Todos" ? (
          // Quando "Todos" está selecionado, mostre aplicativos agrupados por categoria
          Object.keys(appsByCategory).map(category => (
            appsByCategory[category].length > 0 && (
              <div key={category} className="category-section">
                <h2 className="category-title">
                  {category === "Cyber Segurança" && "🔒 "}
                  {category === "Desenvolvimento de Software" && "💻 "}
                  {category === "Inteligência Artificial" && "🧠 "}
                  {category === "Análise de Dados" && "📊 "}
                  {category}
                </h2>
                <div className="apps-grid">
                  {appsByCategory[category].map((app) => (
                    <div key={app.id} className="app-card" data-category={app.category}>
                      <div className="app-card-content">
                        <div className="category-tag">{app.category}</div>
                        <div className="app-icon-wrapper">
                          <div className="app-icon">{app.icon}</div>
                        </div>
                        <div className="app-info">
                          <h2>{app.name}</h2>
                          <p className="app-version">Versão {app.version}</p>
                          <p className="app-description">{app.description}</p>
                          <span className="app-size">Tamanho: {app.size}</span>
                          <div className="app-actions">
                            <button 
                              className="details-button"
                              onClick={() => showAppDetails(app)}
                            >
                              Detalhes
                            </button>
                            <button 
                              className="download-button"
                              onClick={() => downloadApp(app)}
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))
        ) : (
          // Quando uma categoria específica está selecionada, mostre apenas esses aplicativos
          <div className="apps-grid">
            {sortedAndFilteredApps.map((app) => (
              <div key={app.id} className="app-card" data-category={app.category}>
                <div className="app-card-content">
                  <div className="category-tag">{app.category}</div>
                  <div className="app-icon-wrapper">
                    <div className="app-icon">{app.icon}</div>
                  </div>
                  <div className="app-info">
                    <h2>{app.name}</h2>
                    <p className="app-version">Versão {app.version}</p>
                    <p className="app-description">{app.description}</p>
                    <span className="app-size">Tamanho: {app.size}</span>
                    <div className="app-actions">
                      <button 
                        className="details-button"
                        onClick={() => showAppDetails(app)}
                      >
                        Detalhes
                      </button>
                      <button 
                        className="download-button"
                        onClick={() => downloadApp(app)}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Modal de detalhes */}
      {selectedApp && (
        <div className="app-modal-overlay">
          <div className="app-modal">
            <button className="close-button" onClick={closeDetails}>×</button>
            <div className="app-modal-header">
              <div className="app-category-badge" style={{"--tag-rgb": 
                selectedApp.category === "Cyber Segurança" ? "39, 174, 96" : 
                selectedApp.category === "Desenvolvimento de Software" ? "52, 152, 219" : 
                selectedApp.category === "Inteligência Artificial" ? "155, 89, 182" :
                selectedApp.category === "Análise de Dados" ? "230, 126, 34" : "65, 88, 208"
              }}>{selectedApp.category}</div>
              <div className="app-header-content">
                <div className="app-icon-large" style={{"--tag-rgb": 
                  selectedApp.category === "Cyber Segurança" ? "39, 174, 96" : 
                  selectedApp.category === "Desenvolvimento de Software" ? "52, 152, 219" : 
                  selectedApp.category === "Inteligência Artificial" ? "155, 89, 182" :
                  selectedApp.category === "Análise de Dados" ? "230, 126, 34" : "65, 88, 208"
                }}>{selectedApp.icon}</div>
                <div className="app-title-section">
                  <h2>{selectedApp.name}</h2>
                  <div className="app-meta">
                    <p className="app-version">Versão {selectedApp.version}</p>
                    <p className="app-size-badge">{selectedApp.size}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="app-modal-content" style={{"--tag-rgb": 
              selectedApp.category === "Cyber Segurança" ? "39, 174, 96" : 
              selectedApp.category === "Desenvolvimento de Software" ? "52, 152, 219" : 
              selectedApp.category === "Inteligência Artificial" ? "155, 89, 182" :
              selectedApp.category === "Análise de Dados" ? "230, 126, 34" : "65, 88, 208"
            }}>
              <div className="app-details">
                <div className="app-details-section">
                  <h3>Descrição detalhada</h3>
                  <p>{selectedApp.description}</p>
                </div>
                
                {selectedApp.features && selectedApp.features.length > 0 && (
                  <div className="app-details-section">
                    <h3>Funcionalidades</h3>
                    <ul className="features-list">
                      {selectedApp.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedApp.requirements && (
                  <div className="app-details-section">
                    <h3>Requisitos do sistema</h3>
                    <ul className="requirements-list">
                      <li>
                        <div className="requirement-label">Sistema</div>
                        <div className="requirement-value">{selectedApp.requirements.os}</div>
                      </li>
                      <li>
                        <div className="requirement-label">Memória</div>
                        <div className="requirement-value">{selectedApp.requirements.ram}</div>
                      </li>
                      <li>
                        <div className="requirement-label">Espaço em disco</div>
                        <div className="requirement-value">{selectedApp.requirements.disk}</div>
                      </li>
                    </ul>
                  </div>
                )}
                
                {selectedApp.installation_steps && selectedApp.installation_steps.length > 0 && (
                  <div className="app-details-section">
                    <h3>Instruções de instalação</h3>
                    <ol className="installation-list">
                      {selectedApp.installation_steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
              
              <div className="download-section">
                <button 
                  className="download-button-large"
                  onClick={() => downloadApp(selectedApp)}
                >
                  Baixar {selectedApp.name}
                </button>
                <p className="download-note">
                  <strong>Nota:</strong> Ao clicar no botão acima, o download iniciará automaticamente.
                  Não é necessário navegar para o GitHub.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notificação de download */}
      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            <span className="notification-icon">📥</span>
            <span className="notification-message">{notificationMessage}</span>
          </div>
          <button className="notification-close" onClick={() => setShowNotification(false)}>×</button>
        </div>
      )}
    </div>
  );
}

export default Apps;