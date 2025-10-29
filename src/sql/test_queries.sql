-- ============================================
-- SCRIPT DE TESTES - APPS ANDROID E EXTENSÕES VSCODE
-- ============================================
-- Use estas queries no SQL Editor do Supabase para verificar
-- se os dados foram inseridos corretamente
-- ============================================

-- 1. Verificar se as tabelas existem
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('android_apps', 'vscode_extensions');

-- 2. Contar registros nas tabelas
SELECT 
    'android_apps' as tabela, 
    COUNT(*) as total_registros,
    COUNT(CASE WHEN published = true THEN 1 END) as publicados
FROM android_apps
UNION ALL
SELECT 
    'vscode_extensions' as tabela, 
    COUNT(*) as total_registros,
    COUNT(CASE WHEN published = true THEN 1 END) as publicados
FROM vscode_extensions;

-- 3. Listar todos os apps Android
SELECT id, name, category, published, created_at 
FROM android_apps 
ORDER BY created_at DESC;

-- 4. Listar todas as extensões VS Code
SELECT id, name, category, published, created_at 
FROM vscode_extensions 
ORDER BY created_at DESC;

-- 5. Ver detalhes completos dos apps Android publicados
SELECT * FROM android_apps WHERE published = true;

-- 6. Ver detalhes completos das extensões publicadas
SELECT * FROM vscode_extensions WHERE published = true;

-- 7. Verificar políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('android_apps', 'vscode_extensions');

-- 8. Verificar se RLS está ativo
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('android_apps', 'vscode_extensions');

-- ============================================
-- SE NÃO HOUVER DADOS, EXECUTE ESTES INSERTS:
-- ============================================

-- Inserir app Android de teste (descomente se necessário)
/*
INSERT INTO android_apps (
    name, description, category, icon, color_gradient, 
    features, tags, download_url, version, rating, downloads, published
) VALUES (
    'App de Teste',
    'Este é um app de teste para verificar se a tabela está funcionando',
    'Teste',
    '🧪',
    'from-green-500 to-blue-500',
    ARRAY['Teste 1', 'Teste 2', 'Teste 3'],
    ARRAY['teste', 'debug'],
    'https://exemplo.com/app.apk',
    '1.0.0',
    5.0,
    100,
    true
);
*/

-- Inserir extensão VS Code de teste (descomente se necessário)
/*
INSERT INTO vscode_extensions (
    name, description, category, features, tags, 
    marketplace_url, version, rating, installs, author, published
) VALUES (
    'Extensão de Teste',
    'Esta é uma extensão de teste para verificar se a tabela está funcionando',
    'Teste',
    ARRAY['Teste 1', 'Teste 2', 'Teste 3'],
    ARRAY['teste', 'debug'],
    'https://marketplace.visualstudio.com/test',
    '1.0.0',
    5.0,
    100,
    'Testador',
    true
);
*/

-- ============================================
-- COMANDOS PARA CORRIGIR PROBLEMAS COMUNS
-- ============================================

-- Se as políticas RLS estiverem bloqueando leitura pública, desative temporariamente:
-- ALTER TABLE android_apps DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE vscode_extensions DISABLE ROW LEVEL SECURITY;

-- Ou atualize as políticas para permitir leitura sem autenticação:
-- DROP POLICY IF EXISTS "Enable read access for published android apps" ON android_apps;
-- CREATE POLICY "Enable read access for published android apps" 
-- ON android_apps FOR SELECT 
-- USING (true);  -- Permite leitura para todos

-- DROP POLICY IF EXISTS "Enable read access for published vscode extensions" ON vscode_extensions;
-- CREATE POLICY "Enable read access for published vscode extensions" 
-- ON vscode_extensions FOR SELECT 
-- USING (true);  -- Permite leitura para todos
