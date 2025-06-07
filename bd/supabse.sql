-- ============================================
-- SCRIPT COMPLETO PARA RESET E CONFIGURAÇÃO
-- ============================================

-- Remover tabelas existentes (se existirem)
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS news CASCADE;

-- Remover bucket de storage se existir
DELETE FROM storage.objects WHERE bucket_id = 'avatars';
DELETE FROM storage.buckets WHERE id = 'avatars';

-- ============================================
-- CRIAR TABELAS
-- ============================================

-- Tabela de usuários admin
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  email VARCHAR(100),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Tabela de membros da equipe
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  description TEXT,
  photo_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  github_url VARCHAR(500),
  instagram_url VARCHAR(500),
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de documentos
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_size VARCHAR(50),
  pages INTEGER,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de aplicativos
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  version VARCHAR(50) NOT NULL,
  icon VARCHAR(10) DEFAULT '📱',
  download_url VARCHAR(500) NOT NULL,
  size VARCHAR(50) NOT NULL,
  category VARCHAR(100) NOT NULL,
  features TEXT[],
  requirements JSONB,
  installation_steps TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de notícias
CREATE TABLE news (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image_url TEXT,
    author VARCHAR(100) DEFAULT 'Admin',
    category VARCHAR(50) DEFAULT 'Geral',
    published BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CONFIGURAR STORAGE
-- ============================================

-- Criar bucket para avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'avatars', 
  'avatars', 
  true, 
  1048576, -- 1MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
);

-- ============================================
-- CONFIGURAR RLS (Row Level Security)
-- ============================================

-- Habilitar RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Políticas para team_members
CREATE POLICY "Allow public read access" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users all access" ON team_members FOR ALL USING (true);

-- Políticas para documents
CREATE POLICY "Allow public read access" ON documents FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users all access" ON documents FOR ALL USING (true);

-- Políticas para applications
CREATE POLICY "Allow public read access" ON applications FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users all access" ON applications FOR ALL USING (true);

-- Políticas para news
CREATE POLICY "Enable read access for published news" ON news FOR SELECT USING (published = true);
CREATE POLICY "Enable all for authenticated users" ON news FOR ALL USING (true);

-- Políticas de Storage para avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Anyone can upload an avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars');
CREATE POLICY "Anyone can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars');
CREATE POLICY "Anyone can delete avatars" ON storage.objects FOR DELETE USING (bucket_id = 'avatars');

-- ============================================
-- INSERIR DADOS INICIAIS
-- ============================================

-- Inserir usuários admin
INSERT INTO admin_users (username, password_hash, full_name, email) VALUES 
('admin', 'admin123', 'Administrador do Sistema', 'admin@ltd.gov.br'),
('editor', 'editor123', 'Editor de Conteúdo', 'editor@ltd.gov.br');

