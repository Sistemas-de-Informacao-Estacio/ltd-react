# 📱 Guia Completo: Configurar Produtos (Apps Android & VS Code Extensions)

## 🔴 PROBLEMA IDENTIFICADO

Os erros ocorrem porque as tabelas não existem no schema cache do Supabase:

```
PGRST205: Could not find the table 'public.ltd_android_apps' in the schema cache
PGRST205: Could not find the table 'public.ltd_vscode_extensions' in the schema cache
```

## ✅ SOLUÇÃO: NOVAS TABELAS

Criamos novas tabelas com nomes corretos:
- `produtos_android_apps` (substitui `ltd_android_apps`)
- `produtos_vscode_extensions` (substitui `ltd_vscode_extensions`)

---

## 📋 PASSO A PASSO (EXECUTE NESTA ORDEM)

### **PASSO 1: Acessar o Supabase SQL Editor**

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Clique em **SQL Editor** no menu lateral

---

### **PASSO 2: Executar Script Principal**

1. Abra o arquivo: `src/sql/CRIAR_NOVAS_TABELAS_PRODUTOS.sql`
2. **COPIE TODO O CONTEÚDO** do arquivo
3. Cole no SQL Editor do Supabase
4. Clique em **RUN** ou pressione `Ctrl+Enter`
5. ✅ Aguarde a mensagem de sucesso

**O que este script faz:**
- Remove tabelas antigas (se existirem)
- Cria `produtos_android_apps` com todos os campos necessários
- Cria `produtos_vscode_extensions` com todos os campos necessários
- Configura RLS (Row Level Security)
- Cria políticas de acesso público e autenticado
- Garante permissões corretas
- Insere dados de exemplo

---

### **PASSO 3: Forçar Reload do Schema**

1. Abra o arquivo: `src/sql/FORCAR_RELOAD_SCHEMA.sql`
2. **COPIE TODO O CONTEÚDO** do arquivo
3. Cole no SQL Editor do Supabase
4. Clique em **RUN** ou pressione `Ctrl+Enter`
5. ✅ Verifique se as tabelas aparecem nos resultados

**O que este script faz:**
- Notifica o PostgREST para recarregar o schema
- Verifica se as tabelas foram criadas
- Lista políticas RLS ativas
- Mostra permissões configuradas

---

### **PASSO 4: Aguardar Propagação**

⏳ **IMPORTANTE:** Aguarde 10-30 segundos para que o PostgREST atualize o cache

Se após 30 segundos ainda não funcionar, vá para o **PASSO 5**.

---

### **PASSO 5: Reiniciar API REST (Se necessário)**

Se ainda tiver erro após 30 segundos:

1. No Supabase Dashboard, vá em **Settings** → **API**
2. Clique em **Restart API** (ou Reload API)
3. Aguarde a API reiniciar (30-60 segundos)
4. ✅ Teste novamente

---

### **PASSO 6: Testar no Frontend**

1. Acesse: `https://www.ltdestacio.com.br/produtos/apps-android`
2. Acesse: `https://www.ltdestacio.com.br/produtos/vscode-extensions`
3. Abra o Console do navegador (F12)
4. ✅ Verifique se os dados aparecem sem erros

**Você deve ver:**
```
🔍 Buscando apps Android no Supabase...
📍 Tabela: produtos_android_apps
✅ Apps carregados com sucesso: X
```

---

## 🗂️ ESTRUTURA DAS TABELAS

### **produtos_android_apps**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (gerado automaticamente) |
| name | VARCHAR(255) | Nome do app |
| description | TEXT | Descrição completa |
| icon_url | TEXT | URL do ícone |
| download_url | TEXT | URL de download do APK |
| version | VARCHAR(50) | Versão (ex: 1.0.0) |
| size | VARCHAR(50) | Tamanho do app (ex: 5.2 MB) |
| downloads | INTEGER | Número de downloads |
| rating | DECIMAL(2,1) | Avaliação (0.0 a 5.0) |
| published | BOOLEAN | Se está publicado ou não |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

### **produtos_vscode_extensions**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (gerado automaticamente) |
| name | VARCHAR(255) | Nome da extensão |
| description | TEXT | Descrição completa |
| icon_url | TEXT | URL do ícone |
| download_url | TEXT | URL no marketplace |
| version | VARCHAR(50) | Versão (ex: 1.0.0) |
| publisher | VARCHAR(255) | Nome do publicador |
| installs | INTEGER | Número de instalações |
| rating | DECIMAL(2,1) | Avaliação (0.0 a 5.0) |
| published | BOOLEAN | Se está publicado ou não |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

---

## 🔐 POLÍTICAS RLS (Row Level Security)

As seguintes políticas foram configuradas automaticamente:

### **Para o Público (Anônimo)**
- ✅ **SELECT**: Pode visualizar apenas registros com `published = true`

### **Para Usuários Autenticados (Admin)**
- ✅ **SELECT**: Pode visualizar todos os registros
- ✅ **INSERT**: Pode criar novos registros
- ✅ **UPDATE**: Pode atualizar registros existentes
- ✅ **DELETE**: Pode excluir registros

---

## 🛠️ GERENCIAR NO PAINEL ADMIN

### **Acessar Painel Admin**

1. Acesse: `https://www.ltdestacio.com.br/admin`
2. Faça login com suas credenciais
3. Clique em **Apps Android** ou **VS Code Extensions**

