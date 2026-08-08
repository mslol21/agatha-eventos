"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  checkAdminSession,
  getStoredProducts,
  saveStoredProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  CatalogProduct,
} from "@/lib/store";
import { ArrowLeft, Save, Plus, Edit2, Trash2, Power, Eye, X, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminProdutosPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<CatalogProduct | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const router = useRouter();

  // New product form state
  const [formData, setFormData] = useState<Partial<CatalogProduct>>({
    name: "",
    category: "salgados",
    shortDescription: "",
    fullDescription: "",
    image: "/images/hero.jpg",
    estimatedPricePerGuest: 10,
    minGuests: 30,
    badge: "Novo Carrinho",
    iconName: "Sparkles",
    highlights: ["Preparo artesanal feito ao vivo", "Equipe uniformizada e treinada"],
    active: true,
  });

  useEffect(() => {
    if (!checkAdminSession()) {
      router.push("/admin");
      return;
    }
    setProducts(getStoredProducts());
  }, [router]);

  const handleToggleActive = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, active: !p.active } : p
    );
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este carrinho do catálogo?")) {
      deleteProduct(id);
      setProducts(getStoredProducts());
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    addProduct({
      name: formData.name || "Novo Carrinho",
      category: formData.category || "salgados",
      shortDescription: formData.shortDescription || "",
      fullDescription: formData.fullDescription || "",
      image: formData.image || "/images/hero.jpg",
      estimatedPricePerGuest: Number(formData.estimatedPricePerGuest) || 10,
      minGuests: Number(formData.minGuests) || 30,
      badge: formData.badge || "Especial",
      iconName: formData.iconName || "Sparkles",
      highlights: formData.highlights || ["Atendimento impecável"],
      active: true,
    });

    setProducts(getStoredProducts());
    setIsCreating(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct);
    setProducts(getStoredProducts());
    setEditingProduct(null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Gestão do Catálogo
              </span>
              <h1 className="text-3xl font-black text-slate-900">Gerenciar Produtos & Carrinhos</h1>
            </div>
          </div>

          <Button
            onClick={() => setIsCreating(true)}
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
          >
            Adicionar Novo Carrinho
          </Button>
        </div>

        {savedSuccess && (
          <div className="my-6 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>Catálogo atualizado com sucesso! As alterações já estão visíveis no site.</span>
          </div>
        )}

        {/* Products Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {products.map((p) => (
            <div
              key={p.id}
              className={`p-6 rounded-3xl bg-white border transition-all space-y-4 relative flex flex-col justify-between ${
                p.active
                  ? "border-slate-200 shadow-sm"
                  : "border-rose-200 bg-rose-50/20 opacity-75"
              }`}
            >
              <div className="space-y-3">
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                      p.active ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                    }`}
                  >
                    {p.active ? "Ativo" : "Inativo"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900">{p.name}</h3>
                    <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      {p.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{p.shortDescription}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>R$ {p.estimatedPricePerGuest || 10}/convidado</span>
                  <span className="text-slate-500 font-normal">Mín. {p.minGuests || 30} conv.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleToggleActive(p.id)}
                  className={`w-full py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    p.active
                      ? "bg-slate-100 hover:bg-rose-100 text-rose-600 border-slate-200"
                      : "bg-emerald-100 text-emerald-800 border-emerald-200"
                  }`}
                >
                  <Power className="w-4 h-4" />
                  <span>{p.active ? "Desativar do Site" : "Ativar no Site"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Create Product */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Cadastrar Novo Carrinho Gourmet</h2>
              <button onClick={() => setIsCreating(false)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nome do Carrinho *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carrinho de Churros Gourmet"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Categoria</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 cursor-pointer"
                  >
                    <option value="salgados">Salgados</option>
                    <option value="doces">Doces</option>
                    <option value="combos">Combos</option>
                    <option value="personalizados">Personalizados</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Preço Estimado por Convidado (R$)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.estimatedPricePerGuest}
                    onChange={(e) => setFormData({ ...formData, estimatedPricePerGuest: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Mínimo de Convidados</label>
                  <input
                    type="number"
                    min="10"
                    value={formData.minGuests}
                    onChange={(e) => setFormData({ ...formData, minGuests: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Selo / Badge (Ex: Mais Pedido)</label>
                <input
                  type="text"
                  placeholder="Mais Pedido"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Descrição Curta</label>
                <input
                  type="text"
                  required
                  placeholder="Preparo ao vivo com ingredientes selecionados."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Descrição Completa</label>
                <textarea
                  rows={3}
                  placeholder="Detalhamento completo do produto e experiência..."
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Caminho / URL da Imagem</label>
                <input
                  type="text"
                  placeholder="/images/pipoca.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" onClick={() => setIsCreating(false)} variant="outline" size="md">
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Salvar Carrinho
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Product */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Editar Carrinho: {editingProduct.name}</h2>
              <button onClick={() => setEditingProduct(null)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nome do Carrinho</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Categoria</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 cursor-pointer"
                  >
                    <option value="salgados">Salgados</option>
                    <option value="doces">Doces</option>
                    <option value="combos">Combos</option>
                    <option value="personalizados">Personalizados</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Preço Estimado por Convidado (R$)</label>
                  <input
                    type="number"
                    min="1"
                    value={editingProduct.estimatedPricePerGuest || 10}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        estimatedPricePerGuest: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Mínimo de Convidados</label>
                  <input
                    type="number"
                    min="10"
                    value={editingProduct.minGuests || 30}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        minGuests: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Selo / Badge</label>
                <input
                  type="text"
                  value={editingProduct.badge || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Descrição Curta</label>
                <input
                  type="text"
                  required
                  value={editingProduct.shortDescription}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Descrição Completa</label>
                <textarea
                  rows={3}
                  value={editingProduct.fullDescription}
                  onChange={(e) => setEditingProduct({ ...editingProduct, fullDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Caminho da Imagem</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" onClick={() => setEditingProduct(null)} variant="outline" size="md">
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Atualizar Produto
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