-- Inserir membros da equipe
INSERT INTO team_members (name, role, description, photo_url, linkedin_url, github_url, instagram_url, order_position) VALUES
(
  'Ana Silva', 
  'Tech Lead & Full Stack Developer', 
  'Especialista em React e Node.js, lidera o desenvolvimento de aplicações web modernas para o setor público. Responsável pela arquitetura e implementação dos principais sistemas do LTD.',
  'https://ui-avatars.com/api/?name=Ana+Silva&background=4158d0&color=fff&size=200&bold=true',
  'https://linkedin.com/in/ana-silva',
  'https://github.com/ana-silva',
  'https://instagram.com/ana.silva.dev',
  1
),
(
  'Carlos Santos',
  'Especialista em Cibersegurança',
  'Expert em segurança da informação com certificações em ethical hacking. Desenvolve ferramentas de proteção e treinamentos de conscientização para as prefeituras parceiras.',
  'https://ui-avatars.com/api/?name=Carlos+Santos&background=e74c3c&color=fff&size=200&bold=true',
  'https://linkedin.com/in/carlos-santos',
  'https://github.com/carlos-santos',
  'https://instagram.com/carlos.cyber',
  2
),
(
  'Maria Oliveira',
  'Cientista de Dados & IA',
  'Especialista em Machine Learning e análise de dados governamentais. Desenvolve algoritmos inteligentes para otimização de processos públicos e análise preditiva.',
  'https://ui-avatars.com/api/?name=Maria+Oliveira&background=9b59b6&color=fff&size=200&bold=true',
  'https://linkedin.com/in/maria-oliveira',
  'https://github.com/maria-oliveira',
  'https://instagram.com/maria.ai',
  3
),
(
  'João Costa',
  'DevOps Engineer',
  'Responsável pela infraestrutura em nuvem e automação de deployments. Garante a escalabilidade e confiabilidade dos sistemas desenvolvidos pelo laboratório.',
  'https://ui-avatars.com/api/?name=João+Costa&background=27ae60&color=fff&size=200&bold=true',
  'https://linkedin.com/in/joao-costa',
  'https://github.com/joao-costa',
  'https://instagram.com/joao.devops',
  4
),
(
  'Lucia Fernandes',
  'UX/UI Designer',
  'Designer focada em experiência do usuário para o setor público. Cria interfaces intuitivas e acessíveis que facilitam a interação dos cidadãos com os serviços digitais.',
  'https://ui-avatars.com/api/?name=Lucia+Fernandes&background=f39c12&color=fff&size=200&bold=true',
  'https://linkedin.com/in/lucia-fernandes',
  'https://github.com/lucia-fernandes',
  'https://instagram.com/lucia.design',
  5
),
(
  'Rafael Almeida',
  'Mobile Developer',
  'Desenvolvedor especializado em aplicações móveis nativas e híbridas. Responsável pela criação de apps que levam os serviços públicos para os smartphones dos cidadãos.',
  'https://ui-avatars.com/api/?name=Rafael+Almeida&background=3498db&color=fff&size=200&bold=true',
  'https://linkedin.com/in/rafael-almeida',
  'https://github.com/rafael-almeida',
  'https://instagram.com/rafael.mobile',
  6
),
(
  'Camila Rodrigues',
  'Product Manager',
  'Gerente de produtos com foco em soluções governamentais. Coordena o desenvolvimento de features e garante que as necessidades dos usuários finais sejam atendidas.',
  'https://ui-avatars.com/api/?name=Camila+Rodrigues&background=e67e22&color=fff&size=200&bold=true',
  'https://linkedin.com/in/camila-rodrigues',
  'https://github.com/camila-rodrigues',
  'https://instagram.com/camila.pm',
  7
);

