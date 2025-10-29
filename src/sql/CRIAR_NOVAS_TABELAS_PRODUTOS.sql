-- =====================================================
-- SCRIPT COMPLETO: CRIAR NOVAS TABELAS DE PRODUTOS
-- =====================================================
-- Este script cria as tabelas produtos_android_apps e produtos_vscode_extensions
-- com RLS (Row Level Security) configurado corretamente
-- =====================================================

-- 1. REMOVER TABELAS ANTIGAS SE EXISTIREM
DROP TABLE IF EXISTS public.produtos_android_apps CASCADE;
DROP TABLE IF EXISTS public.produtos_vscode_extensions CASCADE;

-- =====================================================
-- 2. CRIAR TABELA: produtos_android_apps
-- =====================================================
CREATE TABLE public.produtos_android_apps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_url TEXT,
    download_url TEXT NOT NULL,
    version VARCHAR(50),
    size VARCHAR(50),
    downloads INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para melhor performance
CREATE INDEX idx_produtos_android_apps_published ON public.produtos_android_apps(published);
CREATE INDEX idx_produtos_android_apps_created_at ON public.produtos_android_apps(created_at DESC);

-- =====================================================
-- 3. CRIAR TABELA: produtos_vscode_extensions
-- =====================================================
CREATE TABLE public.produtos_vscode_extensions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_url TEXT,
    download_url TEXT NOT NULL,
    version VARCHAR(50),
    publisher VARCHAR(255),
    installs INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para melhor performance
CREATE INDEX idx_produtos_vscode_extensions_published ON public.produtos_vscode_extensions(published);
CREATE INDEX idx_produtos_vscode_extensions_created_at ON public.produtos_vscode_extensions(created_at DESC);

-- =====================================================
-- 4. HABILITAR ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE public.produtos_android_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos_vscode_extensions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 5. CRIAR POLÍTICAS RLS PARA produtos_android_apps
-- =====================================================

-- Permitir SELECT para todos (leitura pública de apps publicados)
CREATE POLICY "Permitir SELECT público de apps publicados"
ON public.produtos_android_apps
FOR SELECT
USING (published = true);

-- Permitir SELECT para usuários autenticados (ver todos)
CREATE POLICY "Permitir SELECT para autenticados"
ON public.produtos_android_apps
FOR SELECT
TO authenticated
USING (true);

-- Permitir INSERT para usuários autenticados
CREATE POLICY "Permitir INSERT para autenticados"
ON public.produtos_android_apps
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permitir UPDATE para usuários autenticados
CREATE POLICY "Permitir UPDATE para autenticados"
ON public.produtos_android_apps
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Permitir DELETE para usuários autenticados
CREATE POLICY "Permitir DELETE para autenticados"
ON public.produtos_android_apps
FOR DELETE
TO authenticated
USING (true);

-- =====================================================
-- 6. CRIAR POLÍTICAS RLS PARA produtos_vscode_extensions
-- =====================================================

-- Permitir SELECT para todos (leitura pública de extensões publicadas)
CREATE POLICY "Permitir SELECT público de extensões publicadas"
ON public.produtos_vscode_extensions
FOR SELECT
USING (published = true);

-- Permitir SELECT para usuários autenticados (ver todos)
CREATE POLICY "Permitir SELECT para autenticados"
ON public.produtos_vscode_extensions
FOR SELECT
TO authenticated
USING (true);

-- Permitir INSERT para usuários autenticados
CREATE POLICY "Permitir INSERT para autenticados"
ON public.produtos_vscode_extensions
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permitir UPDATE para usuários autenticados
CREATE POLICY "Permitir UPDATE para autenticados"
ON public.produtos_vscode_extensions
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Permitir DELETE para usuários autenticados
CREATE POLICY "Permitir DELETE para autenticados"
ON public.produtos_vscode_extensions
FOR DELETE
TO authenticated
USING (true);

-- =====================================================
-- 7. GARANTIR PERMISSÕES CORRETAS
-- =====================================================

-- Garantir que a role anon tem acesso
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.produtos_android_apps TO anon;
GRANT SELECT ON public.produtos_vscode_extensions TO anon;

-- Garantir que a role authenticated tem acesso completo
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.produtos_android_apps TO authenticated;
GRANT ALL ON public.produtos_vscode_extensions TO authenticated;

-- =====================================================
-- 8. INSERIR DADOS DE EXEMPLO (OPCIONAL)
-- =====================================================

-- Exemplo de app Android
INSERT INTO public.produtos_android_apps (name, description, icon_url, download_url, version, size, downloads, rating, published)
VALUES 
(
    'LTD App Manager',
    'Gerenciador de aplicativos desenvolvido pela LTD Estácio. Organize e otimize seus apps com facilidade.',
    'https://via.placeholder.com/100',
    'https://example.com/download/ltd-app-manager.apk',
    '1.0.0',
    '5.2 MB',
    1500,
    4.5,
    true
);

-- Exemplo de extensão VS Code
INSERT INTO public.produtos_vscode_extensions (name, description, icon_url, download_url, version, publisher, installs, rating, published)
VALUES 
(
    'LTD Code Helper',
    'Extensão VS Code desenvolvida pela LTD Estácio para aumentar a produtividade dos desenvolvedores.',
    'https://via.placeholder.com/100',
    'https://marketplace.visualstudio.com/items?itemName=ltd.code-helper',
    '1.0.0',
    'LTD Estácio',
    2500,
    4.8,
    true
);

-- =====================================================
-- 9. VERIFICAR CRIAÇÃO DAS TABELAS
-- =====================================================

-- Listar todas as tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('produtos_android_apps', 'produtos_vscode_extensions');

-- Verificar políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('produtos_android_apps', 'produtos_vscode_extensions');

-- =====================================================
-- 10. RECARREGAR SCHEMA CACHE
-- =====================================================

-- Notificar o PostgREST para recarregar o schema
NOTIFY pgrst, 'reload schema';

-- =====================================================
-- FIM DO SCRIPT
-- =====================================================
-- Para executar este script:
-- 1. Acesse o Supabase Dashboard
-- 2. Vá em SQL Editor
-- 3. Cole este script completo
-- 4. Execute
-- 5. Aguarde a confirmação de sucesso
-- =====================================================
