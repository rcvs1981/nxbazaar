import { PrismaClient } from "@prisma/client";

/* Only string keys */
type StringKeys = Extract<keyof PrismaClient, string>;

/* Only real model delegates */
export type ModelKey = {
  [K in StringKeys]:
    PrismaClient[K] extends { findMany: Function } ? K : never;
}[StringKeys];

export type SluggableModel =
  | "product"
  | "category"
  | "subCategory"
  | "market";

export function isSluggableModel(
  model: ModelKey
): model is SluggableModel {
  return (
    model === "product" ||
    model === "category" ||
    model === "subCategory" ||
    model === "market"
  );
}