-- Inserir aplicativos
INSERT INTO applications (name, description, version, icon, download_url, size, category, features, requirements, installation_steps) VALUES
(
  'Gerador de Currículo Inteligente',
  'Assistente interativo com interface futurista que ajuda na criação de currículos profissionais através de uma experiência de chatbot guiada. Inclui templates modernos e exportação em PDF.',
  '2.0.0',
  '📄',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.0.0/geradorcurriculo.exe',
  '48.78 MB',
  'Desenvolvimento de Software',
  ARRAY[
    'Interface de chatbot interativo',
    'Templates profissionais modernos',
    'Exportação em PDF de alta qualidade',
    'Salvamento automático de progresso',
    'Design responsivo e futurista',
    'Validação de dados em tempo real'
  ],
  '{"os": "Windows 10 ou superior", "ram": "4 GB de RAM", "disk": "100 MB de espaço livre", "dotnet": ".NET Framework 4.8 ou superior"}',
  ARRAY[
    'Baixe o arquivo executável',
    'Execute como administrador se necessário',
    'Siga o assistente de instalação',
    'Aceite os termos de uso',
    'Configure as preferências iniciais'
  ]
),
(
  'Gerador de Senhas Seguras',
  'Ferramenta profissional para geração de senhas com alta entropia criptográfica seguindo padrões NIST. Inclui verificação de força e detecção de senhas comprometidas.',
  '1.5.3',
  '🔐',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v1.5.3/password-generator.exe',
  '15.22 MB',
  'Cyber Segurança',
  ARRAY[
    'Geração baseada em criptografia segura',
    'Verificação de força de senha',
    'Detecção de senhas vazadas',
    'Múltiplos tipos de caracteres',
    'Histórico de senhas geradas',
    'Interface intuitiva e moderna'
  ],
  '{"os": "Windows 7 ou superior", "ram": "2 GB de RAM", "disk": "50 MB de espaço livre"}',
  ARRAY[
    'Baixe e execute o instalador',
    'Escolha o diretório de instalação',
    'Configure as opções de segurança',
    'Inicie o aplicativo'
  ]
),
(
  'Sistema de Segurança Digital Municipal',
  'Plataforma completa para verificação de senhas, detecção de vulnerabilidades e monitoramento de segurança em tempo real para prefeituras.',
  '3.1.0',
  '🛡️',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v3.1.0/security-system.msi',
  '127.45 MB',
  'Cyber Segurança',
  ARRAY[
    'Dashboard de segurança em tempo real',
    'Verificação automática de vulnerabilidades',
    'Relatórios de conformidade LGPD',
    'Sistema de alertas integrado',
    'Auditoria de senhas corporativas',
    'Backup automático de configurações'
  ],
  '{"os": "Windows Server 2016 ou superior", "ram": "8 GB de RAM", "disk": "500 MB de espaço livre", "network": "Conexão com internet"}',
  ARRAY[
    'Execute o instalador MSI',
    'Configure o banco de dados',
    'Defina as credenciais administrativas',
    'Configure as políticas de segurança',
    'Teste a conectividade',
    'Ative o monitoramento'
  ]
),
(
  'Simulador de Phishing Educacional',
  'Ferramenta educacional para treinamento de conscientização em segurança. Simula ataques de phishing em ambiente controlado para capacitação de servidores públicos.',
  '2.3.1',
  '🎯',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/releases/download/v2.3.1/phishing-simulator.exe',
  '89.67 MB',
  'Cyber Segurança',
  ARRAY[
    'Simulações realistas de phishing',
    'Relatórios detalhados de desempenho',
    'Templates educacionais variados',
    'Gamificação para engajamento',
    'Certificados de conclusão',
    'Dashboard administrativo'
  ],
  '{"os": "Windows 10 ou superior", "ram": "4 GB de RAM", "disk": "200 MB de espaço livre", "network": "Conexão com internet"}',
  ARRAY[
    'Instale através do executável',
    'Configure os parâmetros de simulação',
    'Cadastre os usuários participantes',
    'Defina os cenários de treinamento',
    'Inicie as campanhas educativas'
  ]
),
(
  'Neura AI Assistant',
  'Sistema desktop com interface moderna integrado à API Dify para assistência inteligente em tarefas administrativas municipais.',
  '1.2.0',
  '🤖',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/inteligencia-artificial/releases/download/v1.2.0/neura-ai.exe',
  '156.33 MB',
  'Inteligência Artificial',
  ARRAY[
    'Assistente IA conversacional',
    'Integração com APIs governamentais',
    'Processamento de linguagem natural',
    'Automatização de documentos',
    'Interface moderna e intuitiva',
    'Aprendizado contínuo personalizado'
  ],
  '{"os": "Windows 10 ou superior", "ram": "8 GB de RAM", "disk": "500 MB de espaço livre", "network": "Conexão estável com internet"}',
  ARRAY[
    'Execute o instalador',
    'Configure a chave da API',
    'Realize o setup inicial',
    'Treine o assistente com dados locais',
    'Configure as integrações necessárias'
  ]
),
(
  'Dashboard Financeiro Municipal',
  'Ferramenta interativa para visualização e análise de dados orçamentários municipais com gráficos dinâmicos e relatórios automatizados.',
  '4.0.2',
  '📊',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/analise-de-dados/releases/download/v4.0.2/financial-dashboard.exe',
  '203.78 MB',
  'Análise de Dados',
  ARRAY[
    'Dashboards interativos em tempo real',
    'Relatórios automáticos personalizáveis',
    'Análise preditiva de orçamento',
    'Integração com sistemas contábeis',
    'Alertas de desvios orçamentários',
    'Exportação para múltiplos formatos'
  ],
  '{"os": "Windows 10 ou superior", "ram": "8 GB de RAM", "disk": "1 GB de espaço livre", "database": "SQL Server ou PostgreSQL"}',
  ARRAY[
    'Instale o aplicativo principal',
    'Configure a conexão com banco de dados',
    'Importe os dados históricos',
    'Configure os dashboards personalizados',
    'Defina os alertas e relatórios automáticos'
  ]
),
(
  'Gerador de Ofícios Automatizado',
  'Sistema completo para criação automatizada de ofícios e documentos oficiais com controle de numeração e gestão de usuários.',
  '1.8.5',
  '📋',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v1.8.5/document-generator.exe',
  '67.45 MB',
  'Desenvolvimento de Software',
  ARRAY[
    'Templates de documentos oficiais',
    'Numeração automática sequencial',
    'Controle de acesso por usuário',
    'Assinatura digital integrada',
    'Histórico completo de documentos',
    'Backup automático diário'
  ],
  '{"os": "Windows 8.1 ou superior", "ram": "4 GB de RAM", "disk": "150 MB de espaço livre"}',
  ARRAY[
    'Execute o instalador',
    'Configure os usuários do sistema',
    'Defina os templates padrão',
    'Configure a numeração automática',
    'Teste a geração de documentos'
  ]
),
(
  'Encurtador de URLs Inteligente',
  'API avançada para encurtamento de URLs com análise por IA, estatísticas detalhadas e proteção contra links maliciosos.',
  '2.1.0',
  '🔗',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.1.0/url-shortener.exe',
  '34.56 MB',
  'Desenvolvimento de Software',
  ARRAY[
    'Encurtamento inteligente com IA',
    'Análise de segurança de URLs',
    'Estatísticas avançadas de cliques',
    'API REST para integração',
    'URLs personalizáveis',
    'Proteção contra spam e malware'
  ],
  '{"os": "Windows 10 ou superior", "ram": "4 GB de RAM", "disk": "100 MB de espaço livre", "network": "Conexão com internet"}',
  ARRAY[
    'Instale o servidor local',
    'Configure as APIs externas',
    'Defina as regras de segurança',
    'Teste as funcionalidades',
    'Configure o monitoramento'
  ]
),
(
  'Analisador de Dados Públicos',
  'Ferramenta para processamento e análise de grandes volumes de dados municipais com Machine Learning integrado.',
  '3.4.1',
  '🔍',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/analise-de-dados/releases/download/v3.4.1/data-analyzer.exe',
  '445.67 MB',
  'Análise de Dados',
  ARRAY[
    'Processamento de big data municipal',
    'Algoritmos de Machine Learning',
    'Visualizações interativas avançadas',
    'Relatórios automatizados',
    'Análise preditiva de tendências',
    'Integração com fontes de dados externas'
  ],
  '{"os": "Windows 10 ou superior", "ram": "16 GB de RAM", "disk": "2 GB de espaço livre", "cpu": "Processador quad-core ou superior"}',
  ARRAY[
    'Execute o instalador principal',
    'Configure as fontes de dados',
    'Instale os modelos de ML',
    'Configure os dashboards',
    'Realize os testes de performance',
    'Ative o processamento automático'
  ]
),
(
  'Sistema de Templates de E-mail',
  'Conjunto completo de templates personalizáveis para comunicação institucional com editor visual integrado.',
  '1.6.2',
  '📧',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v1.6.2/email-templates.exe',
  '78.91 MB',
  'Desenvolvimento de Software',
  ARRAY[
    'Editor visual drag-and-drop',
    'Templates responsivos pré-configurados',
    'Personalização de marca institucional',
    'Preview em tempo real',
    'Integração com serviços de e-mail',
    'Biblioteca de componentes reutilizáveis'
  ],
  '{"os": "Windows 10 ou superior", "ram": "4 GB de RAM", "disk": "200 MB de espaço livre"}',
  ARRAY[
    'Instale o editor de templates',
    'Configure a identidade visual',
    'Importe os templates base',
    'Personalize conforme necessário',
    'Teste o envio de e-mails'
  ]
);

