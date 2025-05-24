#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Função para imprimir com cor
print_color() {
    echo -e "${1}${2}${NC}"
}

# Banner
print_banner() {
    print_color $CYAN "
╔══════════════════════════════════════════════════════════════╗
║                    🚀 TechPrefeitura Auto Commit            ║
║              Automatizador de Commits Inteligente           ║
╚══════════════════════════════════════════════════════════════╝
"
}

# Função para detectar o tipo de arquivo e gerar mensagem apropriada
get_commit_message() {
    local file=$1
    local status=$2
    
    # Detectar tipo de mudança baseado no arquivo
    case $file in
        # Componentes React
        *.jsx|*.tsx)
            if [[ $file =~ Components/ ]]; then
                case $file in
                    */Nav.jsx) echo "feat(nav): implementar roteamento dinâmico com React Router" ;;
                    */Home.jsx) echo "feat(home): adicionar links interativos e melhorar UX" ;;
                    */Footer.jsx) echo "feat(footer): adicionar navegação com links do React Router" ;;
                    */Apps.jsx) echo "feat(apps): atualizar interface de aplicativos" ;;
                    */Contact.jsx) echo "feat(contact): integrar gerenciador de cookies" ;;
                    */Technologies.jsx) echo "feat(tech): adicionar modal interativo para projetos" ;;
                    */CookieBanner.jsx) echo "feat(cookies): implementar sistema de consentimento LGPD" ;;
                    */CookieManager.jsx) echo "feat(cookies): adicionar gerenciador de preferências" ;;
                    *) echo "feat(components): atualizar componente $(basename $file .jsx)" ;;
                esac
            else
                echo "feat(ui): atualizar componente $(basename $file)"
            fi
            ;;
        
        # Arquivos de configuração
        package.json) echo "deps: adicionar react-router-dom para roteamento" ;;
        package-lock.json) echo "deps: atualizar lock file das dependências" ;;
        vite.config.js) echo "config: configurar Vite para build otimizado" ;;
        tailwind.config.js) echo "style: configurar Tailwind CSS" ;;
        eslint.config.js) echo "config: configurar ESLint para qualidade de código" ;;
        
        # Arquivos de estilo
        *.css) 
            case $file in
                */App.css) echo "style: atualizar estilos globais da aplicação" ;;
                */Contato.css) echo "style: melhorar estilos da página de contato" ;;
                */Noticias.css) echo "style: aprimorar design da seção de notícias" ;;
                *) echo "style: atualizar estilos de $(basename $file .css)" ;;
            esac
            ;;
        
        # Arquivos de documentação
        README.md) echo "docs: atualizar documentação do projeto" ;;
        .gitignore) echo "config: atualizar arquivos ignorados pelo Git" ;;
        
        # Arquivo principal da aplicação
        src/App.jsx) echo "feat(app): implementar sistema de roteamento completo" ;;
        src/main.jsx) echo "config: configurar ponto de entrada da aplicação" ;;
        
        # Arquivos HTML
        index.html) echo "feat(html): atualizar estrutura base da página" ;;
        
        # Scripts e automação
        *.sh) echo "ci: adicionar script de automação de commits" ;;
        
        # Assets
        *.svg|*.png|*.jpg|*.jpeg) echo "assets: adicionar/atualizar recursos visuais" ;;
        
        # Default
        *) 
            if [[ $status == "A" ]]; then
                echo "feat: adicionar $(basename $file)"
            elif [[ $status == "D" ]]; then
                echo "remove: remover $(basename $file)"
            else
                echo "update: atualizar $(basename $file)"
            fi
            ;;
    esac
}

# Função para verificar se é um repositório Git
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_color $RED "❌ Erro: Não é um repositório Git!"
        print_color $YELLOW "💡 Execute: git init"
        exit 1
    fi
}

# Função para verificar mudanças
check_changes() {
    if [[ -z $(git status --porcelain) ]]; then
        print_color $YELLOW "ℹ️  Nenhuma mudança detectada para commit."
        exit 0
    fi
}

# Função para mostrar status atual
show_status() {
    print_color $BLUE "📊 Status atual do repositório:"
    echo ""
    git status --short
    echo ""
}

