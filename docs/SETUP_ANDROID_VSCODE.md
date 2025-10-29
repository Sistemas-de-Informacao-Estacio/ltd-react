# 🚀 Guia de Instalação - Apps Android e Extensões VS Code

## ⚠️ IMPORTANTE: Execute este script primeiro!

### Passo 1: Abrir Supabase SQL Editor

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor** (barra lateral esquerda)

### Passo 2: Executar o Script de Reset

Copie TODO o conteúdo do arquivo:
```
src/sql/reset_android_vscode.sql
```

Cole no SQL Editor e clique em **RUN** (ou pressione Ctrl/Cmd + Enter)

### Passo 3: Verificar Resultado

Você deve ver no console:

```
✓ Tabelas criadas com sucesso!
==========================================
Apps Android inseridos: 3
Extensões VS Code inseridas: 1
==========================================
RLS configurado com acesso público
Sistema pronto para uso!
```

E uma tabela mostrando:
```
ANDROID_APPS      | total: 3 | publicados: 3
VSCODE_EXTENSIONS | total: 1 | publicados: 1
```

---

## 🔍 Testar no Navegador

### Passo 1: Abrir o site

```bash
cd /Users/cliente/Desktop/ltd-apps/ltd-react
npm run dev
```

### Passo 2: Acessar as páginas

1. **Apps Android:** http://localhost:5173/produtos/apps-android
2. **Extensões VS Code:** http://localhost:5173/produtos/vscode-extensions

### Passo 3: Verificar Console (F12)

Você deve ver os logs:

```
🔍 Buscando apps Android no Supabase...
📦 Resposta do Supabase: { data: Array(3), error: null, count: 3 }
✅ Apps carregados com sucesso: 3
```

---

## ❌ Solução de Problemas

### Erro: "relation android_apps does not exist"

**Solução:** Execute o script `reset_android_vscode.sql` no Supabase

### Erro: "permission denied for table android_apps"

**Solução:** As políticas RLS estão bloqueando. Execute:

```sql
DROP POLICY IF EXISTS "allow_public_read_android_apps" ON android_apps;
DROP POLICY IF EXISTS "allow_public_read_vscode_extensions" ON vscode_extensions;

CREATE POLICY "allow_all_android_apps" ON android_apps FOR ALL USING (true);
CREATE POLICY "allow_all_vscode_extensions" ON vscode_extensions FOR ALL USING (true);
```

### Nenhum dado aparece mas não há erro

**Verificar se os dados foram inseridos:**

```sql
SELECT COUNT(*) FROM android_apps;
SELECT COUNT(*) FROM vscode_extensions;
```

Se retornar 0, execute novamente os INSERTs do `reset_android_vscode.sql`

---

## ✅ Checklist de Verificação

- [ ] Script `reset_android_vscode.sql` executado no Supabase
- [ ] Console do Supabase mostra "✓ Tabelas criadas com sucesso!"
- [ ] `SELECT * FROM android_apps` retorna 3 registros
- [ ] `SELECT * FROM vscode_extensions` retorna 1 registro
- [ ] Site rodando em http://localhost:5173
- [ ] Console do navegador (F12) mostra "✅ Apps carregados com sucesso"
- [ ] Página `/produtos/apps-android` exibe 3 cards
- [ ] Página `/produtos/vscode-extensions` exibe 1 card

---

## 🎯 Próximos Passos (Admin)

Depois que as páginas públicas funcionarem:

1. Acessar: http://localhost:5173/admin
2. Login: `admin` / `admin123`
3. Testar CRUD:
   - `/admin/android-apps` - Gerenciar Apps Android
   - `/admin/vscode-extensions` - Gerenciar Extensões VS Code

---

## 📞 Suporte

Se após executar o script ainda não funcionar, verifique:

1. **URL do Supabase** em `src/lib/supabase.js` está correta
2. **Chave Anon Key** está correta
3. **Projeto do Supabase** está ativo (não pausado)
4. **Console do navegador** mostra os logs de debug

### Comando de Diagnóstico Completo

Execute no Supabase SQL Editor:

```sql
-- Ver estrutura das tabelas
\d android_apps
\d vscode_extensions

-- Contar registros
SELECT 'android_apps' as tabela, COUNT(*) FROM android_apps
UNION ALL
SELECT 'vscode_extensions', COUNT(*) FROM vscode_extensions;

-- Ver políticas RLS
SELECT tablename, policyname FROM pg_policies 
WHERE tablename IN ('android_apps', 'vscode_extensions');

-- Testar consulta igual ao React
SELECT * FROM android_apps WHERE published = true;
SELECT * FROM vscode_extensions WHERE published = true;
```
