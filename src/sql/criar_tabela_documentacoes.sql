-- ============================================
-- SCRIPT COMPLETO PARA TABELA DE DOCUMENTAÇÕES
-- Data: 29/10/2025
-- ============================================

-- 1. REMOVER TABELA ANTIGA SE EXISTIR
DROP TABLE IF EXISTS public.documentacoes CASCADE;

-- 2. CRIAR TABELA DOCUMENTACOES
CREATE TABLE public.documentacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    descricao TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    tecnologia VARCHAR(100) NOT NULL, -- ex: Node.js, Python, Docker, Git, Golang, etc
    categoria VARCHAR(100) NOT NULL, -- ex: Backend, Análise de Dados, DevOps, Versionamento, etc
    nivel VARCHAR(50) NOT NULL DEFAULT 'Intermediário', -- Iniciante, Intermediário, Avançado
    tempo_leitura INTEGER DEFAULT 10, -- em minutos
    icon_url TEXT,
    cover_image TEXT,
    tags TEXT[], -- array de tags
    autor VARCHAR(255) DEFAULT 'Equipe LTD',
    published BOOLEAN DEFAULT true,
    destaque BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CRIAR ÍNDICES PARA PERFORMANCE
CREATE INDEX idx_documentacoes_slug ON public.documentacoes(slug);
CREATE INDEX idx_documentacoes_tecnologia ON public.documentacoes(tecnologia);
CREATE INDEX idx_documentacoes_categoria ON public.documentacoes(categoria);
CREATE INDEX idx_documentacoes_published ON public.documentacoes(published);
CREATE INDEX idx_documentacoes_destaque ON public.documentacoes(destaque);
CREATE INDEX idx_documentacoes_created_at ON public.documentacoes(created_at DESC);

-- 4. CRIAR TRIGGER PARA ATUALIZAR updated_at
CREATE OR REPLACE FUNCTION update_documentacoes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_documentacoes_updated_at
    BEFORE UPDATE ON public.documentacoes
    FOR EACH ROW
    EXECUTE FUNCTION update_documentacoes_updated_at();

-- 5. HABILITAR RLS (Row Level Security)
ALTER TABLE public.documentacoes ENABLE ROW LEVEL SECURITY;

-- 6. CRIAR POLICIES DE SEGURANÇA

-- Policy para SELECT: Todos podem ler documentações publicadas
CREATE POLICY "Permitir leitura pública de documentações publicadas"
ON public.documentacoes
FOR SELECT
USING (published = true);

-- Policy para SELECT (Admin): Admin pode ver todas
CREATE POLICY "Admin pode ver todas as documentações"
ON public.documentacoes
FOR SELECT
TO authenticated
USING (true);

-- Policy para INSERT: Apenas usuários autenticados podem inserir
CREATE POLICY "Usuários autenticados podem inserir documentações"
ON public.documentacoes
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy para UPDATE: Apenas usuários autenticados podem atualizar
CREATE POLICY "Usuários autenticados podem atualizar documentações"
ON public.documentacoes
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy para DELETE: Apenas usuários autenticados podem deletar
CREATE POLICY "Usuários autenticados podem deletar documentações"
ON public.documentacoes
FOR DELETE
TO authenticated
USING (true);

-- 7. INSERIR DADOS DE EXEMPLO
INSERT INTO public.documentacoes (titulo, slug, descricao, conteudo, tecnologia, categoria, nivel, tempo_leitura, tags, destaque) VALUES
(
    'Servidor Express com Node.js',
    'servidor-express-nodejs',
    'Aprenda a criar um servidor web completo utilizando Express.js, o framework mais popular do Node.js.',
    '# Servidor Express com Node.js

## Introdução
Express.js é um framework web minimalista e flexível para Node.js que fornece recursos robustos para aplicações web e mobile.

## Instalação

```bash
npm init -y
npm install express
```

## Código Básico

```javascript
const express = require(''express'');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Rota básica
app.get(''/'', (req, res) => {
  res.json({ message: ''Bem-vindo ao Express!'' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

## Rotas Avançadas

```javascript
// GET
app.get(''/api/users'', (req, res) => {
  res.json({ users: [] });
});

// POST
app.post(''/api/users'', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: 1, name, email });
});

