-- ============================================
-- RESET E RECRIAÇÃO COMPLETA
-- Apps Android e Extensões VS Code
-- ============================================

-- 1. REMOVER TUDO (começar do zero)
DROP TABLE IF EXISTS android_apps CASCADE;
DROP TABLE IF EXISTS vscode_extensions CASCADE;

-- ============================================
-- 2. CRIAR TABELAS NOVAS
-- ============================================

CREATE TABLE android_apps (
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
    rating DECIMAL(3,1) DEFAULT 4.5,
    downloads INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE vscode_extensions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    features TEXT[],
    tags TEXT[],
    marketplace_url VARCHAR(500) NOT NULL,
    version VARCHAR(50) NOT NULL,
    rating DECIMAL(3,1) DEFAULT 4.5,
    installs INTEGER DEFAULT 0,
    author VARCHAR(100) DEFAULT 'LTD Team',
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. CONFIGURAR RLS - ACESSO PÚBLICO TOTAL
-- ============================================

ALTER TABLE android_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE vscode_extensions ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública SEM RESTRIÇÕES
CREATE POLICY "allow_public_read_android_apps" 
ON android_apps FOR SELECT 
TO public
USING (true);

CREATE POLICY "allow_public_read_vscode_extensions" 
ON vscode_extensions FOR SELECT 
TO public
USING (true);

-- Permitir tudo para usuários autenticados
CREATE POLICY "allow_authenticated_all_android_apps" 
ON android_apps FOR ALL 
TO authenticated
USING (true);

CREATE POLICY "allow_authenticated_all_vscode_extensions" 
ON vscode_extensions FOR ALL 
TO authenticated
USING (true);

-- ============================================
-- 4. INSERIR DADOS
-- ============================================

INSERT INTO android_apps (name, description, category, icon, color_gradient, features, tags, download_url, version, rating, downloads, published) VALUES
(
    'NAF - Gestão Contábil',
    'Sistema completo de gestão contábil e fiscal para pequenas e médias empresas. Controle financeiro, emissão de notas fiscais e relatórios gerenciais.',
    'Produtividade',
    '💼',
    'from-blue-600 to-indigo-700',
    ARRAY['Controle de receitas e despesas', 'Emissão de NF-e', 'Relatórios automatizados', 'Integração bancária', 'Backup em nuvem', 'Conformidade fiscal'],
    ARRAY['contabilidade', 'gestão', 'fiscal', 'finanças'],
    'https://naf.ltdestacio.com.br/apk/naf.apk',
    '2.5.1',
    4.7,
    15000,
    true
),
(
    'Social Dev - Comunidade',
    'Rede social exclusiva para desenvolvedores compartilharem conhecimento, projetos e oportunidades.',
    'Social',
    '👥',
    'from-purple-600 to-pink-600',
    ARRAY['Feed técnico personalizado', 'Perfil profissional', 'Mensagens privadas', 'Eventos tech', 'Desafios de código', 'Portfólio integrado'],
    ARRAY['desenvolvedores', 'networking', 'comunidade', 'programação'],
    'https://socialdev.ltdestacio.com.br/apk/socialdev.apk',
    '1.8.3',
    4.9,
    28000,
    true
),
(
    'Currículo Bot IA',
    'Assistente inteligente com IA para criação de currículos profissionais. Templates modernos e análise ATS.',
    'Ferramentas',
    '📄',
    'from-green-600 to-teal-600',
    ARRAY['Assistente IA conversacional', 'Templates ATS-friendly', 'Análise de palavras-chave', 'Exportação PDF/DOCX', 'Dicas personalizadas', 'Armazenamento nuvem'],
    ARRAY['currículo', 'emprego', 'carreira', 'IA'],
    'https://curriculobot.ltdestacio.com.br/apk/curriculobot.apk',
    '3.1.0',
    4.8,
    42000,
    true
);

INSERT INTO vscode_extensions (name, description, category, features, tags, marketplace_url, version, rating, installs, author, published) VALUES
(
    'Algorithm Complexity Analyzer Pro',
    'Análise automática de complexidade de algoritmos em tempo real. Identifica Big O, sugere otimizações e fornece insights sobre performance.',
    'Análise de Código',
    ARRAY['Análise automática de Big O', 'Sugestões de otimização', 'Visualização gráfica', 'Suporte 15+ linguagens', 'Comparação de implementações', 'Relatórios detalhados'],
    ARRAY['algoritmos', 'complexidade', 'performance', 'otimização'],
    'https://marketplace.visualstudio.com/items?itemName=EstevamSouza.algorithm-complexity-analyzer-pro',
    '1.4.2',
    4.9,
    125000,
    'Estevam Souza',
    true
);

-- ============================================
-- 5. VERIFICAR RESULTADO
-- ============================================

DO $$
DECLARE
    apps_count INTEGER;
    extensions_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO apps_count FROM android_apps;
    SELECT COUNT(*) INTO extensions_count FROM vscode_extensions;
    
    RAISE NOTICE '==========================================';
    RAISE NOTICE '✓ Tabelas criadas com sucesso!';
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'Apps Android inseridos: %', apps_count;
    RAISE NOTICE 'Extensões VS Code inseridas: %', extensions_count;
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'RLS configurado com acesso público';
    RAISE NOTICE 'Sistema pronto para uso!';
    RAISE NOTICE '==========================================';
END $$;

-- Teste final
SELECT 'ANDROID_APPS' as tabela, COUNT(*) as total, COUNT(CASE WHEN published THEN 1 END) as publicados FROM android_apps
UNION ALL
SELECT 'VSCODE_EXTENSIONS' as tabela, COUNT(*) as total, COUNT(CASE WHEN published THEN 1 END) as publicados FROM vscode_extensions;
