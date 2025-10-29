# 🎯 INSTRUÇÕES PASSO A PASSO - RESOLVER ERRO DAS TABELAS

## ❌ Erro Atual
```
Could not find the table 'public.android_apps' in the schema cache
Could not find the table 'public.vscode_extensions' in the schema cache
```

**Causa:** As tabelas não existem no banco de dados Supabase.

---

## ✅ SOLUÇÃO EM 5 PASSOS

### 📌 PASSO 1: Abrir Supabase

1. Acesse: https://supabase.com/dashboard
2. Faça login na sua conta
3. Selecione o projeto: **ezsjmevzlvhofdtbbwdn**

### 📌 PASSO 2: Abrir SQL Editor

1. Na barra lateral ESQUERDA, clique em **SQL Editor** (ícone de terminal)
2. Clique no botão **+ New Query** (canto superior direito)

### 📌 PASSO 3: Copiar e Colar o Script

1. Abra o arquivo: `/EXECUTE_NO_SUPABASE.sql` (na raiz do projeto)
2. Selecione TODO o conteúdo (Ctrl+A / Cmd+A)
3. Copie (Ctrl+C / Cmd+C)
4. Cole no SQL Editor do Supabase (Ctrl+V / Cmd+V)

### 📌 PASSO 4: Executar o Script

1. Clique no botão **RUN** (canto inferior direito)
   - Ou pressione: `Ctrl + Enter` (Windows) / `Cmd + Enter` (Mac)

2. Aguarde 2-3 segundos

### 📌 PASSO 5: Verificar Resultado

Você deve ver na parte inferior da tela:

✅ **Success. No rows returned**

E duas tabelas mostrando:

```
| resultado                      | total |
|-------------------------------|-------|
| SUCESSO! Apps inseridos:      | 3     |
| SUCESSO! Extensões inseridas: | 1     |
```

E depois os dados completos das tabelas.

---

## 🔍 VERIFICAR NO SITE

1. Volte para o terminal
2. Se o servidor não estiver rodando, execute:
   ```bash
   npm run dev
   ```

3. Abra no navegador:
   - Apps Android: http://localhost:5173/produtos/apps-android
   - Extensões VS Code: http://localhost:5173/produtos/vscode-extensions

4. Abra o Console (F12) e procure por:
   ```
   ✅ Apps carregados com sucesso: 3
   ```

---

## ❓ AINDA NÃO FUNCIONOU?

### Opção A: Verificar se as tabelas existem

No SQL Editor do Supabase, execute:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('android_apps', 'vscode_extensions');
```

**Deve retornar 2 linhas.**

### Opção B: Verificar dados

```sql
SELECT COUNT(*) FROM android_apps;
SELECT COUNT(*) FROM vscode_extensions;
```

**Deve retornar 3 e 1 respectivamente.**

### Opção C: Reexecutar do zero

Se ainda não funcionar, copie e execute este comando APENAS:

```sql
-- Limpar tudo
DROP TABLE IF EXISTS android_apps CASCADE;
DROP TABLE IF EXISTS vscode_extensions CASCADE;

-- Depois execute novamente o arquivo EXECUTE_NO_SUPABASE.sql
```

---

## 📸 PRINT DA TELA

Quando executar corretamente, você verá algo assim no Supabase:

```
Running...
Success. No rows returned (0.234s)

Results:
┌─────────────────────────────────┬───────┐
│ resultado                       │ total │
├─────────────────────────────────┼───────┤
│ SUCESSO! Apps inseridos:        │ 3     │
└─────────────────────────────────┴───────┘
```

---

## 🆘 ÚLTIMO RECURSO

Se NADA funcionar, me envie:

1. Print da tela do Supabase depois de executar o script
2. Print do console do navegador (F12) quando acessar as páginas
3. A mensagem de erro completa

---

## ✨ APÓS FUNCIONAR

As páginas devem mostrar:

**Apps Android:**
- 💼 NAF - Gestão Contábil
- 👥 Social Dev
- 📄 Currículo Bot IA

**Extensões VS Code:**
- Algorithm Complexity Analyzer Pro

Com todos os detalhes, avaliações e botões de download funcionando!
