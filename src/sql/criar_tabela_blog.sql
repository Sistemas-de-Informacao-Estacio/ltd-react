-- =====================================================
-- SCRIPT SQL: CRIAR TABELA DE BLOG POSTS
-- =====================================================
-- Data: 29 de outubro de 2025
-- Descrição: Cria a tabela blog_posts com RLS policies
-- =====================================================

-- 1. Remover tabela antiga se existir
DROP TABLE IF EXISTS public.blogs CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;

-- 2. Criar a nova tabela blog_posts
CREATE TABLE public.blog_posts (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author TEXT NOT NULL DEFAULT 'LTD Estácio',
    category TEXT NOT NULL DEFAULT 'Geral',
    tags TEXT[] DEFAULT '{}',
    featured_image TEXT,
    published BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- 3. Criar índices para otimização
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_created_at ON public.blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- 4. Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Criar trigger para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS trigger_update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER trigger_update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_blog_posts_updated_at();

-- 6. Criar função para atualizar published_at
CREATE OR REPLACE FUNCTION public.update_blog_posts_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.published = true AND OLD.published = false THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Criar trigger para atualizar published_at automaticamente
DROP TRIGGER IF EXISTS trigger_update_blog_posts_published_at ON public.blog_posts;
CREATE TRIGGER trigger_update_blog_posts_published_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_blog_posts_published_at();

-- 8. Habilitar RLS (Row Level Security)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 9. Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Permitir leitura pública de posts publicados" ON public.blog_posts;
DROP POLICY IF EXISTS "Permitir leitura de todos os posts para autenticados" ON public.blog_posts;
DROP POLICY IF EXISTS "Permitir inserção para autenticados" ON public.blog_posts;
DROP POLICY IF EXISTS "Permitir atualização para autenticados" ON public.blog_posts;
DROP POLICY IF EXISTS "Permitir exclusão para autenticados" ON public.blog_posts;

-- 10. Criar políticas RLS

-- Política 1: Permitir leitura pública apenas de posts publicados
CREATE POLICY "Permitir leitura pública de posts publicados"
ON public.blog_posts
FOR SELECT
TO public
USING (published = true);

-- Política 2: Permitir leitura de todos os posts para usuários autenticados
CREATE POLICY "Permitir leitura de todos os posts para autenticados"
ON public.blog_posts
FOR SELECT
TO authenticated
USING (true);

-- Política 3: Permitir inserção para usuários autenticados
CREATE POLICY "Permitir inserção para autenticados"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política 4: Permitir atualização para usuários autenticados
CREATE POLICY "Permitir atualização para autenticados"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Política 5: Permitir exclusão para usuários autenticados
CREATE POLICY "Permitir exclusão para autenticados"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (true);

-- 11. Conceder permissões
GRANT ALL ON public.blog_posts TO authenticated;
GRANT SELECT ON public.blog_posts TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.blog_posts_id_seq TO authenticated;

-- 12. Inserir dados de exemplo
INSERT INTO public.blog_posts (title, slug, content, excerpt, author, category, tags, featured_image, published) VALUES
(
    'Bem-vindo ao Blog da LTD Estácio',
    'bem-vindo-ao-blog-ltd-estacio',
    '<h2>Olá, seja bem-vindo!</h2><p>Este é o primeiro post do nosso blog. Aqui você encontrará artigos sobre tecnologia, desenvolvimento de software, segurança cibernética e muito mais.</p><p>Fique atento às nossas atualizações!</p>',
    'Conheça o blog da LTD Estácio e fique por dentro das novidades em tecnologia.',
    'Equipe LTD',
    'Novidades',
    ARRAY['tecnologia', 'blog', 'ltd'],
    'https://via.placeholder.com/800x400/4F46E5/ffffff?text=Blog+LTD',
    true
),
(
    'Introdução ao Desenvolvimento Web Moderno',
    'introducao-desenvolvimento-web-moderno',
    '<h2>O que é Desenvolvimento Web Moderno?</h2><p>O desenvolvimento web moderno envolve o uso de tecnologias como React, Vue.js, Angular e muito mais.</p><h3>Principais Tecnologias:</h3><ul><li>React</li><li>TypeScript</li><li>Tailwind CSS</li><li>Node.js</li></ul>',
    'Descubra as principais tecnologias do desenvolvimento web moderno.',
    'João Silva',
    'Desenvolvimento',
    ARRAY['web', 'react', 'javascript', 'frontend'],
    'https://via.placeholder.com/800x400/10B981/ffffff?text=Dev+Web',
    true
),
(
    'Segurança Cibernética: Melhores Práticas',
    'seguranca-cibernetica-melhores-praticas',
    '<h2>Proteja suas Aplicações</h2><p>A segurança cibernética é fundamental no desenvolvimento de aplicações modernas.</p><h3>Dicas Importantes:</h3><ol><li>Use HTTPS sempre</li><li>Implemente autenticação forte</li><li>Mantenha dependências atualizadas</li><li>Faça backups regulares</li></ol>',
    'Aprenda as melhores práticas de segurança para suas aplicações.',
    'Maria Santos',
    'Segurança',
    ARRAY['segurança', 'cybersecurity', 'boas-praticas'],
    'https://via.placeholder.com/800x400/EF4444/ffffff?text=Segurança',
    true
);

-- 13. Verificar dados inseridos
SELECT 
    id,
    title,
    slug,
    author,
    category,
    published,
    created_at
FROM public.blog_posts
ORDER BY created_at DESC;

-- 14. Notificar PostgREST para recarregar o schema
NOTIFY pgrst, 'reload schema';

-- =====================================================
-- SCRIPT CONCLUÍDO COM SUCESSO! ✅
-- =====================================================
-- Próximos passos:
-- 1. Execute este script no SQL Editor do Supabase
-- 2. Verifique se a tabela foi criada corretamente
-- 3. Teste as políticas RLS
-- 4. Atualize os componentes React para usar 'blog_posts'
-- =====================================================
