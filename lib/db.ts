import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaLibSql({
      url: "file:./prisma/dev.db",
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
