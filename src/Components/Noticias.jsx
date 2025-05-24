import { useState, useEffect, useCallback } from 'react';
import '../Noticias.css';
import { FiRefreshCw, FiExternalLink, FiClock, FiBookmark, FiGlobe, FiGrid } from 'react-icons/fi';
import { AiOutlineSafety, AiOutlineRobot } from 'react-icons/ai';
import { TbBrain, TbDeviceDesktop } from 'react-icons/tb';
import { MdOutlineSmartToy } from 'react-icons/md';
// Removido o ícone problemático IoIotOutline

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [filteredNoticias, setFilteredNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [idiomaAtivo, setIdiomaAtivo] = useState('todos');
  const [pagina, setPagina] = useState(1);
  const noticiasPorPagina = 10; // Aumentado para mostrar mais notícias por página
  const [atualizando, setAtualizando] = useState(false);
  const [usandoNoticiasStaticas, setUsandoNoticiasStaticas] = useState(false);
  
  // Chave da API
  const apiKey = 'pub_859392a4b46d2b8bec7afa128e75a2bb08da5';
  
  // Lista de categorias de notícias
  const categorias = [
    { id: 'todos', nome: 'Todas', icone: <FiGrid /> },
    { id: 'cyberseguranca', nome: 'Cibersegurança', icone: <AiOutlineSafety /> },
    { id: 'ia', nome: 'Inteligência Artificial', icone: <TbBrain /> },
    { id: 'inovacao', nome: 'Inovação Tech', icone: <MdOutlineSmartToy /> }
  ];
  
  // Lista ampliada de termos de busca para tecnologia em geral
  const termosBusca = {
    pt: [
      'tecnologia', 'inovação', 'digital', 'internet', 'software', 
      'hardware', 'computador', 'segurança', 'inteligência artificial', 
      'ia', 'aplicativo', 'app', 'smartphone', 'gadget', 'robô',
      'automação', 'programação', 'desenvolvimento', 'computação',
      'ciência de dados', 'startup', 'cibersegurança', 'algoritmo',
      'rede', 'nuvem', 'wearable', 'realidade virtual', 'metaverso',
      'blockchain', 'criptomoeda', '5G', 'fibra óptica', 'telecomunicações',
      'processador', 'microchip', 'videogame', 'console', 'impressora 3D',
      'biotecnologia', 'nanotecnologia', 'quantum computing'
    ],
    en: [
      'technology', 'innovation', 'digital', 'internet', 'software',
      'hardware', 'computer', 'security', 'artificial intelligence',
      'ai', 'app', 'application', 'smartphone', 'gadget', 'robot',
      'automation', 'programming', 'development', 'computing',
      'data science', 'startup', 'cybersecurity', 'algorithm',
      'network', 'cloud', 'wearable', 'virtual reality', 'metaverse',
      'blockchain', 'cryptocurrency', '5G', 'fiber optic', 'telecommunications',
      'processor', 'microchip', 'videogame', 'console', '3D printing',
      'biotechnology', 'nanotechnology', 'quantum computing'
    ]
  };
  
  // Lista de domínios confiáveis de tecnologia para busca direta
  const dominiosTecnologia = [
    // Brasileiros
    'tecmundo.com.br', 'olhardigital.com.br', 'tecnoblog.net', 'canaltech.com.br', 
    'techtudo.com.br', 'tudocelular.com', 'showmetech.com.br', 'computerworld.com.br',
    'gizmodo.uol.com.br', 'convergenciadigital.com.br', 'teletime.com.br',
    // Internacionais
    'theverge.com', 'techcrunch.com', 'wired.com', 'zdnet.com', 'cnet.com', 
    'arstechnica.com', 'engadget.com', 'venturebeat.com', 'thenextweb.com',
    'techradar.com', 'gizmodo.com', 'mashable.com', 'slashdot.org'
  ];
  
  // Buscar notícias combinando diferentes abordagens para maximizar resultados
  const fetchNoticias = useCallback(async () => {
    try {
      setAtualizando(true);
      setError(null);
      setUsandoNoticiasStaticas(false);
      setNoticias([]); // Limpar notícias existentes
      
      // Array para armazenar todas as promessas de buscas
      const todasPromises = [];
      
      // 1. Buscar por categoria de tecnologia
      todasPromises.push(buscarPorCategoria('pt', 'technology'));
      todasPromises.push(buscarPorCategoria('en', 'technology'));
      
      // 2. Buscar por termos de tecnologia em chunks para evitar erros de API
      // Dividir os termos em grupos menores para evitar consultas muito longas
      const criarChunks = (termos, tamanhoChunk = 3) => {
        const chunks = [];
        for (let i = 0; i < termos.length; i += tamanhoChunk) {
          chunks.push(termos.slice(i, i + tamanhoChunk).join(' OR '));
        }
        return chunks;
      };
      
      // Criar chunks para português e inglês
      const chunksPt = criarChunks(termosBusca.pt);
      const chunksEn = criarChunks(termosBusca.en);
      
      // Adicionar buscas para cada chunk
      chunksPt.forEach(chunk => {
        todasPromises.push(buscarPorTermo('pt', chunk));
      });
      
      chunksEn.forEach(chunk => {
        todasPromises.push(buscarPorTermo('en', chunk));
      });
      
      // 3. Buscar por domínios de tecnologia específicos
      dominiosTecnologia.forEach(dominio => {
        todasPromises.push(buscarPorDominio(dominio));
      });
      
      // 4. Adicionar buscas específicas para garantir diversidade
      const buscasEspecificas = [
        { idioma: 'pt', termo: 'últimas novidades tecnologia' },
        { idioma: 'pt', termo: 'lançamento tecnologia' },
        { idioma: 'pt', termo: 'inovação digital 2025' },
        { idioma: 'pt', termo: 'futuro da tecnologia' },
        { idioma: 'pt', termo: 'tendências tecnologia 2025' },
        { idioma: 'en', termo: 'latest technology news' },
        { idioma: 'en', termo: 'technology launch' },
        { idioma: 'en', termo: 'digital innovation 2025' },
        { idioma: 'en', termo: 'future of technology' },
        { idioma: 'en', termo: 'technology trends 2025' }
      ];
      
      buscasEspecificas.forEach(busca => {
        todasPromises.push(buscarPorTermo(busca.idioma, busca.termo));
      });
      
      // Executar todas as buscas em paralelo
      const resultados = await Promise.allSettled(todasPromises);
      
      // Coletar todos os resultados bem-sucedidos
      let todasNoticias = [];
      
      resultados.forEach((resultado, index) => {
        if (resultado.status === 'fulfilled' && resultado.value && resultado.value.length > 0) {
          console.log(`Busca ${index + 1} encontrou ${resultado.value.length} notícias`);
          todasNoticias = [...todasNoticias, ...resultado.value];
        }
      });
      
      // Remover possíveis duplicatas
      const noticiasUnicas = removerDuplicatas(todasNoticias);
      console.log(`Total de ${noticiasUnicas.length} notícias únicas encontradas`);
      
      // Filtrar para manter apenas notícias de tecnologia
      const noticiasTecnologia = filtrarNoticiasTecnologia(noticiasUnicas);
      console.log(`${noticiasTecnologia.length} notícias relevantes de tecnologia após filtragem`);
      
      if (noticiasTecnologia.length > 0) {
        setNoticias(noticiasTecnologia);
        setFilteredNoticias(filtrarNoticiasPorCategoria(noticiasTecnologia, filtroAtivo, idiomaAtivo));
      } else {
        // Se não encontrou nenhuma notícia, usar notícias estáticas
        console.log("Nenhuma notícia encontrada, usando notícias estáticas");
        usarNoticiasStaticas();
      }
    } catch (err) {
      console.error('Erro ao buscar notícias:', err);
      setError(err.message);
      
      // Em caso de erro, usar notícias estáticas
      usarNoticiasStaticas();
    } finally {
      setLoading(false);
      setAtualizando(false);
      setPagina(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroAtivo, idiomaAtivo]); // Dependências do useCallback
  
  // Função para filtrar apenas notícias relacionadas à tecnologia
  const filtrarNoticiasTecnologia = (noticias) => {
    // Palavras-chave gerais de tecnologia para o filtro
    const palavrasChaveTecnologia = [
      // Português
      'tecnologia', 'digital', 'internet', 'software', 'hardware', 'computador', 
      'app', 'aplicativo', 'sistema', 'rede', 'programação', 'código', 'dados',
      'nuvem', 'cloud', 'segurança', 'cyber', 'hacker', 'inteligência artificial',
      'ia', 'ai', 'machine learning', 'algoritmo', 'automação', 'startup', 'tech', 
      'robô', 'processador', 'chip', 'gadget', 'informática', 'telecomunicação', 
      'telecom', 'smartphone', 'celular', 'computação', 'ciência', 'pesquisa', 
      'desenvolvimento', 'inovação', 'ciência de dados', 'realidade virtual',
      'realidade aumentada', 'blockchain',
      // Inglês
      'technology', 'digital', 'internet', 'software', 'hardware', 'computer',
      'app', 'application', 'system', 'network', 'programming', 'code', 'data',
      'cloud', 'security', 'cyber', 'hacker', 'artificial intelligence',
      'algorithm', 'automation', 'device', 'innovation', 'startup', 'robot', 
      'processor', 'chip', 'gadget', 'computing', 'telecommunications', 'telecom', 
      'smartphone', 'mobile', 'science', 'research', 'development', 'data science',
      'virtual reality', 'augmented reality', 'blockchain'
    ];
    
    // Verificar cada notícia para palavras-chave de tecnologia no título e descrição
    return noticias.filter(noticia => {
      const titulo = noticia.title ? noticia.title.toLowerCase() : '';
      const descricao = noticia.description ? noticia.description.toLowerCase() : '';
      const conteudo = `${titulo} ${descricao}`;
      
      // Verificar palavras-chave de tecnologia
      return palavrasChaveTecnologia.some(palavra => conteudo.includes(palavra));
    });
  };
  
  // Função auxiliar para remover notícias duplicadas
  const removerDuplicatas = (noticias) => {
    const titlesSet = new Set();
    const linksSet = new Set();
    
    return noticias.filter(noticia => {
      // Se não tem título ou link, manter
      if (!noticia.title && !noticia.link) return true;
      
      // Se já temos uma notícia com este título ou link, é duplicata
      if ((noticia.title && titlesSet.has(noticia.title)) || 
          (noticia.link && linksSet.has(noticia.link))) {
        return false;
      }
      
      // Caso contrário, adicionar aos conjuntos e manter esta notícia
      if (noticia.title) titlesSet.add(noticia.title);
      if (noticia.link) linksSet.add(noticia.link);
      return true;
    });
  };
  
  // Buscar notícias por categoria
  const buscarPorCategoria = async (idioma, categoria) => {
    try {
      // Endpoint da API com categoria específica
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=${idioma}&category=${categoria}&size=100`;
      
      console.log(`Buscando notícias por categoria ${categoria} em ${idioma}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na API (${idioma}): ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success' && data.results && data.results.length > 0) {
        return categorizarNoticias(data.results, idioma);
      }
      
      return [];
    } catch (error) {
      console.error(`Erro ao buscar notícias por categoria em ${idioma}:`, error);
      return [];
    }
  };
  
  // Buscar notícias por termo
  const buscarPorTermo = async (idioma, termo, categoriaPreDefinida = null) => {
    try {
      // Endpoint da API com termo de busca específico
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=${idioma}&q=${encodeURIComponent(termo)}&size=100`;
      
      console.log(`Buscando notícias por termo "${termo}" em ${idioma}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na API (${idioma}): ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success' && data.results && data.results.length > 0) {
        return categorizarNoticias(data.results, idioma, categoriaPreDefinida);
      }
      
      return [];
    } catch (error) {
      console.error(`Erro ao buscar notícias por termo em ${idioma}:`, error);
      return [];
    }
  };
  
  // Buscar notícias por domínio
  const buscarPorDominio = async (dominio) => {
    try {
      // Endpoint da API com domínio específico
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&domain=${dominio}&size=100`;
      
      console.log(`Buscando notícias do domínio: ${dominio}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na API (domínio ${dominio}): ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success' && data.results && data.results.length > 0) {
        // Determinar o idioma com base no domínio
        const idioma = dominio.endsWith('.br') || dominio.includes('globo') || dominio.includes('uol') ? 'pt' : 'en';
        return categorizarNoticias(data.results, idioma);
      }
      
      return [];
    } catch (error) {
      console.error(`Erro ao buscar notícias do domínio ${dominio}:`, error);
      return [];
    }
  };
  
  // Função para categorizar notícias
  const categorizarNoticias = (noticias, idioma, categoriaPreDefinida = null) => {
    return noticias.map(noticia => {
      // Se a categoria já foi predefinida, usar ela
      if (categoriaPreDefinida) {
        return {
          ...noticia,
          categoria: categoriaPreDefinida,
          idioma
        };
      }
      
      const titulo = noticia.title ? noticia.title.toLowerCase() : '';
      const descricao = noticia.description ? noticia.description.toLowerCase() : '';
      const conteudo = `${titulo} ${descricao}`;
      
      // Iniciar com categoria "outros"
      let categoria = 'outros';
      
      // Verificar categorias em ordem específica para classificar melhor
      
      // 1. Verificar cybersegurança
      const palavrasChaveCyber = idioma === 'pt' 
        ? ['cyber', 'segurança', 'hack', 'invasão', 'ataque', 'vulnerabilidade', 'phishing', 'malware', 
           'vírus', 'ransomware', 'criptografia', 'privacidade', 'dados', 'vazamento', 'proteção']
        : ['cyber', 'security', 'hack', 'breach', 'attack', 'vulnerability', 'phishing', 'malware', 
           'virus', 'ransomware', 'encryption', 'privacy', 'data', 'leak', 'protection'];
      
      if (palavrasChaveCyber.some(palavra => conteudo.includes(palavra))) {
        categoria = 'cyberseguranca';
      }
      
      // 2. Verificar IA
      const palavrasChaveIA = idioma === 'pt'
        ? ['inteligência artificial', 'ia', 'machine learning', 'aprendizado de máquina', 'algoritmo', 
           'chatgpt', 'gpt', 'robot', 'neural', 'automação']
        : ['artificial intelligence', 'ai', 'machine learning', 'algorithm', 'chatgpt', 'gpt', 
           'robot', 'neural', 'automation'];
      
      if (palavrasChaveIA.some(palavra => conteudo.includes(palavra))) {
        categoria = 'ia';
      }
      
      // 3. Verificar inovação
      const palavrasChaveInovacao = idioma === 'pt'
        ? ['inovação', 'disruptivo', 'transformação digital', 'startup', 'empreendedorismo', 
           'futuro', 'tendências', 'revolucionário', 'pioneiro']
        : ['innovation', 'disruptive', 'digital transformation', 'startup', 'entrepreneurship', 
           'future', 'trends', 'revolutionary', 'pioneering'];
      
      if (palavrasChaveInovacao.some(palavra => conteudo.includes(palavra))) {
        categoria = 'inovacao';
      }
      
      return {
        ...noticia,
        categoria,
        idioma
      };
    });
  };
  
  // Função para verificar e corrigir URLs de imagens
  const obterImagemValida = (noticia) => {
    // Se não tiver imagem, retornar null
    if (!noticia.image_url) {
      return null;
    }

    let url = noticia.image_url;
    
    // Verificar se a URL é válida (tem protocolo http ou https)
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Adicionar https:// às URLs sem protocolo
      url = 'https://' + url;
    }
    
    // Verificar se a URL contém extensões de imagem comuns
    const extensoesImagem = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const temExtensaoImagem = extensoesImagem.some(ext => url.toLowerCase().includes(ext));
    
    // Se não tiver extensão de imagem conhecida, retornar uma imagem baseada na categoria
    if (!temExtensaoImagem) {
      // Imagens do Unsplash para cada categoria
      const imagensPorCategoria = {
        cyberseguranca: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=400&h=200&auto=format&fit=crop',
        ia: 'https://images.unsplash.com/photo-1677442135737-d50248243cc4?q=80&w=400&h=200&auto=format&fit=crop',
        inovacao: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&h=200&auto=format&fit=crop',
        outros: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&h=200&auto=format&fit=crop'
      };
      
      return imagensPorCategoria[noticia.categoria] || imagensPorCategoria.outros;
    }
    
    return url;
  };
  
  // Usar notícias estáticas se necessário
  const usarNoticiasStaticas = () => {
    console.log("Usando notícias estáticas");
    
    // 30+ Notícias estáticas de tecnologia
    const noticiasTecnologia = [
      // Notícias em português
      {
        article_id: 'static-pt-1',
        title: 'Hackers exploram nova vulnerabilidade em sistemas Windows para ataques ransomware',
        description: 'Especialistas em cibersegurança alertam sobre uma falha crítica no Windows que está sendo explorada para distribuir ransomware. A Microsoft já disponibilizou patches de segurança e recomenda atualização imediata.',
        link: 'https://www.microsoft.com/security',
        image_url: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Microsoft Security',
        categoria: 'cyberseguranca',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-2',
        title: 'Pesquisadores brasileiros desenvolvem novo modelo de IA para detecção precoce de fraudes bancárias',
        description: 'Um grupo de pesquisadores de universidades brasileiras criou um sistema baseado em inteligência artificial capaz de identificar tentativas de fraude em tempo real, reduzindo em até 78% os golpes no sistema bancário.',
        link: 'https://www.gov.br/mcti/pt-br',
        image_url: 'https://images.unsplash.com/photo-1677442135737-d50248243cc4?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'MCTI Brasil',
        categoria: 'ia',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-3',
        title: 'Startup brasileira cria tecnologia que transforma poluição do ar em tinta para impressoras',
        description: 'A inovação captura a fuligem da poluição atmosférica e a transforma em nanopigmentos para fabricação de tintas sustentáveis, ajudando tanto a limpar o ar quanto a reduzir o uso de materiais sintéticos na indústria gráfica.',
        link: 'https://startupbrasil.org.br',
        image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Startup Brasil',
        categoria: 'inovacao',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-4',
        title: 'Brasil avança no desenvolvimento de estratégia nacional para IA ética e responsável',
        description: 'O governo brasileiro apresentou o mais recente avanço na estratégia nacional de inteligência artificial, com foco em diretrizes éticas, governança de dados e investimentos em pesquisa e desenvolvimento.',
        link: 'https://www.gov.br/mcti/pt-br',
        image_url: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Portal Brasil',
        categoria: 'ia',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-5',
        title: 'Novo ataque de engenharia social usa IA para criar deepfakes de chamadas telefônicas',
        description: 'Criminosos estão utilizando inteligência artificial para criar vozes sintéticas de pessoas conhecidas das vítimas em ligações telefônicas, solicitando transferências bancárias ou informações sensíveis.',
        link: 'https://www.cert.br/',
        image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'CERT.br',
        categoria: 'cyberseguranca',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-6',
        title: 'Empresas brasileiras adotam zero-trust como estratégia de cibersegurança',
        description: 'Grandes corporações no Brasil estão implementando a arquitetura zero-trust para proteger seus sistemas. A abordagem, que não confia em nenhum usuário por padrão, reduziu incidentes de segurança em 65% nas empresas adotantes.',
        link: 'https://nic.br/noticia/',
        image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'NIC.br',
        categoria: 'cyberseguranca',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-7',
        title: 'Nova tecnologia de bateria promete smartphones com duas semanas de duração',
        description: 'Pesquisadores brasileiros desenvolveram um novo tipo de bateria utilizando materiais sustentáveis que pode revolucionar o mercado de dispositivos móveis, oferecendo muito mais autonomia e vida útil prolongada.',
        link: 'https://tecmundo.com.br',
        image_url: 'https://images.unsplash.com/photo-1530968033775-2c92736b131e?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'TecMundo',
        categoria: 'inovacao',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-8',
        title: 'Universidades brasileiras criam consórcio para pesquisa em computação quântica',
        description: 'Cinco das principais universidades do país uniram forças para desenvolver o primeiro computador quântico brasileiro, com investimento de R$ 150 milhões e parcerias com empresas de tecnologia.',
        link: 'https://agencia.usp.br',
        image_url: 'https://images.unsplash.com/photo-1569396116180-210c182bedb8?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'USP',
        categoria: 'inovacao',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-9',
        title: 'Novo algoritmo de IA detecta depressão através da análise da voz com 93% de precisão',
        description: 'Sistema desenvolvido por cientistas brasileiros analisa padrões sutis na fala para identificar sinais de depressão, permitindo diagnóstico precoce e intervenção mais rápida em casos de saúde mental.',
        link: 'https://canaltech.com.br',
        image_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Canaltech',
        categoria: 'ia',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-10',
        title: 'Brasil lidera adoção de Pix na América Latina e inspira sistemas similares em outros países',
        description: 'O sistema de pagamentos instantâneos brasileiro se tornou referência mundial e está sendo estudado por diversos países que buscam modernizar seus sistemas financeiros.',
        link: 'https://valor.globo.com',
        image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Valor Econômico',
        categoria: 'inovacao',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-11',
        title: 'Cientistas brasileiros criam material semicondutor a partir de resíduos da indústria têxtil',
        description: 'Pesquisadores conseguiram transformar fibras têxteis descartadas em componentes semicondutores de baixo custo, abrindo caminho para eletrônicos mais sustentáveis e acessíveis.',
        link: 'https://revistapesquisa.fapesp.br',
        image_url: 'https://images.unsplash.com/photo-1635403173561-d39dec3f3982?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Revista Pesquisa FAPESP',
        categoria: 'inovacao',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-12',
        title: 'Empresa brasileira desenvolve robô para inspeção de painéis solares usando IA',
        description: 'O sistema autônomo utiliza inteligência artificial para identificar falhas em painéis solares, aumentando a eficiência energética e reduzindo custos de manutenção em usinas fotovoltaicas.',
        link: 'https://www.canalenergia.com.br',
        image_url: 'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Canal Energia',
        categoria: 'ia',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-13',
        title: 'Governo brasileiro lança programa de incentivo à fabricação de semicondutores',
        description: 'Nova política industrial prevê incentivos fiscais e financiamento para empresas que produzirem chips no Brasil, com objetivo de reduzir dependência externa e desenvolver tecnologia nacional.',
        link: 'https://www.gov.br/economia',
        image_url: 'https://images.unsplash.com/photo-1555589228-935f24ac1aa9?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Ministério da Economia',
        categoria: 'inovacao',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-14',
        title: 'Nova técnica de cibersegurança usa algoritmos quânticos para proteção de dados',
        description: 'Pesquisadores desenvolveram um método revolucionário de criptografia baseado em princípios da física quântica, prometendo tornar impossível a violação de dados mesmo com supercomputadores avançados.',
        link: 'https://olhardigital.com.br',
        image_url: 'https://images.unsplash.com/photo-1614064548016-0b5c13ca2c85?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Olhar Digital',
        categoria: 'cyberseguranca',
        idioma: 'pt'
      },
      {
        article_id: 'static-pt-15',
        title: 'Fabricante nacional lança smartphone com bateria que dura até 7 dias',
        description: 'Empresa brasileira desenvolveu tecnologia própria de otimização energética que permite uso intenso do aparelho por uma semana inteira sem necessidade de recarga.',
        link: 'https://www.techtudo.com.br',
        image_url: 'https://images.unsplash.com/photo-1592898741947-bc9f6acd2553?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'TechTudo',
        categoria: 'inovacao',
        idioma: 'pt'
      },
      // Notícias em inglês
      {
        article_id: 'static-en-1',
        title: 'New AI Model Breaks Records in Autonomous Driving Tests',
        description: 'Researchers have developed a new AI system that outperforms human drivers in complex traffic scenarios, bringing fully autonomous vehicles one step closer to widespread adoption.',
        link: 'https://www.mit.edu/',
        image_url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'MIT Technology Review',
        categoria: 'ia',
        idioma: 'en'
      },
      {
        article_id: 'static-en-2',
        title: 'Major Cybersecurity Vulnerability Discovered in Popular IoT Devices',
        description: 'Security researchers have uncovered a critical flaw affecting millions of IoT devices worldwide. The vulnerability could allow attackers to gain complete control over smart home systems and industrial equipment.',
        link: 'https://www.wired.com/',
        image_url: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Wired',
        categoria: 'cyberseguranca',
        idioma: 'en'
      },
      {
        article_id: 'static-en-3',
        title: 'New Quantum-Resistant Encryption Standards Finalized',
        description: 'NIST has announced the completion of new cryptographic standards designed to withstand attacks from quantum computers, ensuring data security in the post-quantum era.',
        link: 'https://www.nist.gov/',
        image_url: 'https://images.unsplash.com/photo-1569396116180-210c182bedb8?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'NIST',
        categoria: 'cyberseguranca',
        idioma: 'en'
      },
      {
        article_id: 'static-en-4',
        title: 'AI System Detects Early Signs of Dementia from Voice Patterns',
        description: 'A groundbreaking AI tool can now identify early indicators of cognitive decline by analyzing subtle changes in speech patterns, potentially enabling earlier intervention for Alzheimer\'s disease.',
        link: 'https://www.nature.com/',
        image_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Nature',
        categoria: 'ia',
        idioma: 'en'
      },
      {
        article_id: 'static-en-5',
        title: 'AI-Powered Cybersecurity Platform Blocks Record Number of Zero-Day Attacks',
        description: 'A new security solution combining advanced machine learning with threat intelligence has successfully prevented multiple previously unknown vulnerabilities from being exploited in the wild.',
        link: 'https://www.darkreading.com/',
        image_url: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Dark Reading',
        categoria: 'cyberseguranca',
        idioma: 'en'
      },
      {
        article_id: 'static-en-6',
        title: 'New International AI Safety Agreement Signed by Major Tech Companies',
        description: 'Leading technology corporations have committed to a global framework for responsible AI development, focusing on transparency, security, and human rights protections.',
        link: 'https://www.theverge.com/',
        image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'The Verge',
        categoria: 'ia',
        idioma: 'en'
      },
      {
        article_id: 'static-en-7',
        title: 'Revolutionary Microchip Design Doubles Computing Power While Halving Energy Use',
        description: 'Engineers have created a new processor architecture that dramatically improves performance and efficiency, potentially extending battery life in mobile devices and reducing power consumption in data centers.',
        link: 'https://spectrum.ieee.org/',
        image_url: 'https://images.unsplash.com/photo-1555589228-935f24ac1aa9?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'IEEE Spectrum',
        categoria: 'inovacao',
        idioma: 'en'
      },
      {
        article_id: 'static-en-8',
        title: 'New Satellite Network Will Provide Global High-Speed Internet Access',
        description: 'The recently launched constellation of low Earth orbit satellites aims to provide high-speed internet connectivity to even the most remote regions of the planet, potentially connecting billions of currently unserved users.',
        link: 'https://www.space.com/',
        image_url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Space.com',
        categoria: 'inovacao',
        idioma: 'en'
      },
      {
        article_id: 'static-en-9',
        title: 'Scientists Develop Self-Healing Electronics That Can Repair Damaged Circuits',
        description: 'A breakthrough in materials science has produced electronics with the ability to automatically repair physical damage, potentially extending the lifespan of devices and reducing electronic waste.',
        link: 'https://www.sciencedaily.com/',
        image_url: 'https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Science Daily',
        categoria: 'inovacao',
        idioma: 'en'
      },
      {
        article_id: 'static-en-10',
        title: 'Tech Giants Invest $2 Billion in Sustainable Data Center Initiative',
        description: 'Leading technology companies have announced a joint investment to develop carbon-neutral data centers powered entirely by renewable energy, aiming to drastically reduce the environmental impact of cloud computing.',
        link: 'https://www.techcrunch.com/',
        image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'TechCrunch',
        categoria: 'inovacao',
        idioma: 'en'
      },
      {
        article_id: 'static-en-11',
        title: 'New Biometric Security System Uses Unique Brain Patterns for Authentication',
        description: 'Researchers have developed a security system that identifies users based on their unique brainwave patterns, creating what they claim is the most secure biometric authentication method to date.',
        link: 'https://www.zdnet.com/',
        image_url: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'ZDNet',
        categoria: 'cyberseguranca',
        idioma: 'en'
      },
      {
        article_id: 'static-en-12',
        title: 'Game-Changing Battery Technology Promises Electric Vehicles with 1,000-Mile Range',
        description: 'A startup has unveiled a new solid-state battery technology that could revolutionize electric vehicles, offering unprecedented range while reducing charging time to just 10 minutes.',
        link: 'https://www.cnet.com/',
        image_url: 'https://images.unsplash.com/photo-1593941707882-a5bba53b5999?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'CNET',
        categoria: 'inovacao',
        idioma: 'en'
      },
      {
        article_id: 'static-en-13',
        title: 'AI Algorithm Discovered Novel Antibiotic That Kills Drug-Resistant Bacteria',
        description: 'Scientists using artificial intelligence have identified a powerful new antibiotic compound effective against bacteria that have developed resistance to all existing antibiotics, potentially saving millions of lives.',
        link: 'https://www.sciencemag.org/',
        image_url: 'https://images.unsplash.com/photo-1583912267640-3e5985cf0ef3?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Science Magazine',
        categoria: 'ia',
        idioma: 'en'
      },
      {
        article_id: 'static-en-14',
        title: 'New Holographic Display Creates 3D Images Without Special Glasses',
        description: 'Engineers have developed an affordable holographic display technology that can project realistic three-dimensional images visible from any angle without requiring viewers to wear specialized glasses.',
        link: 'https://www.engadget.com/',
        image_url: 'https://images.unsplash.com/photo-1617802690658-7193e4f1d4d3?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'Engadget',
        categoria: 'inovacao',
        idioma: 'en'
      },
      {
        article_id: 'static-en-15',
        title: 'Researchers Create Digital Memory System Inspired by Human Brain',
        description: 'A team of neuroscientists and computer engineers has developed a new memory storage system that mimics how the human brain processes and stores information, promising massive improvements in computing efficiency.',
        link: 'https://www.technologyreview.com/',
        image_url: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=400&h=200&auto=format&fit=crop',
        pubDate: new Date().toISOString(),
        source_id: 'MIT Technology Review',
        categoria: 'ia',
        idioma: 'en'
      }
    ];
    
    setNoticias(noticiasTecnologia);
    setFilteredNoticias(filtrarNoticiasPorCategoria(noticiasTecnologia, filtroAtivo, idiomaAtivo));
    setUsandoNoticiasStaticas(true);
  };
  
  useEffect(() => {
    fetchNoticias();
  }, [fetchNoticias]);
  
  // Função para filtrar notícias por categoria e idioma
  const filtrarNoticiasPorCategoria = (noticias, categoriaFiltro, idiomaFiltro) => {
    let resultado = [...noticias];
    
    // Filtrar por categoria
    if (categoriaFiltro !== 'todos') {
      resultado = resultado.filter(noticia => noticia.categoria === categoriaFiltro);
    }
    
    // Filtrar por idioma
    if (idiomaFiltro !== 'todos') {
      resultado = resultado.filter(noticia => noticia.idioma === idiomaFiltro);
    }
    
    return resultado;
  };
  
  // Handler para mudar o filtro de categoria
  const handleCategoriaChange = (categoria) => {
    setFiltroAtivo(categoria);
    setFilteredNoticias(filtrarNoticiasPorCategoria(noticias, categoria, idiomaAtivo));
    setPagina(1);
  };
  
  // Handler para mudar o filtro de idioma
  const handleIdiomaChange = (idioma) => {
    setIdiomaAtivo(idioma);
    setFilteredNoticias(filtrarNoticiasPorCategoria(noticias, filtroAtivo, idioma));
    setPagina(1);
  };
  
  // Função para formatar a data
  const formatarData = (dataString) => {
    if (!dataString) return '';
    
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dataString;
    }
  };
  
  // Calcular número total de páginas
  const totalPaginas = Math.ceil(filteredNoticias.length / noticiasPorPagina) || 1;
  
  // Obter notícias da página atual
  const noticiasDaPagina = filteredNoticias.slice(
    (pagina - 1) * noticiasPorPagina,
    pagina * noticiasPorPagina
  );
  
  // Extrair o nome do domínio de uma URL
  const extrairDominio = (url) => {
    try {
      if (!url) return '';
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return '';
    }
  };
  
  // Navegar para próxima página
  const proximaPagina = () => {
    if (pagina < totalPaginas) {
      setPagina(pagina + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Navegar para página anterior
  const paginaAnterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Obter o ícone adequado para a categoria
  const obterIconeCategoria = (categoria) => {
    switch (categoria) {
      case 'cyberseguranca':
        return <AiOutlineSafety />;
      case 'ia':
        return <TbBrain />;
      case 'inovacao':
        return <MdOutlineSmartToy />;
      default:
        return <TbDeviceDesktop />;
    }
  };
  
  // Obter nome adequado para a categoria
  const obterNomeCategoria = (categoria) => {
    switch (categoria) {
      case 'cyberseguranca':
        return 'Cibersegurança';
      case 'ia':
        return 'Inteligência Artificial';
      case 'inovacao':
        return 'Inovação Tech';
      default:
        return 'Tecnologia';
    }
  };
  
  return (
    <div className="noticias-container">
      <header className="noticias-header">
        <div className="header-content">
          <h1>Notícias de Tecnologia</h1>
          <div className="subtitulo-grupo">
            <h2>Cybersegurança, IA e Inovação</h2>
            <button 
              className={`atualizar-btn ${atualizando ? 'loading' : ''}`}
              onClick={fetchNoticias}
              disabled={atualizando}
              title="Atualizar notícias"
            >
              <FiRefreshCw className={atualizando ? 'girando' : ''} />
              {atualizando ? 'Atualizando...' : 'Atualizar'}
            </button>
          </div>
        </div>
      </header>
      
      <div className="filtros-section">
        <div className="filtros-row">
          <h3 className="filtros-titulo">Categorias:</h3>
          <div className="filtros-container categoria">
            {categorias.map(categoria => (
              <button 
                key={categoria.id}
                className={`filtro-btn ${categoria.id === 'cyberseguranca' ? 'cyber' : 
                           categoria.id === 'ia' ? 'ia' : 
                           categoria.id === 'inovacao' ? 'inovacao' : ''} 
                           ${filtroAtivo === categoria.id ? 'ativo' : ''}`}
                onClick={() => handleCategoriaChange(categoria.id)}
              >
                <span className="filtro-icon">{categoria.icone}</span>
                {categoria.nome}
              </button>
            ))}
          </div>
        </div>
        
        <div className="filtros-row">
          <h3 className="filtros-titulo">Idiomas:</h3>
          <div className="filtros-container idioma">
            <button 
              className={`filtro-btn idioma ${idiomaAtivo === 'todos' ? 'ativo' : ''}`}
              onClick={() => handleIdiomaChange('todos')}
            >
              <FiGlobe /> Todos
            </button>
            <button 
              className={`filtro-btn idioma ${idiomaAtivo === 'pt' ? 'ativo' : ''}`}
              onClick={() => handleIdiomaChange('pt')}
            >
              🇧🇷 Português
            </button>
            <button 
              className={`filtro-btn idioma ${idiomaAtivo === 'en' ? 'ativo' : ''}`}
              onClick={() => handleIdiomaChange('en')}
            >
              🇺🇸 Inglês
            </button>
          </div>
        </div>
      </div>
      
      {usandoNoticiasStaticas && (
        <div className="aviso-estatico">
          <p>
            <FiRefreshCw className="aviso-icon" /> 
            Exibindo informações de notícias de tecnologia pré-carregadas.
            <button onClick={fetchNoticias} className="tentar-novamente-btn">
              Tentar buscar notícias atuais
            </button>
          </p>
        </div>
      )}
      
      {filteredNoticias.length > 0 && (
        <div className="resultados-info">
          <p>{filteredNoticias.length} notícias encontradas • Página {pagina} de {totalPaginas || 1}</p>
        </div>
      )}
      
      {loading && !atualizando && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando notícias...</p>
        </div>
      )}
      
      {error && !usandoNoticiasStaticas && (
        <div className="error">
          <p>Ocorreu um erro ao carregar as notícias: {error}</p>
          <p>Por favor, tente novamente mais tarde.</p>
          <button className="retry-btn" onClick={fetchNoticias}>
            Tentar novamente
          </button>
        </div>
      )}
      
      {!loading && !error && filteredNoticias.length === 0 && (
        <div className="no-news">
          <p>Nenhuma notícia encontrada com os filtros atuais.</p>
          <p>Tente selecionar outros filtros ou atualize a página.</p>
          <button className="retry-btn" onClick={fetchNoticias}>
            Atualizar
          </button>
        </div>
      )}
      
      <div className="noticias-grid">
        {noticiasDaPagina.map((noticia) => (
          <div key={noticia.article_id || noticia.link} className={`noticia-card ${noticia.categoria}`} data-idioma={noticia.idioma}>
            <div className="noticia-badge-container">
              <div className="noticia-badge">
                <span className={`badge ${noticia.categoria}`}>
                  {obterIconeCategoria(noticia.categoria)} {obterNomeCategoria(noticia.categoria)}
                </span>
              </div>
              
              <div className="idioma-badge">
                {noticia.idioma === 'pt' ? '🇧🇷' : '🇺🇸'}
              </div>
            </div>
            
            <div className={`noticia-imagem ${!noticia.image_url ? 'sem-imagem' : ''}`}>
              {obterImagemValida(noticia) ? (
                <img 
                  src={obterImagemValida(noticia)} 
                  alt={noticia.title || 'Imagem da notícia'}
                  onError={(e) => {
                    console.log(`Erro ao carregar imagem: ${noticia.image_url}`);
                    e.target.onerror = null; // Evita loop infinito
                    
                    // Usar uma imagem de placeholder de acordo com a categoria
                    const imagensPorCategoria = {
                      cyberseguranca: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=400&h=200&auto=format&fit=crop',
                      ia: 'https://images.unsplash.com/photo-1677442135737-d50248243cc4?q=80&w=400&h=200&auto=format&fit=crop',
                      inovacao: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&h=200&auto=format&fit=crop',
                      outros: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&h=200&auto=format&fit=crop'
                    };
                    
                    e.target.src = imagensPorCategoria[noticia.categoria] || imagensPorCategoria.outros;
                  }}
                  loading="lazy"
                />
              ) : (
                <div className="placeholder-img">
                  {obterIconeCategoria(noticia.categoria)}
                </div>
              )}
            </div>
            
            <div className="noticia-conteudo">
              <h3 className="noticia-titulo">{noticia.title}</h3>
              
              <div className="noticia-meta">
                <span className="noticia-fonte">
                  {noticia.source_id || extrairDominio(noticia.link)}
                </span>
                <span className="noticia-data">
                  <FiClock className="icon-relogio" />
                  {formatarData(noticia.pubDate)}
                </span>
              </div>
              
              <p className="noticia-descricao">
                {noticia.description 
                  ? noticia.description.length > 200 
                    ? `${noticia.description.substring(0, 200)}...` 
                    : noticia.description
                  : 'Descrição não disponível para esta notícia.'
                }
              </p>
              
              <a 
                href={noticia.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="noticia-link"
              >
                {noticia.idioma === 'pt' ? 'Ler notícia completa' : 'Read full article'} <FiExternalLink />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {totalPaginas > 1 && filteredNoticias.length > 0 && (
        <div className="paginacao">
          <button 
            className="pagina-btn anterior" 
            onClick={paginaAnterior}
            disabled={pagina === 1}
          >
            &larr; Anterior
          </button>
          
          <div className="pagina-numeros">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`pagina-numero ${pagina === num ? 'ativo' : ''}`}
                onClick={() => {
                  setPagina(num);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {num}
              </button>
            ))}
          </div>
          
          <button 
            className="pagina-btn proximo" 
            onClick={proximaPagina}
            disabled={pagina === totalPaginas}
          >
            Próximo &rarr;
          </button>
        </div>
      )}
      
      <footer className="noticias-footer">
        <p className="atribuicao">
          {usandoNoticiasStaticas 
            ? 'Notícias de tecnologia pré-carregadas • Atualize para buscar conteúdo atual'
            : `Notícias fornecidas por NewsData.io • Atualizado em: ${new Date().toLocaleString('pt-BR')}`}
        </p>
      </footer>
    </div>
  );
}

export default Noticias;