"use client";

import { ServiceItem } from "@/data/services";

export interface CatalogProduct extends ServiceItem {
  active: boolean;
  category: "doces" | "salgados" | "combos" | "personalizados";
  estimatedPricePerGuest?: number; // e.g. R$ 12 / pessoa
  minGuests?: number; // e.g. 30 convidados
}

export interface QuoteLead {
  id: string;
  createdAt: string;
  name: string;
  whatsapp: string;
  email?: string;
  eventType: string;
  eventDate: string;
  eventTime?: string;
  durationHours?: string;
  city: string;
  address?: string;
  guestCount: string;
  services: string[];
  message?: string;
  status: "novo" | "em_contato" | "enviado" | "fechado";
}

export interface CompanySettings {
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  baseLocation: string;
  adminPin: string;
}

const PRODUCTS_STORAGE_KEY = "agatha_products_v2";
const LEADS_STORAGE_KEY = "agatha_leads_v2";
const SETTINGS_STORAGE_KEY = "agatha_company_settings_v1";
const AUTH_STORAGE_KEY = "agatha_admin_session";

export const DEFAULT_SETTINGS: CompanySettings = {
  whatsappNumber: "5511978447785",
  instagramHandle: "@agathaeventos2024",
  instagramUrl: "https://www.instagram.com/agathaeventos2024/",
  baseLocation: "Jardim Anália Franco — São Paulo/SP",
  adminPin: "123456",
};

export const INITIAL_PRODUCTS: CatalogProduct[] = [
  {
    id: "pipoca-gourmet",
    name: "Pipoca Gourmet",
    shortDescription: "Pipoca preparada na hora para deixar seu evento ainda mais divertido.",
    fullDescription: "Nosso carrinho de pipoca gourmet leva o aroma inconfundível de pipoca quentinha feita na hora, servida em embalagens charmosas e personalizadas.",
    image: "/images/pipoca.jpg",
    badge: "Mais Pedido",
    iconName: "Popcorn",
    highlights: [
      "Pipoca quentinha feita na hora",
      "Carrinho vintage super charmoso",
      "Embalagens higiênicas e sofisticadas",
      "Opções doces e salgadas temperadas"
    ],
    active: true,
    category: "salgados",
    estimatedPricePerGuest: 10,
    minGuests: 30,
  },
  {
    id: "crepe-suico",
    name: "Crepe Suíço",
    shortDescription: "Crepes preparados na hora, com opções doces e salgadas.",
    fullDescription: "Massa leve e crocante recheada na hora com os melhores ingredientes. Servimos opções doces e salgadas.",
    image: "/images/crepe.jpg",
    badge: "Sucesso Garantido",
    iconName: "Utensils",
    highlights: [
      "Massa crocante assada ao vivo",
      "Variedade de recheios doces e salgados",
      "Atendimento ágil para grandes públicos"
    ],
    active: true,
    category: "salgados",
    estimatedPricePerGuest: 15,
    minGuests: 50,
  },
  {
    id: "algodao-doce",
    name: "Algodão Doce",
    shortDescription: "Uma experiência que encanta crianças e adultos.",
    fullDescription: "Nuvens de algodão doce feitas ao vivo em cores pastel delicadas.",
    image: "/images/algodao-doce.jpg",
    badge: "Magia & Alegria",
    iconName: "Sparkles",
    highlights: [
      "Preparo artesanal ao vivo",
      "Cores pastel encantadoras",
      "Palitos personalizados e higiênicos"
    ],
    active: true,
    category: "doces",
    estimatedPricePerGuest: 8,
    minGuests: 30,
  },
  {
    id: "hot-dog",
    name: "Hot Dog Gourmet",
    shortDescription: "Uma opção prática, saborosa e perfeita para diferentes tipos de eventos.",
    fullDescription: "Pães macios, salsichas de altíssima qualidade e acompanhamentos frescos selecionados.",
    image: "/images/hotdog.jpg",
    badge: "Prático & Delicioso",
    iconName: "Sandwich",
    highlights: [
      "Pães sempre fofinhos e aquecidos",
      "Molho especial da casa",
      "Bancada de acompanhamentos variados"
    ],
    active: true,
    category: "salgados",
    estimatedPricePerGuest: 14,
    minGuests: 30,
  },
  {
    id: "brigadeiro-colher",
    name: "Brigadeiro de Colher",
    shortDescription: "Uma experiência doce e irresistível para complementar sua comemoração.",
    fullDescription: "O clássico brigadeiro gourmet cremoso servido em copinhos elegantes com uma variedade de confeitos nobres.",
    image: "/images/brigadeiro.jpg",
    badge: "Irresistível",
    iconName: "Cake",
    highlights: [
      "Receita cremosa artesanal",
      "Confeitos nobres à escolha dos convidados",
      "Visual sofisticado para mesa de doces"
    ],
    active: true,
    category: "doces",
    estimatedPricePerGuest: 12,
    minGuests: 30,
  },
  {
    id: "experiencias-personalizadas",
    name: "Experiências Personalizadas",
    shortDescription: "Opções sob medida e personalizações especiais para a identidade do seu evento.",
    fullDescription: "Personalizamos os carrinhos com a identidade visual da sua marca, monograma de casamento ou tema da festa infantil.",
    image: "/images/hero.jpg",
    badge: "Exclusivo",
    iconName: "Palette",
    highlights: [
      "Personalização gráfica do carrinho",
      "Embalagens com a sua logomarca ou tema",
      "Especialistas em ativações de marcas"
    ],
    active: true,
    category: "personalizados",
    estimatedPricePerGuest: 18,
    minGuests: 30,
  }
];