// PUT
app.put(''/api/users/:id'', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Usuário ${id} atualizado` });
});

// DELETE
app.delete(''/api/users/:id'', (req, res) => {
  res.status(204).send();
});
```

## Middleware Personalizado

```javascript
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);
```

## Tratamento de Erros

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: ''Erro interno do servidor'' });
});
```

## Conclusão
Com Express.js você pode criar APIs REST completas de forma rápida e eficiente.',
    'Node.js',
    'Backend',
    'Intermediário',
    15,
    ARRAY['Node.js', 'Express', 'Backend', 'API', 'JavaScript'],
    true
),
(
    'API REST com Python e Flask',
    'api-rest-python-flask',
    'Construa APIs REST modernas e eficientes usando Python e o microframework Flask.',
    '# API REST com Python e Flask

## Introdução
Flask é um microframework Python para desenvolvimento web que torna fácil criar APIs REST.

## Instalação

```bash
pip install flask flask-cors
```

## Estrutura Básica

```python
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route(''/'')
def home():
    return jsonify({''message'': ''API Flask funcionando!''})

if __name__ == ''__main__'':
    app.run(debug=True, port=5000)
```

## CRUD Completo

```python
# Dados simulados
users = []

# GET - Listar todos
@app.route(''/api/users'', methods=[''GET''])
def get_users():
    return jsonify(users), 200

# GET - Buscar por ID
@app.route(''/api/users/<int:user_id>'', methods=[''GET''])
def get_user(user_id):
    user = next((u for u in users if u[''id''] == user_id), None)
    if user:
        return jsonify(user), 200
    return jsonify({''error'': ''Usuário não encontrado''}), 404

# POST - Criar
@app.route(''/api/users'', methods=[''POST''])
def create_user():
    data = request.get_json()
    new_user = {
        ''id'': len(users) + 1,
        ''name'': data.get(''name''),
        ''email'': data.get(''email'')
    }
    users.append(new_user)
    return jsonify(new_user), 201

# PUT - Atualizar
@app.route(''/api/users/<int:user_id>'', methods=[''PUT''])
def update_user(user_id):
    user = next((u for u in users if u[''id''] == user_id), None)
    if user:
        data = request.get_json()
        user.update(data)
        return jsonify(user), 200
    return jsonify({''error'': ''Usuário não encontrado''}), 404

