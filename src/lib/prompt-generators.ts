import type { EbookAnswers, SaasAnswers, LojaAnswers, ProjectType } from '@/types';

export function generateEbookPrompt(answers: EbookAnswers): string {
  const incluir = answers.incluir?.length
    ? answers.incluir.join(', ')
    : 'Capa, Índice, Introdução, Capítulos, Conclusão';

  return `Crie um ebook profissional e completo no Gamma sobre o seguinte tema:

## TEMA
${answers.tema}

## OBJETIVO
${answers.objetivo}

## PÚBLICO-ALVO
${answers.publico}

## NÚMERO DE PÁGINAS
${answers.paginas}

## ESTILO DE DESIGN
${answers.estilo}

## ESTRUTURA DO EBOOK
O ebook deve incluir os seguintes elementos: ${incluir}

## INSTRUÇÕES DETALHADAS

### ESTRUTURA DE CONTEÚDO
- Capa atraente com título impactante e subtítulo descritivo
- Índice organizado com numeração de páginas
- Introdução envolvente que apresente o tema e desperte interesse
- Capítulos bem estruturados com subtítulos claros
- Exemplos práticos e casos reais quando aplicável
- Exercícios ou atividades práticas para o leitor
- Conclusão que sintetize os pontos principais
- Call-to-Action (CTA) ao final incentivando ação

### TOM DE ESCRITA
- Linguagem clara, acessível e profissional
- Adapte o tom ao público-alvo: ${answers.publico}
- Use frases curtas e diretas
- Inclua storytelling para engajar o leitor

### DESIGN VISUAL
- Estilo: ${answers.estilo}
- Use layouts limpos e organizados
- Inclua elementos visuais como ícones, infográficos e ilustrações
- Mantenha consistência visual em todas as páginas
- Use espaçamento generoso para facilitar a leitura

### CORES E TIPOGRAFIA
${answers.cores ? `- Cores específicas: ${answers.cores}` : '- Paleta de cores harmoniosa que combine com o tema'}
- Tipografia legível e hierárquica (títulos, subtítulos, corpo de texto)
- Contraste adequado entre texto e fundo

### CAPA
- Design impactante que comunique o tema principal
- Título em destaque com tipografia bold
- Subtítulo descritivo
- Elemento visual central relevante ao tema

### ELEMENTOS VISUAIS
- Ícones para destacar pontos importantes
- Caixas de destaque para informações chave
- Citações formatadas de forma elegante
- Gráficos ou infográficos quando relevante

### CONTEÚDO
- Desenvolva cada capítulo com profundidade
- Use exemplos práticos e aplicáveis
- Inclua dados e estatísticas quando relevante
- Mantenha fluidez entre capítulos

### CONCLUSÃO E CTA
- Sintetize os aprendizados principais
- Inclua um CTA claro (visitar site, seguir nas redes, baixar material, etc.)
- Termine com uma mensagem inspiradora

Gere um ebook completo, visualmente atraente e pronto para publicação.`;
}

