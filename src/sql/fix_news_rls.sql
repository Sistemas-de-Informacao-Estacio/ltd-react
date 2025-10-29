-- ============================================
-- CORRIGIR POLÍTICAS RLS DA TABELA NEWS
-- ============================================

-- 1. Verificar se a tabela existe
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'news'
);

-- 2. Verificar se RLS está habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'news';

-- 3. Verificar políticas existentes
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'news';

-- 4. Verificar dados na tabela
SELECT id, title, category, published, created_at 
FROM news 
ORDER BY created_at DESC;

-- ============================================
-- SOLUÇÃO: RECRIAR POLÍTICAS RLS
-- ============================================

-- Desabilitar RLS temporariamente
ALTER TABLE news DISABLE ROW LEVEL SECURITY;

-- Remover políticas antigas (se existirem)
DROP POLICY IF EXISTS "Enable read access for published news" ON news;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON news;
DROP POLICY IF EXISTS "Enable read access for all users" ON news;
DROP POLICY IF EXISTS "Public news are viewable by everyone" ON news;

-- Habilitar RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Criar política de leitura pública (PERMITE LEITURA ANÔNIMA)
CREATE POLICY "Public news are viewable by everyone" 
ON news FOR SELECT 
USING (published = true);

-- Criar política para usuários autenticados (TODAS OPERAÇÕES)
CREATE POLICY "Enable all for authenticated users" 
ON news FOR ALL 
USING (auth.role() = 'authenticated');

-- ============================================
-- VERIFICAR RESULTADO
-- ============================================

-- Verificar se as políticas foram criadas
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename = 'news';

-- Testar consulta como usuário anônimo
SELECT COUNT(*) as total_news_published FROM news WHERE published = true;
