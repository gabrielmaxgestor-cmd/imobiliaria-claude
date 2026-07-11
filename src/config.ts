/**
 * CONFIGURAÇÃO GLOBAL DA IMOBILIÁRIA BOUTIQUE
 * Altere as informações abaixo para personalizar o site por completo.
 * O site irá ler dinamicamente todos os dados deste objeto.
 */

export interface Imovel {
  id: string;
  titulo: string;
  descricao: string;
  local: string;
  tipo: string;
  preco: string;
  quartos: number;
  banheiros: number;
  area: number; // em m²
  tag: string;
  fraseClima: string;
  imagemPrincipal: string;
  galeria: string[];
  localizacao?: string;
  imagemUrl?: string;
  categoria?: string;
  caracteristicas?: string[];
}

export interface Depoimento {
  id: string;
  nome: string;
  cargo: string;
  texto: string;
  avatarUrl: string;
}

export interface ImobiliariaConfig {
  infoGerais: {
    nome: string;
    logoText: string;
    subtituloLogo: string;
    whatsapp: string; // Número limpo para link: '5511999999999'
    whatsappFormatado: string; // Para exibição: '(11) 99999-9999'
    mensagemWhatsappPadrao: string; // Mensagem padrão para o whatsapp
    email: string;
    telefone: string;
    endereco: string;
    creci: string; // CRECI do corretor/imobiliária
    desenvolvidoPor: string; // Ex: "site desenvolvido sob medida"
  };
  cores: {
    corFundo: string;
    corFundoAlt: string;
    corEscura: string;
    corEscura2: string;
    corAcento: string;
    corAcentoEscuro: string;
    corDourado: string;
    corTexto: string;
    corTextoSuave: string;
    corBranco: string;
  };
  menuLinks: Array<{
    label: string;
    href: string;
  }>;
  hero: {
    heroEyebrow: string;
    heroFraseAbertura: string;
    heroTitulo: string;
    heroSubtitulo: string;
    heroBotaoPrimario: string;
    heroBotaoSecundario: string;
    heroVideoUrl: string;
    heroImagemFallback: string;
    heroScrollText: string;
  };
  manifesto: {
    titulo: string;
    subtitulo: string;
    texto: string;
    assinatura: string;
    manifestoBloco1: string;
    manifestoBloco2: string;
    manifestoBloco3: string;
  };
  diferenciaisSeção: {
    eyebrow: string;
    titulo: string;
    linkTexto: string;
  };
  diferenciais: Array<{
    titulo: string;
    descricao: string;
  }>;
  destaqueSeção: {
    eyebrow: string;
    titulo: string;
    descricaoTemplate: string;
    botaoVerDestaque: string;
    botaoVerOutros: string;
  };
  imovelDestaque: Imovel | null;
  imoveis: Imovel[];
  colecaoSeção: {
    eyebrow: string;
    titulo: string;
    subtitulo: string;
    botaoVerMais: string;
  };
  filtros: {
    tipoLabel: string;
    tipoTodos: string;
    localLabel: string;
    localTodos: string;
    precoLabel: string;
    precoQualquer: string;
    limparFiltros: string;
    semResultados: string;
    verTodos: string;
  };
  sobre: {
    eyebrow: string;
    titulo: string;
    textoParagrafos: string[];
    imagemUrl: string;
    nomeGestor: string;
    cargoGestor: string;
    badgeTextoAnos: string;
  };
  estatisticas: Array<{
    valor: string;
    legenda: string;
  }>;
  depoimentosSeção: {
    eyebrow: string;
    titulo: string;
  };
  depoimentos: Depoimento[];
  ctaFinal: {
    eyebrow: string;
    titulo: string;
    subtitulo: string;
    botaoText: string;
    disclaimer: string;
    divisorText: string;
    formulario: {
      nomeLabel: string;
      nomePlaceholder: string;
      whatsappLabel: string;
      whatsappPlaceholder: string;
      procuraLabel: string;
      procuraPlaceholder: string;
      botaoEnviar: string;
      mensagemSucesso: string;
    };
  };
  rodape: {
    textoCredito: string;
  };
  rodapeDescricao: string;
  detalhesModal: {
    diferenciaisTitulo: string;
    precoLabel: string;
    botaoWhatsapp: string;
    quartosLabel: string;
    banheirosLabel: string;
    areaLabel: string;
  };
}

