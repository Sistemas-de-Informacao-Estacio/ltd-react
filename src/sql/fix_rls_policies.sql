-- ============================================
-- SCRIPT DE CORREÇÃO - POLÍTICAS RLS
-- ============================================
-- Execute este script no Supabase SQL Editor se as páginas
-- não estiverem mostrando os dados
-- ============================================

-- Remover políticas antigas
DROP POLICY IF EXISTS "Enable read access for published android apps" ON android_apps;
DROP POLICY IF EXISTS "Enable all for authenticated users on android apps" ON android_apps;
DROP POLICY IF EXISTS "Enable read access for published vscode extensions" ON vscode_extensions;
DROP POLICY IF EXISTS "Enable all for authenticated users on vscode extensions" ON vscode_extensions;

-- Criar novas políticas que permitem leitura pública
-- ANDROID APPS - Leitura pública sem restrições
CREATE POLICY "Public read access for android apps" 
ON android_apps FOR SELECT 
USING (true);

-- ANDROID APPS - Acesso completo para usuários autenticados
CREATE POLICY "Authenticated full access for android apps" 
ON android_apps FOR ALL 
USING (auth.uid() IS NOT NULL);

-- VSCODE EXTENSIONS - Leitura pública sem restrições
CREATE POLICY "Public read access for vscode extensions" 
ON vscode_extensions FOR SELECT 
USING (true);

-- VSCODE EXTENSIONS - Acesso completo para usuários autenticados
CREATE POLICY "Authenticated full access for vscode extensions" 
ON vscode_extensions FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Verificar se as políticas foram criadas
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive,
    cmd
FROM pg_policies
WHERE tablename IN ('android_apps', 'vscode_extensions')
ORDER BY tablename, policyname;

-- Testar se as políticas estão funcionando
SELECT 'android_apps' as tabela, COUNT(*) as total FROM android_apps;
SELECT 'vscode_extensions' as tabela, COUNT(*) as total FROM vscode_extensions;
