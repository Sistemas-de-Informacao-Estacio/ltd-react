-- =============================================
-- EXECUTAR NO SUPABASE SQL EDITOR
-- =============================================
-- Copie TUDO e cole no SQL Editor do Supabase
-- Clique em RUN
-- =============================================

-- Passo 1: Remover tudo que possa existir
DROP TABLE IF EXISTS android_apps CASCADE;
DROP TABLE IF EXISTS vscode_extensions CASCADE;

-- Passo 2: Criar tabela android_apps
CREATE TABLE android_apps (
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    icon text DEFAULT '📱',
    color_gradient text DEFAULT 'from-blue-500 to-purple-600',
    features text[],
    tags text[],
    download_url text NOT NULL,
    version text NOT NULL,
    rating numeric(3,1) DEFAULT 4.5,
    downloads integer DEFAULT 0,
    published boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Passo 3: Criar tabela vscode_extensions
CREATE TABLE vscode_extensions (
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    features text[],
    tags text[],
    marketplace_url text NOT NULL,
    version text NOT NULL,
    rating numeric(3,1) DEFAULT 4.5,
    installs integer DEFAULT 0,
    author text DEFAULT 'LTD Team',
    published boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Passo 4: DESABILITAR RLS (para acesso público total)
ALTER TABLE android_apps DISABLE ROW LEVEL SECURITY;
ALTER TABLE vscode_extensions DISABLE ROW LEVEL SECURITY;

-- Passo 5: Inserir 3 apps Android
INSERT INTO android_apps (name, description, category, icon, color_gradient, features, tags, download_url, version, rating, downloads) VALUES
('NAF - Gestão Contábil', 'Sistema completo de gestão contábil e fiscal para pequenas e médias empresas.', 'Produtividade', '💼', 'from-blue-600 to-indigo-700', ARRAY['Controle financeiro', 'Emissão NF-e', 'Relatórios', 'Integração bancária'], ARRAY['contabilidade', 'gestão'], 'https://naf.ltdestacio.com.br/apk/naf.apk', '2.5.1', 4.7, 15000),
('Social Dev', 'Rede social exclusiva para desenvolvedores compartilharem conhecimento.', 'Social', '👥', 'from-purple-600 to-pink-600', ARRAY['Feed técnico', 'Perfil profissional', 'Mensagens', 'Eventos'], ARRAY['desenvolvedores', 'networking'], 'https://socialdev.ltdestacio.com.br/apk/socialdev.apk', '1.8.3', 4.9, 28000),
('Currículo Bot IA', 'Assistente inteligente para criação de currículos profissionais.', 'Ferramentas', '📄', 'from-green-600 to-teal-600', ARRAY['IA conversacional', 'Templates ATS', 'Exportação PDF'], ARRAY['currículo', 'emprego'], 'https://curriculobot.ltdestacio.com.br/apk/curriculobot.apk', '3.1.0', 4.8, 42000);

-- Passo 6: Inserir 1 extensão VS Code
INSERT INTO vscode_extensions (name, description, category, features, tags, marketplace_url, version, rating, installs, author) VALUES
('Algorithm Complexity Analyzer Pro', 'Análise automática de complexidade de algoritmos em tempo real.', 'Análise de Código', ARRAY['Análise Big O', 'Otimização', 'Visualização', 'Multi-linguagem'], ARRAY['algoritmos', 'performance'], 'https://marketplace.visualstudio.com/items?itemName=EstevamSouza.algorithm-complexity-analyzer-pro', '1.4.2', 4.9, 125000, 'Estevam Souza');

-- Passo 7: Verificar se deu certo
SELECT 'SUCESSO! Apps inseridos:' as resultado, COUNT(*) as total FROM android_apps;
SELECT 'SUCESSO! Extensões inseridas:' as resultado, COUNT(*) as total FROM vscode_extensions;

-- Teste final - deve retornar dados
SELECT * FROM android_apps;
SELECT * FROM vscode_extensions;