# Função para confirmar ação
confirm_action() {
    local message=$1
    print_color $YELLOW "❓ $message (s/N): "
    read -r response
    case $response in
        [sS][iI][mM]|[sS]) return 0 ;;
        *) return 1 ;;
    esac
}

# Função principal de commit
auto_commit() {
    local mode=$1
    
    case $mode in
        "individual")
            commit_individual
            ;;
        "grouped")
            commit_grouped
            ;;
        "single")
            commit_single
            ;;
        *)
            print_color $RED "❌ Modo inválido: $mode"
            show_help
            exit 1
            ;;
    esac
}

# Commit individual para cada arquivo
commit_individual() {
    print_color $GREEN "🔄 Fazendo commit individual para cada arquivo..."
    
    # Obter lista de arquivos modificados
    local files=($(git status --porcelain | awk '{print $2}'))
    local statuses=($(git status --porcelain | awk '{print $1}'))
    
    local count=0
    for i in "${!files[@]}"; do
        local file="${files[$i]}"
        local status="${statuses[$i]}"
        
        if [[ -f "$file" || "$status" == "D" ]]; then
            local commit_msg=$(get_commit_message "$file" "$status")
            
            print_color $CYAN "📝 Commitando: $file"
            print_color $PURPLE "💬 Mensagem: $commit_msg"
            
            git add "$file"
            git commit -m "$commit_msg"
            
            if [[ $? -eq 0 ]]; then
                print_color $GREEN "✅ Commit realizado com sucesso!"
                ((count++))
            else
                print_color $RED "❌ Erro no commit de $file"
            fi
            echo ""
        fi
    done
    
    print_color $GREEN "🎉 Total de commits realizados: $count"
}

# Commit agrupado por tipo
commit_grouped() {
    print_color $GREEN "🔄 Fazendo commits agrupados por tipo..."
    
    # Arrays para diferentes tipos
    declare -A groups
    declare -A group_files
    
    # Classificar arquivos por tipo
    while IFS= read -r line; do
        local status=$(echo "$line" | awk '{print $1}')
        local file=$(echo "$line" | awk '{print $2}')
        
        if [[ -f "$file" || "$status" == "D" ]]; then
            case $file in
                *.jsx|*.tsx)
                    groups["components"]+="$file "
                    group_files["components"]="feat(components): atualizar componentes React"
                    ;;
                *.css)
                    groups["styles"]+="$file "
                    group_files["styles"]="style: atualizar estilos da aplicação"
                    ;;
                package*.json)
                    groups["deps"]+="$file "
                    group_files["deps"]="deps: atualizar dependências do projeto"
                    ;;
                *.config.js|*.config.ts)
                    groups["config"]+="$file "
                    group_files["config"]="config: atualizar configurações do projeto"
                    ;;
                *.md)
                    groups["docs"]+="$file "
                    group_files["docs"]="docs: atualizar documentação"
                    ;;
                *.sh)
                    groups["scripts"]+="$file "
                    group_files["scripts"]="ci: atualizar scripts de automação"
                    ;;
                *)
                    groups["misc"]+="$file "
                    group_files["misc"]="update: atualizações diversas"
                    ;;
            esac
        fi
    done < <(git status --porcelain)
    
    # Fazer commit para cada grupo
    local count=0
    for group in "${!groups[@]}"; do
        local files=(${groups[$group]})
        local message="${group_files[$group]}"
        
        print_color $CYAN "📦 Grupo: $group (${#files[@]} arquivos)"
        print_color $PURPLE "💬 Mensagem: $message"
        
        git add "${files[@]}"
        git commit -m "$message"
        
        if [[ $? -eq 0 ]]; then
            print_color $GREEN "✅ Commit do grupo '$group' realizado!"
            ((count++))
        else
            print_color $RED "❌ Erro no commit do grupo '$group'"
        fi
        echo ""
    done
    
    print_color $GREEN "🎉 Total de grupos commitados: $count"
}

