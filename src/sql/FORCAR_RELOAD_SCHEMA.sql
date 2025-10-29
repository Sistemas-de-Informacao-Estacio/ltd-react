-- =====================================================
-- FORÇAR RELOAD DO SCHEMA NO SUPABASE
-- =====================================================
-- Execute este script após criar as tabelas para garantir
-- que o PostgREST reconheça as novas tabelas
-- =====================================================

-- Notificar PostgREST para recarregar o schema
NOTIFY pgrst, 'reload schema';

-- Verificar se as tabelas existem
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as num_columns
FROM information_schema.tables t
WHERE table_schema = 'public' 
AND table_name IN ('produtos_android_apps', 'produtos_vscode_extensions');

-- Verificar políticas RLS ativas
SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename IN ('produtos_android_apps', 'produtos_vscode_extensions')
ORDER BY tablename, cmd;

-- Verificar permissões
SELECT 
    grantee,
    table_name,
    privilege_type
FROM information_schema.role_table_grants
WHERE table_name IN ('produtos_android_apps', 'produtos_vscode_extensions')
ORDER BY table_name, grantee;

-- =====================================================
-- INFORMAÇÕES IMPORTANTES:
-- =====================================================
-- Após executar este script, aguarde 10-30 segundos
-- para que o PostgREST atualize seu cache
-- Se ainda não funcionar, reinicie a API REST no painel:
-- Settings > API > Restart API
-- =====================================================
