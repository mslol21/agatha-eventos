export interface EventTypeItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
  ctaText: string;
}

export const EVENT_TYPES_DATA: EventTypeItem[] = [
  {
    id: "corporativos",
    title: "Eventos Corporativos",
    description: "Endomarketing, convenções, lançamentos de produtos e feiras. Experiências que engajam colaboradores e encantam clientes.",
    iconName: "Briefcase",
    image: "/images/evento-corporativo.jpg",
    ctaText: "Solicitar orçamento corporativo"
  },
  {
    id: "festas-aniversarios",
    title: "Festas e Aniversários",
    description: "Celebre a vida com carrinhos charmosos que trazem alegria e sabores deliciosos para familiares e amigos de todas as idades.",
    iconName: "PartyPopper",
    image: "/images/evento-01.jpg",
    ctaText: "Planejar meu aniversário"
  },
  {
    id: "casamentos",
    title: "Casamentos",
    description: "Um mimo refinado para a recepção ou madrugadas de pista de dança. Carrinhos elegantes que combinam com a decoração da sua festa.",
    iconName: "Heart",
    image: "/images/evento-02.jpg",
    ctaText: "Orçamento para casamento"
  },
  {
    id: "formaturas",
    title: "Formaturas",
    description: "Estações práticas e divertidas para manter os formandos e convidados alimentados e animados durante horas de celebração.",
    iconName: "GraduationCap",
    image: "/images/crepe.jpg",
    ctaText: "Orçamento para formatura"
  },
  {
    id: "eventos-infantis",
    title: "Eventos Infantis",
    description: "Algodão doce colorido, pipoca quentinha e crepes doces. Um ambiente seguro, higiênico e cheio de magia para a criançada.",
    iconName: "Smile",
    image: "/images/algodao-doce.jpg",
    ctaText: "Orçamento para festa infantil"
  },
  {
    id: "confraternizacoes",
    title: "Confraternizações",
    description: "Reuniões de fim de ano, encontros de amigos e festas comunitárias com atendimento leve, simpático e muito saboroso.",
    iconName: "Users",
    image: "/images/hotdog.jpg",
    ctaText: "Planejar confraternização"
  },
  {
    id: "feiras-promocionais",
    title: "Feiras e Stand Promocional",
    description: "Gere fluxo no seu estande e aumente a permanência dos visitantes oferecendo comidinhas preparadas na hora.",
    iconName: "Store",
    image: "/images/pipoca.jpg",
    ctaText: "Orçamento para feiras"
  },
  {
    id: "eventos-personalizados",
    title: "Eventos Personalizados",
    description: "Formatos flexíveis para chá de bebê, inaugurações de lojas, eventos esportivos e comemorações escolares.",
    iconName: "Sparkles",
    image: "/images/brigadeiro.jpg",
    ctaText: "Solicitar projeto sob medida"
  }
];
