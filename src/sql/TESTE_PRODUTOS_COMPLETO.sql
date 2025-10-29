-- =====================================================
-- TESTE RÁPIDO: VERIFICAR PRODUTOS
-- =====================================================
-- Execute este script para verificar se tudo está funcionando
-- =====================================================

-- 1. VERIFICAR SE AS TABELAS EXISTEM
SELECT 
    'produtos_android_apps' as tabela,
    COUNT(*) as total_registros,
    COUNT(*) FILTER (WHERE published = true) as publicados,
    COUNT(*) FILTER (WHERE published = false) as nao_publicados
FROM produtos_android_apps

UNION ALL

SELECT 
    'produtos_vscode_extensions' as tabela,
    COUNT(*) as total_registros,
    COUNT(*) FILTER (WHERE published = true) as publicados,
    COUNT(*) FILTER (WHERE published = false) as nao_publicados
FROM produtos_vscode_extensions;

-- =====================================================

-- 2. LISTAR APPS ANDROID PUBLICADOS
SELECT 
    name,
    version,
    rating,
    downloads,
    published,
    created_at
FROM produtos_android_apps
WHERE published = true
ORDER BY created_at DESC
LIMIT 10;

-- =====================================================

-- 3. LISTAR EXTENSÕES VS CODE PUBLICADAS
SELECT 
    name,
    version,
    rating,
    installs,
    publisher,
    published,
    created_at
FROM produtos_vscode_extensions
WHERE published = true
ORDER BY created_at DESC
LIMIT 10;

-- =====================================================

-- 4. VERIFICAR POLÍTICAS RLS
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    CASE 
        WHEN qual IS NOT NULL THEN 'COM FILTRO'
        ELSE 'SEM FILTRO'
    END as filtro_status
FROM pg_policies
WHERE tablename IN ('produtos_android_apps', 'produtos_vscode_extensions')
ORDER BY tablename, cmd;

-- =====================================================

-- 5. VERIFICAR PERMISSÕES
SELECT 
    grantee as usuario,
    table_name as tabela,
    STRING_AGG(privilege_type, ', ' ORDER BY privilege_type) as permissoes
FROM information_schema.role_table_grants
WHERE table_name IN ('produtos_android_apps', 'produtos_vscode_extensions')
GROUP BY grantee, table_name
ORDER BY table_name, grantee;

-- =====================================================

-- 6. VERIFICAR ÍNDICES
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename IN ('produtos_android_apps', 'produtos_vscode_extensions')
ORDER BY tablename, indexname;

-- =====================================================

-- 7. TESTE DE INSERÇÃO (EXEMPLO)
-- Descomente as linhas abaixo para testar inserção

/*
INSERT INTO produtos_android_apps (
    name, 
    description, 
    download_url, 
    version, 
    size, 
    downloads, 
    rating, 
    published
) VALUES (
    'Teste App',
    'App de teste',
    'https://example.com/test.apk',
    '1.0.0',
    '10 MB',
    0,
    4.0,
    false
) RETURNING *;
*/

/*
INSERT INTO produtos_vscode_extensions (
    name, 
    description, 
    download_url, 
    version, 
    publisher, 
    installs, 
    rating, 
    published
) VALUES (
    'Teste Extension',
    'Extensão de teste',
    'https://marketplace.visualstudio.com/test',
    '1.0.0',
    'LTD Team',
    0,
    4.0,
    false
) RETURNING *;
*/

-- =====================================================

-- 8. ESTATÍSTICAS DAS TABELAS
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS tamanho_total,
    n_live_tup as linhas_ativas,
    n_dead_tup as linhas_mortas
FROM pg_stat_user_tables
WHERE tablename IN ('produtos_android_apps', 'produtos_vscode_extensions')
ORDER BY tablename;

-- =====================================================
-- FIM DOS TESTES
-- =====================================================
-- ✅ Se todos os testes retornarem resultados, está tudo OK!
-- ❌ Se algum teste falhar, revise a criação das tabelas
-- =====================================================
