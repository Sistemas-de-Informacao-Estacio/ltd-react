-- ============================================
-- FORÇAR RELOAD DO POSTGREST - SOLUÇÃO DEFINITIVA
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Verificar se as tabelas existem
SELECT 
    'android_apps' as tabela,
    EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'android_apps'
    ) as existe;

SELECT 
    'vscode_extensions' as tabela,
    EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'vscode_extensions'
    ) as existe;

-- 2. Verificar permissões
SELECT grantee, privilege_type
FROM information_schema.table_privileges
WHERE table_schema = 'public' 
AND table_name = 'android_apps';

SELECT grantee, privilege_type
FROM information_schema.table_privileges
WHERE table_schema = 'public' 
AND table_name = 'vscode_extensions';

-- 3. Regarantir TODAS as permissões necessárias
GRANT ALL ON TABLE public.android_apps TO anon;
GRANT ALL ON TABLE public.android_apps TO authenticated;
GRANT ALL ON TABLE public.android_apps TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.android_apps_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.android_apps_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.android_apps_id_seq TO service_role;

GRANT ALL ON TABLE public.vscode_extensions TO anon;
GRANT ALL ON TABLE public.vscode_extensions TO authenticated;
GRANT ALL ON TABLE public.vscode_extensions TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.vscode_extensions_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.vscode_extensions_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.vscode_extensions_id_seq TO service_role;

-- 4. Confirmar que RLS está DESABILITADO
ALTER TABLE public.android_apps DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.vscode_extensions DISABLE ROW LEVEL SECURITY;

-- 5. Remover TODAS as políticas RLS (se existirem)
DROP POLICY IF EXISTS "android_apps_select_policy" ON public.android_apps;
DROP POLICY IF EXISTS "android_apps_insert_policy" ON public.android_apps;
DROP POLICY IF EXISTS "android_apps_update_policy" ON public.android_apps;
DROP POLICY IF EXISTS "android_apps_delete_policy" ON public.android_apps;

DROP POLICY IF EXISTS "vscode_extensions_select_policy" ON public.vscode_extensions;
DROP POLICY IF EXISTS "vscode_extensions_insert_policy" ON public.vscode_extensions;
DROP POLICY IF EXISTS "vscode_extensions_update_policy" ON public.vscode_extensions;
DROP POLICY IF EXISTS "vscode_extensions_delete_policy" ON public.vscode_extensions;

-- 6. FORÇAR RELOAD DO SCHEMA CACHE - MÚLTIPLAS VEZES
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';
NOTIFY pgrst;

-- Aguardar um pouco
SELECT pg_sleep(2);

-- Reenviar notificações
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

-- 7. Verificar dados
SELECT 'android_apps' as tabela, COUNT(*) as total FROM public.android_apps;
SELECT 'vscode_extensions' as tabela, COUNT(*) as total FROM public.vscode_extensions;

-- 8. Mostrar dados
SELECT id, name, category, version FROM public.android_apps ORDER BY id;
SELECT id, name, category, version FROM public.vscode_extensions ORDER BY id;

-- ============================================
-- MENSAGEM FINAL
-- ============================================
SELECT '✅ PERMISSÕES REAPLICADAS E RELOAD FORÇADO' as status;
SELECT '⏳ AGUARDE 30 SEGUNDOS E DEPOIS:' as proximo_passo;
SELECT '1️⃣ Vá para: Project Settings > General' as passo_1;
SELECT '2️⃣ Clique em "Pause project"' as passo_2;
SELECT '3️⃣ Aguarde pausar completamente' as passo_3;
SELECT '4️⃣ Clique em "Unpause project"' as passo_4;
SELECT '5️⃣ Aguarde 1-2 minutos até voltar online' as passo_5;
SELECT '6️⃣ Recarregue a página da aplicação' as passo_6;
