"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EventCartButton } from "@/components/cart/EventCartButton";

const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Serviços", href: "/servicos" },
  { label: "Eventos", href: "/eventos" },
  { label: "Corporativo", href: "/eventos-corporativos" },
  { label: "Galeria", href: "/galeria" },
  { label: "Contato", href: "/contato" },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-header py-3 shadow-sm"
          : "bg-white/80 backdrop-blur-md py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-rose-200 shadow-sm group-hover:border-rose-400 transition-colors">
              <Image
                src="/images/logo.png"
                alt="Agatha Eventos Logo"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
                AGATHA <span className="text-rose-500 font-light">EVENTOS</span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-rose-500 tracking-wider uppercase -mt-1 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 inline" /> Carrinhos Gourmet
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "text-rose-600 bg-rose-50 font-semibold"
                      : "text-slate-700 hover:text-rose-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA & Cart Button */}
          <div className="hidden lg:flex items-center gap-3">
            <EventCartButton variant="inline" />
            <Button href="/orcamento" variant="primary" size="md">
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
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl px-4 py-6 transition-all duration-300 animate-in slide-in-from-top">
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-rose-50 text-rose-600 font-bold"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
              <Button
                href="/orcamento"
                variant="primary"
                size="lg"
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
