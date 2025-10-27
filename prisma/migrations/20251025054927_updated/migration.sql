-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_importacion_cliente" (
    "id_importacion_cliente" TEXT NOT NULL PRIMARY KEY,
    "id_cliente" TEXT NOT NULL,
    "id_proveedor" TEXT,
    "id_auto" TEXT,
    "fecha_solicitud" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_estimada_llegada" DATETIME,
    "costo_importacion" REAL NOT NULL,
    "estado_solicitud" TEXT NOT NULL,
    "servicios_adicionales" TEXT,
    "comision_empresa" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "importacion_cliente_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente" ("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "importacion_cliente_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor" ("id_proveedor") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "importacion_cliente_id_auto_fkey" FOREIGN KEY ("id_auto") REFERENCES "auto" ("id_auto") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_importacion_cliente" ("comision_empresa", "costo_importacion", "createdAt", "estado_solicitud", "fecha_estimada_llegada", "fecha_solicitud", "id_auto", "id_cliente", "id_importacion_cliente", "id_proveedor", "servicios_adicionales", "updatedAt") SELECT "comision_empresa", "costo_importacion", "createdAt", "estado_solicitud", "fecha_estimada_llegada", "fecha_solicitud", "id_auto", "id_cliente", "id_importacion_cliente", "id_proveedor", "servicios_adicionales", "updatedAt" FROM "importacion_cliente";
DROP TABLE "importacion_cliente";
ALTER TABLE "new_importacion_cliente" RENAME TO "importacion_cliente";
CREATE UNIQUE INDEX "importacion_cliente_id_auto_key" ON "importacion_cliente"("id_auto");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
