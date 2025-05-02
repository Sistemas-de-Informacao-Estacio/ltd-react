import React, { useState } from 'react';
// import './App.css'; // Assegure-se de criar este arquivo CSS para estilização

function Apps() {
  // Lista de aplicativos com informações reais
  // eslint-disable-next-line no-unused-vars
  const [apps, setApps] = useState([
    // Categoria: Cyber Segurança
    {
      id: 1,
      name: "CyberSecurity",
      description: "Sistema de segurança digital desenvolvido especificamente para prefeituras e órgãos públicos, focado na proteção e gestão de credenciais sensíveis.",
      version: "1.0.0",
      icon: "🔐", 
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v1.0.0/AutoProtecao.exe",
      size: "100 MB",
      category: "Cyber Segurança",
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "100 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 2,
      name: "Gerador de Senhas",
      description: "Um gerador de senhas profissional e seguro baseado em Flask com uma interface futurista, alta entropia criptográfica e seguindo os padrões NIST SP 800-63B.",
      version: "1.0.0",
      icon: "🔑",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v1.0.0/geradorsenhas.exe",
      size: "59 MB",
      category: "Cyber Segurança",
      features: [
        "Cria senhas aleatórias com comprimento configurável (8 a 64 caracteres)",
        "Permite selecionar tipos de caracteres (maiúsculas, minúsculas, números, especiais)",
        "Exclui caracteres semelhantes (i, l, 1, I, O, 0) e ambíguos ({}, [], (), /)",
        "Gera frases-senha (passphrases) com palavras aleatórias",
        "Garante alta entropia criptográfica e aleatoriedade verdadeira",
        "Análise em tempo real da força da senha"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "100 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 3,
      name: "Checklist de Segurança",
      description: "Aplicação desenvolvida para auxiliar servidores públicos e funcionários internos na realização de verificações periódicas de segurança da informação, garantindo conformidade com normas e regulamentações, incluindo a LGPD e os padrões ISO.",
      version: "1.0.0",
      icon: "✓",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v1.0.0/IsoChecklist.exe",
      size: "39.5 MB",
      category: "Cyber Segurança",
      features: [
        "Realizar verificações sistemáticas de segurança da informação",
        "Acompanhar o progresso das verificações",
        "Gerar relatórios detalhados",
        "Manter histórico de conformidade para fins de auditoria"
      ],
      pillars: [
        "Confidencialidade: Garantia de que apenas pessoas autorizadas acessem informações sensíveis",
        "Integridade: Preservação da precisão e completude dos dados",
        "Disponibilidade: Garantia de acesso aos sistemas quando necessário"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "100 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 4,
      name: "Simulador de Phishing",
      description: "Ferramenta projetada para criar e executar campanhas de phishing controladas em ambientes corporativos ou educacionais. O objetivo é aumentar a conscientização sobre segurança cibernética.",
      version: "1.0.0",
      icon: "🎣",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v1.0.0/simuladorphishing.exe",
      size: "75.6 MB",
      category: "Cyber Segurança",
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "100 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    
    // Categoria: Desenvolvimento de Software
    {
      id: 5,
      name: "CurriculoBot",
      description: "Assistente interativo com interface futurista que ajuda usuários a criar currículos profissionais através de uma experiência de chatbot guiada.",
      version: "1.0.0",
      icon: "📝",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v1.0.0/Gerador.Curriculo.exe",
      size: "39.2 MB",
      category: "Desenvolvimento de Software",
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "100 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 6,
      name: "Sistema de E-mails para Prefeituras",
      description: "Sistema desenvolvido para atender às necessidades específicas das Prefeituras, oferecendo uma solução integrada para a comunicação via e-mail institucional.",
      version: "1.0.0",
      icon: "📧",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v1.0.0/Sistema_Email_Prefeituras.exe",
      size: "139 MB",
      category: "Desenvolvimento de Software",
      features: [
        "Envio de e-mails individuais e em massa",
        "Agendamento de e-mails",
        "Gerenciamento de contatos e grupos",
        "Templates personalizáveis",
        "Relatórios de atividades",
        "Suporte a múltiplas prefeituras"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "200 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 7,
      name: "Templates de E-mail",
      description: "Conjunto de templates personalizáveis para uso com o Sistema de E-mails para Prefeituras.",
      version: "1.0.0",
      icon: "📋",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v1.0.0/templatesemail.exe",
      size: "34.9 MB",
      category: "Desenvolvimento de Software",
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "100 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    
    // Categoria: Inteligência Artificial
    {
      id: 8,
      name: "Neura AI Assistant",
      description: "Sistema desktop avançado desenvolvido em Python com Tkinter que integra a API do Dify para criar uma interface de chatbot inteligente, moderna e de fácil utilização.",
      version: "1.0.0",
      icon: "🤖",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/inteligencia-artificial/releases/download/v1.0.0/neuraai-assistant.exe",
      size: "57.6 MB",
      category: "Inteligência Artificial",
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "100 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    }
  ]);

  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  // Lista de categorias disponíveis
  const categories = ["Todos", "Cyber Segurança", "Desenvolvimento de Software", "Inteligência Artificial"];

  // Função para exibir detalhes de um aplicativo
  const showAppDetails = (app) => {
    setSelectedApp(app);
  };

  // Função para fechar a visualização detalhada
  const closeDetails = () => {
    setSelectedApp(null);
  };

  // Função de download
  const downloadApp = (app) => {
    // Criando um elemento <a> invisível para fazer o download
    const link = document.createElement('a');
    link.href = app.downloadUrl;
    link.setAttribute('download', ''); // Isso força o download ao invés de navegação
    link.setAttribute('target', '_blank'); // Isso evita problemas em alguns navegadores
    
    // Adicionando o elemento ao DOM
    document.body.appendChild(link);
    
    // Clicando no link para iniciar o download
    link.click();
    
    // Removendo o elemento do DOM após o clique
    document.body.removeChild(link);
    
    // Exibindo notificação
    alert(`Iniciando download de ${app.name} (${app.size})`);
  };
  
  // Filtrar aplicativos por categoria e termo de busca
  const filteredApps = apps.filter(app => {
    // Filtro por categoria 
    const categoryMatch = selectedCategory === "Todos" || app.category === selectedCategory;
    
    // Filtro por termo de busca (nome ou descrição)
    const searchMatch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       app.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
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
      </div>
      
      {/* Contagem de resultados */}
      <div className="results-count">
        {filteredApps.length === 0 ? (
          <p>Nenhum aplicativo encontrado</p>
        ) : (
          <p>Exibindo {filteredApps.length} {filteredApps.length === 1 ? 'aplicativo' : 'aplicativos'}</p>
        )}
      </div>

      {/* Grade de aplicativos */}
      <div className="apps-grid">
        {filteredApps.map((app) => (
          <div key={app.id} className="app-card">
            <div className="category-tag">{app.category}</div>
            <div className="app-icon">{app.icon}</div>
            <h2>{app.name}</h2>
            <p className="app-version">Versão {app.version}</p>
            <p className="app-description">{app.description}</p>
            <p className="app-size">Tamanho: {app.size}</p>
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
        ))}
      </div>

      {selectedApp && (
        <div className="app-modal-overlay">
          <div className="app-modal">
            <button className="close-button" onClick={closeDetails}>×</button>
            <div className="app-modal-content">
              <div className="app-category-badge">{selectedApp.category}</div>
              <div className="app-icon-large">{selectedApp.icon}</div>
              <h2>{selectedApp.name}</h2>
              <p className="app-version">Versão {selectedApp.version}</p>
              <p className="app-size-badge">Tamanho: {selectedApp.size}</p>
              
              <div className="app-details">
                <h3>Descrição detalhada</h3>
                <p>{selectedApp.description}</p>
                
                {selectedApp.features && (
                  <>
                    <h3>Funcionalidades</h3>
                    <ul className="features-list">
                      {selectedApp.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
                
                {selectedApp.pillars && (
                  <>
                    <h3>Pilares fundamentais</h3>
                    <ul className="pillars-list">
                      {selectedApp.pillars.map((pillar, index) => (
                        <li key={index}>{pillar}</li>
                      ))}
                    </ul>
                  </>
                )}
                
                <h3>Requisitos do sistema</h3>
                <ul className="requirements-list">
                  <li><strong>Sistema:</strong> {selectedApp.requirements.os}</li>
                  <li><strong>Memória:</strong> {selectedApp.requirements.ram}</li>
                  <li><strong>Espaço em disco:</strong> {selectedApp.requirements.disk}</li>
                </ul>
                
                <h3>Instruções de instalação</h3>
                <ol className="installation-list">
                  {selectedApp.installation.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
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
    </div>
  );
}

export default Apps;