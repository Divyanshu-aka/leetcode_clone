import { PrismaClient } from "../generated/prisma/index.js";

const globalForPrisma = globalThis;

export const db = globalForPrisma.Prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.Prisma = db;
}