-- Inserir documentos de exemplo
INSERT INTO documents (title, description, category, file_url, file_size, pages, tags) VALUES
(
  'Manual Completo de Cibersegurança Municipal',
  'Guia abrangente sobre implementação de práticas de segurança digital no setor público, incluindo políticas, procedimentos e melhores práticas.',
  'cybersecurity',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/raw/main/docs/manual_completo_ciberseguranca.pdf',
  '8.5 MB',
  78,
  ARRAY['cibersegurança', 'manual', 'políticas', 'setor público']
),
(
  'Checklist Mensal de Segurança da Informação',
  'Lista de verificação mensal para auditoria de segurança, incluindo validação de sistemas, verificação de backups e análise de logs.',
  'cybersecurity',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/raw/main/docs/checklist_mensal_seguranca.pdf',
  '2.3 MB',
  12,
  ARRAY['checklist', 'auditoria', 'segurança', 'mensal']
),
(
  'Guia Prático de Google Dorks para OSINT',
  'Manual técnico sobre Google Dorks aplicado à cibersegurança, incluindo técnicas de reconhecimento e OSINT.',
  'cybersecurity',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/raw/main/docs/google_dorks_osint.pdf',
  '5.8 MB',
  45,
  ARRAY['google dorks', 'OSINT', 'reconhecimento', 'ethical hacking']
),
(
  'Curso Completo de ChatGPT para Setor Público',
  'Material de treinamento completo sobre uso de IA generativa no setor público, incluindo casos de uso e boas práticas.',
  'ai',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/inteligencia-artificial/raw/main/docs/curso_chatgpt_publico.pdf',
  '12.4 MB',
  89,
  ARRAY['ChatGPT', 'IA', 'treinamento', 'setor público']
),
(
  'Guia de Implementação de IA no Governo',
  'Manual prático para implementação de soluções de inteligência artificial em órgãos públicos.',
  'ai',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/inteligencia-artificial/raw/main/docs/guia_ia_governo.pdf',
  '15.7 MB',
  156,
  ARRAY['inteligência artificial', 'implementação', 'governo', 'machine learning']
),
(
  'Manual de Tratamento de Dados Públicos',
  'Guia técnico para tratamento e análise de dados governamentais em conformidade com a LGPD.',
  'data',
  'https://github.com/LTD-2025-1-Cyber-Security-Project/analise-de-dados/raw/main/docs/tratamento_dados_publicos.pdf',
  '9.3 MB',
  67,
  ARRAY['LGPD', 'dados públicos', 'análise', 'conformidade']
);