export function generateSaasPrompt(answers: SaasAnswers): string {
  const funcionalidades = answers.funcionalidades?.length
    ? answers.funcionalidades.map((f, i) => `${i + 1}. ${f}`).join('\n')
    : 'Defina as funcionalidades principais baseadas na ideia.';

  const tipoPagamento = answers.pagamentos && answers.tipoPagamento
    ? answers.tipoPagamento
    : '';
  const preco = answers.pagamentos && answers.preco
    ? answers.preco
    : '';

  return `Crie uma aplicação SaaS completa e funcional no Lovable com as seguintes especificações:

## OBJETIVO
${answers.ideia}

## PÚBLICO-ALVO
${answers.publico}

## PROBLEMA
${answers.problema}

## SOLUÇÃO
A aplicação deve resolver o problema acima através de uma plataforma web funcional, intuitiva e moderna.

## FUNCIONALIDADES PRINCIPAIS
${funcionalidades}

## PÁGINAS NECESSÁRIAS
- Landing page com apresentação do produto
- Página de registro/login
- Dashboard principal com visão geral
- Páginas específicas para cada funcionalidade
- Página de configurações/perfil
${answers.painelAdmin ? '- Painel administrativo com gestão de usuários e dados' : ''}

## FLUXO DO USUÁRIO
1. Usuário acessa a landing page
2. Regista-se ou faz login
3. É redirecionado para o dashboard
4. Acessa as funcionalidades principais
5. Configura a sua conta e preferências
${answers.painelAdmin ? '6. Administradores acessam o painel admin' : ''}

## AUTENTICAÇÃO
${answers.login ? `- Sistema de login completo com email/senha
- Página de registro
- Recuperação de senha
- Sessão persistente
- Proteção de rotas privadas` : '- Não é necessário sistema de login'}

## DASHBOARD
- Visão geral com métricas e resumos
- Navegação clara entre funcionalidades
- Cards interativos com informações relevantes
- Gráficos e visualizações de dados quando aplicável

## BANCO DE DADOS
- Estrutura de tabelas bem definida
- Relacionamentos corretos entre entidades
- Armazenamento seguro de dados do usuário
- Consultas otimizadas

${answers.painelAdmin ? `## PAINEL ADMINISTRATIVO
- Gestão de usuários (listar, editar, desativar)
- Visualização de métricas do sistema
- Gestão de conteúdo e dados
- Controle de permissões
- Logs de atividade` : ''}

${answers.pagamentos ? `## PAGAMENTOS
- Tipo de pagamento: ${tipoPagamento}
- Preço: ${preco}
- Página de checkout
- Gestão de subscrições (se aplicável)
- Histórico de transações
- Webhooks para confirmação de pagamento` : ''}

## DESIGN
- Estilo visual: ${answers.estilo}
- Interface moderna e limpa
- Cores harmoniosas e profissionais
- Tipografia legível e hierárquica
- Ícones e elementos visuais consistentes
- Navegação intuitiva

## RESPONSIVIDADE
- Design totalmente responsivo (mobile, tablet, desktop)
- Menu hamburger no mobile
- Layouts adaptáveis para diferentes tamanhos de tela
- Touch-friendly em dispositivos móveis

## ESTADOS DE LOADING
- Skeletons durante carregamento de dados
- Spinners em ações assíncronas
- Feedback visual em todas as operações

## TRATAMENTO DE ERROS
- Mensagens de erro claras e amigáveis
- Validação de formulários em tempo real
- Tratamento de falhas de rede
- Páginas de erro 404

## ESTADOS VAZIOS
- Ilustrações e mensagens quando não há dados
- CTAs para guiar o usuário quando listas estão vazias
- Onboarding para novos usuários

Crie uma aplicação SaaS completa, funcional e pronta para uso real. Não crie apenas uma interface — implemente toda a lógica de funcionamento, banco de dados, autenticação e integrações necessárias.`;
}

