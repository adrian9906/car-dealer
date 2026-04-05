import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';

// 1. Define la URL de la base de datos
const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';

// 2. Extrae la ruta del archivo (elimina 'file:')
const dbPath = databaseUrl.replace('file:', '');

// 4. Crea el adaptador - PASA el objeto con propiedad 'url'
const adapter = new PrismaBetterSqlite3({ url: dbPath }); // 🔥 ¡CAMBIO IMPORTANTE!

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({ adapter });
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;