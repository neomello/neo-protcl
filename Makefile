.PHONY: help install dev dev-boot build build-boot clean preview start deploy-pinata deploy-boot deploy-lighthouse publish-ipns deploy-full check-env

# Cores para output
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
RESET := \033[0m

# Variáveis
NODE_MODULES := node_modules
DIST := dist
DIST_BOOT := dist-boot

##@ Geral

help: ## Mostra esta mensagem de ajuda
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════╗$(RESET)"
	@echo "$(CYAN)║         NΞØ Protocol - Comandos Disponíveis              ║$(RESET)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════╝$(RESET)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf ""} /^[a-zA-Z_-]+:.*?##/ { printf "  $(GREEN)%-20s$(RESET) %s\n", $$1, $$2 } /^##@/ { printf "\n$(CYAN)%s$(RESET)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""

##@ Desenvolvimento

install: ## Instala dependências do projeto
	@echo "$(CYAN)📦 Instalando dependências...$(RESET)"
	@if [ -d "$(NODE_MODULES)" ]; then \
		echo "$(YELLOW)🧹 Removendo node_modules antigo...$(RESET)"; \
		rm -rf $(NODE_MODULES); \
	fi
	@if [ -f "package-lock.json" ]; then \
		echo "$(YELLOW)🧹 Removendo package-lock.json antigo...$(RESET)"; \
		rm -f package-lock.json; \
	fi
	@npm install
	@echo "$(GREEN)✅ Dependências instaladas com sucesso!$(RESET)"

dev: ## Inicia servidor de desenvolvimento (app principal)
	@echo "$(CYAN)🚀 Iniciando nó local (modo desenvolvimento)...$(RESET)"
	@npm run dev

dev-boot: ## Inicia servidor de desenvolvimento (boot ritual)
	@echo "$(CYAN)⚡ Iniciando boot ritual (modo desenvolvimento)...$(RESET)"
	@npm run dev:boot

##@ Build

build: ## Constrói o app principal para produção
	@echo "$(CYAN)🔨 Construindo app principal...$(RESET)"
	@npm run build
	@echo "$(GREEN)✅ Build concluído em $(DIST)/$(RESET)"

build-boot: ## Constrói o boot ritual para produção
	@echo "$(CYAN)🔨 Construindo boot ritual...$(RESET)"
	@npm run build:boot
	@echo "$(GREEN)✅ Build concluído em $(DIST_BOOT)/$(RESET)"

##@ Deploy

deploy-pinata: ## Faz upload do build para Pinata
	@echo "$(CYAN)📤 Fazendo upload para Pinata...$(RESET)"
	@npm run deploy:pinata

deploy-boot: ## Build e deploy do boot ritual para Pinata
	@echo "$(CYAN)🔨 Construindo e fazendo deploy do boot ritual...$(RESET)"
	@npm run deploy:boot

deploy-lighthouse: ## Build e deploy do boot ritual para Lighthouse IPFS (retorna CID)
	@echo "$(CYAN)🚀 Fazendo build e deploy para Lighthouse IPFS...$(RESET)"
	@npm run deploy:lighthouse
	@echo "$(GREEN)✅ Deploy para Lighthouse concluído$(RESET)"
	@echo "$(CYAN)💡 CID salvo em .ipfs-cid - Use para atualizar o ENS$(RESET)"

prepare-lighthouse: ## Prepara ZIP para upload manual no Lighthouse
	@echo "$(CYAN)📦 Preparando arquivo para upload manual...$(RESET)"
	@npm run prepare:lighthouse
	@echo "$(GREEN)✅ Arquivo ZIP criado em dist-boot-for-upload.zip$(RESET)"
	@echo "$(CYAN)💡 Siga as instruções exibidas ou veja UPLOAD_INSTRUCTIONS.md$(RESET)"

check-ens: ## Verifica status e propagação do ENS
	@echo "$(CYAN)🔍 Verificando status do ENS...$(RESET)"
	@npm run check:ens

publish-ipns: ## Publica dist-boot no IPNS
	@echo "$(CYAN)🌐 Publicando no IPNS...$(RESET)"
	@chmod +x scripts/publish-to-ipns.sh
	@npm run publish:ipns

deploy-full: build-boot deploy-pinata publish-ipns ## Deploy completo: build + Pinata + IPNS
	@echo "$(GREEN)✅ Deploy completo concluído!$(RESET)"

##@ Utilitários

clean: ## Remove diretórios de build e node_modules
	@echo "$(YELLOW)🧹 Limpando arquivos gerados...$(RESET)"
	@rm -rf $(DIST) $(DIST_BOOT) $(NODE_MODULES)
	@echo "$(GREEN)✅ Limpeza concluída$(RESET)"

clean-build: ## Remove apenas diretórios de build
	@echo "$(YELLOW)🧹 Limpando builds...$(RESET)"
	@rm -rf $(DIST) $(DIST_BOOT)
	@echo "$(GREEN)✅ Builds removidos$(RESET)"

preview: ## Preview do build de produção (app principal)
	@echo "$(CYAN)👁️  Iniciando preview do build...$(RESET)"
	@npm run preview

start: ## Inicia servidor estático na porta 10000
	@echo "$(CYAN)🌐 Iniciando servidor estático na porta 10000...$(RESET)"
	@npm run start

check-env: ## Verifica se variáveis de ambiente estão configuradas
	@echo "$(CYAN)🔍 Verificando variáveis de ambiente...$(RESET)"
	@if [ ! -f .env ]; then \
		echo "$(RED)❌ Arquivo .env não encontrado$(RESET)"; \
		exit 1; \
	fi
	@if ! grep -q "VITE_THIRDWEB_CLIENT_ID" .env; then \
		echo "$(YELLOW)⚠️  VITE_THIRDWEB_CLIENT_ID não encontrado$(RESET)"; \
		exit 1; \
	fi
	@if grep -q "VITE_THIRDWEB_SECRET_KEY" .env && grep -q "VITE_X402_SERVER_WALLET_ADDRESS" .env; then \
		echo "$(GREEN)✅ Variáveis de ambiente configuradas (incluindo x402)$(RESET)"; \
	elif grep -q "VITE_THIRDWEB_CLIENT_ID" .env; then \
		echo "$(GREEN)✅ Variáveis básicas configuradas (modo preview)$(RESET)"; \
		echo "$(YELLOW)💡 Para x402 Payments, configure VITE_THIRDWEB_SECRET_KEY e VITE_X402_SERVER_WALLET_ADDRESS$(RESET)"; \
	else \
		echo "$(RED)❌ Variáveis de ambiente não configuradas corretamente$(RESET)"; \
		exit 1; \
	fi

##@ Manutenção

update: ## Atualiza dependências do projeto
	@echo "$(CYAN)🔄 Atualizando dependências...$(RESET)"
	@npm update
	@echo "$(GREEN)✅ Dependências atualizadas$(RESET)"

audit: ## Verifica vulnerabilidades nas dependências
	@echo "$(CYAN)🔒 Verificando vulnerabilidades...$(RESET)"
	@npm audit

audit-fix: ## Tenta corrigir vulnerabilidades automaticamente (SEM breaking changes)
	@echo "$(CYAN)🔧 Corrigindo vulnerabilidades (modo seguro)...$(RESET)"
	@echo "$(YELLOW)⚠️  Este comando NÃO aplica atualizações major que podem quebrar o código$(RESET)"
	@npm audit fix
	@echo "$(GREEN)✅ Correções aplicadas (apenas patches e minor updates)$(RESET)"

audit-fix-force: ## ⚠️  CORRIGE vulnerabilidades FORÇANDO atualizações major (PODE QUEBRAR CÓDIGO)
	@echo "$(RED)⚠️  ATENÇÃO: Este comando pode quebrar seu código!$(RESET)"
	@echo "$(YELLOW)💡 Recomendado: Teste bem após executar e tenha um backup do package.json$(RESET)"
	@echo "$(YELLOW)💡 Execute manualmente: npm audit fix --force$(RESET)"
	@echo "$(RED)❌ Comando desabilitado por segurança. Use manualmente se necessário.$(RESET)"

audit-report: ## Gera relatório detalhado de vulnerabilidades
	@echo "$(CYAN)📊 Gerando relatório detalhado...$(RESET)"
	@npm audit --json > audit-report.json 2>/dev/null || true
	@echo "$(GREEN)✅ Relatório salvo em audit-report.json$(RESET)"
	@echo "$(CYAN)💡 Use 'make audit-fix' para correções seguras$(RESET)"