# DELETE
@app.route(''/api/users/<int:user_id>'', methods=[''DELETE''])
def delete_user(user_id):
    global users
    users = [u for u in users if u[''id''] != user_id]
    return '''', 204
```

## Validação de Dados

```python
from functools import wraps

def validate_user(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        data = request.get_json()
        if not data.get(''name'') or not data.get(''email''):
            return jsonify({''error'': ''Dados inválidos''}), 400
        return f(*args, **kwargs)
    return decorated_function

@app.route(''/api/users'', methods=[''POST''])
@validate_user
def create_user():
    # código aqui
    pass
```

## Conclusão
Flask é perfeito para criar APIs REST rápidas e escaláveis em Python.',
    'Python',
    'Backend',
    'Intermediário',
    20,
    ARRAY['Python', 'Flask', 'API REST', 'Backend'],
    true
),
(
    'Análise de Dados com Python',
    'analise-dados-python',
    'Domine análise de dados usando Pandas, NumPy e Matplotlib para extrair insights valiosos.',
    '# Análise de Dados com Python

## Introdução
Python é a linguagem mais popular para análise de dados, com bibliotecas poderosas como Pandas, NumPy e Matplotlib.

## Instalação

```bash
pip install pandas numpy matplotlib seaborn
```

## Pandas Básico

```python
import pandas as pd
import numpy as np

# Criar DataFrame
df = pd.DataFrame({
    ''nome'': [''Ana'', ''Bruno'', ''Carlos''],
    ''idade'': [25, 30, 35],
    ''salario'': [3000, 4500, 5000]
})

# Visualizar dados
print(df.head())
print(df.info())
print(df.describe())
```

## Leitura de Arquivos

```python
# CSV
df = pd.read_csv(''dados.csv'')

# Excel
df = pd.read_excel(''dados.xlsx'')

# JSON
df = pd.read_json(''dados.json'')
```

## Manipulação de Dados

```python
# Filtrar
maiores_30 = df[df[''idade''] > 30]

# Ordenar
df_ordenado = df.sort_values(''salario'', ascending=False)

# Agrupar
media_por_categoria = df.groupby(''categoria'')[''valor''].mean()

# Adicionar coluna
df[''bonus''] = df[''salario''] * 0.1
```

## Visualização

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Gráfico de barras
df[''idade''].plot(kind=''bar'')
plt.title(''Distribuição de Idades'')
plt.show()

# Gráfico de pizza
df[''categoria''].value_counts().plot(kind=''pie'')
plt.show()

# Heatmap de correlação
sns.heatmap(df.corr(), annot=True)
plt.show()
```

## Limpeza de Dados

```python
# Remover valores nulos
df_limpo = df.dropna()

# Preencher valores nulos
df[''coluna''] = df[''coluna''].fillna(0)

# Remover duplicatas
df = df.drop_duplicates()
```

## Conclusão
Com estas ferramentas você pode realizar análises de dados profissionais e extrair insights valiosos.',
    'Python',
    'Análise de Dados',
    'Intermediário',
    25,
    ARRAY['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Science'],
    true
),
(
    'Produtividade com Docker',
    'produtividade-docker',
    'Aprenda Docker do zero e containerize suas aplicações para desenvolvimento e produção.',
    '# Produtividade com Docker

## Introdução
Docker permite criar, implantar e executar aplicações em containers, garantindo que funcionem em qualquer ambiente.

## Instalação
Baixe o Docker Desktop em: https://www.docker.com/products/docker-desktop

## Conceitos Básicos

```bash
# Verificar versão
docker --version

# Listar containers
docker ps
docker ps -a

# Listar imagens
docker images
```

## Dockerfile

```dockerfile
# Node.js
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```dockerfile
# Python
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## Comandos Essenciais

```bash
# Build imagem
docker build -t meu-app .

# Executar container
docker run -p 3000:3000 meu-app

# Executar em background
docker run -d -p 3000:3000 --name app meu-app

# Ver logs
docker logs app

# Parar container
docker stop app

# Remover container
docker rm app

# Remover imagem
docker rmi meu-app
```

## Docker Compose

```yaml
version: ''3.8''

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - .:/app
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=senha123
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
# Subir todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar tudo
docker-compose down
```

## Boas Práticas

1. Use imagens oficiais e leves (alpine)
2. Minimize camadas no Dockerfile
3. Use .dockerignore
4. Não armazene senhas no Dockerfile
5. Use volumes para dados persistentes

## Conclusão
Docker revoluciona o desenvolvimento e deploy de aplicações, garantindo consistência entre ambientes.',
    'Docker',
    'DevOps',
    'Intermediário',
    18,
    ARRAY['Docker', 'Containers', 'DevOps', 'Deploy'],
    true
),
(
    'Comandos Principais do Git',
    'comandos-git-essenciais',
    'Domine os comandos Git mais importantes para controle de versão eficiente.',
    '# Comandos Principais do Git

## Introdução
Git é o sistema de controle de versão mais usado no mundo, essencial para qualquer desenvolvedor.

## Configuração Inicial

```bash
# Configurar nome e email
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Ver configurações
git config --list
```

## Comandos Básicos

```bash
# Inicializar repositório
git init

# Clonar repositório
git clone https://github.com/usuario/repo.git

# Status dos arquivos
git status

# Adicionar arquivos
git add arquivo.txt
git add .

# Commit
git commit -m "Mensagem do commit"

# Histórico
git log
git log --oneline
```

## Branches

```bash
# Listar branches
git branch

# Criar branch
git branch nova-feature

# Mudar de branch
git checkout nova-feature
# ou
git switch nova-feature

# Criar e mudar
git checkout -b feature-login

# Deletar branch
git branch -d feature-login
```

## Merge e Rebase

```bash
# Merge
git checkout main
git merge feature-login

# Rebase
git checkout feature-login
git rebase main
```

## Remoto

```bash
# Adicionar remoto
git remote add origin https://github.com/user/repo.git

# Ver remotos
git remote -v

# Push
git push origin main
git push -u origin main

# Pull
git pull origin main

# Fetch
git fetch origin
```

## Desfazer Mudanças

```bash
# Descartar mudanças locais
git checkout -- arquivo.txt

# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Desfazer último commit (descarta mudanças)
git reset --hard HEAD~1

# Reverter commit (cria novo commit)
git revert abc123
```

## Stash

```bash
# Guardar mudanças temporariamente
git stash

# Listar stashes
git stash list

# Aplicar stash
git stash apply
git stash pop

# Deletar stash
git stash drop
```

## Tags

```bash
# Criar tag
git tag v1.0.0

# Listar tags
git tag

# Push tags
git push origin --tags
```

## Arquivo .gitignore

```
# Node
node_modules/
.env

# Python
__pycache__/
*.pyc
venv/

# IDEs
.vscode/
.idea/
```

## Conclusão
Dominar Git é fundamental para trabalhar em equipe e manter histórico organizado do seu código.',
    'Git',
    'Versionamento',
    'Iniciante',
    12,
    ARRAY['Git', 'GitHub', 'Versionamento', 'DevOps'],
    true
),
(
    'CRUD em Golang',
    'crud-golang',
    'Crie aplicações CRUD completas usando Go e o framework Gin.',
    '# CRUD em Golang

## Introdução
Go (Golang) é uma linguagem moderna, rápida e eficiente para construir APIs e microsserviços.

## Instalação
Baixe em: https://golang.org/dl/

## Estrutura do Projeto

```
projeto/
├── main.go
├── models/
│   └── user.go
├── handlers/
│   └── user_handler.go
└── go.mod
```

## Iniciar Projeto

```bash
go mod init meu-projeto
go get -u github.com/gin-gonic/gin
```

## Model (models/user.go)

```go
package models

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

var Users = []User{
    {ID: 1, Name: "João", Email: "joao@email.com"},
}
```

## Handler (handlers/user_handler.go)

```go
package handlers

import (
    "net/http"
    "strconv"
    "github.com/gin-gonic/gin"
    "meu-projeto/models"
)

// GET - Listar todos
func GetUsers(c *gin.Context) {
    c.JSON(http.StatusOK, models.Users)
}

// GET - Buscar por ID
func GetUser(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    for _, user := range models.Users {
        if user.ID == id {
            c.JSON(http.StatusOK, user)
            return
        }
    }
    c.JSON(http.StatusNotFound, gin.H{"error": "Usuário não encontrado"})
}

// POST - Criar
func CreateUser(c *gin.Context) {
    var newUser models.User
    if err := c.ShouldBindJSON(&newUser); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    newUser.ID = len(models.Users) + 1
    models.Users = append(models.Users, newUser)
    c.JSON(http.StatusCreated, newUser)
}

// PUT - Atualizar
func UpdateUser(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    for i, user := range models.Users {
        if user.ID == id {
            if err := c.ShouldBindJSON(&models.Users[i]); err != nil {
                c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
                return
            }
            models.Users[i].ID = id
            c.JSON(http.StatusOK, models.Users[i])
            return
        }
    }
    c.JSON(http.StatusNotFound, gin.H{"error": "Usuário não encontrado"})
}

// DELETE
func DeleteUser(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    for i, user := range models.Users {
        if user.ID == id {
            models.Users = append(models.Users[:i], models.Users[i+1:]...)
            c.Status(http.StatusNoContent)
            return
        }
    }
    c.JSON(http.StatusNotFound, gin.H{"error": "Usuário não encontrado"})
}
```

## Main (main.go)

```go
package main

import (
    "github.com/gin-gonic/gin"
    "meu-projeto/handlers"
)

func main() {
    r := gin.Default()

    // Rotas
    api := r.Group("/api")
    {
        api.GET("/users", handlers.GetUsers)
        api.GET("/users/:id", handlers.GetUser)
        api.POST("/users", handlers.CreateUser)
        api.PUT("/users/:id", handlers.UpdateUser)
        api.DELETE("/users/:id", handlers.DeleteUser)
    }

    r.Run(":8080")
}
```

## Executar

```bash
go run main.go
```

## Testar com cURL

```bash
# GET todos
curl http://localhost:8080/api/users

# POST criar
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d ''{"name":"Maria","email":"maria@email.com"}''

# PUT atualizar
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d ''{"name":"João Silva","email":"joao@email.com"}''

# DELETE
curl -X DELETE http://localhost:8080/api/users/1
```

## Conclusão
Go + Gin é uma combinação poderosa para criar APIs REST de alta performance.',
    'Golang',
    'Backend',
    'Intermediário',
    22,
    ARRAY['Golang', 'Go', 'Gin', 'API REST', 'Backend'],
    false
),
(
    'Construindo uma Extensão do VS Code',
    'extensao-vscode',
    'Aprenda a criar extensões personalizadas para o Visual Studio Code.',
    '# Construindo uma Extensão do VS Code

## Introdução
VS Code permite criar extensões personalizadas usando TypeScript/JavaScript.

## Pré-requisitos

```bash
npm install -g yo generator-code
```

## Criar Projeto

```bash
yo code

# Escolha:
# - New Extension (TypeScript)
# - Nome da extensão
# - Identificador
# - Descrição
```

## Estrutura do Projeto

```
minha-extensao/
├── src/
│   └── extension.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Extension.ts Básico

```typescript
import * as vscode from ''vscode'';

export function activate(context: vscode.ExtensionContext) {
    console.log(''Extensão ativada!'');

    // Comando simples
    let disposable = vscode.commands.registerCommand(
        ''minha-extensao.hello'',
        () => {
            vscode.window.showInformationMessage(''Olá do VS Code!'');
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
```

## Package.json

```json
{
  "name": "minha-extensao",
  "displayName": "Minha Extensão",
  "description": "Descrição da extensão",
  "version": "0.0.1",
  "engines": {
    "vscode": "^1.80.0"
  },
  "categories": ["Other"],
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "minha-extensao.hello",
        "title": "Hello World"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./"
  },
  "devDependencies": {
    "@types/vscode": "^1.80.0",
    "@types/node": "16.x",
    "typescript": "^5.0.0"
  }
}
```

## Funcionalidades Avançadas

### 1. Snippets

```typescript
const snippetProvider = vscode.languages.registerCompletionItemProvider(
    ''javascript'',
    {
        provideCompletionItems() {
            const snippet = new vscode.CompletionItem(''console'');
            snippet.insertText = new vscode.SnippetString(
                ''console.log($1);''
            );
            return [snippet];
        }
    }
);

context.subscriptions.push(snippetProvider);
```

### 2. Decorations

```typescript
const decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: ''rgba(255, 255, 0, 0.3)'',
    border: ''1px solid yellow''
});

function highlightText() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const text = editor.document.getText();
        const regex = /TODO/g;
        const decorations: vscode.DecorationOptions[] = [];
        
        let match;
        while (match = regex.exec(text)) {
            const startPos = editor.document.positionAt(match.index);
            const endPos = editor.document.positionAt(match.index + match[0].length);
            decorations.push({ range: new vscode.Range(startPos, endPos) });
        }
        
        editor.setDecorations(decorationType, decorations);
    }
}
```

### 3. WebView

```typescript
function createWebView(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
        ''myWebview'',
        ''Minha WebView'',
        vscode.ViewColumn.One,
        { enableScripts: true }
    );

    panel.webview.html = getWebviewContent();
}

function getWebviewContent() {
    return `<!DOCTYPE html>
    <html>
    <head>
        <style>
            body { padding: 20px; }
            button { padding: 10px 20px; }
        </style>
    </head>
    <body>
        <h1>Minha Extensão</h1>
        <button onclick="alert(''Clicou!'')" >Clique Aqui</button>
    </body>
    </html>`;
}
```

## Testar Extensão

```bash
# Compilar
npm run compile

# No VS Code: F5 para abrir nova janela com extensão
```

## Publicar

```bash
# Instalar vsce
npm install -g @vscode/vsce

# Criar pacote
vsce package

# Publicar
vsce publish
```

## Conclusão
Criar extensões para VS Code é uma ótima forma de aumentar sua produtividade e compartilhar ferramentas com a comunidade.',
    'VS Code',
    'Extensões',
    'Avançado',
    30,
    ARRAY['VS Code', 'TypeScript', 'Extensões', 'Desenvolvimento'],
    false
),
(
    'Como Criar uma Linguagem de Programação',
    'criar-linguagem-programacao',
    'Fundamentos para criar sua própria linguagem de programação do zero.',
    '# Como Criar uma Linguagem de Programação

## Introdução
Criar uma linguagem de programação envolve: Lexer, Parser, AST e Interpreter/Compiler.

## Etapas Principais

1. **Lexer (Análise Léxica)** - Converte código em tokens
2. **Parser (Análise Sintática)** - Cria AST dos tokens
3. **Interpreter/Compiler** - Executa ou compila o código

## Exemplo Simples em Python

### 1. Lexer

```python
import re
from enum import Enum

class TokenType(Enum):
    NUMBER = ''NUMBER''
    PLUS = ''PLUS''
    MINUS = ''MINUS''
    MUL = ''MUL''
    DIV = ''DIV''
    LPAREN = ''LPAREN''
    RPAREN = ''RPAREN''
    EOF = ''EOF''

class Token:
    def __init__(self, type, value):
        self.type = type
        self.value = value
    
    def __repr__(self):
        return f''Token({self.type}, {self.value})''

class Lexer:
    def __init__(self, text):
        self.text = text
        self.pos = 0
        self.current_char = self.text[self.pos] if text else None
    
    def advance(self):
        self.pos += 1
        self.current_char = self.text[self.pos] if self.pos < len(self.text) else None
    
    def skip_whitespace(self):
        while self.current_char and self.current_char.isspace():
            self.advance()
    
    def number(self):
        result = ''''
        while self.current_char and self.current_char.isdigit():
            result += self.current_char
            self.advance()
        return int(result)
    
    def get_next_token(self):
        while self.current_char:
            if self.current_char.isspace():
                self.skip_whitespace()
                continue
            
            if self.current_char.isdigit():
                return Token(TokenType.NUMBER, self.number())
            
            if self.current_char == ''+'':
                self.advance()
                return Token(TokenType.PLUS, ''+'')
            
            if self.current_char == ''-'':
                self.advance()
                return Token(TokenType.MINUS, ''-'')
            
            if self.current_char == ''*'':
                self.advance()
                return Token(TokenType.MUL, ''*'')
            
            if self.current_char == ''/'':
                self.advance()
                return Token(TokenType.DIV, ''/'')
            
            if self.current_char == ''('':
                self.advance()
                return Token(TokenType.LPAREN, ''('')
            
            if self.current_char == '')'':
                self.advance()
                return Token(TokenType.RPAREN, '')'')
            
            raise Exception(f''Caractere inválido: {self.current_char}'')
        
        return Token(TokenType.EOF, None)
