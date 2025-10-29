-- ============================================
-- SCRIPT DE LIMPEZA - REMOVER TABELAS ANTIGAS
-- ============================================
-- Execute APENAS se as tabelas antigas ainda existirem
-- e estiverem causando conflito
-- ============================================

-- ⚠️ ATENÇÃO: Este script vai DELETAR as tabelas antigas!
-- Certifique-se de fazer backup dos dados se necessário

-- ============================================
-- 1. VERIFICAR TABELAS ANTIGAS
-- ============================================
SELECT 
    table_name,
    CASE 
        WHEN table_name IN ('ltd_android_apps', 'ltd_vscode_extensions') 
        THEN '⚠️ Tabela antiga encontrada - será removida'
        ELSE '✅ OK'
    END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('ltd_android_apps', 'ltd_vscode_extensions');

-- ============================================
-- 2. FAZER BACKUP DOS DADOS (OPCIONAL)
-- ============================================
-- Descomente as linhas abaixo se quiser fazer backup

-- CREATE TABLE IF NOT EXISTS backup_ltd_android_apps AS 
-- SELECT * FROM public.ltd_android_apps;

-- CREATE TABLE IF NOT EXISTS backup_ltd_vscode_extensions AS 
-- SELECT * FROM public.ltd_vscode_extensions;

-- ============================================
-- 3. REMOVER POLÍTICAS RLS DAS TABELAS ANTIGAS
-- ============================================
DROP POLICY IF EXISTS "Permitir leitura pública de apps publicados" ON public.ltd_android_apps;
DROP POLICY IF EXISTS "Admins podem ver todos os apps" ON public.ltd_android_apps;
DROP POLICY IF EXISTS "Apenas admins podem inserir apps" ON public.ltd_android_apps;
DROP POLICY IF EXISTS "Apenas admins podem atualizar apps" ON public.ltd_android_apps;
DROP POLICY IF EXISTS "Apenas admins podem deletar apps" ON public.ltd_android_apps;

DROP POLICY IF EXISTS "Permitir leitura pública de extensões publicadas" ON public.ltd_vscode_extensions;
DROP POLICY IF EXISTS "Admins podem ver todas as extensões" ON public.ltd_vscode_extensions;
DROP POLICY IF EXISTS "Apenas admins podem inserir extensões" ON public.ltd_vscode_extensions;
DROP POLICY IF EXISTS "Apenas admins podem atualizar extensões" ON public.ltd_vscode_extensions;
DROP POLICY IF EXISTS "Apenas admins podem deletar extensões" ON public.ltd_vscode_extensions;

-- ============================================
-- 4. REMOVER TRIGGERS DAS TABELAS ANTIGAS
-- ============================================
DROP TRIGGER IF EXISTS set_updated_at_ltd_android_apps ON public.ltd_android_apps;
DROP TRIGGER IF EXISTS set_updated_at_ltd_vscode_extensions ON public.ltd_vscode_extensions;

-- ============================================
-- 5. DELETAR TABELAS ANTIGAS
-- ============================================
DROP TABLE IF EXISTS public.ltd_android_apps CASCADE;
DROP TABLE IF EXISTS public.ltd_vscode_extensions CASCADE;

-- ============================================
-- 6. REMOVER FUNÇÕES ANTIGAS (SE EXISTIREM)
-- ============================================
-- Remover função de trigger se não for mais usada
-- DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;

-- ============================================
-- 7. VERIFICAR LIMPEZA
-- ============================================
SELECT 
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ Tabelas antigas removidas com sucesso!'
        ELSE '❌ Ainda existem tabelas antigas'
    END as status,
    COUNT(*) as tabelas_antigas_restantes
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('ltd_android_apps', 'ltd_vscode_extensions');

-- ============================================
-- 8. FORÇAR RELOAD DO SCHEMA
-- ============================================
NOTIFY pgrst, 'reload schema';

-- ============================================
-- 9. VERIFICAR TABELAS NOVAS
-- ============================================
SELECT 
    '✅ Verificação Final' as titulo,
    table_name as tabela,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = t.table_name) as colunas,
    CASE 
        WHEN table_name = 'produtos_android_apps' THEN 
            (SELECT COUNT(*) FROM public.produtos_android_apps)
        WHEN table_name = 'produtos_vscode_extensions' THEN 
            (SELECT COUNT(*) FROM public.produtos_vscode_extensions)
    END as registros
FROM information_schema.tables t
WHERE table_schema = 'public' 
AND table_name IN ('produtos_android_apps', 'produtos_vscode_extensions')
ORDER BY table_name;

-- ============================================
-- RESUMO
-- ============================================
-- Após executar este script:
-- ✅ Tabelas antigas removidas
-- ✅ Políticas antigas removidas
-- ✅ Triggers antigos removidos
-- ✅ Schema recarregado
-- ✅ Pronto para usar as novas tabelas!
-- ============================================

SELECT 
    '🎉 LIMPEZA CONCLUÍDA!' as mensagem,
    'Execute o script CRIAR_TABELAS_PRODUTOS.sql se ainda não executou' as proximos_passos;
