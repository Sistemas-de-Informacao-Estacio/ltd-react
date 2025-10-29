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
                    */Home.jsx) echo "feat(home): adicionar links interativos e melhorar UX da página inicial" ;;
                    */Footer.jsx) echo "feat(footer): integrar navegação com React Router e melhorar design" ;;
                    */Apps.jsx) echo "feat(apps): atualizar interface de aplicativos governamentais" ;;
                    */Contact.jsx) echo "feat(contact): implementar gerenciador de cookies e melhorar formulário" ;;
                    */Technologies.jsx) echo "feat(tech): adicionar modal interativo para showcase de projetos" ;;
                    */Documents.jsx) echo "fix(documents): corrigir erros de sintaxe JSX e restruturar componente da biblioteca" ;;
                    */CookieBanner.jsx) echo "feat(cookies): implementar banner de consentimento LGPD compliant" ;;
                    */CookieManager.jsx) echo "feat(cookies): adicionar gerenciador avançado de preferências" ;;
                    */News.jsx) echo "feat(news): implementar sistema de notícias do setor público" ;;
                    */Projects.jsx) echo "feat(projects): criar showcase de projetos LTD" ;;
                    */Services.jsx) echo "feat(services): adicionar catálogo de serviços tecnológicos" ;;
                    *) echo "feat(components): atualizar componente $(basename $file .jsx)" ;;
                esac
            else
                echo "feat(ui): atualizar componente $(basename $file)"
            fi
            ;;
        
        # Arquivos de configuração
        package.json) echo "deps: adicionar react-router-dom e react-icons para navegação e UI" ;;
        package-lock.json) echo "deps: atualizar lock file com novas dependências" ;;
        vite.config.js) echo "config: otimizar configuração Vite para build de produção" ;;
        tailwind.config.js) echo "style: configurar Tailwind CSS com tema customizado" ;;
        eslint.config.js) echo "config: configurar ESLint para React e qualidade de código" ;;
        
        # Arquivos de estilo
        *.css) 
            case $file in
                */App.css) echo "style: atualizar estilos globais e variáveis CSS" ;;
                */Contato.css) echo "style: melhorar design responsivo da página de contato" ;;
                */Noticias.css) echo "style: aprimorar layout da seção de notícias" ;;
                */Documents.css) echo "style: ajustar estilos da biblioteca de documentos" ;;
                *) echo "style: atualizar estilos de $(basename $file .css)" ;;
            esac
            ;;
        
        # Arquivos de documentação
        README.md) echo "docs: atualizar documentação do projeto TechPrefeitura" ;;
        .gitignore) echo "config: atualizar arquivos ignorados pelo Git" ;;
        
        # Arquivo principal da aplicação
        src/App.jsx) echo "feat(app): implementar sistema de roteamento completo com React Router" ;;
        src/main.jsx) echo "config: configurar ponto de entrada da aplicação React" ;;
        
        # Arquivos HTML
        index.html) echo "feat(html): atualizar estrutura base e metadados da aplicação" ;;
        
        # Scripts e automação
        *.sh) echo "ci: adicionar/atualizar script de automação de commits inteligente" ;;
        
        # Assets e recursos
        *.svg|*.png|*.jpg|*.jpeg|*.ico) echo "assets: adicionar/atualizar recursos visuais do projeto" ;;
        
        # Arquivos de dados
        *.json)
            case $file in
                */data/*) echo "data: atualizar dados de $(basename $file .json)" ;;
                *) echo "config: atualizar configuração $(basename $file .json)" ;;
            esac
            ;;
        
        # Default baseado no status
        *) 
            if [[ $status == "A" ]]; then
                echo "feat: adicionar $(basename $file) ao projeto"
            elif [[ $status == "D" ]]; then
                echo "remove: remover $(basename $file) desnecessário"
            elif [[ $status == "M" ]]; then
                echo "update: atualizar $(basename $file) com melhorias"
            else
                echo "chore: manutenção em $(basename $file)"
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
    
    # Mostrar estatísticas
    local modified=$(git status --porcelain | grep "^.M" | wc -l)
    local added=$(git status --porcelain | grep "^A" | wc -l)
    local deleted=$(git status --porcelain | grep "^.D" | wc -l)
    local untracked=$(git status --porcelain | grep "^??" | wc -l)
    
    print_color $CYAN "📈 Estatísticas:"
    print_color $WHITE "  • Modificados: $modified"
    print_color $WHITE "  • Adicionados: $added"
    print_color $WHITE "  • Removidos: $deleted"
    print_color $WHITE "  • Não rastreados: $untracked"
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
    local success=0
    local failed=0
    
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
                ((success++))
            else
                print_color $RED "❌ Erro no commit de $file"
                ((failed++))
            fi
            ((count++))
            echo ""
        fi
    done
    
    print_color $GREEN "🎉 Resumo dos commits individuais:"
    print_color $WHITE "  • Total processados: $count"
    print_color $WHITE "  • Sucessos: $success"
    print_color $WHITE "  • Falhas: $failed"
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
                    group_files["components"]="feat(components): atualizar componentes React e corrigir sintaxe JSX"
                    ;;
                *.css)
                    groups["styles"]+="$file "
                    group_files["styles"]="style: atualizar estilos e melhorar design responsivo"
                    ;;
                package*.json)
                    groups["deps"]+="$file "
                    group_files["deps"]="deps: atualizar dependências e configurações do projeto"
                    ;;
                *.config.js|*.config.ts|vite.config.*|tailwind.config.*)
                    groups["config"]+="$file "
                    group_files["config"]="config: otimizar configurações de build e desenvolvimento"
                    ;;
                *.md)
                    groups["docs"]+="$file "
                    group_files["docs"]="docs: atualizar documentação e guias do projeto"
                    ;;
                *.sh)
                    groups["scripts"]+="$file "
                    group_files["scripts"]="ci: melhorar scripts de automação e deploy"
                    ;;
                *.svg|*.png|*.jpg|*.jpeg|*.ico)
                    groups["assets"]+="$file "
                    group_files["assets"]="assets: adicionar/otimizar recursos visuais"
                    ;;
                *)
                    groups["misc"]+="$file "
                    group_files["misc"]="chore: atualizações diversas e manutenção"
                    ;;
            esac
        fi
    done < <(git status --porcelain)
    
    # Fazer commit para cada grupo
    local count=0
    local success=0
    
    for group in "${!groups[@]}"; do
        local files=(${groups[$group]})
        local message="${group_files[$group]}"
        
        print_color $CYAN "📦 Grupo: $group (${#files[@]} arquivos)"
        print_color $PURPLE "💬 Mensagem: $message"
        print_color $WHITE "📂 Arquivos: ${files[*]}"
        
        git add "${files[@]}"
        git commit -m "$message"
        
        if [[ $? -eq 0 ]]; then
            print_color $GREEN "✅ Commit do grupo '$group' realizado!"
            ((success++))
        else
            print_color $RED "❌ Erro no commit do grupo '$group'"
        fi
        ((count++))
        echo ""
    done
    
    print_color $GREEN "🎉 Resumo dos commits agrupados:"
    print_color $WHITE "  • Grupos processados: $count"
    print_color $WHITE "  • Sucessos: $success"
}

# Commit único para todas as mudanças
commit_single() {
    print_color $GREEN "🔄 Fazendo commit único para todas as mudanças..."
    
    local total_files=$(git status --porcelain | wc -l)
    local commit_msg="feat: implementar sistema completo TechPrefeitura com biblioteca de documentos"
    
    # Adicionar detalhes baseados nos tipos de arquivo
    local has_jsx=$(git status --porcelain | grep -E "\.(jsx|tsx)$" | wc -l)
    local has_css=$(git status --porcelain | grep -E "\.css$" | wc -l)
    local has_config=$(git status --porcelain | grep -E "\.(config|json)$" | wc -l)
    
    if [[ $has_jsx -gt 0 && $has_css -gt 0 ]]; then
        commit_msg="feat: implementar sistema completo com componentes React e estilos ($total_files arquivos)"
    elif [[ $has_jsx -gt 0 ]]; then
        commit_msg="feat: corrigir e melhorar componentes React ($total_files arquivos)"
    elif [[ $has_css -gt 0 ]]; then
        commit_msg="style: atualizar estilos e design da aplicação ($total_files arquivos)"
    elif [[ $has_config -gt 0 ]]; then
        commit_msg="config: atualizar configurações do projeto ($total_files arquivos)"
    fi
    
    print_color $PURPLE "💬 Mensagem proposta: $commit_msg"
    echo ""
    
    if confirm_action "Fazer commit único com esta mensagem?"; then
        git add .
        git commit -m "$commit_msg"
        
        if [[ $? -eq 0 ]]; then
            print_color $GREEN "✅ Commit único realizado com sucesso!"
            print_color $WHITE "📊 $total_files arquivos commitados"
        else
            print_color $RED "❌ Erro no commit único"
        fi
    else
        print_color $YELLOW "🚫 Commit cancelado pelo usuário."
    fi
}

# Função para mostrar ajuda
show_help() {
    print_color $CYAN "📖 Uso do TechPrefeitura Auto Commit:"
    echo ""
    print_color $WHITE "  $0 [MODO] [OPÇÕES]"
    echo ""
    print_color $CYAN "🎯 Modos disponíveis:"
    print_color $WHITE "  individual  - Commit separado para cada arquivo (recomendado para desenvolvimento)"
    print_color $WHITE "  grouped     - Commit agrupado por tipo de arquivo (ideal para releases)"
    print_color $WHITE "  single      - Commit único para todas as mudanças (para hotfixes)"
    echo ""
    print_color $CYAN "⚙️  Opções:"
    print_color $WHITE "  -h, --help     - Mostrar esta ajuda"
    print_color $WHITE "  -s, --status   - Mostrar apenas o status detalhado"
    print_color $WHITE "  -p, --push     - Fazer push após commits"
    print_color $WHITE "  -f, --force    - Não pedir confirmação (modo automático)"
    echo ""
    print_color $CYAN "💡 Exemplos de uso:"
    print_color $WHITE "  $0 individual          # Commit individual com mensagens inteligentes"
    print_color $WHITE "  $0 grouped --push      # Commit agrupado + push automático"
    print_color $WHITE "  $0 single --force      # Commit único sem confirmação"
    print_color $WHITE "  $0 --status            # Ver apenas o status atual"
    echo ""
    print_color $CYAN "🚀 Especial para TechPrefeitura:"
    print_color $WHITE "  • Detecta automaticamente correções de sintaxe JSX"
    print_color $WHITE "  • Mensagens específicas para componentes React"
    print_color $WHITE "  • Suporte para biblioteca de documentos técnicos"
    print_color $WHITE "  • Integração com sistema de cookies LGPD"
}

# Função para fazer push
do_push() {
    if confirm_action "Fazer push para o repositório remoto?"; then
        print_color $BLUE "📤 Fazendo push..."
        
        # Verificar se existe remote
        if ! git remote | grep -q "origin"; then
            print_color $RED "❌ Nenhum remote 'origin' configurado!"
            print_color $YELLOW "💡 Configure com: git remote add origin <URL>"
            return 1
        fi
        
        git push origin $(git branch --show-current)
        
        if [[ $? -eq 0 ]]; then
            print_color $GREEN "✅ Push realizado com sucesso!"
            print_color $WHITE "🌐 Código disponível no repositório remoto"
        else
            print_color $RED "❌ Erro no push"
            print_color $YELLOW "💡 Verifique a conectividade e permissões"
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
        print_color $WHITE "1) Individual - Cada arquivo separadamente (melhor para debug)"
        print_color $WHITE "2) Agrupado - Por tipo de arquivo (recomendado)"
        print_color $WHITE "3) Único - Todas as mudanças juntas (para releases)"
        echo ""
        print_color $YELLOW "Digite sua escolha (1-3): "
        read -r choice
        
        case $choice in
            1) mode="individual" ;;
            2) mode="grouped" ;;
            3) mode="single" ;;
            *) 
                print_color $RED "❌ Escolha inválida! Use 1, 2 ou 3."
                exit 1
                ;;
        esac
    fi
    
    # Confirmar ação se não estiver em modo force
    if [[ $force_mode == false ]]; then
        if ! confirm_action "Prosseguir com commit em modo '$mode'?"; then
            print_color $YELLOW "🚫 Operação cancelada pelo usuário."
            exit 0
        fi
    fi
    
    # Executar commit
    print_color $BLUE "⚡ Iniciando processo de commit..."
    auto_commit "$mode"
    
    # Push se solicitado
    if [[ $do_push_after == true ]]; then
        echo ""
        do_push
    fi
    
    print_color $GREEN "🎉 Processo TechPrefeitura Auto Commit concluído!"
    print_color $CYAN "💡 Obrigado por usar nossa ferramenta de automação!"
}

# Executar função principal com todos os argumentos
main "$@"