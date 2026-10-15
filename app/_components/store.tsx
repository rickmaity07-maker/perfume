"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "../data";

export type BagLine = { key: string; slug: string; ml: number; price: number; qty: number; engraving?: string };

type Store = {
  lines: BagLine[];
  /** True once the saved bag has been restored from this browser. */
  ready: boolean;
  count: number;
  subtotal: number;
  add: (slug: string, ml: number, engraving?: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  bagOpen: boolean;
  setBagOpen: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
};

const StoreContext = createContext<Store | null>(null);
const STORAGE_KEY = "vespre.bag.v1";

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as BagLine[];
        // Drop anything that no longer exists in the catalogue.
        // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring browser storage after hydration
        setLines(saved.filter((l) => getProduct(l.slug)?.sizes.some((s) => s.ml === l.ml)));
      }
    } catch {
      /* storage unavailable — start with an empty bag */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const add = useCallback((slug: string, ml: number, engraving?: string) => {
    const product = getProduct(slug);
    const size = product?.sizes.find((s) => s.ml === ml);
    if (!product || !size) return;
    const mark = engraving?.trim().toUpperCase() || undefined;
    const key = `${slug}-${ml}-${mark ?? ""}`;
    setLines((prev) => {
      const hit = prev.find((l) => l.key === key);
      if (hit) return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + 1, 6) } : l));
      return [...prev, { key, slug, ml, price: size.price, qty: 1, engraving: mark }];
    });
    setBagOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(qty, 6)) } : l)));
  }, []);
  const remove = useCallback((key: string) => setLines((prev) => prev.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<Store>(
    () => ({
      lines,
      ready: hydrated,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
      add,
      setQty,
      remove,
      clear,
      bagOpen,
      setBagOpen,
      menuOpen,
      setMenuOpen,
      searchOpen,
      setSearchOpen,
    }),
    [lines, hydrated, add, setQty, remove, clear, bagOpen, menuOpen, searchOpen]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