export const CONFIG: ImobiliariaConfig = {
  infoGerais: {
    nome: "Aura Imóveis d'Alma",
    logoText: "AURA",
    subtituloLogo: "IMÓVEIS D'ALMA",
    whatsapp: "5511999999999",
    whatsappFormatado: "(11) 99999-9999",
    mensagemWhatsappPadrao: "Olá! Gostaria de agendar um atendimento exclusivo e conhecer imóveis selecionados.",
    email: "contato@auraimoveis.com.br",
    telefone: "(11) 3040-0000",
    endereco: "Al. Lorena, 1200 - Jardins, São Paulo - SP",
    creci: "CRECI: 38.492-J",
    desenvolvidoPor: "site desenvolvido sob medida",
  },
  cores: {
    corFundo: "#F6F1E6",
    corFundoAlt: "#EFE7D8",
    corEscura: "#1E2B20",
    corEscura2: "#16201A",
    corAcento: "#BD5B34",
    corAcentoEscuro: "#9A4726",
    corDourado: "#A9843F",
    corTexto: "#241F18",
    corTextoSuave: "#5B5648",
    corBranco: "#FFFCF6",
  },
  menuLinks: [
    { label: "O Início", href: "#inicio" },
    { label: "Nosso Manifesto", href: "#manifesto" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Imóvel Secreto", href: "#imovel-destaque" },
    { label: "Coleção de Imóveis", href: "#imoveis" },
    { label: "Quem Somos", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Contato", href: "#contato" },
  ],
  hero: {
    heroEyebrow: "Curadoria Imobiliária Exclusiva",
    heroFraseAbertura: "Existe um lugar esperando por você.",
    heroTitulo: "Encontre o lugar onde sua história continua",
    heroSubtitulo: "Não vendemos endereços. Ajudamos você a encontrar onde a próxima fase da sua vida vai acontecer.",
    heroBotaoPrimario: "Quero sentir isso de perto",
    heroBotaoSecundario: "Já sei o que procuro ↓",
    heroVideoUrl: "", // SUBSTITUIR PELA URL DO VÍDEO FINAL
    heroImagemFallback: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    heroScrollText: "role para sentir mais",
  },
  manifesto: {
    titulo: "Acreditamos que morar é um ato poético",
    subtitulo: "Nossa Filosofia",
    texto: "Uma casa não é apenas um conjunto de paredes e telhado. É o porto seguro onde sua alma repousa, o espaço onde risadas ecoam e memórias ganham vida. Procuramos imóveis que tenham alma — uma luz da tarde perfeita, a brisa que cruza a sala, a textura da madeira maciça. Não vendemos metros quadrados; curamos cenários para a sua felicidade.",
    assinatura: "Lar, Doce Lar",
    manifestoBloco1: "Acreditamos que uma casa não é onde você mora.",
    manifestoBloco2: "É onde seus filhos vão aprender a andar.\nOnde o café da manhã vira ritual.\nOnde uma década inteira da sua vida vai se passar sem você perceber o tempo passando.",
    manifestoBloco3: "Por isso, não mostramos imóveis. Mostramos possibilidades de vida.",
  },
  diferenciaisSeção: {
    eyebrow: "COMO FAZEMOS ISSO ACONTECER",
    titulo: "Sentimento é o ponto de partida. Método é o que garante o resultado.",
    linkTexto: "Conheça quem está por trás disso",
  },
  diferenciais: [
    {
      titulo: "Curadoria pessoal",
      descricao: "Cada imóvel é visitado por nós antes de chegar até você — porque recomendar é diferente de anunciar."
    },
    {
      titulo: "Proximidade real",
      descricao: "Você fala com quem conhece a rua, o bairro, a vizinhança. Não com um sistema automático."
    },
    {
      titulo: "Documentação sem dor de cabeça",
      descricao: "Cuidamos de toda a parte jurídica para que sua energia fique livre para sonhar, não para se preocupar."
    },
    {
      titulo: "Relação que continua",
      descricao: "Nosso trabalho não termina na assinatura. Continuamos por perto para o que você precisar depois."
    }
  ],
  destaqueSeção: {
    eyebrow: "UM EXEMPLO DO QUE ESTAMOS FALANDO",
    titulo: "Imagine acordar aqui.",
    descricaoTemplate: "Luz da manhã entrando pela varanda. Café pronto enquanto você ainda decide o que fazer no fim de semana. Um jardim que vira extensão da sala da",
    botaoVerDestaque: "Quero conhecer esse imóvel",
    botaoVerOutros: "Ver outras possibilidades",
  },
  imovelDestaque: {
    id: "imovel-1",
    titulo: "Casa das Palmeiras",
    descricao: "Um refúgio modernista projetado na década de 70, com integration total à natureza e claraboias dramáticas que banham os ambientes em luz natural.",
    local: "Jardim Europa, São Paulo",
    tipo: "Casa",
    preco: "R$ 14.800.000",
    quartos: 4,
    banheiros: 5,
    area: 450,
    tag: "Destaque",
    fraseClima: "Silêncio absoluto e luz da tarde filtrada pelas palmeiras",
    imagemPrincipal: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    localizacao: "Jardim Europa, São Paulo",
    imagemUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    categoria: "urbano",
    caracteristicas: ["Piscina de raia", "Jardim tropical", "Claraboias", "Adega climatizada"]
  },
  imoveis: [
    {
      id: "imovel-1",
      titulo: "Casa das Palmeiras",
      descricao: "Um refúgio modernista projetado na década de 70, com integração total à natureza e claraboias dramáticas que banham os ambientes em luz natural.",
      local: "Jardim Europa, São Paulo",
      tipo: "Casa",
      preco: "R$ 14.800.000",
      quartos: 4,
      banheiros: 5,
      area: 450,
      tag: "Destaque",
      fraseClima: "Silêncio absoluto e luz da tarde filtrada pelas palmeiras",
      imagemPrincipal: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      galeria: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
      ],
      localizacao: "Jardim Europa, São Paulo",
      imagemUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      categoria: "urbano",
      caracteristicas: ["Piscina de raia", "Jardim tropical", "Claraboias", "Adega climatizada"]
    },
    {
      id: "imovel-2",
      titulo: "Refúgio da Mata",
      descricao: "Uma obra de vidro e madeira suspensa na copa das árvores. Perfeita para quem busca desconexão total e o abraço acolhedor da Serra Fluminense.",
      local: "Itaipava, Rio de Janeiro",
      tipo: "Casa de Campo",
      preco: "R$ 6.200.000",
      quartos: 3,
      banheiros: 4,
      area: 380,
      tag: "Novo",
      fraseClima: "O som do rio correndo e cheiro de terra molhada",
      imagemPrincipal: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      galeria: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
      ],
      localizacao: "Itaipava, Rio de Janeiro",
      imagemUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      categoria: "campo",
      caracteristicas: ["Lareira de pedra", "Ofurô externo", "Deck suspenso", "Horta orgânica"]
    },
    {
      id: "imovel-3",
      titulo: "Cobertura Horizonte",
      descricao: "Cobertura duplex linear com vista livre e panorâmica para a praia de Ipanema. Pé-direito duplo na sala de jantar e uma piscina suspensa com borda infinita.",
      local: "Ipanema, Rio de Janeiro",
      tipo: "Cobertura",
      preco: "R$ 22.000.000",
      quartos: 3,
      banheiros: 5,
      area: 320,
      tag: "Exclusivo",
      fraseClima: "O mar emoldurado por grandes painéis de vidro",
      imagemPrincipal: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      galeria: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
      ],
      localizacao: "Ipanema, Rio de Janeiro",
      imagemUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      categoria: "litoral",
      caracteristicas: ["Piscina de borda infinita", "Pé-direito duplo", "Automação total", "Elevador privativo"]
    },
    {
      id: "imovel-4",
      titulo: "Apartamento Brisa",
      descricao: "Apartamento reformado assinado por arquiteto renomado. Piso em taco de madeira nobre original e grandes janelas voltadas para as copas das árvores dos Jardins.",
      local: "Jardins, São Paulo",
      tipo: "Apartamento",
      preco: "R$ 4.900.000",
      quartos: 2,
      banheiros: 3,
      area: 180,
      tag: "Curadoria",
      fraseClima: "Claridade abundante e uma atmosfera de galeria de arte",
      imagemPrincipal: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      galeria: [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
      ],
      localizacao: "Jardins, São Paulo",
      imagemUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      categoria: "urbano",
      caracteristicas: ["Piso de taco original", "Janelas piso-teto", "Cozinha integrada", "Ar condicionado VRF"]
    },
    {
      id: "imovel-5",
      titulo: "Vila das Águas",
      descricao: "Arquitetura baiana contemporânea com telhados de palha e estrutura em eucalipto autoclavado. A apenas 50 metros da areia, rodeada por um gramado infinito.",
      local: "Trancoso, Bahia",
      tipo: "Casa de Praia",
      preco: "R$ 9.500.000",
      quartos: 5,
      banheiros: 6,
      area: 520,
      tag: "Destaque",
      fraseClima: "Brisa salgada constante e o balanço suave dos coqueiros",
      imagemPrincipal: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      galeria: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
      ],
      localizacao: "Trancoso, Bahia",
      imagemUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      categoria: "litoral",
      caracteristicas: ["Acesso privativo à praia", "Varanda gourmet", "Piscina com deck", "Bangalô de hóspedes"]
    },
    {
      id: "imovel-6",
      titulo: "Solar do Vale",
      descricao: "Casa rústica-chique em condomínio fechado de alto padrão. Fachada revestida em pedras naturais e vidros duplos alemães para perfeito isolamento térmico.",
      local: "Gramado, Rio Grande do Sul",
      tipo: "Casa de Campo",
      preco: "R$ 5.400.000",
      quartos: 4,
      banheiros: 4,
      area: 410,
      tag: "Novo",
      fraseClima: "O crepitar da lenha e neblina cobrindo o vale",
      imagemPrincipal: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      galeria: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
      ],
      localizacao: "Gramado, Rio Grande do Sul",
      imagemUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      categoria: "campo",
      caracteristicas: ["Paredes de pedra natural", "Calefação instalada", "Adega subterrânea", "Espaço de fogo de chão"]
    }
  ],
  colecaoSeção: {
    eyebrow: "SELEÇÃO ATUAL",
    titulo: "Estas são as possibilidades disponíveis agora",
    subtitulo: "Cada imóvel abaixo passou pela nossa curadoria. Filtre pelo que faz sentido pra sua próxima fase.",
    botaoVerMais: "Quero ver mais opções",
  },
  filtros: {
    tipoLabel: "Tipo de Imóvel",
    tipoTodos: "Todos os tipos",
    localLabel: "Localização / Bairro",
    localTodos: "Todas as localizações",
    precoLabel: "Faixa de Preço Máxima",
    precoQualquer: "Qualquer valor",
    limparFiltros: "Limpar filtros",
    semResultados: "Nenhum imóvel corresponde aos filtros selecionados.",
    verTodos: "Ver todos os imóveis",
  },
  sobre: {
    eyebrow: "QUEM CUIDA DO SEU NEGÓCIO",
    titulo: "Feito por gente que conhece cada rua da cidade",
    textoParagrafos: [
      "Somos uma imobiliária local, formada por corretores que nasceram e cresceram aqui. Sabemos qual bairro combina com cada fase da vida — e isso faz toda diferença na hora de escolher.",
      "Mais do que fechar negócio, nosso trabalho é entender o que você procura antes mesmo de você encontrar as palavras certas para descrever."
    ],
    imagemUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    nomeGestor: "Helena Albuquerque",
    cargoGestor: "Fundadora & Diretora de Curadoria",
    badgeTextoAnos: "anos conectando pessoas aos seus imóveis",
  },
  estatisticas: [
    { valor: "420+", legenda: "imóveis negociados" },
    { valor: "98%", legenda: "clientes satisfeitos" },
    { valor: "12", legenda: "anos de atuação" }
  ],
  depoimentosSeção: {
    eyebrow: "QUEM VIVEU, CONTA",
    titulo: "Histórias que começaram aqui",
  },
  depoimentos: [
    {
      id: "dep-1",
      nome: "Marina Costa",
      cargo: "Compradora, Vila Nova",
      texto: "Encontramos onde nossa família ia crescer, não apenas um apartamento.",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "dep-2",
      nome: "Rafael Andrade",
      cargo: "Comprador, Jardim Europa",
      texto: "Foi o lugar que a gente nem sabia que estava procurando.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "dep-3",
      nome: "Juliana Ferreira",
      cargo: "Compradora, Pinheiros",
      texto: "Cuidado, transparência e um carinho que a gente não vê em toda imobiliária.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    }
  ],
  ctaFinal: {
    eyebrow: "VAMOS CONVERSAR",
    titulo: "Vamos encontrar o lugar onde sua próxima história começa?",
    subtitulo: "Fale com a gente agora e receba uma seleção pensada para o que você procura — sem forçar, sem pressa.",
    botaoText: "Chamar no WhatsApp",
    disclaimer: "Conversa direta, humana e personalizada",
    divisorText: "ou se preferir, nós entramos em contato",
    formulario: {
      nomeLabel: "Seu Nome",
      nomePlaceholder: "Como gostaria de ser chamado?",
      whatsappLabel: "Seu WhatsApp",
      whatsappPlaceholder: "(00) 00000-0000",
      procuraLabel: "O que você procura?",
      procuraPlaceholder: "Ex: Apartamento nos Jardins com 3 suítes, ou casa em condomínio fechado...",
      botaoEnviar: "Quero ser contatado",
      mensagemSucesso: "Obrigado pelo interesse! Nossa equipe entrará em contato em breve para apresentar nossa curadoria.",
    },
  },
  rodape: {
    textoCredito: "© 2026 Aura Imóveis d'Alma. Todos os direitos reservados. Design e curadoria por Aura Lab."
  },
  rodapeDescricao: "Uma imobiliária boutique dedicada a conectar pessoas com alma a lares com essência, em cada rua e bairro da nossa cidade.",
  detalhesModal: {
    diferenciaisTitulo: "Diferenciais do Imóvel",
    precoLabel: "VALOR DE INVESTIMENTO",
    botaoWhatsapp: "Chamar no WhatsApp",
    quartosLabel: "quartos",
    banheirosLabel: "banheiros",
    areaLabel: "m²"
  }
};
