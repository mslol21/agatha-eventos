"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAdminSession, checkAdminSession } from "@/lib/store";
import { Lock, Sparkles, KeyRound, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const router = Router();

  useEffect(() => {
    if (checkAdminSession()) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  function Router() {
    return useRouter();
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "123456" || pin === "agatha2026") {
      setAdminSession(true);
      router.push("/admin/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-pink-soft-gradient px-4">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border border-rose-100 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-rose-200">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 pt-2">Painel Agatha Eventos</h1>
          <p className="text-xs text-slate-500">Digite seu PIN ou senha de acesso administrativo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              PIN de Acesso (Padrão: 123456)
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="******"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>PIN incorreto. Tente novamente ou use 123456.</span>
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" className="w-full" icon={<ArrowRight className="w-5 h-5" />}>
            Acessar Painel Admin
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Área de controle interno para gestão de carrinhos e histórico de orçamentos.
          </p>
        </div>
      </div>
    </div>
  );
}