export const INITIAL_LEADS: QuoteLead[] = [
  {
    id: "lead-101",
    createdAt: "2026-08-07T14:30:00Z",
    name: "Camila Fernandes",
    whatsapp: "(11) 98877-6655",
    email: "camila@email.com",
    eventType: "Aniversário Infantil",
    eventDate: "2026-09-12",
    eventTime: "15:00",
    durationHours: "4 horas",
    city: "São Paulo - Anália Franco",
    address: "Rua Emília Marengo, 400 - Tatuapé",
    guestCount: "60 pessoas",
    services: ["Pipoca Gourmet", "Algodão Doce"],
    message: "Gostaria de saber o valor para 4 horas de festa no período da tarde.",
    status: "novo",
  },
  {
    id: "lead-102",
    createdAt: "2026-08-06T10:15:00Z",
    name: "Marcelo Oliveira - Tech Corp",
    whatsapp: "(11) 97766-5544",
    email: "marcelo@techcorp.com.br",
    eventType: "Corporativo",
    eventDate: "2026-10-05",
    eventTime: "11:00",
    durationHours: "5 horas",
    city: "Barueri / Alphaville",
    address: "Alameda Rio Negro, 500",
    guestCount: "150 pessoas",
    services: ["Crepe Suíço", "Hot Dog Gourmet"],
    message: "Necessitamos de emissão de Nota Fiscal Faturada para 30 dias.",
    status: "em_contato",
  },
  {
    id: "lead-103",
    createdAt: "2026-08-05T18:45:00Z",
    name: "Juliana & Roberto",
    whatsapp: "(11) 96655-4433",
    email: "juliana.casamento@email.com",
    eventType: "Casamento",
    eventDate: "2026-11-20",
    eventTime: "23:30",
    durationHours: "4 horas",
    city: "Santo André - SP",
    address: "Buffet Mansão das Flores",
    guestCount: "200 pessoas",
    services: ["Brigadeiro de Colher", "Pipoca Gourmet"],
    message: "Para servir na madrugada da pista de dança a partir da meia-noite.",
    status: "fechado",
  }
];

// Settings Helpers
export function getCompanySettings(): CompanySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveCompanySettings(settings: CompanySettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

// Product Helpers
export function getStoredProducts(): CatalogProduct[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: CatalogProduct[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product: Omit<CatalogProduct, "id">): CatalogProduct {
  const products = getStoredProducts();
  const newProduct: CatalogProduct = {
    ...product,
    id: `custom-prod-${Date.now()}`,
  };
  const updated = [newProduct, ...products];
  saveStoredProducts(updated);
  return newProduct;
}

export function updateProduct(product: CatalogProduct): void {
  const products = getStoredProducts();
  const updated = products.map((p) => (p.id === product.id ? product : p));
  saveStoredProducts(updated);
}

export function deleteProduct(productId: string): void {
  const products = getStoredProducts();
  const updated = products.filter((p) => p.id !== productId);
  saveStoredProducts(updated);
}

// Leads Helpers
export function getStoredLeads(): QuoteLead[] {
  if (typeof window === "undefined") return INITIAL_LEADS;
  try {
    const data = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_LEADS;
  }
}

export function saveStoredLeads(leads: QuoteLead[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
}

export function addStoredLead(leadData: Omit<QuoteLead, "id" | "createdAt" | "status">): QuoteLead {
  const leads = getStoredLeads();
  const newLead: QuoteLead = {
    ...leadData,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "novo",
  };
  const updated = [newLead, ...leads];
  saveStoredLeads(updated);
  return newLead;
}

export function updateLead(lead: QuoteLead): void {
  const leads = getStoredLeads();
  const updated = leads.map((l) => (l.id === lead.id ? lead : l));
  saveStoredLeads(updated);
}

export function deleteLead(leadId: string): void {
  const leads = getStoredLeads();
  const updated = leads.filter((l) => l.id !== leadId);
  saveStoredLeads(updated);
}

export function updateLeadStatus(leadId: string, status: QuoteLead["status"]): void {
  const leads = getStoredLeads();
  const updated = leads.map((l) => (l.id === leadId ? { ...l, status } : l));
  saveStoredLeads(updated);
}

// Admin Auth Helper
export function checkAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function setAdminSession(auth: boolean): void {
  if (typeof window === "undefined") return;
  if (auth) {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