export function generateLojaPrompt(answers: LojaAnswers): string {
  const paginas = answers.paginas?.length
    ? answers.paginas.join(', ')
    : 'Início, Produtos, Produto, Carrinho, Checkout';

  const tipoPagamento = answers.tipoPagamento || '';
  const preco = answers.preco || '';

  return `Crie uma loja online completa e funcional no Lovable com as seguintes especificações:

## NOME DA LOJA
${answers.nome}

## NICHO / O QUE VENDE
${answers.vende}

## PÚBLICO-ALVO
${answers.publico}

## CATEGORIAS DE PRODUTOS
${answers.categorias}

## ESTILO VISUAL
${answers.estilo}

## PÁGINAS NECESSÁRIAS
${paginas}

## PÁGINA INICIAL
- Hero section com banner em destaque
- Produtos em promoção / mais vendidos
- Categorias em destaque
- Call-to-action para explorar produtos
- Newsletter / captura de email
- Testemunhos de clientes (se aplicável)

## CATÁLOGO DE PRODUTOS
- Grelha de produtos com imagem, nome, preço
- Filtros por categoria, preço, popularidade
- Ordenação (relevância, preço, novidades)
- Paginação ou carregamento infinito
- Badges (novidade, promoção, esgotado)

## PÁGINA DE PRODUTO
- Galeria de imagens do produto
- Nome, descrição detalhada e preço
- Seletor de quantidade
- Botão "Adicionar ao carrinho"
- Produtos relacionados
- Avaliações e comentários (se aplicável)
- Informação de stock disponível

## CARRINHO
- Lista de produtos com imagem, nome, preço e quantidade
- Atualização de quantidades
- Remoção de itens
- Cálculo de subtotal, envio e total
- Botão para prosseguir para checkout

## CHECKOUT
- Formulário de dados do cliente (nome, email, telefone, endereço)
- Seleção de método de envio
- Seleção de método de pagamento
- Resumo do pedido
- Confirmação do pedido
- Página de sucesso após pagamento

## PAGAMENTOS
- Tipo de pagamento: ${tipoPagamento}
- Preço: ${preco}
- Confirmação automática de pagamento
- Recibos e histórico de pedidos

${answers.painelAdmin ? `## PAINEL ADMINISTRATIVO
- Dashboard com métricas (vendas, pedidos, produtos)
- Gestão de produtos (adicionar, editar, remover)
- Upload de imagens de produtos
- Gestão de pedidos (visualizar, atualizar status)
- Gestão de categorias
- Gestão de clientes
- Relatórios de vendas` : ''}

## GESTÃO DE PRODUTOS
- Adicionar novos produtos com imagem, nome, descrição, preço, categoria
- Editar produtos existentes
- Controlar stock
- Definir produtos em promoção
- Organizar por categorias

## GESTÃO DE PEDIDOS
- Lista de todos os pedidos
- Atualizar status (pendente, processado, enviado, entregue)
- Detalhes de cada pedido
- Histórico de transações

## PESQUISA E FILTROS
- Barra de pesquisa de produtos
- Filtros por categoria, preço, marca
- Resultados em tempo real
- Sugestões de pesquisa

## DESIGN
- Estilo: ${answers.estilo}
- Interface moderna e atrativa
- Cores que combinem com o nicho
- Tipografia legível e comercial
- Imagens de alta qualidade
- Animações suaves e micro-interações
- Botões e CTAs em destaque

## RESPONSIVIDADE
- Design totalmente responsivo (mobile, tablet, desktop)
- Menu hamburger no mobile
- Grelha de produtos adaptável
- Carrinho acessível no mobile
- Checkout otimizado para mobile

Crie uma loja online completa, funcional e pronta para vender. Não crie apenas uma interface — implemente toda a lógica de funcionamento, carrinho, checkout, gestão de produtos e pedidos.`;
}

export function generatePrompt(type: ProjectType, answers: Record<string, unknown>): string {
  switch (type) {
    case 'ebook':
      return generateEbookPrompt(answers as unknown as EbookAnswers);
    case 'saas':
      return generateSaasPrompt(answers as unknown as SaasAnswers);
    case 'loja':
      return generateLojaPrompt(answers as unknown as LojaAnswers);
    default:
      return '';
  }
}

export function getProjectTitle(type: ProjectType, answers: Record<string, unknown>): string {
  switch (type) {
    case 'ebook':
      return `Ebook: ${answers.tema || 'Sem tema'}`;
    case 'saas':
      return `SaaS: ${answers.ideia ? String(answers.ideia).slice(0, 40) : 'Sem ideia'}`;
    case 'loja':
      return `Loja: ${answers.nome || 'Sem nome'}`;
    default:
      return 'Projeto';
  }
}

export function getExternalUrl(type: ProjectType): string {
  switch (type) {
    case 'ebook':
      return 'https://gamma.app/';
    case 'saas':
      return 'https://lovable.dev/';
    case 'loja':
      return 'https://lovable.dev/';
    default:
      return '#';
  }
}

export function getExternalLabel(type: ProjectType): string {
  switch (type) {
    case 'ebook':
      return 'Criar Ebook no Gamma';
    case 'saas':
      return 'Criar no Lovable';
    case 'loja':
      return 'Criar no Lovable';
    default:
      return 'Abrir';
  }
}
