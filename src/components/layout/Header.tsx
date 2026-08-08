"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, ChevronDown, Utensils, PartyPopper, Building2, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EventCartButton } from "@/components/cart/EventCartButton";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isServicesActive =
    pathname === "/servicos" || pathname === "/eventos" || pathname === "/eventos-corporativos";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-header py-2.5 shadow-sm"
          : "bg-white/90 backdrop-blur-md py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-rose-200 shadow-sm group-hover:border-rose-400 transition-colors">
              <Image
                src="/images/logo.png"
                alt="Agatha Eventos Logo"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
                AGATHA <span className="text-rose-500 font-light">EVENTOS</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-rose-500 tracking-wider uppercase -mt-1 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 inline" /> Carrinhos Gourmet
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-full text-xs xl:text-sm font-medium transition-all ${
                pathname === "/"
                  ? "text-rose-600 bg-rose-50 font-semibold"
                  : "text-slate-700 hover:text-rose-600 hover:bg-slate-50"
              }`}
            >
              Início
            </Link>

            <Link
              href="/catalogo"
              className={`px-3 py-2 rounded-full text-xs xl:text-sm font-medium transition-all ${
                pathname === "/catalogo"
                  ? "text-rose-600 bg-rose-50 font-semibold"
                  : "text-slate-700 hover:text-rose-600 hover:bg-slate-50"
              }`}
            >
              Catálogo & Simulador
            </Link>

            {/* Dropdown Menu for Servicios, Eventos e Corporativo */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-medium transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                  isServicesActive
                    ? "text-rose-600 bg-rose-50 font-semibold"
                    : "text-slate-700 hover:text-rose-600 hover:bg-slate-50"
                }`}
              >
                <span>Experiências & Eventos</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-rose-500" : ""}`} />
              </button>

              {/* Dropdown Content */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <Link
                    href="/servicos"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-50/70 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-xs text-slate-900 group-hover:text-rose-600">
                        Carrinhos & Serviços
                      </span>
                      <span className="text-[10px] text-slate-500">Pipoca, crepe, churros e doces</span>
                    </div>
                  </Link>

                  <Link
                    href="/eventos"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-50/70 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                      <PartyPopper className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-xs text-slate-900 group-hover:text-rose-600">
                        Tipos de Eventos
                      </span>
                      <span className="text-[10px] text-slate-500">Aniversários, infantis e casamentos</span>
                    </div>
                  </Link>

                  <Link
                    href="/eventos-corporativos"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-900/10 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-xs text-slate-900 group-hover:text-rose-600">
                        Eventos Corporativos
                      </span>
                      <span className="text-[10px] text-slate-500">Endomarketing, feiras e ativações B2B</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/galeria"
              className={`px-3 py-2 rounded-full text-xs xl:text-sm font-medium transition-all ${
                pathname === "/galeria"
                  ? "text-rose-600 bg-rose-50 font-semibold"
                  : "text-slate-700 hover:text-rose-600 hover:bg-slate-50"
              }`}
            >
              Galeria
            </Link>

            <Link
              href="/contato"
              className={`px-3 py-2 rounded-full text-xs xl:text-sm font-medium transition-all ${
                pathname === "/contato"
                  ? "text-rose-600 bg-rose-50 font-semibold"
                  : "text-slate-700 hover:text-rose-600 hover:bg-slate-50"
              }`}
            >
              Contato
            </Link>
          </nav>

          {/* Desktop CTA & Cart Button */}
          <div className="hidden lg:flex items-center gap-2.5">
            <EventCartButton variant="inline" />
            <Button href="/orcamento" variant="primary" size="sm">
              Solicitar orçamento
            </Button>
          </div>

          {/* Mobile Hamburger & Cart Button */}
          <div className="flex lg:hidden items-center gap-2">
            <EventCartButton variant="inline" />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
              aria-label="Alternar menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl px-4 py-6 transition-all duration-300 animate-in slide-in-from-top max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                pathname === "/" ? "bg-rose-50 text-rose-600 font-bold" : "text-slate-800"
              }`}
            >
              Início
            </Link>

            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                pathname === "/catalogo" ? "bg-rose-50 text-rose-600 font-bold" : "text-slate-800"
              }`}
            >
              Catálogo & Simulador
            </Link>

            <div className="pl-4 pr-2 py-2 bg-slate-50 rounded-2xl space-y-1.5">
              <span className="text-[11px] font-bold uppercase text-slate-400 block px-2">Experiências & Eventos:</span>
              <Link
                href="/servicos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-white"
              >
                <Utensils className="w-4 h-4 text-rose-500" />
                <span>Carrinhos & Serviços</span>
              </Link>
              <Link
                href="/eventos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-white"
              >
                <PartyPopper className="w-4 h-4 text-sky-500" />
                <span>Tipos de Eventos</span>
              </Link>
              <Link
                href="/eventos-corporativos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-white"
              >
                <Building2 className="w-4 h-4 text-indigo-500" />
                <span>Eventos Corporativos</span>
              </Link>
            </div>

            <Link
              href="/galeria"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                pathname === "/galeria" ? "bg-rose-50 text-rose-600 font-bold" : "text-slate-800"
              }`}
            >
              Galeria de Fotos
            </Link>

            <Link
              href="/contato"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                pathname === "/contato" ? "bg-rose-50 text-rose-600 font-bold" : "text-slate-800"
              }`}
            >
              Contato
            </Link>

            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
              <Button
                href="/orcamento"
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solicitar orçamento
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
