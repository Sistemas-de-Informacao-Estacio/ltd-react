-- =====================================================
-- SCRIPT SQL: ADICIONAR SLUG AUTOMÁTICO PARA BLOG POSTS
-- =====================================================
-- Data: 29 de outubro de 2025
-- Descrição: Adiciona função para gerar slug automaticamente
-- =====================================================

-- 1. Criar função para gerar slug a partir do título
CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
    slug TEXT;
BEGIN
    -- Converter para minúsculas e remover acentos
    slug := lower(unaccent(title));
    
    -- Substituir espaços e caracteres especiais por hífens
    slug := regexp_replace(slug, '[^a-z0-9]+', '-', 'g');
    
    -- Remover hífens do início e fim
    slug := trim(both '-' from slug);
    
    RETURN slug;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 2. Criar função para gerar slug único
CREATE OR REPLACE FUNCTION public.generate_unique_slug(title TEXT, post_id BIGINT DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 1;
    exists_slug BOOLEAN;
BEGIN
    -- Gerar slug base
    base_slug := generate_slug(title);
    final_slug := base_slug;
    
    -- Verificar se o slug já existe (excluindo o próprio post se for update)
    LOOP
        IF post_id IS NULL THEN
            SELECT EXISTS(SELECT 1 FROM public.blog_posts WHERE slug = final_slug) INTO exists_slug;
        ELSE
            SELECT EXISTS(SELECT 1 FROM public.blog_posts WHERE slug = final_slug AND id != post_id) INTO exists_slug;
        END IF;
        
        EXIT WHEN NOT exists_slug;
        
        final_slug := base_slug || '-' || counter;
        counter := counter + 1;
    END LOOP;
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- 3. Criar trigger para gerar slug automaticamente
CREATE OR REPLACE FUNCTION public.set_blog_post_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := generate_unique_slug(NEW.title, NEW.id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Criar trigger antes de inserir ou atualizar
DROP TRIGGER IF EXISTS trigger_set_blog_post_slug ON public.blog_posts;
CREATE TRIGGER trigger_set_blog_post_slug
    BEFORE INSERT OR UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.set_blog_post_slug();

-- 5. Atualizar posts existentes sem slug
UPDATE public.blog_posts
SET slug = generate_unique_slug(title, id)
WHERE slug IS NULL OR slug = '';

-- 6. Verificar se funcionou
SELECT id, title, slug FROM public.blog_posts ORDER BY created_at DESC;

-- =====================================================
-- SCRIPT CONCLUÍDO! ✅
-- =====================================================
