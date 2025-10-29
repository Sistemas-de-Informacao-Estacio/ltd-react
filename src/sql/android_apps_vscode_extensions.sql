-- ============================================
-- SCRIPT DE ATUALIZAÇÃO - APPS ANDROID E EXTENSÕES VSCODE
-- ============================================
-- Este script adiciona as tabelas e dados para gerenciamento de
-- Apps Android e Extensões VS Code no sistema LTD
-- Data: 28/10/2025
-- ============================================

-- ============================================
-- REMOVER TABELAS SE EXISTIREM (APENAS PARA DESENVOLVIMENTO)
-- ============================================
-- Descomente as linhas abaixo se precisar recriar as tabelas
-- DROP TABLE IF EXISTS android_apps CASCADE;
-- DROP TABLE IF EXISTS vscode_extensions CASCADE;

-- ============================================
-- CRIAR TABELAS
-- ============================================

-- Tabela de Apps Android
CREATE TABLE IF NOT EXISTS android_apps (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    icon VARCHAR(50) DEFAULT '📱',
    color_gradient VARCHAR(100) DEFAULT 'from-blue-500 to-purple-600',
    features TEXT[],
    tags TEXT[],
    download_url VARCHAR(500) NOT NULL,
    version VARCHAR(50) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
    downloads INTEGER DEFAULT 0 CHECK (downloads >= 0),
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Extensões VS Code
CREATE TABLE IF NOT EXISTS vscode_extensions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    features TEXT[],
    tags TEXT[],
    marketplace_url VARCHAR(500) NOT NULL,
    version VARCHAR(50) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
    installs INTEGER DEFAULT 0 CHECK (installs >= 0),
    author VARCHAR(100) DEFAULT 'LTD Team',
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CRIAR ÍNDICES PARA PERFORMANCE
-- ============================================

-- Índices para android_apps
CREATE INDEX IF NOT EXISTS idx_android_apps_category ON android_apps(category);
CREATE INDEX IF NOT EXISTS idx_android_apps_published ON android_apps(published);
CREATE INDEX IF NOT EXISTS idx_android_apps_rating ON android_apps(rating DESC);
CREATE INDEX IF NOT EXISTS idx_android_apps_downloads ON android_apps(downloads DESC);
CREATE INDEX IF NOT EXISTS idx_android_apps_created_at ON android_apps(created_at DESC);

-- Índices para vscode_extensions
CREATE INDEX IF NOT EXISTS idx_vscode_extensions_category ON vscode_extensions(category);
CREATE INDEX IF NOT EXISTS idx_vscode_extensions_published ON vscode_extensions(published);
CREATE INDEX IF NOT EXISTS idx_vscode_extensions_rating ON vscode_extensions(rating DESC);
CREATE INDEX IF NOT EXISTS idx_vscode_extensions_installs ON vscode_extensions(installs DESC);
CREATE INDEX IF NOT EXISTS idx_vscode_extensions_created_at ON vscode_extensions(created_at DESC);

-- ============================================
-- CONFIGURAR RLS (ROW LEVEL SECURITY)
-- ============================================

-- Habilitar RLS nas tabelas
ALTER TABLE android_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE vscode_extensions ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Enable read access for published android apps" ON android_apps;
DROP POLICY IF EXISTS "Enable all for authenticated users on android apps" ON android_apps;
DROP POLICY IF EXISTS "Enable read access for published vscode extensions" ON vscode_extensions;
DROP POLICY IF EXISTS "Enable all for authenticated users on vscode extensions" ON vscode_extensions;

-- Políticas para android_apps
-- Leitura pública apenas de apps publicados
CREATE POLICY "Enable read access for published android apps" 
ON android_apps FOR SELECT 
USING (published = true);

-- Acesso completo para usuários autenticados (admin)
CREATE POLICY "Enable all for authenticated users on android apps" 
ON android_apps FOR ALL 
USING (auth.role() = 'authenticated');

-- Políticas para vscode_extensions
-- Leitura pública apenas de extensões publicadas
CREATE POLICY "Enable read access for published vscode extensions" 
ON vscode_extensions FOR SELECT 
USING (published = true);

-- Acesso completo para usuários autenticados (admin)
CREATE POLICY "Enable all for authenticated users on vscode extensions" 
ON vscode_extensions FOR ALL 
USING (auth.role() = 'authenticated');

-- ============================================
-- INSERIR DADOS INICIAIS
-- ============================================

-- Inserir Apps Android
INSERT INTO android_apps (
    name, 
    description, 
    category, 
    icon, 
    color_gradient, 
    features, 
    tags, 
    download_url, 
    version, 
    rating, 
    downloads,
    published
) VALUES
(
    'NAF - Gestão Contábil',
    'Sistema completo de gestão contábil e fiscal para pequenas e médias empresas. Controle financeiro, emissão de notas fiscais, relatórios gerenciais e conformidade com a legislação brasileira. Interface intuitiva e moderna com recursos avançados de automação.',
    'Produtividade',
    '💼',
    'from-blue-600 to-indigo-700',
    ARRAY[
        'Controle completo de receitas e despesas',
        'Emissão de notas fiscais eletrônicas (NF-e)',
        'Relatórios gerenciais automatizados',
        'Integração com principais bancos brasileiros',
        'Backup automático em nuvem criptografado',
        'Conformidade total com legislação fiscal',
        'Dashboard com indicadores em tempo real',
        'Gestão de múltiplas empresas'
    ],
    ARRAY['contabilidade', 'gestão', 'fiscal', 'empresas', 'finanças', 'nfe'],
    'https://naf.ltdestacio.com.br/apk/naf.apk',
    '2.5.1',
    4.7,
    15000,
    true
),
(
    'Social Dev - Rede de Desenvolvedores',
    'Comunidade exclusiva para desenvolvedores compartilharem conhecimento, projetos e oportunidades. Network profissional, feed de conteúdo técnico, eventos e desafios de código. Conecte-se com desenvolvedores do mundo todo e faça parte da maior comunidade tech do Brasil.',
    'Social',
    '👥',
    'from-purple-600 to-pink-600',
    ARRAY[
        'Feed personalizado de conteúdo técnico',
        'Perfil profissional para desenvolvedores',
        'Sistema de mensagens privadas e grupos',
        'Calendário de eventos e meetups tech',
        'Desafios de código e hackathons online',
        'Portfólio integrado de projetos GitHub',
        'Sistema de badges e gamificação',
        'Vagas de emprego exclusivas'
    ],
    ARRAY['desenvolvedores', 'networking', 'comunidade', 'tecnologia', 'programação', 'social'],
    'https://socialdev.ltdestacio.com.br/apk/socialdev.apk',
    '1.8.3',
    4.9,
    28000,
    true
),
(
    'Currículo Bot - Assistente IA',
    'Assistente inteligente com IA para criação de currículos profissionais de alta qualidade. Interface conversacional guiada, templates modernos e ATS-friendly, análise de palavras-chave e exportação em múltiplos formatos. Aumente suas chances de conseguir a vaga dos sonhos!',
    'Ferramentas',
    '📄',
    'from-green-600 to-teal-600',
    ARRAY[
        'Assistente IA conversacional inteligente',
        'Templates profissionais modernos e ATS-friendly',
        'Análise de palavras-chave para ATS',
        'Exportação em PDF e DOCX profissional',
        'Dicas personalizadas por área de atuação',
        'Armazenamento seguro em nuvem',
        'Múltiplas versões de currículo',
        'Sugestões de melhorias com IA'
    ],
    ARRAY['currículo', 'emprego', 'carreira', 'IA', 'profissional', 'cv'],
    'https://curriculobot.ltdestacio.com.br/apk/curriculobot.apk',
    '3.1.0',
    4.8,
    42000,
    true
);

-- Inserir Extensões VS Code
INSERT INTO vscode_extensions (
    name, 
    description, 
    category, 
    features, 
    tags, 
    marketplace_url, 
    version, 
    rating, 
    installs, 
    author,
    published
) VALUES
(
    'Algorithm Complexity Analyzer Pro',
    'Extensão avançada para análise automática de complexidade de algoritmos em tempo real. Identifica Big O notation automaticamente, sugere otimizações inteligentes e fornece insights detalhados sobre performance do código. Suporte para múltiplas linguagens de programação e visualizações gráficas interativas.',
    'Análise de Código',
    ARRAY[
        'Análise automática de Big O em tempo real',
        'Sugestões inteligentes de otimização',
        'Visualização gráfica de complexidade',
        'Suporte para 15+ linguagens de programação',
        'Comparação de implementações alternativas',
        'Relatórios detalhados de performance',
        'Integração com GitHub Copilot',
        'Alertas de código ineficiente'
    ],
    ARRAY['algoritmos', 'complexidade', 'performance', 'otimização', 'Big O', 'análise'],
    'https://marketplace.visualstudio.com/items?itemName=EstevamSouza.algorithm-complexity-analyzer-pro',
    '1.4.2',
    4.9,
    125000,
    'Estevam Souza',
    true
);

-- ============================================
-- FUNÇÃO PARA ATUALIZAR TIMESTAMP
-- ============================================

-- Função para atualizar automaticamente o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS update_android_apps_updated_at ON android_apps;
CREATE TRIGGER update_android_apps_updated_at
    BEFORE UPDATE ON android_apps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vscode_extensions_updated_at ON vscode_extensions;
CREATE TRIGGER update_vscode_extensions_updated_at
    BEFORE UPDATE ON vscode_extensions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VERIFICAÇÃO E MENSAGEM DE SUCESSO
-- ============================================

DO $$
DECLARE
    android_count INTEGER;
    vscode_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO android_count FROM android_apps;
    SELECT COUNT(*) INTO vscode_count FROM vscode_extensions;
    
    RAISE NOTICE '========================================';
    RAISE NOTICE 'TABELAS CRIADAS COM SUCESSO!';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Apps Android: % registros', android_count;
    RAISE NOTICE 'Extensões VS Code: % registros', vscode_count;
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Índices criados para otimização';
    RAISE NOTICE 'Políticas RLS ativadas';
    RAISE NOTICE 'Triggers de atualização configurados';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Sistema pronto para uso! 🚀';
    RAISE NOTICE '========================================';
END $$;

-- ============================================
-- CONSULTAS ÚTEIS PARA TESTES
-- ============================================

-- Listar todos os apps Android publicados
-- SELECT * FROM android_apps WHERE published = true ORDER BY downloads DESC;

-- Listar todas as extensões VS Code publicadas
-- SELECT * FROM vscode_extensions WHERE published = true ORDER BY installs DESC;

-- Ver estatísticas dos apps Android
-- SELECT 
--     category,
--     COUNT(*) as total,
--     AVG(rating) as avg_rating,
--     SUM(downloads) as total_downloads
-- FROM android_apps
-- WHERE published = true
-- GROUP BY category;

-- Ver estatísticas das extensões VS Code
-- SELECT 
--     category,
--     COUNT(*) as total,
--     AVG(rating) as avg_rating,
--     SUM(installs) as total_installs
-- FROM vscode_extensions
-- WHERE published = true
-- GROUP BY category;
