"use client";

import {
  useApiGet,
  useApiPost,
  useApiPut,
  useApiDelete,
  useApiBulkDelete,
} from "@/lib/apiRequest";

import { Market } from "@/types/market";

export const MARKET_QUERY_KEY = ["markets"] as const;

/* ================================
   GET ALL
================================ */
export function useMarkets() {
  return useApiGet<Market[]>("/markets", MARKET_QUERY_KEY);
}

/* ================================
   GET SINGLE 🔥
================================ */
export function useMarket(id: string) {
  return useApiGet<Market>(
    `/markets/${id}`,
    ["markets", id]
  );
}

/* ================================
   CREATE
================================ */
export function useCreateMarket() {
  return useApiPost<Market, Partial<Market>>(
    "/markets",
    MARKET_QUERY_KEY
  );
}

/* ================================
   UPDATE
================================ */
export function useUpdateMarket() {
  return useApiPut<Market, Partial<Market>>(
    "/markets",
    MARKET_QUERY_KEY
  );
}

/* ================================
   DELETE
================================ */
export function useDeleteMarket() {
  return useApiDelete<Market>(
    "/markets",
    MARKET_QUERY_KEY
  );
}

/* ================================
   BULK DELETE
================================ */
export function useBulkDeleteMarket() {
  return useApiBulkDelete<Market>(
    "/markets",
    MARKET_QUERY_KEY
  );
}