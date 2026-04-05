/*
  Warnings:

  - You are about to drop the column `precioAlquiler` on the `auto` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_auto" (
    "id_auto" TEXT NOT NULL PRIMARY KEY,
    "id_proveedor" TEXT,
    "id_importacion" TEXT,
    "id_importacion_cliente" TEXT,
    "id_cliente_propietario" TEXT,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "año" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "tipo_combustible" TEXT NOT NULL,
    "transmision" TEXT NOT NULL,
    "precio_compra" REAL NOT NULL,
    "precio_venta" REAL,
    "imagen" TEXT,
    "estado_auto" TEXT NOT NULL,
    "matricula_cubana" TEXT,
    "vin" TEXT NOT NULL,
    "kilometraje" INTEGER NOT NULL DEFAULT 0,
    "tipo_propiedad" TEXT NOT NULL,
    "fecha_llegada_cuba" DATETIME,
    "stock" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "auto_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor" ("id_proveedor") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "auto_id_importacion_fkey" FOREIGN KEY ("id_importacion") REFERENCES "importacion" ("id_importacion") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "auto_id_cliente_propietario_fkey" FOREIGN KEY ("id_cliente_propietario") REFERENCES "cliente" ("id_cliente") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_auto" ("año", "category", "color", "createdAt", "description", "estado_auto", "features", "fecha_llegada_cuba", "id_auto", "id_cliente_propietario", "id_importacion", "id_importacion_cliente", "id_proveedor", "imagen", "kilometraje", "marca", "matricula_cubana", "modelo", "precio_compra", "precio_venta", "stock", "tipo_combustible", "tipo_propiedad", "transmision", "updatedAt", "vin") SELECT "año", "category", "color", "createdAt", "description", "estado_auto", "features", "fecha_llegada_cuba", "id_auto", "id_cliente_propietario", "id_importacion", "id_importacion_cliente", "id_proveedor", "imagen", "kilometraje", "marca", "matricula_cubana", "modelo", "precio_compra", "precio_venta", "stock", "tipo_combustible", "tipo_propiedad", "transmision", "updatedAt", "vin" FROM "auto";
DROP TABLE "auto";
ALTER TABLE "new_auto" RENAME TO "auto";
CREATE UNIQUE INDEX "auto_matricula_cubana_key" ON "auto"("matricula_cubana");
CREATE UNIQUE INDEX "auto_vin_key" ON "auto"("vin");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
