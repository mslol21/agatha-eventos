import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Sparkles, MessageCircle, Lock } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, BASE_LOCATION, buildWhatsAppUrl } from "@/lib/whatsapp";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-rose-400">
                <Image
                  src="/images/logo.png"
                  alt="Agatha Eventos Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  AGATHA <span className="text-rose-400 font-light">EVENTOS</span>
                </span>
                <span className="text-[10px] font-semibold text-rose-300 tracking-wider uppercase -mt-1 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 inline" /> Carrinhos Gourmet
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Carrinhos gourmet, comidas rápidas e experiências gastronômicas para transformar seus eventos em momentos inesquecíveis.
            </p>
            <p className="text-xs text-rose-300 font-medium italic">
              "Experiências gastronômicas para tornar eventos ainda mais especiais."
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-rose-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-rose-400 transition-colors font-bold text-rose-300">
                  Catálogo & Simulador
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="hover:text-rose-400 transition-colors">
                  Carrinhos & Serviços
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="hover:text-rose-400 transition-colors">
                  Tipos de Eventos
                </Link>
              </li>
              <li>
                <Link href="/eventos-corporativos" className="hover:text-rose-400 transition-colors">
                  Eventos Corporativos
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="hover:text-rose-400 transition-colors">
                  Galeria de Fotos
                </Link>
              </li>
              <li>
                <Link href="/orcamento" className="hover:text-rose-400 transition-colors font-semibold text-rose-400">
                  Solicitar Orçamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Coverage */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs">
              Atendimento & Base
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Base de Operações:</span>
                  <span className="text-slate-400 text-xs">{BASE_LOCATION}</span>
                </div>
              </div>
              <div className="pt-2">
                <span className="text-white font-medium block text-xs mb-1">Regiões Atendidas:</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  São Paulo Capital • Grande São Paulo • Interior de São Paulo • Litoral de São Paulo
                </p>
              </div>
            </div>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs">
              Redes & Gestão
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-rose-400 transition-colors p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50"
              >
                <InstagramIcon className="w-5 h-5 text-rose-400" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Siga no Instagram</span>
                  <span className="font-semibold text-white text-xs">{INSTAGRAM_HANDLE}</span>
                </div>
              </a>

              <Link
                href="/admin"
                className="flex items-center gap-2.5 text-slate-300 hover:text-rose-400 transition-colors p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50"
              >
                <Lock className="w-4 h-4 text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Área Administrativa</span>
                  <span className="font-semibold text-white text-xs">Acessar Painel Admin</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Agatha Eventos. Todos os direitos reservados.</p>
          <p className="text-center sm:text-right text-slate-500">
            Jardim Anália Franco — São Paulo/SP | Carrinhos Gourmet & Experiências Gastronômicas
          </p>
        </div>
      </div>
    </footer>
  );
};