### **Adicionar Novo App Android**

1. Clique em **Novo App**
2. Preencha os campos:
   - Nome do App
   - Descrição
   - URL de Download
   - Versão
   - Tamanho
   - Rating
   - Categoria
3. Marque **Publicado** se quiser exibir publicamente
4. Clique em **Criar**

### **Adicionar Nova Extensão VS Code**

1. Clique em **Nova Extensão**
2. Preencha os campos:
   - Nome da Extensão
   - Descrição
   - URL do Marketplace
   - Versão
   - Publicador
   - Rating
   - Categoria
3. Marque **Publicado** se quiser exibir publicamente
4. Clique em **Criar**

---

## 🧪 VERIFICAR SE ESTÁ FUNCIONANDO

### **Opção 1: Via Console do Navegador**

1. Abra a página de produtos (F12 para abrir console)
2. Você deve ver:
```
🔍 Buscando apps Android no Supabase...
📍 Tabela: produtos_android_apps
📦 Resposta do Supabase: {data: Array(X), error: null, count: X}
✅ Apps carregados com sucesso: X
```

### **Opção 2: Via SQL Editor**

Execute no Supabase SQL Editor:

```sql
-- Verificar apps Android
SELECT COUNT(*) as total FROM produtos_android_apps WHERE published = true;

-- Verificar extensões VS Code
SELECT COUNT(*) as total FROM produtos_vscode_extensions WHERE published = true;
```

### **Opção 3: Via Postman/Thunder Client**

```bash
# Apps Android
GET https://ezsjmevzlvhofdtbbwdn.supabase.co/rest/v1/produtos_android_apps?select=*&published=eq.true

# VS Code Extensions
GET https://ezsjmevzlvhofdtbbwdn.supabase.co/rest/v1/produtos_vscode_extensions?select=*&published=eq.true
```

---

## ❌ TROUBLESHOOTING

### **Erro: "Could not find the table in the schema cache"**

**Solução:**
1. Execute `FORCAR_RELOAD_SCHEMA.sql`
2. Aguarde 30 segundos
3. Reinicie a API REST no Supabase Dashboard
4. Teste novamente

---

### **Erro: "permission denied for table"**

**Solução:**
1. Verifique se RLS está habilitado:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('produtos_android_apps', 'produtos_vscode_extensions');
```

2. Re-execute o script `CRIAR_NOVAS_TABELAS_PRODUTOS.sql`

---

### **Erro: "No rows returned" mas a tabela existe**

**Solução:**
1. Verifique se há dados publicados:
```sql
SELECT * FROM produtos_android_apps WHERE published = true;
```

2. Se não houver dados, insira via painel Admin ou SQL

---

### **Erro no Painel Admin: "Erro ao carregar dados"**

**Solução:**
1. Verifique se está autenticado
2. Abra o console do navegador (F12)
3. Verifique os erros no console
4. Certifique-se de que as políticas RLS estão corretas

---

## 📝 ARQUIVOS MODIFICADOS

### **Scripts SQL Criados:**
- ✅ `src/sql/CRIAR_NOVAS_TABELAS_PRODUTOS.sql` - Script principal
- ✅ `src/sql/FORCAR_RELOAD_SCHEMA.sql` - Forçar reload do schema

### **Componentes Atualizados:**
- ✅ `src/Components/AppsAndroid.jsx` - Usa `produtos_android_apps`
- ✅ `src/Components/VscodeExtensions.jsx` - Usa `produtos_vscode_extensions`
- ✅ `src/Components/Admin/AndroidAppsManagement.jsx` - Gerencia apps
- ✅ `src/Components/Admin/VscodeExtensionsManagement.jsx` - Gerencia extensões

---

## 🎯 RESUMO RÁPIDO

```bash
# 1. Executar no Supabase SQL Editor
→ CRIAR_NOVAS_TABELAS_PRODUTOS.sql

# 2. Forçar reload
→ FORCAR_RELOAD_SCHEMA.sql

# 3. Aguardar 30 segundos

# 4. (Se necessário) Reiniciar API no Dashboard

# 5. Testar no frontend
→ /produtos/apps-android
→ /produtos/vscode-extensions

# 6. Adicionar dados via Admin
→ /admin (fazer login)
```

---

## ✅ CHECKLIST FINAL

- [ ] Executei `CRIAR_NOVAS_TABELAS_PRODUTOS.sql` no Supabase
- [ ] Executei `FORCAR_RELOAD_SCHEMA.sql` no Supabase
- [ ] Aguardei 30 segundos para propagação
- [ ] Verifiquei no console do navegador (sem erros)
- [ ] Testei a rota `/produtos/apps-android`
- [ ] Testei a rota `/produtos/vscode-extensions`
- [ ] Consegui acessar o painel Admin
- [ ] Consegui adicionar novos produtos via Admin
- [ ] Os produtos aparecem no frontend

---

## 🆘 SUPORTE

Se após seguir todos os passos ainda tiver problemas:

1. Copie os erros do console do navegador
2. Verifique os logs do Supabase Dashboard
3. Entre em contato com a equipe de desenvolvimento

---

**Documento criado em:** 29 de outubro de 2025  
**Versão:** 1.0  
**Autor:** LTD Estácio Development Team
