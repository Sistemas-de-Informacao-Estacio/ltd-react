# 🔍 Guia de Troubleshooting - Apps Android e Extensões VS Code

## Problema: Páginas não mostram dados

### ✅ Passo 1: Verificar se as tabelas existem

Abra o **Supabase SQL Editor** e execute:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('android_apps', 'vscode_extensions');
```

**Resultado esperado:** Deve retornar 2 linhas com os nomes das tabelas.

---

### ✅ Passo 2: Verificar se há dados nas tabelas

```sql
SELECT 'android_apps' as tabela, COUNT(*) as total FROM android_apps;
SELECT 'vscode_extensions' as tabela, COUNT(*) as total FROM vscode_extensions;
```

**Resultado esperado:** 
- `android_apps`: 3 registros
- `vscode_extensions`: 1 registro

---

### ✅ Passo 3: Verificar políticas RLS

```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('android_apps', 'vscode_extensions');
```

**Resultado esperado:** Deve mostrar políticas para ambas as tabelas.

---

### ✅ Passo 4: SOLUÇÃO RÁPIDA - Permitir leitura pública

Execute o arquivo: `src/sql/fix_rls_policies.sql`

Ou copie e execute este código:

```sql
-- Remover políticas antigas
DROP POLICY IF EXISTS "Enable read access for published android apps" ON android_apps;
DROP POLICY IF EXISTS "Enable all for authenticated users on android apps" ON android_apps;
DROP POLICY IF EXISTS "Enable read access for published vscode extensions" ON vscode_extensions;
DROP POLICY IF EXISTS "Enable all for authenticated users on vscode extensions" ON vscode_extensions;

-- Criar novas políticas
CREATE POLICY "Public read access for android apps" 
ON android_apps FOR SELECT 
USING (true);

CREATE POLICY "Authenticated full access for android apps" 
ON android_apps FOR ALL 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Public read access for vscode extensions" 
ON vscode_extensions FOR SELECT 
USING (true);

CREATE POLICY "Authenticated full access for vscode extensions" 
ON vscode_extensions FOR ALL 
USING (auth.uid() IS NOT NULL);
```

---

### ✅ Passo 5: Verificar no Console do Navegador

1. Abra as páginas:
   - http://localhost:5173/produtos/apps-android
   - http://localhost:5173/produtos/vscode-extensions

2. Abra o **Console** (F12)

3. Verifique os logs:
   - `Buscando apps Android...` ou `Buscando extensões VS Code...`
   - `Resposta do Supabase: { data: [...], error: null }`

**Se houver erro:**
- Verifique a mensagem de erro no console
- O erro geralmente indica problema com RLS ou tabelas não criadas

---

### ✅ Passo 6: Teste direto no Supabase

```sql
-- Testar consulta igual ao React
SELECT * FROM android_apps WHERE published = true ORDER BY created_at DESC;
SELECT * FROM vscode_extensions WHERE published = true ORDER BY created_at DESC;
```

---

### ✅ Passo 7: Se ainda não funcionar - Desabilitar RLS temporariamente

⚠️ **APENAS PARA DESENVOLVIMENTO/TESTE**

```sql
ALTER TABLE android_apps DISABLE ROW LEVEL SECURITY;
ALTER TABLE vscode_extensions DISABLE ROW LEVEL SECURITY;
```

Depois de testar, reative:

```sql
ALTER TABLE android_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE vscode_extensions ENABLE ROW LEVEL SECURITY;
```

---

## 🎯 Checklist Final

- [ ] Tabelas `android_apps` e `vscode_extensions` existem
- [ ] Existem 3 apps Android e 1 extensão VS Code nas tabelas
- [ ] Políticas RLS permitem leitura pública (`USING (true)`)
- [ ] Campo `published` está como `true` nos registros
- [ ] Console do navegador mostra dados sendo retornados
- [ ] Páginas exibem os cards dos apps/extensões

---

## 📝 Próximos Passos

Depois que os dados aparecerem:

1. ✅ Testar filtros por categoria
2. ✅ Testar botões de download
3. ✅ Acessar painel admin: `/admin/android-apps` e `/admin/vscode-extensions`
4. ✅ Testar CRUD completo (criar, editar, excluir)

---

## 🆘 Ainda com problemas?

Execute este comando completo no SQL Editor:

```sql
-- Reset completo (cuidado, isso apaga os dados!)
DROP TABLE IF EXISTS android_apps CASCADE;
DROP TABLE IF EXISTS vscode_extensions CASCADE;

-- Depois execute novamente o arquivo:
-- src/sql/android_apps_vscode_extensions.sql
```
