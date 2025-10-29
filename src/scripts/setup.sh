#!/bin/bash

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_color() {
    echo -e "${1}${2}${NC}"
}

print_color $BLUE "
╔══════════════════════════════════════════════════════════════╗
║                 🛠️  TechPrefeitura Setup                     ║
║            Configuração do Ambiente de Desenvolvimento      ║
╚══════════════════════════════════════════════════════════════╝
"

# Tornar scripts executáveis
chmod +x commit-auto.sh
print_color $GREEN "✅ Script commit-auto.sh tornado executável"

# Criar alias global (opcional)
if command -v git &> /dev/null; then
    print_color $YELLOW "❓ Deseja criar um alias global 'git-auto' para o script? (s/N): "
    read -r response
    if [[ $response =~ ^[Ss]$ ]]; then
        # Adicionar ao .bashrc ou .zshrc
        SCRIPT_PATH="$(pwd)/commit-auto.sh"
        ALIAS_LINE="alias git-auto='$SCRIPT_PATH'"
        
        if [[ -f ~/.bashrc ]]; then
            echo "$ALIAS_LINE" >> ~/.bashrc
            print_color $GREEN "✅ Alias adicionado ao ~/.bashrc"
        fi
        
        if [[ -f ~/.zshrc ]]; then
            echo "$ALIAS_LINE" >> ~/.zshrc
            print_color $GREEN "✅ Alias adicionado ao ~/.zshrc"
        fi
        
        print_color $BLUE "💡 Reinicie o terminal ou execute: source ~/.bashrc"
        print_color $BLUE "💡 Depois use: git-auto individual"
    fi
fi

# Verificar dependências
print_color $BLUE "🔍 Verificando dependências..."

if ! command -v node &> /dev/null; then
    print_color $RED "❌ Node.js não encontrado"
else
    print_color $GREEN "✅ Node.js $(node --version)"
fi

if ! command -v npm &> /dev/null; then
    print_color $RED "❌ npm não encontrado"
else
    print_color $GREEN "✅ npm $(npm --version)"
fi

if ! command -v git &> /dev/null; then
    print_color $RED "❌ Git não encontrado"
else
    print_color $GREEN "✅ Git $(git --version)"
fi

# Instalar dependências se necessário
if [[ -f package.json ]]; then
    print_color $YELLOW "❓ Instalar dependências do projeto? (s/N): "
    read -r response
    if [[ $response =~ ^[Ss]$ ]]; then
        npm install
        print_color $GREEN "✅ Dependências instaladas"
    fi
fi

print_color $GREEN "🎉 Setup concluído!"
print_color $BLUE "
📖 Como usar:
  ./commit-auto.sh individual    # Commit para cada arquivo
  ./commit-auto.sh grouped       # Commit agrupado por tipo  
  ./commit-auto.sh single        # Commit único
  ./commit-auto.sh --help        # Ver todas as opções
"