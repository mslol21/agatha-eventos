export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  badge?: string;
  iconName: string;
  highlights: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "pipoca-gourmet",
    name: "Pipoca Gourmet",
    shortDescription: "Pipoca preparada na hora para deixar seu evento ainda mais divertido.",
    fullDescription: "Nosso carrinho de pipoca gourmet leva o aroma inconfundível de pipoca quentinha feita na hora, servida em embalagens charmosas e personalizadas. Perfeito para recepcionar convidados com sabor e descontração.",
    image: "/images/pipoca.jpg",
    badge: "Mais Pedido",
    iconName: "Popcorn",
    highlights: [
      "Pipoca quentinha feita na hora",
      "Carrinho vintage super charmoso",
      "Embalagens higiênicas e sofisticadas",
      "Opções doces e salgadas temperadas"
    ]
  },
  {
    id: "crepe-suico",
    name: "Crepe Suíço",
    shortDescription: "Crepes preparados na hora, com opções doces e salgadas.",
    fullDescription: "Massa leve e crocante recheada na hora com os melhores ingredientes. Servimos opções de queijo, presunto, frango com catupiry, nutella, brigadeiro e goiabada com queijo, agradando todos os paladares.",
    image: "/images/crepe.jpg",
    badge: "Sucesso Garantido",
    iconName: "Utensils",
    highlights: [
      "Massa crocante assada ao vivo",
      "Variedade de recheios doces e salgados",
      "Atendimento ágil para grandes públicos",
      "Apresentação limpa e sofisticada"
    ]
  },
  {
    id: "algodao-doce",
    name: "Algodão Doce",
    shortDescription: "Uma experiência que encanta crianças e adultos.",
    fullDescription: "Nuvens de algodão doce feitas ao vivo em cores pastel delicadas. Leva a magia e a nostalgia das melhores lembranças de infância para eventos infantis, casamentos e ações promocionais.",
    image: "/images/algodao-doce.jpg",
    badge: "Magia & Alegria",
    iconName: "Sparkles",
    highlights: [
      "Preparo artesanal ao vivo",
      "Cores pastel encantadoras",
      "Palitos personalizados e higiênicos",
      "Opção de algodão doce no copo bolha"
    ]
  },
  {
    id: "hot-dog",
    name: "Hot Dog Gourmet",
    shortDescription: "Uma opção prática, saborosa e perfeita para diferentes tipos de eventos.",
    fullDescription: "Pães macios, salsichas de altíssima qualidade e acompanhamentos frescos selecionados. Uma opção substancial e deliciosa para manter a energia dos convidados alta durante toda a comemoração.",
    image: "/images/hotdog.jpg",
    badge: "Prático & Delicioso",
    iconName: "Sandwich",
    highlights: [
      "Pães sempre fofinhos e aquecidos",
      "Molho especial da casa",
      "Bancada de acompanhamentos variados",
      "Ideal para madrugadas de festas"
    ]
  },
  {
    id: "brigadeiro-colher",
    name: "Brigadeiro de Colher",
    shortDescription: "Uma experiência doce e irresistível para complementar sua comemoração.",
    fullDescription: "O clássico brigadeiro gourmet cremoso servido em copinhos elegantes com uma variedade de confeitos nobres (splits de chocolate belga, granulados crocantes, paçoca e miçangas coloridas).",
    image: "/images/brigadeiro.jpg",
    badge: "Irresistível",
    iconName: "Cake",
    highlights: [
      "Receita cremosa artesanal",
      "Confeitos nobres à escolha dos convidados",
      "Visual sofisticado para mesa de doces",
      "Sensação em aniversários e casamentos"
    ]
  },
  {
    id: "experiencias-personalizadas",
    name: "Experiências Personalizadas",
    shortDescription: "Opções sob medida e personalizações especiais para a identidade do seu evento.",
    fullDescription: "Personalizamos os carrinhos com a identidade visual da sua marca, monograma de casamento ou tema da festa infantil. Também combinamos cardápios exclusivos sob consulta prévia.",
    image: "/images/hero.jpg",
    badge: "Exclusivo",
    iconName: "Palette",
    highlights: [
      "Personalização gráfica do carrinho",
      "Embalagens com a sua logomarca ou tema",
      "Cardápios sob medida para seu público",
      "Especialistas em ativações de marcas"
    ]
  }
];
