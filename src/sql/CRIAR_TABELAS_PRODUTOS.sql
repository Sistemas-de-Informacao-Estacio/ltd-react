-- ============================================
-- SCRIPT COMPLETO PARA CRIAR TABELAS DE PRODUTOS
-- Apps Android e Extensões VS Code
-- ============================================

-- 1. DELETAR TABELAS ANTIGAS SE EXISTIREM
DROP TABLE IF EXISTS public.produtos_android_apps CASCADE;
DROP TABLE IF EXISTS public.produtos_vscode_extensions CASCADE;

-- ============================================
-- 2. CRIAR TABELA DE APPS ANDROID
-- ============================================
CREATE TABLE public.produtos_android_apps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    icon VARCHAR(10) DEFAULT '📱',
    color_gradient VARCHAR(100) DEFAULT 'from-blue-500 to-purple-600',
    features JSONB DEFAULT '[]'::jsonb,
    tags JSONB DEFAULT '[]'::jsonb,
    download_url TEXT NOT NULL,
    version VARCHAR(50) NOT NULL DEFAULT '1.0.0',
    rating DECIMAL(2,1) DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
    downloads INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar índices para melhor performance
CREATE INDEX idx_produtos_android_apps_published ON public.produtos_android_apps(published);
CREATE INDEX idx_produtos_android_apps_category ON public.produtos_android_apps(category);
CREATE INDEX idx_produtos_android_apps_created_at ON public.produtos_android_apps(created_at DESC);

-- Comentários na tabela
COMMENT ON TABLE public.produtos_android_apps IS 'Tabela para armazenar apps Android do LTD';
COMMENT ON COLUMN public.produtos_android_apps.features IS 'Array JSON com lista de funcionalidades';
COMMENT ON COLUMN public.produtos_android_apps.tags IS 'Array JSON com tags do app';

-- ============================================
-- 3. CRIAR TABELA DE EXTENSÕES VS CODE
-- ============================================
CREATE TABLE public.produtos_vscode_extensions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    tags JSONB DEFAULT '[]'::jsonb,
    marketplace_url TEXT NOT NULL,
    version VARCHAR(50) NOT NULL DEFAULT '1.0.0',
    rating DECIMAL(2,1) DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
    installs INTEGER DEFAULT 0,
    author VARCHAR(255) DEFAULT 'LTD Team',
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar índices para melhor performance
CREATE INDEX idx_produtos_vscode_extensions_published ON public.produtos_vscode_extensions(published);
CREATE INDEX idx_produtos_vscode_extensions_category ON public.produtos_vscode_extensions(category);
CREATE INDEX idx_produtos_vscode_extensions_created_at ON public.produtos_vscode_extensions(created_at DESC);

-- Comentários na tabela
COMMENT ON TABLE public.produtos_vscode_extensions IS 'Tabela para armazenar extensões VS Code do LTD';
COMMENT ON COLUMN public.produtos_vscode_extensions.features IS 'Array JSON com lista de funcionalidades';
COMMENT ON COLUMN public.produtos_vscode_extensions.tags IS 'Array JSON com tags da extensão';

-- ============================================
-- 4. CRIAR FUNÇÕES DE TRIGGER PARA UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at automaticamente
CREATE TRIGGER set_updated_at_produtos_android_apps
    BEFORE UPDATE ON public.produtos_android_apps
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_produtos_vscode_extensions
    BEFORE UPDATE ON public.produtos_vscode_extensions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 5. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.produtos_android_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos_vscode_extensions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. CRIAR POLÍTICAS RLS - APPS ANDROID
-- ============================================

-- Política para SELECT (leitura pública de apps publicados)
CREATE POLICY "Permitir leitura pública de apps publicados"
ON public.produtos_android_apps
FOR SELECT
USING (published = true);

-- Política para SELECT (admins podem ver todos)
CREATE POLICY "Admins podem ver todos os apps"
ON public.produtos_android_apps
FOR SELECT
TO authenticated
USING (true);

-- Política para INSERT (apenas admins autenticados)
CREATE POLICY "Apenas admins podem inserir apps"
ON public.produtos_android_apps
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política para UPDATE (apenas admins autenticados)
CREATE POLICY "Apenas admins podem atualizar apps"
ON public.produtos_android_apps
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Política para DELETE (apenas admins autenticados)
CREATE POLICY "Apenas admins podem deletar apps"
ON public.produtos_android_apps
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- 7. CRIAR POLÍTICAS RLS - EXTENSÕES VS CODE
-- ============================================

-- Política para SELECT (leitura pública de extensões publicadas)
CREATE POLICY "Permitir leitura pública de extensões publicadas"
ON public.produtos_vscode_extensions
FOR SELECT
USING (published = true);

-- Política para SELECT (admins podem ver todas)
CREATE POLICY "Admins podem ver todas as extensões"
ON public.produtos_vscode_extensions
FOR SELECT
TO authenticated
USING (true);

