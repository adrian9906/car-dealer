// test.js - Versión correcta para Prisma 7
import { PrismaClient } from "@prisma/client";

// En Prisma 7, necesitas un adapter para SQLite
// Pero primero, simplifiquemos sin adapter para pruebas

const prisma = new PrismaClient({
  // NO uses datasourceUrl en Prisma 7
  log: ["query", "info", "warn", "error"],
});

async function test() {
  try {
    await prisma.$connect();
    console.log("✅ Conectado a la base de datos");

    // Lista los modelos disponibles
    const models = Object.keys(prisma).filter(
      (key) => !key.startsWith("_") && key !== "$connect",
    );
    console.log("Modelos disponibles:", models);

    await prisma.$disconnect();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

test();
