-- =============================================
-- FORÇAR ATUALIZAÇÃO DO SCHEMA CACHE
-- =============================================
-- Execute TODOS os comandos abaixo em sequência
-- =============================================

-- 1. Recarregar o schema
NOTIFY pgrst, 'reload schema';

-- 2. Recarregar a configuração
NOTIFY pgrst, 'reload config';

-- 3. Conceder permissões explícitas para acesso anônimo
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.android_apps TO anon;
GRANT SELECT ON public.vscode_extensions TO anon;
GRANT ALL ON public.android_apps TO authenticated;
GRANT ALL ON public.vscode_extensions TO authenticated;

-- 4. Verificar permissões
SELECT grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name IN ('android_apps', 'vscode_extensions')
ORDER BY table_name, grantee;
