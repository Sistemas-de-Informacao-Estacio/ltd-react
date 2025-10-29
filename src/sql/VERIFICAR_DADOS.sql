-- =============================================
-- VERIFICAR SE HÁ DADOS NAS TABELAS
-- =============================================

-- Contar registros
SELECT 'android_apps' as tabela, COUNT(*) as total FROM android_apps;
SELECT 'vscode_extensions' as tabela, COUNT(*) as total FROM vscode_extensions;

-- Ver os dados completos
SELECT * FROM android_apps;
SELECT * FROM vscode_extensions;

-- Se retornar 0 registros, execute os INSERTs do arquivo EXECUTE_NO_SUPABASE.sql
