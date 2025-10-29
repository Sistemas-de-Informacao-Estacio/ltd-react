-- ============================================
-- SCRIPT DE TESTE RÁPIDO
-- Execute para verificar se tudo está OK
-- ============================================

-- ============================================
-- 1. VERIFICAR SE AS TABELAS EXISTEM
-- ============================================
SELECT 
    '✅ Tabela existe' as status,
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('produtos_android_apps', 'produtos_vscode_extensions')

UNION ALL

SELECT 
    '❌ Tabela NÃO existe' as status,
    unnest(ARRAY['produtos_android_apps', 'produtos_vscode_extensions']) as table_name,
    NULL as table_type
WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('produtos_android_apps', 'produtos_vscode_extensions')
);

-- ============================================
-- 2. VERIFICAR QUANTIDADE DE REGISTROS
-- ============================================
SELECT 
    '📱 Apps Android' as tipo,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE published = true) as publicados,
    COUNT(*) FILTER (WHERE published = false) as nao_publicados
FROM public.produtos_android_apps

UNION ALL

SELECT 
    '💻 Extensões VS Code' as tipo,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE published = true) as publicados,
    COUNT(*) FILTER (WHERE published = false) as nao_publicados
FROM public.produtos_vscode_extensions;

-- ============================================
-- 3. LISTAR APPS ANDROID PUBLICADOS
-- ============================================
SELECT 
    '📱 APPS ANDROID' as tipo,
    name as nome,
    category as categoria,
    version as versao,
    rating as avaliacao,
    downloads,
    published as publicado
FROM public.produtos_android_apps
ORDER BY created_at DESC;

-- ============================================
-- 4. LISTAR EXTENSÕES VS CODE PUBLICADAS
-- ============================================
SELECT 
    '💻 EXTENSÕES VS CODE' as tipo,
    name as nome,
    category as categoria,
    version as versao,
    rating as avaliacao,
    installs as instalacoes,
    author as autor,
    published as publicado
FROM public.produtos_vscode_extensions
ORDER BY created_at DESC;

-- ============================================
-- 5. VERIFICAR POLÍTICAS RLS
-- ============================================
SELECT 
    tablename as tabela,
    policyname as politica,
    cmd as comando,
    roles as funcoes,
    CASE 
        WHEN qual IS NOT NULL THEN '✅ Com filtro'
        ELSE '⚠️ Sem filtro'
    END as status_filtro
FROM pg_policies 
WHERE tablename IN ('produtos_android_apps', 'produtos_vscode_extensions')
ORDER BY tablename, policyname;

-- ============================================
-- 6. VERIFICAR PERMISSÕES
-- ============================================
SELECT 
    table_name as tabela,
    grantee as usuario,
    string_agg(privilege_type, ', ') as permissoes
FROM information_schema.table_privileges 
WHERE table_name IN ('produtos_android_apps', 'produtos_vscode_extensions')
GROUP BY table_name, grantee
ORDER BY table_name, grantee;

-- ============================================
-- 7. VERIFICAR ÍNDICES
-- ============================================
SELECT 
    tablename as tabela,
    indexname as indice,
    indexdef as definicao
FROM pg_indexes
WHERE tablename IN ('produtos_android_apps', 'produtos_vscode_extensions')
ORDER BY tablename, indexname;

-- ============================================
-- 8. TESTE DE LEITURA COMO USUÁRIO ANÔNIMO
-- ============================================
-- Este teste simula o acesso da API REST
SET ROLE anon;

-- Deve retornar apenas apps publicados
SELECT 
    'Teste anon: Apps' as teste,
    COUNT(*) as quantidade
FROM public.produtos_android_apps
WHERE published = true;

-- Deve retornar apenas extensões publicadas
SELECT 
    'Teste anon: Extensões' as teste,
    COUNT(*) as quantidade
FROM public.produtos_vscode_extensions
WHERE published = true;

-- Voltar ao usuário normal
RESET ROLE;

-- ============================================
-- 9. VERIFICAR TRIGGERS
-- ============================================
SELECT 
    event_object_table as tabela,
    trigger_name as trigger,
    event_manipulation as evento,
    action_statement as acao
FROM information_schema.triggers
WHERE event_object_table IN ('produtos_android_apps', 'produtos_vscode_extensions')
ORDER BY event_object_table, trigger_name;

-- ============================================
-- 10. RESUMO FINAL
-- ============================================
SELECT 
    '🎉 RESUMO FINAL' as titulo,
    (SELECT COUNT(*) FROM information_schema.tables 
     WHERE table_schema = 'public' 
     AND table_name IN ('produtos_android_apps', 'produtos_vscode_extensions')) as tabelas_criadas,
    (SELECT COUNT(*) FROM public.produtos_android_apps) as total_apps,
    (SELECT COUNT(*) FROM public.produtos_vscode_extensions) as total_extensoes,
    (SELECT COUNT(*) FROM pg_policies 
     WHERE tablename IN ('produtos_android_apps', 'produtos_vscode_extensions')) as politicas_rls,
    CASE 
        WHEN (SELECT COUNT(*) FROM information_schema.tables 
              WHERE table_schema = 'public' 
              AND table_name IN ('produtos_android_apps', 'produtos_vscode_extensions')) = 2 
        THEN '✅ TUDO OK!'
        ELSE '❌ ERRO: Tabelas não encontradas'
    END as status;

-- ============================================
-- INTERPRETAÇÃO DOS RESULTADOS:
-- ============================================
-- ✅ tabelas_criadas = 2 → Sucesso!
-- ✅ total_apps >= 3 → Dados de exemplo inseridos
-- ✅ total_extensoes >= 3 → Dados de exemplo inseridos
-- ✅ politicas_rls >= 10 → Segurança configurada
-- ✅ status = "TUDO OK!" → Sistema pronto!
-- ============================================