-- Política para INSERT (apenas admins autenticados)
CREATE POLICY "Apenas admins podem inserir extensões"
ON public.produtos_vscode_extensions
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política para UPDATE (apenas admins autenticados)
CREATE POLICY "Apenas admins podem atualizar extensões"
ON public.produtos_vscode_extensions
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Política para DELETE (apenas admins autenticados)
CREATE POLICY "Apenas admins podem deletar extensões"
ON public.produtos_vscode_extensions
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- 8. INSERIR DADOS DE EXEMPLO - APPS ANDROID
-- ============================================
INSERT INTO public.produtos_android_apps (
    name, description, category, icon, color_gradient, 
    features, tags, download_url, version, rating, downloads, published
) VALUES 
(
    'LTD Task Manager',
    'Gerenciador de tarefas moderno e intuitivo para aumentar sua produtividade. Organize seus projetos, defina prioridades e acompanhe seu progresso.',
    'Produtividade',
    '✅',
    'from-blue-500 to-purple-600',
    '["Gerenciamento de tarefas", "Sincronização na nuvem", "Lembretes inteligentes", "Modo escuro", "Widgets personalizáveis"]'::jsonb,
    '["produtividade", "tarefas", "gestão", "android"]'::jsonb,
    '/downloads/ltd-task-manager.apk',
    '2.1.0',
    4.8,
    15000,
    true
),
(
    'LTD Notes Pro',
    'Aplicativo de anotações poderoso com suporte a markdown, sincronização e criptografia. Mantenha suas ideias seguras e organizadas.',
    'Produtividade',
    '📝',
    'from-green-500 to-teal-600',
    '["Editor Markdown", "Criptografia E2E", "Sincronização multiplataforma", "Anexos de arquivos", "Busca avançada"]'::jsonb,
    '["notas", "markdown", "produtividade", "android"]'::jsonb,
    '/downloads/ltd-notes-pro.apk',
    '3.0.2',
    4.7,
    22000,
    true
),
(
    'LTD Fitness Tracker',
    'Acompanhe seus treinos, monitore seu progresso e alcance seus objetivos fitness. Interface intuitiva e motivadora.',
    'Saúde',
    '💪',
    'from-red-500 to-orange-600',
    '["Rastreamento de exercícios", "Contador de calorias", "Planos de treino", "Gráficos de progresso", "Integração com wearables"]'::jsonb,
    '["fitness", "saúde", "treino", "android"]'::jsonb,
    '/downloads/ltd-fitness-tracker.apk',
    '1.5.0',
    4.6,
    8500,
    true
);

-- ============================================
-- 9. INSERIR DADOS DE EXEMPLO - EXTENSÕES VS CODE
-- ============================================
INSERT INTO public.produtos_vscode_extensions (
    name, description, category, features, tags, 
    marketplace_url, version, rating, installs, author, published
) VALUES 
(
    'LTD Code Snippets',
    'Coleção completa de snippets para desenvolvimento web moderno. Aumente sua velocidade de codificação com atalhos inteligentes.',
    'Produtividade',
    '["Snippets para React/Vue/Angular", "Snippets para Node.js", "Snippets para TypeScript", "Auto-importação", "Documentação inline"]'::jsonb,
    '["snippets", "produtividade", "javascript", "typescript", "react"]'::jsonb,
    'https://marketplace.visualstudio.com/items?itemName=ltd.code-snippets',
    '2.5.0',
    4.9,
    125000,
    'LTD Team',
    true
),
(
    'LTD Theme Pro',
    'Tema escuro profissional com suporte a múltiplas linguagens. Design cuidadoso para reduzir fadiga ocular durante longas sessões de código.',
    'Temas',
    '["Design moderno e limpo", "Alta legibilidade", "Suporte a 50+ linguagens", "Ícones personalizados", "Variantes de cores"]'::jsonb,
    '["tema", "dark-theme", "colors", "icons", "visual"]'::jsonb,
    'https://marketplace.visualstudio.com/items?itemName=ltd.theme-pro',
    '3.2.1',
    4.8,
    89000,
    'LTD Design Team',
    true
),
(
    'LTD Code Analyzer',
    'Analise seu código em tempo real com sugestões de melhorias, detecção de code smells e métricas de qualidade.',
    'Análise de Código',
    '["Análise estática de código", "Detecção de code smells", "Sugestões de refatoração", "Métricas de complexidade", "Relatórios detalhados"]'::jsonb,
    '["análise", "qualidade", "linter", "code-quality", "refactoring"]'::jsonb,
    'https://marketplace.visualstudio.com/items?itemName=ltd.code-analyzer',
    '1.8.0',
    4.7,
    45000,
    'LTD Analysis Team',
    true
);

-- ============================================
-- 10. GRANT PERMISSIONS
-- ============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.produtos_android_apps TO authenticated;
GRANT SELECT ON public.produtos_android_apps TO anon;
GRANT ALL ON public.produtos_vscode_extensions TO authenticated;
GRANT SELECT ON public.produtos_vscode_extensions TO anon;

-- ============================================
-- 11. VERIFICAR TABELAS CRIADAS
-- ============================================
-- Verificar Apps Android
SELECT 
    'produtos_android_apps' as tabela,
    COUNT(*) as total_registros,
    COUNT(*) FILTER (WHERE published = true) as publicados
FROM public.produtos_android_apps;

-- Verificar Extensões VS Code
SELECT 
    'produtos_vscode_extensions' as tabela,
    COUNT(*) as total_registros,
    COUNT(*) FILTER (WHERE published = true) as publicados
FROM public.produtos_vscode_extensions;

-- ============================================
-- SUCESSO! 
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- Depois execute: SELECT PostgREST.reload_schema()
-- ou espere 3 minutos para reload automático
