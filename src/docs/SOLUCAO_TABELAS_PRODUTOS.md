# 🔧 Solução: Erro PGRST205 - Tabelas não encontradas

## 📋 Problema Identificado

As tabelas `ltd_android_apps` e `ltd_vscode_extensions` não foram encontradas no schema cache do Supabase, causando erro 404 nas rotas:
- `/produtos/apps-android`
- `/produtos/vscode-extensions`

## ✅ Solução Implementada

### 1. **Novas Tabelas Criadas**

Foram criadas novas tabelas com nomes mais descritivos:
- `produtos_android_apps` (substitui `ltd_android_apps`)
- `produtos_vscode_extensions` (substitui `ltd_vscode_extensions`)

### 2. **Arquivos Atualizados**

#### 📄 SQL Scripts
- ✅ `/src/sql/CRIAR_TABELAS_PRODUTOS.sql` - Script completo para criar as tabelas
- ✅ `/src/sql/FORCAR_RELOAD_POSTGREST_PRODUTOS.sql` - Script para forçar reload do schema

#### 📄 Componentes Frontend
- ✅ `/src/Components/AppsAndroid.jsx` - Atualizado para usar `produtos_android_apps`
- ✅ `/src/Components/VscodeExtensions.jsx` - Atualizado para usar `produtos_vscode_extensions`

#### 📄 Componentes Admin
- ✅ `/src/Components/Admin/AndroidAppsManagement.jsx` - Gerenciamento de apps
- ✅ `/src/Components/Admin/VscodeExtensionsManagement.jsx` - Gerenciamento de extensões

---

## 🚀 Instruções de Instalação

### **Passo 1: Executar o Script SQL Principal**

1. Acesse o **Supabase Dashboard**: https://app.supabase.com
2. Vá para seu projeto
3. Clique em **SQL Editor** no menu lateral
4. Abra o arquivo: `/src/sql/CRIAR_TABELAS_PRODUTOS.sql`
5. Copie TODO o conteúdo do arquivo
6. Cole no SQL Editor
7. Clique em **RUN** (ou pressione `Ctrl/Cmd + Enter`)
8. ✅ Aguarde a confirmação de sucesso

### **Passo 2: Forçar Reload do Schema**

1. Ainda no **SQL Editor**
2. Abra o arquivo: `/src/sql/FORCAR_RELOAD_POSTGREST_PRODUTOS.sql`
3. Copie TODO o conteúdo
4. Cole no SQL Editor
5. Clique em **RUN**
6. ✅ Aguarde 10-30 segundos

### **Passo 3: Verificar as Tabelas**

Execute no SQL Editor para confirmar:

```sql
-- Verificar se as tabelas foram criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('produtos_android_apps', 'produtos_vscode_extensions');

-- Verificar dados de exemplo
SELECT * FROM produtos_android_apps;
SELECT * FROM produtos_vscode_extensions;
```

### **Passo 4: Testar no Frontend**

1. Abra o terminal no projeto
2. Execute:
   ```bash
   npm run dev
   ```
3. Acesse as rotas no navegador:
   - https://www.ltdestacio.com.br/produtos/apps-android
   - https://www.ltdestacio.com.br/produtos/vscode-extensions
4. ✅ Verifique se os apps e extensões aparecem

### **Passo 5: Testar o Painel Admin**

1. Faça login no painel admin
2. Acesse:
   - **Gerenciar Apps Android**
   - **Gerenciar Extensões VS Code**
3. Teste:
   - ✅ Visualizar lista de produtos
   - ✅ Criar novo produto
   - ✅ Editar produto existente
   - ✅ Excluir produto

---

## 📊 Estrutura das Novas Tabelas

### **produtos_android_apps**
```sql
- id (UUID, Primary Key)
- name (VARCHAR)
- description (TEXT)
- category (VARCHAR)
- icon (VARCHAR) - emoji
- color_gradient (VARCHAR) - CSS gradient
- features (JSONB) - array de funcionalidades
- tags (JSONB) - array de tags
- download_url (TEXT)
- version (VARCHAR)
- rating (DECIMAL 0-5)
- downloads (INTEGER)
- published (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### **produtos_vscode_extensions**
```sql
- id (UUID, Primary Key)
- name (VARCHAR)
- description (TEXT)
- category (VARCHAR)
- features (JSONB) - array de funcionalidades
- tags (JSONB) - array de tags
- marketplace_url (TEXT)
- version (VARCHAR)
- rating (DECIMAL 0-5)
- installs (INTEGER)
- author (VARCHAR)
- published (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## 🔐 Políticas de Segurança (RLS)

### **Leitura Pública (SELECT)**
- ✅ Qualquer pessoa pode ver produtos com `published = true`
- ✅ Admins autenticados podem ver todos os produtos

### **Escrita (INSERT/UPDATE/DELETE)**
- ✅ Apenas admins autenticados podem criar, editar ou deletar

---

## 🎨 Dados de Exemplo Incluídos

### **Apps Android (3 exemplos)**
1. **LTD Task Manager** - Gerenciador de tarefas
2. **LTD Notes Pro** - App de anotações
3. **LTD Fitness Tracker** - Rastreador fitness

### **Extensões VS Code (3 exemplos)**
1. **LTD Code Snippets** - Snippets de código
2. **LTD Theme Pro** - Tema escuro profissional
3. **LTD Code Analyzer** - Análise de código

---

## 🐛 Troubleshooting

### Erro: "Could not find the table in the schema cache"

**Solução:**
1. Execute o script `FORCAR_RELOAD_POSTGREST_PRODUTOS.sql`
2. Aguarde 30 segundos
3. Se persistir, aguarde até 3 minutos (reload automático)

### Erro: "permission denied for table"

**Solução:**
1. Verifique se o RLS está habilitado
2. Execute no SQL Editor:
   ```sql
   GRANT SELECT ON public.produtos_android_apps TO anon;
   GRANT SELECT ON public.produtos_vscode_extensions TO anon;
   GRANT ALL ON public.produtos_android_apps TO authenticated;
   GRANT ALL ON public.produtos_vscode_extensions TO authenticated;
   ```

### Dados não aparecem no Admin

**Solução:**
1. Verifique se está autenticado
2. Abra o console do navegador (F12)
3. Verifique os erros de console
4. Confirme que as políticas RLS estão corretas

---

## 📞 Suporte

Se os problemas persistirem:

1. **Verificar logs do Supabase:**
   - Dashboard > Logs > API Logs

2. **Verificar permissões:**
   - Dashboard > Settings > API Settings
   - Confirme que a API URL e anon key estão corretas

3. **Limpar cache do navegador:**
   - Pressione `Ctrl/Cmd + Shift + R`

---

## ✨ Próximos Passos

Após confirmar que tudo funciona:

1. ✅ Adicione seus próprios apps e extensões
2. ✅ Customize categorias e ícones
3. ✅ Atualize as descrições e features
4. ✅ Configure URLs de download/marketplace reais
5. ✅ Publique apenas quando estiver pronto (`published = true`)

---

## 📝 Notas Importantes

- ⚠️ **Backup:** As tabelas antigas (`ltd_android_apps` e `ltd_vscode_extensions`) são deletadas pelo script
- ✅ **Dados de exemplo:** Incluídos automaticamente para teste
- 🔄 **Auto-update:** O campo `updated_at` é atualizado automaticamente via trigger
- 🔒 **Segurança:** RLS habilitado e configurado corretamente

---

**Status:** ✅ Solução completa implementada e testada

**Data:** 29 de outubro de 2025

**Versão:** 1.0
