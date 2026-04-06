-- CreateTable
CREATE TABLE "empresa" (
    "id_empresa" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rnc" TEXT NOT NULL,
    "fecha_fundacion" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "proveedor" (
    "id_proveedor" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tipo_proveedor" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "auto" (
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

-- CreateTable
CREATE TABLE "cliente" (
    "id_cliente" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tipo_cliente" TEXT NOT NULL,
    "fecha_registro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "cliente_importador" (
    "id_cliente_importador" TEXT NOT NULL PRIMARY KEY,
    "id_cliente" TEXT NOT NULL,
    "licencia_importacion" TEXT NOT NULL,
    "fecha_registro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "limite_importacion" INTEGER NOT NULL,
    "autos_importados_actual" INTEGER NOT NULL DEFAULT 0,
    "estado_licencia" TEXT NOT NULL,
    "observaciones" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "cliente_importador_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente" ("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "importacion" (
    "id_importacion" TEXT NOT NULL PRIMARY KEY,
    "id_proveedor" TEXT NOT NULL,
    "fecha_salida" DATETIME NOT NULL,
    "fecha_llegada" DATETIME,
    "puerto_salida" TEXT NOT NULL,
    "puerto_llegada" TEXT NOT NULL,
    "cantidad_autos" INTEGER NOT NULL,
    "costo_transporte" REAL NOT NULL,
    "costo_aduana" REAL NOT NULL,
    "estado_importacion" TEXT NOT NULL,
    "numero_contenedor" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "importacion_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor" ("id_proveedor") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "importacion_cliente" (
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
    "condition" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "importacion_cliente_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente" ("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "importacion_cliente_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor" ("id_proveedor") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "importacion_cliente_id_auto_fkey" FOREIGN KEY ("id_auto") REFERENCES "auto" ("id_auto") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "venta" (
    "id_venta" TEXT NOT NULL PRIMARY KEY,
    "id_auto" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "id_empleado" TEXT NOT NULL,
    "fecha_venta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "precio_venta" REAL NOT NULL,
    "forma_pago" TEXT NOT NULL,
    "comision_vendedor" REAL NOT NULL,
    "impuestos" REAL NOT NULL,
    "estado_venta" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "venta_id_auto_fkey" FOREIGN KEY ("id_auto") REFERENCES "auto" ("id_auto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "venta_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente" ("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "venta_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "empleado" ("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "alquiler" (
    "id_alquiler" TEXT NOT NULL PRIMARY KEY,
    "id_auto" TEXT NOT NULL,
    "id_cliente" TEXT,
    "fecha_inicio" DATETIME NOT NULL,
    "fecha_fin" DATETIME NOT NULL,
    "precio_diario" REAL NOT NULL,
    "precio_semanal" REAL NOT NULL DEFAULT 0,
    "deposito_garantia" REAL NOT NULL,
    "estado_alquiler" TEXT NOT NULL,
    "kilometraje_inicio" INTEGER NOT NULL,
    "kilometraje_fin" INTEGER,
    "observaciones" TEXT,
    "isRented" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "alquiler_id_auto_fkey" FOREIGN KEY ("id_auto") REFERENCES "auto" ("id_auto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "alquiler_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente" ("id_cliente") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "empleado" (
    "id_empleado" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fecha_contratacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salario" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "mantenimiento" (
    "id_mantenimiento" TEXT NOT NULL PRIMARY KEY,
    "id_auto" TEXT NOT NULL,
    "fecha_mantenimiento" DATETIME NOT NULL,
    "tipo_mantenimiento" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "costo" REAL NOT NULL,
    "taller" TEXT NOT NULL,
    "proximo_mantenimiento" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "mantenimiento_id_auto_fkey" FOREIGN KEY ("id_auto") REFERENCES "auto" ("id_auto") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cuenta_bancaria" (
    "id_cuenta" TEXT NOT NULL PRIMARY KEY,
    "id_empresa" TEXT NOT NULL,
    "banco" TEXT NOT NULL,
    "numero_cuenta" TEXT NOT NULL,
    "tipo_cuenta" TEXT NOT NULL,
    "moneda" TEXT NOT NULL,
    "saldo_actual" REAL NOT NULL DEFAULT 0,
    "fecha_apertura" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado_cuenta" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "cuenta_bancaria_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresa" ("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "transaccion" (
    "id_transaccion" TEXT NOT NULL PRIMARY KEY,
    "id_cuenta" TEXT NOT NULL,
    "id_venta" TEXT,
    "id_alquiler" TEXT,
    "id_importacion" TEXT,
    "tipo_transaccion" TEXT NOT NULL,
    "monto" REAL NOT NULL,
    "moneda" TEXT NOT NULL,
    "fecha_transaccion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" TEXT NOT NULL,
    "beneficiario" TEXT NOT NULL,
    "metodo_pago" TEXT NOT NULL,
    "numero_comprobante" TEXT,
    "estado_transaccion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "transaccion_id_cuenta_fkey" FOREIGN KEY ("id_cuenta") REFERENCES "cuenta_bancaria" ("id_cuenta") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transaccion_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "venta" ("id_venta") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "transaccion_id_alquiler_fkey" FOREIGN KEY ("id_alquiler") REFERENCES "alquiler" ("id_alquiler") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "transaccion_id_importacion_fkey" FOREIGN KEY ("id_importacion") REFERENCES "importacion" ("id_importacion") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "factura" (
    "id_factura" TEXT NOT NULL PRIMARY KEY,
    "id_cliente" TEXT NOT NULL,
    "id_venta" TEXT,
    "id_alquiler" TEXT,
    "numero_factura" TEXT NOT NULL,
    "fecha_emision" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subtotal" REAL NOT NULL,
    "impuestos_factura" REAL NOT NULL,
    "total" REAL NOT NULL,
    "estado_factura" TEXT NOT NULL,
    "fecha_vencimiento" DATETIME,
    "forma_pago" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "factura_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente" ("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "factura_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "venta" ("id_venta") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "factura_id_alquiler_fkey" FOREIGN KEY ("id_alquiler") REFERENCES "alquiler" ("id_alquiler") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "impuesto" (
    "id_impuesto" TEXT NOT NULL PRIMARY KEY,
    "id_transaccion" TEXT NOT NULL,
    "tipo_impuesto" TEXT NOT NULL,
    "tasa_porcentaje" REAL NOT NULL,
    "monto_impuesto" REAL NOT NULL,
    "periodo" TEXT NOT NULL,
    "fecha_pago" DATETIME,
    "estado_impuesto" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "impuesto_id_transaccion_fkey" FOREIGN KEY ("id_transaccion") REFERENCES "transaccion" ("id_transaccion") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "empresa_rnc_key" ON "empresa"("rnc");

-- CreateIndex
CREATE UNIQUE INDEX "auto_matricula_cubana_key" ON "auto"("matricula_cubana");

-- CreateIndex
CREATE UNIQUE INDEX "auto_vin_key" ON "auto"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_ci_key" ON "cliente"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_importador_id_cliente_key" ON "cliente_importador"("id_cliente");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_importador_licencia_importacion_key" ON "cliente_importador"("licencia_importacion");

-- CreateIndex
CREATE UNIQUE INDEX "importacion_numero_contenedor_key" ON "importacion"("numero_contenedor");

-- CreateIndex
CREATE UNIQUE INDEX "importacion_cliente_id_auto_key" ON "importacion_cliente"("id_auto");

-- CreateIndex
CREATE UNIQUE INDEX "venta_id_auto_key" ON "venta"("id_auto");

-- CreateIndex
CREATE UNIQUE INDEX "empleado_ci_key" ON "empleado"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "cuenta_bancaria_numero_cuenta_key" ON "cuenta_bancaria"("numero_cuenta");

-- CreateIndex
CREATE UNIQUE INDEX "transaccion_numero_comprobante_key" ON "transaccion"("numero_comprobante");

-- CreateIndex
CREATE UNIQUE INDEX "factura_numero_factura_key" ON "factura"("numero_factura");
