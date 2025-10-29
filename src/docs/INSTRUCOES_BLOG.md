# 📝 Instruções - Tabela de Blog Posts

## 🎯 Problema Resolvido

Erro ao acessar `/outros/blog` e painel admin:
```
Could not find the table 'public.blogs' in the schema cache
```

## ✅ Solução Implementada

Criada nova tabela `blog_posts` com estrutura completa e funcionalidades avançadas.

---

## 📋 Passo a Passo para Executar

### 1️⃣ Acessar o Supabase

1. Acesse: https://supabase.com/dashboard
2. Faça login
3. Selecione o projeto: `ezsjmevzlvhofdtbbwdn`
4. Clique em **SQL Editor** no menu lateral

### 2️⃣ Criar a Tabela de Blog Posts

1. Abra o arquivo: `src/sql/criar_tabela_blog.sql`
2. **Copie TODO o conteúdo** do arquivo
3. Cole no **SQL Editor** do Supabase
4. Clique em **Run** ou pressione `Ctrl + Enter`
5. Aguarde a mensagem: ✅ **Success. No rows returned**

### 3️⃣ Adicionar Geração Automática de Slug (Opcional)

1. Abra o arquivo: `src/sql/adicionar_slug_blog.sql`
2. **Copie TODO o conteúdo** do arquivo
3. Cole no **SQL Editor** do Supabase
4. Clique em **Run** ou pressione `Ctrl + Enter`
5. Aguarde a confirmação

### 4️⃣ Verificar a Tabela

Execute no SQL Editor:

```sql
-- Ver estrutura da tabela
SELECT * FROM public.blog_posts ORDER BY created_at DESC;

-- Verificar políticas RLS
SELECT * FROM pg_policies WHERE tablename = 'blog_posts';

-- Testar permissões
SELECT has_table_privilege('anon', 'blog_posts', 'SELECT');
SELECT has_table_privilege('authenticated', 'blog_posts', 'INSERT');
```

---

## 🗂️ Estrutura da Tabela

### Campos da Tabela `blog_posts`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | BIGSERIAL | ID único (auto-incremento) |
| `title` | TEXT | Título do post |
| `slug` | TEXT | URL amigável (único, gerado automaticamente) |
| `content` | TEXT | Conteúdo HTML do post |
| `excerpt` | TEXT | Resumo/descrição curta |
| `author` | TEXT | Nome do autor |
| `category` | TEXT | Categoria do post |
| `tags` | TEXT[] | Array de tags |
| `featured_image` | TEXT | URL da imagem de destaque |
| `published` | BOOLEAN | Se está publicado |
| `views` | INTEGER | Contador de visualizações |
| `likes` | INTEGER | Contador de curtidas |
| `created_at` | TIMESTAMPTZ | Data de criação |
| `updated_at` | TIMESTAMPTZ | Data de atualização |
| `published_at` | TIMESTAMPTZ | Data de publicação |

### Índices Criados

- `idx_blog_posts_published` - Otimiza busca por posts publicados
- `idx_blog_posts_slug` - Otimiza busca por slug (URL)
- `idx_blog_posts_category` - Otimiza busca por categoria
- `idx_blog_posts_created_at` - Otimiza ordenação por data
- `idx_blog_posts_published_at` - Otimiza ordenação por data de publicação
- `idx_blog_posts_tags` - Otimiza busca por tags (GIN index)

### Triggers Automáticos

1. **update_blog_posts_updated_at** - Atualiza `updated_at` automaticamente
2. **update_blog_posts_published_at** - Define `published_at` quando publicado
3. **set_blog_post_slug** - Gera slug único automaticamente

---

## 🔒 Políticas de Segurança (RLS)

### Para Usuários Anônimos (público)
- ✅ **Leitura** - Apenas posts com `published = true`

### Para Usuários Autenticados (admin)
- ✅ **Leitura** - Todos os posts
- ✅ **Criação** - Criar novos posts
- ✅ **Atualização** - Editar posts
- ✅ **Exclusão** - Deletar posts

---

## 🔄 Componentes Atualizados

### 1. `Blog.jsx`
- ✅ Atualizado para usar `blog_posts`
- Local: `src/Components/Blog.jsx`
- Rota: `/outros/blog`

### 2. `BlogManagement.jsx`
- ✅ Atualizado para usar `blog_posts`
- Local: `src/Components/Admin/BlogManagement.jsx`
- Rota: `/admin/blog`

---

## 🧪 Teste no Frontend

### Testar a Página Pública

