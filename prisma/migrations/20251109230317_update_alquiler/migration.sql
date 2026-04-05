-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_alquiler" (
    "id_alquiler" TEXT NOT NULL PRIMARY KEY,
    "id_auto" TEXT NOT NULL,
    "id_cliente" TEXT,
    "fecha_inicio" DATETIME NOT NULL,
    "fecha_fin" DATETIME NOT NULL,
    "precio_diario" REAL NOT NULL,
    "deposito_garantia" REAL NOT NULL,
    "estado_alquiler" TEXT NOT NULL,
    "kilometraje_inicio" INTEGER NOT NULL,
    "kilometraje_fin" INTEGER,
    "observaciones" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "alquiler_id_auto_fkey" FOREIGN KEY ("id_auto") REFERENCES "auto" ("id_auto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "alquiler_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente" ("id_cliente") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_alquiler" ("createdAt", "deposito_garantia", "estado_alquiler", "fecha_fin", "fecha_inicio", "id_alquiler", "id_auto", "id_cliente", "kilometraje_fin", "kilometraje_inicio", "observaciones", "precio_diario", "updatedAt") SELECT "createdAt", "deposito_garantia", "estado_alquiler", "fecha_fin", "fecha_inicio", "id_alquiler", "id_auto", "id_cliente", "kilometraje_fin", "kilometraje_inicio", "observaciones", "precio_diario", "updatedAt" FROM "alquiler";
DROP TABLE "alquiler";
ALTER TABLE "new_alquiler" RENAME TO "alquiler";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