# Commit único para todas as mudanças
commit_single() {
    print_color $GREEN "🔄 Fazendo commit único para todas as mudanças..."
    
    local total_files=$(git status --porcelain | wc -l)
    local commit_msg="feat: implementar sistema completo de roteamento e cookies ($total_files arquivos)"
    
    if confirm_action "Fazer commit único com mensagem: '$commit_msg'?"; then
        git add .
        git commit -m "$commit_msg"
        
        if [[ $? -eq 0 ]]; then
            print_color $GREEN "✅ Commit único realizado com sucesso!"
        else
            print_color $RED "❌ Erro no commit único"
        fi
    else
        print_color $YELLOW "🚫 Commit cancelado pelo usuário."
    fi
}

# Função para mostrar ajuda
show_help() {
    print_color $CYAN "📖 Uso do script:"
    echo ""
    print_color $WHITE "  $0 [MODO] [OPÇÕES]"
    echo ""
    print_color $CYAN "🎯 Modos disponíveis:"
    print_color $WHITE "  individual  - Commit separado para cada arquivo"
    print_color $WHITE "  grouped     - Commit agrupado por tipo de arquivo"
    print_color $WHITE "  single      - Commit único para todas as mudanças"
    echo ""
    print_color $CYAN "⚙️  Opções:"
    print_color $WHITE "  -h, --help     - Mostrar esta ajuda"
    print_color $WHITE "  -s, --status   - Mostrar apenas o status"
    print_color $WHITE "  -p, --push     - Fazer push após commits"
    print_color $WHITE "  -f, --force    - Não pedir confirmação"
    echo ""
    print_color $CYAN "💡 Exemplos:"
    print_color $WHITE "  $0 individual          # Commit individual"
    print_color $WHITE "  $0 grouped --push      # Commit agrupado + push"
    print_color $WHITE "  $0 single --force      # Commit único sem confirmação"
}

# Função para fazer push
do_push() {
    if confirm_action "Fazer push para o repositório remoto?"; then
        print_color $BLUE "📤 Fazendo push..."
        git push
        if [[ $? -eq 0 ]]; then
            print_color $GREEN "✅ Push realizado com sucesso!"
        else
            print_color $RED "❌ Erro no push"
        fi
    fi
}

# Função principal
main() {
    local mode=""
    local do_push_after=false
    local force_mode=false
    local status_only=false
    
    # Processar argumentos
    while [[ $# -gt 0 ]]; do
        case $1 in
            individual|grouped|single)
                mode=$1
                shift
                ;;
            -p|--push)
                do_push_after=true
                shift
                ;;
            -f|--force)
                force_mode=true
                shift
                ;;
            -s|--status)
                status_only=true
                shift
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                print_color $RED "❌ Argumento desconhecido: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # Mostrar banner
    print_banner
    
    # Verificações iniciais
    check_git_repo
    check_changes
    
    # Mostrar status
    show_status
    
    if [[ $status_only == true ]]; then
        exit 0
    fi
    
    # Se modo não foi especificado, perguntar
    if [[ -z $mode ]]; then
        print_color $CYAN "🤔 Escolha o modo de commit:"
        print_color $WHITE "1) Individual - Cada arquivo separadamente"
        print_color $WHITE "2) Agrupado - Por tipo de arquivo"
        print_color $WHITE "3) Único - Todas as mudanças juntas"
        echo ""
        print_color $YELLOW "Digite sua escolha (1-3): "
        read -r choice
        
        case $choice in
            1) mode="individual" ;;
            2) mode="grouped" ;;
            3) mode="single" ;;
            *) 
                print_color $RED "❌ Escolha inválida!"
                exit 1
                ;;
        esac
    fi
    
    # Confirmar ação se não estiver em modo force
    if [[ $force_mode == false ]]; then
        if ! confirm_action "Prosseguir com commit em modo '$mode'?"; then
            print_color $YELLOW "🚫 Operação cancelada."
            exit 0
        fi
    fi
    
    # Executar commit
    auto_commit "$mode"
    
    # Push se solicitado
    if [[ $do_push_after == true ]]; then
        do_push
    fi
    
    print_color $GREEN "🎉 Processo concluído com sucesso!"
}

# Executar função principal com todos os argumentos
main "$@"