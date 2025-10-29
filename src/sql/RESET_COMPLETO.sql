-- =============================================
-- RESET COMPLETO - RECRIAR TUDO DO ZERO
-- =============================================
-- Execute TODO este script de uma vez no Supabase SQL Editor
-- =============================================

-- PASSO 1: APAGAR TUDO
DROP TABLE IF EXISTS android_apps CASCADE;
DROP TABLE IF EXISTS vscode_extensions CASCADE;

-- PASSO 2: CRIAR TABELAS SIMPLES (SEM RLS)
CREATE TABLE android_apps (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT DEFAULT '📱',
    color_gradient TEXT DEFAULT 'from-blue-500 to-purple-600',
    features TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    download_url TEXT NOT NULL,
    version TEXT NOT NULL DEFAULT '1.0.0',
    rating DECIMAL(3,1) DEFAULT 4.5,
    downloads INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE vscode_extensions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    marketplace_url TEXT NOT NULL,
    version TEXT NOT NULL DEFAULT '1.0.0',
    rating DECIMAL(3,1) DEFAULT 4.5,
    installs INTEGER DEFAULT 0,
    author TEXT DEFAULT 'LTD Team',
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PASSO 3: DESABILITAR RLS (ACESSO PÚBLICO TOTAL)
ALTER TABLE android_apps DISABLE ROW LEVEL SECURITY;
ALTER TABLE vscode_extensions DISABLE ROW LEVEL SECURITY;

-- PASSO 4: CONCEDER PERMISSÕES TOTAIS
GRANT ALL ON android_apps TO anon, authenticated;
GRANT ALL ON vscode_extensions TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE android_apps_id_seq TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE vscode_extensions_id_seq TO anon, authenticated;

-- PASSO 5: INSERIR DADOS (3 APPS ANDROID)
INSERT INTO android_apps (name, description, category, icon, color_gradient, features, tags, download_url, version, rating, downloads, published) VALUES
(
    'NAF - Gestão Contábil',
    'Sistema completo de gestão contábil e fiscal para pequenas e médias empresas. Controle financeiro completo, emissão de notas fiscais eletrônicas e relatórios gerenciais automatizados.',
    'Produtividade',
    '💼',
    'from-blue-600 to-indigo-700',
    ARRAY['Controle de receitas e despesas', 'Emissão de notas fiscais NF-e', 'Relatórios gerenciais automatizados', 'Integração com bancos', 'Backup automático em nuvem', 'Conformidade com legislação fiscal'],
    ARRAY['contabilidade', 'gestão', 'fiscal', 'finanças', 'empresas'],
    'https://naf.ltdestacio.com.br/apk/naf.apk',
    '2.5.1',
    4.7,
    15000,
    true
),
(
    'Social Dev - Comunidade',
    'Rede social exclusiva para desenvolvedores compartilharem conhecimento, projetos e oportunidades. Network profissional com feed técnico personalizado.',
    'Social',
    '👥',
    'from-purple-600 to-pink-600',
    ARRAY['Feed personalizado de conteúdo técnico', 'Perfil profissional completo', 'Sistema de mensagens privadas', 'Eventos e meetups tech', 'Desafios de código e hackathons', 'Portfólio integrado de projetos'],
    ARRAY['desenvolvedores', 'networking', 'comunidade', 'programação', 'social'],
    'https://socialdev.ltdestacio.com.br/apk/socialdev.apk',
    '1.8.3',
    4.9,
    28000,
    true
),
(
    'Currículo Bot IA',
    'Assistente inteligente com IA para criação de currículos profissionais de alta qualidade. Templates modernos ATS-friendly e análise de palavras-chave.',
    'Ferramentas',
    '📄',
    'from-green-600 to-teal-600',
    ARRAY['Assistente IA conversacional', 'Templates profissionais ATS-friendly', 'Análise de palavras-chave para ATS', 'Exportação em PDF e DOCX', 'Dicas personalizadas por área', 'Armazenamento seguro em nuvem'],
    ARRAY['currículo', 'emprego', 'carreira', 'IA', 'profissional'],
    'https://curriculobot.ltdestacio.com.br/apk/curriculobot.apk',
    '3.1.0',
    4.8,
    42000,
    true
);

-- PASSO 6: INSERIR DADOS (1 EXTENSÃO VS CODE)
INSERT INTO vscode_extensions (name, description, category, features, tags, marketplace_url, version, rating, installs, author, published) VALUES
(
    'Algorithm Complexity Analyzer Pro',
    'Extensão avançada para análise automática de complexidade de algoritmos em tempo real. Identifica Big O notation, sugere otimizações e fornece insights sobre performance.',
    'Análise de Código',
    ARRAY['Análise automática de Big O notation', 'Sugestões inteligentes de otimização', 'Visualização gráfica de complexidade', 'Suporte para 15+ linguagens', 'Comparação de implementações alternativas', 'Relatórios detalhados de performance'],
    ARRAY['algoritmos', 'complexidade', 'performance', 'otimização', 'Big O'],
    'https://marketplace.visualstudio.com/items?itemName=EstevamSouza.algorithm-complexity-analyzer-pro',
    '1.4.2',
    4.9,
    125000,
    'Estevam Souza',
    true
);

-- PASSO 7: FORÇAR RELOAD DO SCHEMA
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

-- PASSO 8: VERIFICAR SE DEU CERTO
SELECT '✅ TABELAS CRIADAS' as status;
SELECT 'android_apps' as tabela, COUNT(*) as total_registros FROM android_apps;
SELECT 'vscode_extensions' as tabela, COUNT(*) as total_registros FROM vscode_extensions;

-- PASSO 9: TESTAR CONSULTAS (IGUAL AO REACT)
SELECT '✅ TESTE: Buscando Apps Android' as teste;
SELECT id, name, category, version, rating, downloads FROM android_apps WHERE published = true ORDER BY created_at DESC;

SELECT '✅ TESTE: Buscando Extensões VS Code' as teste;
SELECT id, name, category, version, rating, installs FROM vscode_extensions WHERE published = true ORDER BY created_at DESC;

-- =============================================
-- RESULTADO ESPERADO:
-- =============================================
-- ✅ TABELAS CRIADAS
-- android_apps: 3 registros
-- vscode_extensions: 1 registro
-- Depois deve mostrar os dados completos
-- =============================================
