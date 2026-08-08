export interface TestimonialItem {
  id: string;
  name: string;
  eventType: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
  isPlaceholder?: boolean;
}

// NOTA: Estes depoimentos são modelos estruturados (placeholders) prontos para substituição pelas avaliações reais dos clientes da Agatha Eventos.
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "depoimento-01",
    name: "Mariana Souza",
    eventType: "Aniversário Infantil (7 Anos)",
    rating: 5,
    comment: "Os carrinhos de pipoca gourmet e algodão doce foram o grande destaque da festa! A equipe foi pontual, carinhosa com as crianças e a estrutura era impecável.",
    date: "São Paulo/SP",
    location: "Jardim Anália Franco",
    isPlaceholder: true
  },
  {
    id: "depoimento-02",
    name: "Rodrigo Mendonça",
    eventType: "Evento Corporativo - Convenção de Vendas",
    rating: 5,
    comment: "Contratamos o crepe suíço e hot dog para a confraternização da nossa empresa. Atendimento super profissional, comida quentinha e saborosa. Recomendo de olhos fechados!",
    date: "Grande São Paulo",
    location: "Alphaville / Barueri",
    isPlaceholder: true
  },
  {
    id: "depoimento-03",
    name: "Camila & Felipe",
    eventType: "Casamento (Pista de Dança)",
    rating: 5,
    comment: "O carrinho de brigadeiro de colher e pipoca na madrugada do casamento foi uma surpresa incrível para os convidados. Todos elogiaram o charme e o sabor!",
    date: "São Paulo/SP",
    location: "Moema",
    isPlaceholder: true
  },
  {
    id: "depoimento-04",
    name: "Patrícia Lima",
    eventType: "Festa de 15 Anos",
    rating: 5,
    comment: "Tudo lindo e delicioso! O carinho na apresentação e a simpatia da equipe fizeram toda a diferença no evento da minha filha.",
    date: "ABC Paulista",
    location: "Santo André",
    isPlaceholder: true
  }
];
