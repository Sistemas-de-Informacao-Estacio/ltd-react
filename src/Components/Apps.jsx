import React, { useState, useEffect } from 'react';
// import './App.css'; // Importando o arquivo CSS anexado

function Apps() {
  // Estado para armazenar os aplicativos
  const [apps] = useState([
    // Categoria: Cyber Segurança
    {
      id: 1,
      name: "Segurança Digital Avançada",
      description: "Sistema de segurança digital desenvolvido especificamente para prefeituras e órgãos públicos, focado na proteção e gestão de credenciais sensíveis.",
      version: "2.0.0",
      icon: "🔐", 
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v2.0.0/segurancadigitalavancada.exe",
      size: "45.52 MB",
      category: "Cyber Segurança",
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "50 MB de espaço em disco"
      },
      features: [
        "Verificação de Força de Senhas",
        "Geração de Senhas Seguras",
        "Detecção de Vazamentos de Dados",
        "Análise de Vulnerabilidades"
      ],
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
      version: "2.0.0",
      icon: "🔑",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v2.0.0/geradorsenhas.exe",
      size: "71.79 MB",
      category: "Cyber Segurança",
      features: [
        "Cria senhas aleatórias com comprimento configurável (8 a 64 caracteres)",
        "Permite selecionar tipos de caracteres (maiúsculas, minúsculas, números, especiais)",
        "Exclui caracteres semelhantes (i, l, 1, I, O, 0) e ambíguos ({}, [], (), /)",
        "Gera frases-senha (passphrases) com palavras aleatórias",
        "Garante alta entropia criptográfica e aleatoriedade verdadeira",
        "Análise em tempo real da força da senha",
        "Design responsivo, moderno e futurista",
        "Modo claro/escuro com persistência de preferência"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "80 MB de espaço em disco"
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
      version: "2.0.0",
      icon: "✓",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v2.0.0/isochecklist.exe",
      size: "69.23 MB",
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
        disk: "70 MB de espaço em disco"
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
      version: "2.0.0",
      icon: "🎣",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v2.0.0/simuladorphishing.exe",
      size: "144.05 MB",
      category: "Cyber Segurança",
      features: [
        "Gestão de campanhas: Crie e gerencie múltiplas campanhas de phishing educacional",
        "Templates personalizáveis: Crie e customize templates de e-mail para simular diferentes tipos de ataques",
        "Gestão de alvos: Adicione alvos individualmente ou importe-os em massa via CSV",
        "Rastreamento em tempo real: Monitore quem abriu os e-mails, clicou em links ou reportou o phishing",
        "Relatórios detalhados: Visualize estatísticas e métricas por departamento, template ou campanha",
        "Módulo educacional: Material educativo e quiz sobre phishing para conscientização",
        "Modo de simulação: Teste campanhas sem enviar e-mails reais"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "150 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 5,
      name: "Google Dorks",
      description: "Sistema de otimização de buscas utilizando Google Dorks, para funcionários públicos localizarem documentos e informações de forma eficiente.",
      version: "2.0.0",
      icon: "🔍",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v2.0.0/googledorks.exe",
      size: "59.76 MB",
      category: "Cyber Segurança",
      features: [
        "Interface Intuitiva: Recebe consultas de pesquisa longas do usuário em linguagem natural",
        "Integração com IA: Utiliza a API do Google Gemini para processar e otimizar consultas",
        "Aplicação Automática de Dorks: Transforma buscas comuns em consultas avançadas com operadores do Google",
        "Personalização por Tipo de Arquivo: Customiza dorks específicas baseadas no tipo de arquivo desejado",
        "Seção Educativa: Guia completo sobre o uso profissional e ético de Google Dorks",
        "Exemplos por Departamento: Casos de uso específicos para diferentes setores da administração pública"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "60 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 6,
      name: "Sistema de Autoavaliação de Segurança",
      description: "Aplicação web para prefeituras avaliarem, monitorarem e aprimorarem suas práticas de segurança digital, identificando vulnerabilidades e implementando medidas corretivas.",
      version: "2.0.0",
      icon: "🛡️",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v2.0.0/sistema_de_autoavaliacao_de_seguranca_cibernetica.exe",
      size: "184.40 MB",
      category: "Cyber Segurança",
      features: [
        "Avaliação de segurança baseada em padrões internacionais",
        "Análise de vulnerabilidades e riscos",
        "Recomendações personalizadas de medidas corretivas",
        "Monitoramento contínuo de práticas de segurança",
        "Relatórios detalhados de conformidade"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "8 GB de RAM",
        disk: "200 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    
    // Categoria: Desenvolvimento de Software
    {
      id: 7,
      name: "CurriculoBot",
      description: "Assistente interativo com interface futurista que ajuda usuários a criar currículos profissionais através de uma experiência de chatbot guiada.",
      version: "2.0.0",
      icon: "📝",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.0.0/geradorcurriculo.exe",
      size: "48.78 MB",
      category: "Desenvolvimento de Software",
      features: [
        "Interface de Chatbot Intuitiva: Comunicação natural e interativa para coleta de dados",
        "Prévia em Tempo Real: Visualização instantânea do currículo sendo montado",
        "Design Futurista e Responsivo: Funciona em dispositivos desktop e móveis",
        "Sugestões Contextuais: Botões de resposta rápida para facilitar a interação",
        "Geração de PDF: Fácil exportação e impressão do currículo finalizado",
        "Armazenamento de Dados: Salvamento das informações para recuperação futura",
        "Fluxo Adaptativo: Perguntas personalizadas com base em respostas anteriores",
        "Sessões Persistentes: Possibilidade de retomar a criação do currículo posteriormente",
        "Indicador de Digitação: Feedback visual de quando o bot está 'pensando'"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "50 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 8,
      name: "Sistema de E-mails para Prefeituras",
      description: "Sistema desenvolvido para atender às necessidades específicas das Prefeituras, oferecendo uma solução integrada para a comunicação via e-mail institucional.",
      version: "2.0.0",
      icon: "📧",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.0.0/appenvioemail.exe",
      size: "139.58 MB",
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
        disk: "150 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 9,
      name: "Templates de E-mail",
      description: "Conjunto de templates personalizáveis para uso com o Sistema de E-mails para Prefeituras.",
      version: "2.0.0",
      icon: "📋",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.0.0/templateemail.exe",
      size: "51.81 MB",
      category: "Desenvolvimento de Software",
      features: [
        "Templates profissionais pré-formatados",
        "Personalização de cores e estilos",
        "Compatível com o Sistema de E-mails para Prefeituras",
        "Exportação em múltiplos formatos",
        "Visualização em tempo real das alterações"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "60 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 10,
      name: "Encurtador de URL",
      description: "Sistema de encurtamento de URL utilizando Python e Flask com integração à API do Google Gemini para geração de códigos inteligentes.",
      version: "2.0.0",
      icon: "🔗",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.0.0/encurtadorurl.exe",
      size: "31.71 MB",
      category: "Desenvolvimento de Software",
      features: [
        "Encurtamento de URLs longas utilizando Inteligência Artificial",
        "Geração de códigos curtos inteligentes relacionados ao conteúdo da URL",
        "Redirecionamento para URLs originais",
        "Rastreamento de acessos e estatísticas de uso",
        "Interface responsiva em HTML, CSS e JavaScript"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "40 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 11,
      name: "Gerador de Prompts",
      description: "Sistema web com Flask que permite funcionários da prefeitura gerar documentos e conteúdos usando vários modelos de IA através de prompts de comando personalizados.",
      version: "2.0.0",
      icon: "💬",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.0.0/geradorprompts.exe",
      size: "136.48 MB",
      category: "Desenvolvimento de Software",
      features: [
        "Suporte para múltiplos modelos de IA (Google Gemini, OpenAI GPT, Anthropic Claude e outros)",
        "Gerenciamento central de chaves de API e configurações",
        "Sistema inteligente de fallback quando um modelo atinge limites de requisição",
        "Templates reutilizáveis para prompts comuns",
        "Histórico de todas as solicitações",
        "Administração de usuários e permissões"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "8 GB de RAM",
        disk: "150 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 12,
      name: "Gerador de Ofícios",
      description: "Sistema completo e profissional para criação, gestão e controle de ofícios, desenvolvido especificamente para as prefeituras de Florianópolis e São José.",
      version: "2.0.0",
      icon: "📄",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.0.0/oficio.exe",
      size: "48.18 MB",
      category: "Desenvolvimento de Software",
      features: [
        "Autenticação e segurança com perfis diferenciados",
        "Criação de ofícios com numeração sequencial automática",
        "Personalização por município (cabeçalhos específicos)",
        "Sistema de status (Pendente, Em andamento, Finalizado, Cancelado)",
        "Exportação para PDF com layout profissional",
        "Dashboard intuitivo com estatísticas",
        "Gerenciamento completo de usuários"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "50 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    
    // Categoria: Inteligência Artificial
    {
      id: 13,
      name: "Neura AI Assistant",
      description: "Sistema desktop avançado desenvolvido em Python com Tkinter que integra a API do Dify para criar uma interface de chatbot inteligente, moderna e de fácil utilização.",
      version: "1.0.0",
      icon: "🤖",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/inteligencia-artificial/releases/download/v1.0.0/neuraai-assistant.exe",
      size: "57.6 MB",
      category: "Inteligência Artificial",
      features: [
        "Interface intuitiva e moderna",
        "Integração com a API Dify",
        "Processamento avançado de linguagem natural",
        "Respostas contextuais e personalizadas",
        "Base de conhecimento especializada"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "60 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 14,
      name: "Notícias com IA",
      description: "Aplicativo que permite consultar notícias sobre qualquer tópico usando a API Gemini do Google com Search Grounding, salvando automaticamente em arquivos de texto.",
      version: "2.0.0",
      icon: "📰",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.0.0/noticias.exe",
      size: "58.53 MB",
      category: "Inteligência Artificial",
      features: [
        "Consulta de notícias atualizadas da web sobre qualquer tópico",
        "Salvamento automático de consultas em arquivos TXT",
        "Listagem e acesso a notícias salvas anteriormente",
        "Interface com formatação colorida para melhor legibilidade",
        "Integração com API Google Gemini"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "60 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 15,
      name: "Notícias Fácil",
      description: "Versão simplificada do aplicativo de notícias com IA, com interface mais leve e focada na facilidade de uso.",
      version: "2.0.0",
      icon: "📑",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.0.0/noticiasfacil.exe",
      size: "35.80 MB",
      category: "Inteligência Artificial",
      features: [
        "Interface simplificada para facilitar o uso",
        "Consultas rápidas de notícias atualizadas",
        "Salvamento automático em formato TXT",
        "Tamanho reduzido para melhor desempenho",
        "Ideal para computadores com menos recursos"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "2 GB de RAM",
        disk: "40 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    
    // Categoria: Análise de Dados (Nova categoria)
    {
      id: 16,
      name: "Dashboard Financeiro",
      description: "Ferramenta de visualização de dados financeiros com métricas e gráficos interativos para análise orçamentária municipal.",
      version: "1.0.0",
      icon: "📊",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/analise-de-dados/releases/download/v1.0.0/dashboard-financeiro.exe",
      size: "42.5 MB",
      category: "Análise de Dados",
      features: [
        "Dashboard interativo com visualizações de dados financeiros",
        "Análise de tendências orçamentárias",
        "Comparativos de gastos por departamento",
        "Previsão de despesas futuras com modelos estatísticos",
        "Exportação de relatórios em PDF e Excel"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "4 GB de RAM",
        disk: "50 MB de espaço em disco"
      },
      installation: [
        "Faça o download do arquivo .exe",
        "Execute o instalador como administrador",
        "Siga as instruções na tela"
      ]
    },
    {
      id: 17,
      name: "Analisador de Dados Públicos",
      description: "Sistema para coleta, processamento e visualização de dados públicos municipais, facilitando a tomada de decisões baseada em dados.",
      version: "1.0.0",
      icon: "📈",
      downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/analise-de-dados/releases/download/v1.0.0/analisador-dados.exe",
      size: "38.7 MB",
      category: "Análise de Dados",
      features: [
        "Importação de dados de APIs governamentais",
        "Limpeza e transformação automatizada de dados",
        "Modelos de análise pré-configurados",
        "Geração de insights através de machine learning",
        "Compartilhamento de análises entre departamentos"
      ],
      requirements: {
        os: "Windows 10 ou superior",
        ram: "6 GB de RAM",
        disk: "60 MB de espaço em disco"
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
  // const [showDownloadNotification, setShowDownloadNotification] = useState(false);
  // const [downloadMessage, setDownloadMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name"); // Opções: name, size, latest
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Efeito para simular carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Lista de categorias disponíveis, extraídas dinamicamente dos apps
  const categories = ["Todos", ...new Set(apps.map(app => app.category))];

  // Função para exibir detalhes de um aplicativo
  const showAppDetails = (app) => {
    setSelectedApp(app);
    // Quando abre os detalhes, faz scroll para o topo da página
    window.scrollTo(0, 0);
    // Desativa o scroll do body quando o modal está aberto
    document.body.style.overflow = 'hidden';
  };

  // Função para fechar a visualização detalhada
  const closeDetails = () => {
    setSelectedApp(null);
    // Reativa o scroll do body quando o modal é fechado
    document.body.style.overflow = 'auto';
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
    
    // Mostrar notificação
    displayNotification(`Iniciando download de ${app.name} (${app.size})`);
  };

  // Função para mostrar notificação
  const displayNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    
    // Esconder a notificação após 5 segundos
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
          return sizeB - sizeA; // Maior para menor
        });
      case 'latest':
        return [...apps].sort((a, b) => parseFloat(b.version) - parseFloat(a.version));
      default:
        return apps;
    }
  };
  
  // Filtrar aplicativos por categoria e termo de busca
  const filteredApps = apps.filter(app => {
    // Filtro por categoria 
    const categoryMatch = selectedCategory === "Todos" || app.category === selectedCategory;
    
    // Filtro por termo de busca (nome, descrição ou features)
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
                
                {selectedApp.features && (
                  <div className="app-details-section">
                    <h3>Funcionalidades</h3>
                    <ul className="features-list">
                      {selectedApp.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedApp.pillars && (
                  <div className="app-details-section">
                    <h3>Pilares fundamentais</h3>
                    <ul className="pillars-list">
                      {selectedApp.pillars.map((pillar, index) => (
                        <li key={index}>{pillar}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
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
                
                <div className="app-details-section">
                  <h3>Instruções de instalação</h3>
                  <ol className="installation-list">
                    {selectedApp.installation.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
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