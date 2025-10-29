-- ============================================
-- CRIAR TABELAS COM NOMES NOVOS
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. DELETAR tabelas antigas (se existirem)
DROP TABLE IF EXISTS public.ltd_android_apps CASCADE;
DROP TABLE IF EXISTS public.ltd_vscode_extensions CASCADE;

-- 2. CRIAR TABELA: ltd_android_apps
CREATE TABLE public.ltd_android_apps (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT NOT NULL,
    color_gradient TEXT NOT NULL,
    features TEXT NOT NULL,
    tags TEXT NOT NULL,
    download_url TEXT NOT NULL,
    version TEXT NOT NULL,
    rating DECIMAL(3,1) NOT NULL,
    downloads INTEGER NOT NULL,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CRIAR TABELA: ltd_vscode_extensions
CREATE TABLE public.ltd_vscode_extensions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT NOT NULL,
    color_gradient TEXT NOT NULL,
    features TEXT NOT NULL,
    tags TEXT NOT NULL,
    author TEXT NOT NULL,
    marketplace_url TEXT NOT NULL,
    version TEXT NOT NULL,
    rating DECIMAL(3,1) NOT NULL,
    installs INTEGER NOT NULL,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DESABILITAR RLS
ALTER TABLE public.ltd_android_apps DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.ltd_vscode_extensions DISABLE ROW LEVEL SECURITY;

-- 5. GARANTIR PERMISSÕES TOTAIS
GRANT ALL ON TABLE public.ltd_android_apps TO anon;
GRANT ALL ON TABLE public.ltd_android_apps TO authenticated;
GRANT ALL ON TABLE public.ltd_android_apps TO service_role;

GRANT ALL ON TABLE public.ltd_vscode_extensions TO anon;
GRANT ALL ON TABLE public.ltd_vscode_extensions TO authenticated;
GRANT ALL ON TABLE public.ltd_vscode_extensions TO service_role;

GRANT USAGE, SELECT ON SEQUENCE public.ltd_android_apps_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.ltd_android_apps_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.ltd_android_apps_id_seq TO service_role;

GRANT USAGE, SELECT ON SEQUENCE public.ltd_vscode_extensions_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.ltd_vscode_extensions_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.ltd_vscode_extensions_id_seq TO service_role;

-- 6. INSERIR DADOS - ANDROID APPS

INSERT INTO public.ltd_android_apps (
    name, description, category, icon, color_gradient, features, tags, 
    download_url, version, rating, downloads, published
) VALUES 
(
    'NAF - Núcleo de Atendimento Familiar',
    'Aplicativo completo para gestão de atendimentos e acompanhamento familiar integrado.',
    'Gestão',
    '💼',
    'from-blue-500 to-blue-700',
    'Gestão de Atendimentos
Acompanhamento Familiar
Relatórios Detalhados
Notificações em Tempo Real
Sincronização em Nuvem',
    'gestão, atendimento, família, relatórios',
    'https://ltd.com.br/downloads/naf.apk',
    '2.1.0',
    4.7,
    15000,
    true
),
(
    'Social Dev - Rede Social para Devs',
    'Conecte-se com desenvolvedores, compartilhe projetos e colabore em tempo real.',
    'Social',
    '👥',
    'from-purple-500 to-pink-600',
    'Perfil de Desenvolvedor
Feed de Projetos
Chat em Tempo Real
Colaboração em Código
Portfólio Integrado',
    'rede social, desenvolvedores, colaboração, projetos',
    'https://ltd.com.br/downloads/socialdev.apk',
    '1.8.5',
    4.9,
    28000,
    true
),
(
    'Currículo Bot - Gerador de Currículo IA',
    'Crie currículos profissionais incríveis em minutos com inteligência artificial.',
    'Produtividade',
    '📄',
    'from-green-500 to-teal-600',
    'Geração com IA
Templates Profissionais
Exportação PDF
Otimização ATS
Sugestões Inteligentes',
    'currículo, cv, emprego, ia, gerador',
    'https://ltd.com.br/downloads/curriculobot.apk',
    '3.2.1',
    4.8,
    42000,
    true
);

-- 7. INSERIR DADOS - VSCODE EXTENSIONS

INSERT INTO public.ltd_vscode_extensions (
    name, description, category, icon, color_gradient, features, tags, author,
    marketplace_url, version, rating, installs, published
) VALUES 
(
    'Algorithm Complexity Analyzer Pro',
    'Analise a complexidade de algoritmos em tempo real com sugestões de otimização.',
    'Análise de Código',
    '⚡',
    'from-indigo-500 to-purple-600',
    'Análise Big O em Tempo Real
Sugestões de Otimização
Detecção de Gargalos
Métricas de Performance
Suporte Multi-linguagem',
    'algoritmos, complexidade, otimização, performance',
    'Estevam Souza',
    'https://marketplace.visualstudio.com/items?itemName=ltd.algorithm-analyzer',
    '1.4.2',
    4.9,
    125000,
    true
);

-- 8. NOTIFICAR POSTGREST PARA RECARREGAR SCHEMA
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

-- 9. VERIFICAR CRIAÇÃO E DADOS
SELECT '✅ TABELAS CRIADAS COM SUCESSO' as status;

SELECT 'ltd_android_apps' as tabela, COUNT(*) as registros 
FROM public.ltd_android_apps;

SELECT 'ltd_vscode_extensions' as tabela, COUNT(*) as registros 
FROM public.ltd_vscode_extensions;

-- 10. MOSTRAR DADOS INSERIDOS
SELECT id, name, category, version, rating, downloads 
FROM public.ltd_android_apps 
ORDER BY id;

SELECT id, name, category, version, rating, installs, author
FROM public.ltd_vscode_extensions 
ORDER BY id;

-- ============================================
-- ✅ SUCESSO! Agora atualize os componentes React
-- ============================================