1. Acesse: `http://localhost:5173/outros/blog`
2. Verifique se os posts aparecem
3. Clique em um post para ver os detalhes
4. Teste os filtros de categoria
5. Teste a busca por palavra-chave

### Testar o Painel Admin

1. Faça login: `http://localhost:5173/admin/login`
2. Acesse: `http://localhost:5173/admin/blog`
3. Teste criar um novo post:
   - Clique em **Novo Post**
   - Preencha os campos
   - Clique em **Criar Post**
4. Teste editar um post:
   - Clique no ícone de edição
   - Modifique os campos
   - Clique em **Atualizar Post**
5. Teste deletar um post:
   - Clique no ícone de lixeira
   - Confirme a exclusão

---

## 📊 Dados de Exemplo

O script cria automaticamente 3 posts de exemplo:

1. **Bem-vindo ao Blog da LTD Estácio**
   - Categoria: Novidades
   - Tags: tecnologia, blog, ltd

2. **Introdução ao Desenvolvimento Web Moderno**
   - Categoria: Desenvolvimento
   - Tags: web, react, javascript, frontend

3. **Segurança Cibernética: Melhores Práticas**
   - Categoria: Segurança
   - Tags: segurança, cybersecurity, boas-praticas

---

## 🚨 Troubleshooting

### Erro: "table already exists"

```sql
-- Execute para limpar e recriar
DROP TABLE IF EXISTS public.blog_posts CASCADE;
-- Depois execute o script criar_tabela_blog.sql novamente
```

### Erro: "permission denied"

```sql
-- Execute para corrigir permissões
GRANT ALL ON public.blog_posts TO authenticated;
GRANT SELECT ON public.blog_posts TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.blog_posts_id_seq TO authenticated;
```

### Erro: "Could not find the table in schema cache"

```sql
-- Force reload do schema
NOTIFY pgrst, 'reload schema';

-- Ou reinicie o PostgREST no Supabase Dashboard:
-- Settings > API > Restart PostgREST
```

### Posts não aparecem no frontend

```sql
-- Verifique se há posts publicados
SELECT id, title, published FROM public.blog_posts;

-- Se não houver, publique alguns:
UPDATE public.blog_posts SET published = true;
```

---

## 🎨 Funcionalidades do Blog

### No Frontend (`/outros/blog`)
- ✅ Listagem de posts publicados
- ✅ Filtro por categoria
- ✅ Busca por palavra-chave
- ✅ Visualização completa do post
- ✅ Imagem de destaque
- ✅ Tags
- ✅ Tempo de leitura estimado
- ✅ Data de publicação formatada
- ✅ Nome do autor

### No Painel Admin (`/admin/blog`)
- ✅ Criar novos posts
- ✅ Editar posts existentes
- ✅ Deletar posts
- ✅ Publicar/Despublicar
- ✅ Adicionar imagem de destaque
- ✅ Adicionar tags (separadas por vírgula)
- ✅ Escolher categoria
- ✅ Definir autor
- ✅ Escrever conteúdo em HTML
- ✅ Visualização em tabela
- ✅ Indicador de status (Publicado/Rascunho)

---

## 📝 Notas Importantes

1. **Slug Automático**: O slug é gerado automaticamente a partir do título
2. **HTML no Conteúdo**: Você pode usar HTML para formatar o conteúdo
3. **Tags**: Separe as tags por vírgula no formulário
4. **Imagens**: Use URLs externas ou faça upload no Supabase Storage
5. **SEO**: Use o campo `excerpt` para meta descriptions
6. **Backup**: Faça backup antes de executar scripts SQL

---

## ✅ Checklist Final

- [ ] Script `criar_tabela_blog.sql` executado com sucesso
- [ ] Script `adicionar_slug_blog.sql` executado (opcional)
- [ ] Tabela `blog_posts` criada no Supabase
- [ ] Políticas RLS configuradas
- [ ] Posts de exemplo aparecendo
- [ ] Componente `Blog.jsx` testado
- [ ] Componente `BlogManagement.jsx` testado
- [ ] CRUD funcionando (Criar, Ler, Atualizar, Deletar)
- [ ] Filtros e busca funcionando
- [ ] Visualização de posts individuais funcionando

---

## 🎉 Conclusão

Após executar todos os passos, você terá:

- ✅ Tabela de blog totalmente funcional
- ✅ Sistema de posts com rich features
- ✅ Geração automática de slugs
- ✅ Painel admin completo
- ✅ Página pública de blog
- ✅ Segurança RLS configurada
- ✅ Performance otimizada com índices

**Qualquer dúvida, consulte a documentação do Supabase ou este guia!**

---

*Última atualização: 29 de outubro de 2025*