```

### 2. Parser e AST

```python
class AST:
    pass

class BinOp(AST):
    def __init__(self, left, op, right):
        self.left = left
        self.op = op
        self.right = right

class Num(AST):
    def __init__(self, token):
        self.token = token
        self.value = token.value

class Parser:
    def __init__(self, lexer):
        self.lexer = lexer
        self.current_token = self.lexer.get_next_token()
    
    def eat(self, token_type):
        if self.current_token.type == token_type:
            self.current_token = self.lexer.get_next_token()
        else:
            raise Exception(''Token inválido'')
    
    def factor(self):
        token = self.current_token
        if token.type == TokenType.NUMBER:
            self.eat(TokenType.NUMBER)
            return Num(token)
        elif token.type == TokenType.LPAREN:
            self.eat(TokenType.LPAREN)
            node = self.expr()
            self.eat(TokenType.RPAREN)
            return node
    
    def term(self):
        node = self.factor()
        
        while self.current_token.type in (TokenType.MUL, TokenType.DIV):
            token = self.current_token
            if token.type == TokenType.MUL:
                self.eat(TokenType.MUL)
            elif token.type == TokenType.DIV:
                self.eat(TokenType.DIV)
            
            node = BinOp(left=node, op=token, right=self.factor())
        
        return node
    
    def expr(self):
        node = self.term()
        
        while self.current_token.type in (TokenType.PLUS, TokenType.MINUS):
            token = self.current_token
            if token.type == TokenType.PLUS:
                self.eat(TokenType.PLUS)
            elif token.type == TokenType.MINUS:
                self.eat(TokenType.MINUS)
            
            node = BinOp(left=node, op=token, right=self.term())
        
        return node
