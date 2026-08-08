export interface GalleryItem {
  id: string;
  title: string;
  category: "carrinhos" | "eventos" | "produtos" | "corporativo";
  categoryLabel: string;
  image: string;
  aspectRatio?: "square" | "tall" | "wide";
  description: string;
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "galeria-01",
    title: "Carrinho Gourmet em Festa Infantil",
    category: "eventos",
    categoryLabel: "Festas & Eventos",
    image: "/images/hero.jpg",
    aspectRatio: "wide",
    description: "Estrutura charmosa integrada à decoração do evento no Jardim Anália Franco."
  },
  {
    id: "galeria-02",
    title: "Pipoca Gourmet Quentinha",
    category: "produtos",
    categoryLabel: "Sabores",
    image: "/images/pipoca.jpg",
    aspectRatio: "tall",
    description: "Pipoca preparada na hora com embalagens personalizadas e higiênicas."
  },
  {
    id: "galeria-03",
    title: "Crepe Suíço Doce e Salgado",
    category: "produtos",
    categoryLabel: "Sabores",
    image: "/images/crepe.jpg",
    aspectRatio: "square",
    description: "Massa leve crocante com recheios generosos assados ao vivo."
  },
  {
    id: "galeria-04",
    title: "Algodão Doce em Nuvens Pastel",
    category: "carrinhos",
    categoryLabel: "Carrinhos Gourmet",
    image: "/images/algodao-doce.jpg",
    aspectRatio: "square",
    description: "Alegria e cor que encantam crianças e adultos em festas particulares."
  },
  {
    id: "galeria-05",
    title: "Ativação em Evento Corporativo",
    category: "corporativo",
    categoryLabel: "Corporativo",
    image: "/images/evento-corporativo.jpg",
    aspectRatio: "wide",
    description: "Experiência gastronômica marcante para colaboradores e clientes em SP."
  },
  {
    id: "galeria-06",
    title: "Estação de Hot Dog Gourmet",
    category: "produtos",
    categoryLabel: "Sabores",
    image: "/images/hotdog.jpg",
    aspectRatio: "square",
    description: "Praticidade e sabor irresistível para comemorações e madrugadas de festas."
  },
  {
    id: "galeria-07",
    title: "Brigadeiro de Colher Gourmet",
    category: "produtos",
    categoryLabel: "Sabores",
    image: "/images/brigadeiro.jpg",
    aspectRatio: "tall",
    description: "Copinhos individuais com confeitos nobres para encantar os convidados."
  },
  {
    id: "galeria-08",
    title: "Recepção Elegante em Casamento",
    category: "eventos",
    categoryLabel: "Festas & Eventos",
    image: "/images/evento-02.jpg",
    aspectRatio: "wide",
    description: "Carrinhos que somam charme, sofisticação e carinho à celebração dos noivos."
  }
];