-- Inserir notícias
INSERT INTO news (title, content, excerpt, image_url, author, category, featured, tags) VALUES
(
  'LTD Lança Nova Versão do Sistema de Gestão Municipal',
  'O Laboratório de Transformação Digital anuncia o lançamento da versão 3.0 do seu sistema integrado de gestão municipal. A nova versão inclui módulos avançados de inteligência artificial, dashboard renovado com visualizações interativas, e integração completa com APIs governamentais.

As principais melhorias incluem:
- Interface completamente redesenhada com foco na experiência do usuário
- Módulo de IA para análise preditiva de dados municipais  
- Automação de processos administrativos
- Relatórios em tempo real com indicadores de performance
- Conformidade total com a LGPD e normas de segurança

A atualização estará disponível gratuitamente para todas as prefeituras parceiras e será implementada de forma gradual ao longo dos próximos três meses.',
  'Sistema 3.0 traz IA integrada, nova interface e automação de processos para modernizar a gestão pública municipal.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=400&auto=format&fit=crop',
  'Ana Silva',
  'Tecnologia',
  true,
  ARRAY['sistema', 'gestão municipal', 'inteligência artificial', 'atualização', 'tecnologia']
),
(
  'Equipe do LTD Apresenta Projeto de Cibersegurança em Conferência Nacional',
  'Membros da equipe do Laboratório de Transformação Digital participaram da Conferência Nacional de Segurança Cibernética em Brasília, apresentando o projeto pioneiro de implementação de políticas de segurança em prefeituras de pequeno e médio porte.

O projeto apresentado demonstrou como pequenos municípios podem implementar soluções robustas de cibersegurança com orçamento limitado, utilizando ferramentas open source e metodologias adaptadas à realidade local.

Durante a conferência, Carlos Santos, especialista em cibersegurança do LTD, conduziu workshops práticos sobre:
- Implementação de políticas de senha segura
- Configuração de firewalls para redes municipais
- Treinamento de conscientização para servidores públicos
- Desenvolvimento de planos de resposta a incidentes

O projeto foi reconhecido como uma das melhores práticas do setor público brasileiro.',
  'LTD apresenta soluções inovadoras de cibersegurança para pequenos municípios em conferência nacional.',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&h=400&auto=format&fit=crop',
  'Carlos Santos',
  'Cibersegurança',
  true,
  ARRAY['cibersegurança', 'conferência', 'políticas', 'municípios', 'apresentação']
),
(
  'Parceria com Prefeituras Resulta em 15 Novos Aplicativos Desenvolvidos',
  'A colaboração entre o LTD, Universidade Estácio e as prefeituras de São José e Florianópolis já resultou no desenvolvimento de 15 aplicativos especializados para gestão pública. Os sistemas atendem desde a geração automatizada de documentos até análise avançada de dados orçamentários.

Entre os destaques estão:
- Gerador de Currículo Inteligente com IA
- Sistema de Segurança Digital Municipal
- Dashboard Financeiro com análise preditiva
- Simulador de Phishing para treinamento
- Analisador de Dados Públicos com Machine Learning

Todos os aplicativos são disponibilizados gratuitamente para prefeituras e seguem rigorosos padrões de segurança e acessibilidade. O código-fonte de vários projetos está disponível no GitHub para contribuições da comunidade.',
  'Parceria público-acadêmica já produziu 15 aplicativos especializados para modernização da gestão municipal.',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&h=400&auto=format&fit=crop',
  'Camila Rodrigues',
  'Desenvolvimento',
  false,
  ARRAY['aplicativos', 'parceria', 'prefeituras', 'desenvolvimento', 'gestão pública']
),
(
  'Workshop de Inteligência Artificial Capacita 200 Servidores Públicos',
  'O LTD realizou o maior workshop de IA para o setor público da região, capacitando mais de 200 servidores de 15 municípios diferentes. O evento de três dias abordou desde conceitos básicos até implementação prática de soluções de inteligência artificial.

O workshop incluiu módulos sobre:
- Fundamentos de Machine Learning aplicado ao setor público
- Uso ético de IA em processos governamentais  
- ChatGPT e ferramentas de IA generativa para produtividade
- Análise preditiva para planejamento urbano
- Automação de processos administrativos com IA

Maria Oliveira, cientista de dados do LTD, destacou: "É fundamental democratizar o conhecimento sobre IA no setor público. Essas tecnologias podem revolucionar a eficiência dos serviços oferecidos aos cidadãos."

O workshop recebeu avaliação média de 4.8/5.0 dos participantes.',
  'Workshop forma 200 servidores em IA aplicada ao setor público, abordando desde conceitos básicos até implementação prática.',
  'https://images.unsplash.com/photo-1677442135737-d50248243cc4?q=80&w=800&h=400&auto=format&fit=crop',
  'Maria Oliveira',
  'Inteligência Artificial',
  true,
  ARRAY['workshop', 'inteligência artificial', 'capacitação', 'servidores públicos', 'treinamento']
),
(
  'LTD Recebe Prêmio de Inovação em Governo Digital',
  'O Laboratório de Transformação Digital foi reconhecido com o Prêmio Nacional de Inovação em Governo Digital 2025, na categoria "Melhor Iniciativa de Transformação Digital Municipal".

O prêmio reconhece o impacto do trabalho desenvolvido pelo LTD na modernização de processos públicos e na criação de soluções tecnológicas que aproximam cidadãos e governo.

O projeto premiado destacou:
- Redução de 60% no tempo de processamento de documentos
- Aumento de 40% na satisfação dos cidadãos com serviços digitais
- Economia de R$ 2,3 milhões em custos operacionais
- Capacitação de mais de 500 servidores públicos
- Implementação de soluções em 25 municípios

A cerimônia de premiação aconteceu em Brasília e contou com a presença de representantes do Ministério da Ciência, Tecnologia e Inovação.',
  'LTD conquista prêmio nacional por inovação na transformação digital de municípios brasileiros.',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800&h=400&auto=format&fit=crop',
  'Admin',
  'Empresa',
  true,
  ARRAY['prêmio', 'inovação', 'governo digital', 'reconhecimento', 'transformação digital']
),
(
  'Novo Portal de Transparência Facilita Acesso a Dados Públicos',
  'Foi lançado o novo Portal de Transparência desenvolvido pelo LTD, que centraliza informações de múltiplas prefeituras em uma interface moderna e intuitiva. A plataforma utiliza tecnologias de visualização avançada para apresentar dados orçamentários, licitações e indicadores de gestão.

Principais funcionalidades:
- Dashboards interativos com dados em tempo real
- Buscador inteligente por categorias e períodos
- Gráficos dinâmicos e relatórios personalizáveis
- API aberta para desenvolvedores e jornalistas
- Sistema de alertas para atualizações importantes
- Versão mobile responsiva

João Costa, DevOps do LTD, explicou: "O portal foi desenvolvido pensando na experiência do cidadão. Queremos que qualquer pessoa possa acessar e compreender como recursos públicos estão sendo utilizados."

A plataforma já está disponível para as prefeituras parceiras.',
  'Novo portal oferece acesso simplificado e visual a dados públicos municipais através de dashboards interativos.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=400&auto=format&fit=crop',
  'João Costa',
  'Transparência',
  false,
  ARRAY['transparência', 'dados públicos', 'portal', 'visualização', 'cidadania']
),
(
  'Hackathon de Soluções Públicas Reúne 150 Desenvolvedores',
  'O LTD organizou o primeiro Hackathon de Soluções Públicas de Santa Catarina, reunindo 150 desenvolvedores, designers e gestores públicos para criar soluções inovadoras em 48 horas.

Os desafios propostos incluíram:
- Aplicativo para agendamento de serviços municipais
- Sistema de monitoramento da qualidade do ar
- Plataforma de participação cidadã digital
- Ferramenta de otimização de rotas de coleta seletiva
- Bot para atendimento ao cidadão via WhatsApp

As equipes tiveram acesso a mentores especializados, APIs governamentais e infraestrutura cloud para desenvolvimento. O evento resultou em 15 protótipos funcionais, dos quais 5 serão implementados em fase piloto.

A equipe vencedora desenvolveu um aplicativo que usa IA para otimizar rotas de transporte público em tempo real, considerando trânsito, demanda e acessibilidade.',
  'Hackathon produz 15 protótipos inovadores para resolver desafios da gestão pública municipal.',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&h=400&auto=format&fit=crop',
  'Rafael Almeida',
  'Eventos',
  false,
  ARRAY['hackathon', 'inovação', 'desenvolvedores', 'soluções públicas', 'competição']
),
(
  'Sistema de Gestão de Projetos Públicos Entra em Operação',
  'Entrou em operação o novo Sistema de Gestão de Projetos Públicos desenvolvido pelo LTD, que permitirá acompanhamento em tempo real do andamento de obras e iniciativas municipais.

O sistema oferece:
- Timeline visual de projetos com marcos importantes
- Integração com sistemas de compras e licitações
- Relatórios automáticos de progresso
- Alertas para atrasos e desvios orçamentários
- Portal público para acompanhamento de obras
- App móvel para fiscalização em campo

Lucia Fernandes, UX Designer do LTD, comentou: "Focamos em criar uma interface que seja útil tanto para gestores quanto para cidadãos. A transparência no acompanhamento de projetos públicos é fundamental para a confiança da população."

O sistema já está sendo utilizado por 8 municípios piloto.',
  'Novo sistema permite acompanhamento transparente e em tempo real de projetos e obras municipais.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=400&auto=format&fit=crop',
  'Lucia Fernandes',
  'Gestão Pública',
  false,
  ARRAY['gestão de projetos', 'obras públicas', 'transparência', 'acompanhamento', 'sistema']
);

-- ============================================
-- MENSAGEM DE SUCESSO
-- ============================================

-- Verificar se tudo foi criado corretamente
DO $$
DECLARE
    member_count INTEGER;
    app_count INTEGER;
    doc_count INTEGER;
    news_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO member_count FROM team_members;
    SELECT COUNT(*) INTO app_count FROM applications;
    SELECT COUNT(*) INTO doc_count FROM documents;
    SELECT COUNT(*) INTO news_count FROM news;
    
    RAISE NOTICE 'BASE DE DADOS CONFIGURADA COM SUCESSO!';
    RAISE NOTICE 'Membros da equipe: %', member_count;
    RAISE NOTICE 'Aplicativos: %', app_count;
    RAISE NOTICE 'Documentos: %', doc_count;
    RAISE NOTICE 'Notícias: %', news_count;
    RAISE NOTICE 'Storage bucket "avatars" configurado';
    RAISE NOTICE 'Políticas RLS ativadas';
    RAISE NOTICE 'Usuários admin criados: admin/admin123 e editor/editor123';
END $$;