```

### 3. Interpreter

```python
class Interpreter:
    def __init__(self, parser):
        self.parser = parser
    
    def visit_BinOp(self, node):
        if node.op.type == TokenType.PLUS:
            return self.visit(node.left) + self.visit(node.right)
        elif node.op.type == TokenType.MINUS:
            return self.visit(node.left) - self.visit(node.right)
        elif node.op.type == TokenType.MUL:
            return self.visit(node.left) * self.visit(node.right)
        elif node.op.type == TokenType.DIV:
            return self.visit(node.left) // self.visit(node.right)
    
    def visit_Num(self, node):
        return node.value
    
    def visit(self, node):
        method_name = f''visit_{type(node).__name__}''
        method = getattr(self, method_name)
        return method(node)
    
    def interpret(self):
        tree = self.parser.expr()
        return self.visit(tree)
```

### 4. Usar a Linguagem

```python
def main():
    while True:
        try:
            text = input(''calc> '')
        except EOFError:
            break
        
        if not text:
            continue
        
        lexer = Lexer(text)
        parser = Parser(lexer)
        interpreter = Interpreter(parser)
        result = interpreter.interpret()
        print(result)

if __name__ == ''__main__'':
    main()
```

## Testar

```
calc> 2 + 3
5
calc> 10 * (5 + 2)
70
calc> 100 / 5 - 3
17
```

## Recursos Avançados

- Variáveis e escopo
- Funções e closures
- Tipos de dados
- Estruturas de controle (if, while, for)
- Orientação a objetos
- Garbage collection
- Otimizações

## Conclusão
Criar uma linguagem de programação é desafiador mas extremamente educativo, ensinando conceitos fundamentais de compiladores e interpretadores.',
    'Compiladores',
    'Ciência da Computação',
    'Avançado',
    40,
    ARRAY['Compiladores', 'Python', 'Lexer', 'Parser', 'AST'],
    false
);

-- 8. VERIFICAR DADOS INSERIDOS
SELECT 
    id,
    titulo,
    slug,
    tecnologia,
    categoria,
    nivel,
    published,
    destaque,
    created_at
FROM public.documentacoes
ORDER BY created_at DESC;

-- 9. GRANT PERMISSIONS
GRANT ALL ON public.documentacoes TO postgres;
GRANT ALL ON public.documentacoes TO authenticated;
GRANT ALL ON public.documentacoes TO anon;
GRANT SELECT ON public.documentacoes TO anon;

-- 10. RECARREGAR SCHEMA (Execute após aplicar as mudanças)
NOTIFY pgrst, 'reload schema';

-- ============================================
-- VERIFICAÇÕES FINAIS
-- ============================================

-- Verificar se a tabela foi criada
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'documentacoes'
);

-- Verificar policies
SELECT * FROM pg_policies WHERE tablename = 'documentacoes';

-- Contar registros
SELECT COUNT(*) as total_documentacoes FROM public.documentacoes;

-- ============================================
-- FIM DO SCRIPT
-- ============================================
