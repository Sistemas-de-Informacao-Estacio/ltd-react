-- ============================================
-- FORÇAR RELOAD DO SCHEMA NO POSTGREST
-- ============================================
-- Execute este comando DEPOIS de criar as tabelas
-- para forçar o PostgREST a atualizar o cache

-- Método 1: Reload via função (recomendado)
NOTIFY pgrst, 'reload schema';

-- Método 2: Se o método 1 não funcionar
SELECT pg_notify('pgrst', 'reload schema');

-- Método 3: Se ainda não funcionar, altere as políticas RLS
-- (isso força o PostgREST a recarregar)
ALTER TABLE public.produtos_android_apps DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos_android_apps ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.produtos_vscode_extensions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos_vscode_extensions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- VERIFICAR SE AS TABELAS ESTÃO ACESSÍVEIS
-- ============================================

-- Teste 1: Verificar se as tabelas existem
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('produtos_android_apps', 'produtos_vscode_extensions');

-- Teste 2: Verificar políticas RLS
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename IN ('produtos_android_apps', 'produtos_vscode_extensions');

-- Teste 3: Verificar permissões
SELECT 
    grantee, 
    table_schema, 
    table_name, 
    privilege_type 
FROM information_schema.table_privileges 
WHERE table_name IN ('produtos_android_apps', 'produtos_vscode_extensions');

-- Teste 4: Contar registros
SELECT 'produtos_android_apps' as tabela, COUNT(*) as total FROM public.produtos_android_apps
UNION ALL
SELECT 'produtos_vscode_extensions' as tabela, COUNT(*) as total FROM public.produtos_vscode_extensions;

-- ============================================
-- IMPORTANTE:
-- ============================================
-- Após executar este script:
-- 1. Aguarde 10-30 segundos
-- 2. Teste as rotas da API REST do Supabase
-- 3. Se ainda não funcionar, aguarde até 3 minutos (reload automático)
