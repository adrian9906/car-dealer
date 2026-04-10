-- CreateEnum
CREATE TYPE "TipoProveedor" AS ENUM ('NUEVO', 'USADO');

-- CreateEnum
CREATE TYPE "EstadoBarco" AS ENUM ('ACTIVO', 'INACTIVO', 'MANTENIMIENTO');

-- CreateEnum
CREATE TYPE "TipoCombustible" AS ENUM ('GASOLINA', 'DIESEL', 'ELECTRICO', 'HIBRIDO');

-- CreateEnum
CREATE TYPE "TipoTransmision" AS ENUM ('MANUAL', 'AUTOMATICA');

-- CreateEnum
CREATE TYPE "EstadoAuto" AS ENUM ('DISPONIBLE', 'VENDIDO', 'ALQUILADO', 'EN_IMPORTACION', 'MANTENIMIENTO', 'RESERVADO');

-- CreateEnum
CREATE TYPE "TipoPropiedad" AS ENUM ('EMPRESA', 'CLIENTE');

-- CreateEnum
CREATE TYPE "TipoCliente" AS ENUM ('NACIONAL', 'EXTRANJERO', 'IMPORTADOR');

-- CreateEnum
CREATE TYPE "EstadoLicencia" AS ENUM ('ACTIVA', 'VENCIDA', 'SUSPENDIDA');

-- CreateEnum
CREATE TYPE "EstadoImportacion" AS ENUM ('PENDIENTE', 'EN_TRANSITO', 'EN_ADUANA', 'COMPLETADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "EstadoSolicitudImportacion" AS ENUM ('PENDIENTE', 'APROBADA', 'EN_TRANSITO', 'COMPLETADA', 'RECHAZADA');

-- CreateEnum
CREATE TYPE "FormaPago" AS ENUM ('EFECTIVO', 'TRANSFERENCIA', 'TARJETA', 'MIXTO');

-- CreateEnum
CREATE TYPE "EstadoVenta" AS ENUM ('PENDIENTE', 'COMPLETADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "EstadoAlquiler" AS ENUM ('ACTIVO', 'COMPLETADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "CargoEmpleado" AS ENUM ('VENDEDOR', 'GERENTE', 'ADMINISTRATIVO', 'MECANICO', 'IMPORTADOR');

-- CreateEnum
CREATE TYPE "TipoMantenimiento" AS ENUM ('PREVENTIVO', 'CORRECTIVO', 'LAVADO', 'REVISION');

-- CreateEnum
CREATE TYPE "TipoCuenta" AS ENUM ('CORRIENTE', 'AHORRO');

-- CreateEnum
CREATE TYPE "Moneda" AS ENUM ('CUP', 'MLC', 'USD');

-- CreateEnum
CREATE TYPE "EstadoCuenta" AS ENUM ('ACTIVA', 'INACTIVA', 'BLOQUEADA');

-- CreateEnum
CREATE TYPE "TipoTransaccion" AS ENUM ('INGRESO', 'EGRESO');

-- CreateEnum
CREATE TYPE "Stock" AS ENUM ('LOCAL', 'IMPORT');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SEDAN', 'SUV', 'PICKUP', 'COMPACT', 'LUXURY', 'EXECUTIVE', 'OFFROAD', 'SPORTS', 'PERFORMANCE', 'HEAVY_DUTY');

-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('EFECTIVO', 'TRANSFERENCIA', 'TARJETA_CREDITO', 'TARJETA_DEBITO', 'CHEQUE');

-- CreateEnum
CREATE TYPE "EstadoTransaccion" AS ENUM ('PENDIENTE', 'COMPLETADA', 'RECHAZADA', 'REVERTIDA');

-- CreateEnum
CREATE TYPE "EstadoFactura" AS ENUM ('PAGADA', 'PENDIENTE', 'VENCIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoGasto" AS ENUM ('NOMINA', 'ALQUILER', 'SERVICIOS', 'MANTENIMIENTO', 'PUBLICIDAD', 'IMPUESTOS', 'OTROS');

-- CreateEnum
CREATE TYPE "Periodicidad" AS ENUM ('UNICO', 'MENSUAL', 'TRIMESTRAL', 'ANUAL');

-- CreateEnum
CREATE TYPE "EstadoGasto" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "TipoImpuesto" AS ENUM ('VENTAS', 'IMPORTACION', 'RENTA', 'SERVICIOS');

-- CreateEnum
CREATE TYPE "EstadoImpuesto" AS ENUM ('PAGADO', 'PENDIENTE', 'MOROSO');

-- CreateTable
CREATE TABLE "empresa" (
    "id_empresa" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rnc" TEXT NOT NULL,
    "fecha_fundacion" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id_empresa")
);

-- CreateTable
CREATE TABLE "proveedor" (
    "id_proveedor" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tipo_proveedor" "TipoProveedor" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("id_proveedor")
);

-- CreateTable
CREATE TABLE "auto" (
    "id_auto" TEXT NOT NULL,
    "id_proveedor" TEXT,
    "id_importacion" TEXT,
    "id_importacion_cliente" TEXT,
    "id_cliente_propietario" TEXT,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "año" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "tipo_combustible" "TipoCombustible" NOT NULL,
    "transmision" "TipoTransmision" NOT NULL,
    "precio_compra" DOUBLE PRECISION NOT NULL,
    "precio_venta" DOUBLE PRECISION,
    "imagen" TEXT,
    "estado_auto" "EstadoAuto" NOT NULL,
    "matricula_cubana" TEXT,
    "vin" TEXT NOT NULL,
    "kilometraje" INTEGER NOT NULL DEFAULT 0,
    "tipo_propiedad" "TipoPropiedad" NOT NULL,
    "fecha_llegada_cuba" TIMESTAMP(3),
    "stock" "Stock" NOT NULL,
    "category" "Category" NOT NULL,
    "features" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auto_pkey" PRIMARY KEY ("id_auto")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id_cliente" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tipo_cliente" "TipoCliente" NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "cliente_importador" (
    "id_cliente_importador" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "licencia_importacion" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "limite_importacion" INTEGER NOT NULL,
    "autos_importados_actual" INTEGER NOT NULL DEFAULT 0,
    "estado_licencia" "EstadoLicencia" NOT NULL,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cliente_importador_pkey" PRIMARY KEY ("id_cliente_importador")
);

-- CreateTable
CREATE TABLE "importacion" (
    "id_importacion" TEXT NOT NULL,
    "id_proveedor" TEXT NOT NULL,
    "fecha_salida" TIMESTAMP(3) NOT NULL,
    "fecha_llegada" TIMESTAMP(3),
    "puerto_salida" TEXT NOT NULL,
    "puerto_llegada" TEXT NOT NULL,
    "cantidad_autos" INTEGER NOT NULL,
    "costo_transporte" DOUBLE PRECISION NOT NULL,
    "costo_aduana" DOUBLE PRECISION NOT NULL,
    "estado_importacion" "EstadoImportacion" NOT NULL,
    "numero_contenedor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "importacion_pkey" PRIMARY KEY ("id_importacion")
);

-- CreateTable
CREATE TABLE "importacion_cliente" (
    "id_importacion_cliente" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "id_proveedor" TEXT,
    "id_auto" TEXT,
    "fecha_solicitud" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_estimada_llegada" TIMESTAMP(3),
    "costo_importacion" DOUBLE PRECISION NOT NULL,
    "estado_solicitud" "EstadoSolicitudImportacion" NOT NULL,
    "servicios_adicionales" TEXT,
    "comision_empresa" DOUBLE PRECISION,
    "condition" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "importacion_cliente_pkey" PRIMARY KEY ("id_importacion_cliente")
);

-- CreateTable
CREATE TABLE "venta" (
    "id_venta" TEXT NOT NULL,
    "id_auto" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "fecha_venta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "precio_venta" DOUBLE PRECISION NOT NULL,
    "forma_pago" "FormaPago" NOT NULL,
    "comision_vendedor" DOUBLE PRECISION,
    "impuestos" DOUBLE PRECISION NOT NULL,
    "estado_venta" "EstadoVenta" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "venta_pkey" PRIMARY KEY ("id_venta")
);

-- CreateTable
CREATE TABLE "alquiler" (
    "id_alquiler" TEXT NOT NULL,
    "id_auto" TEXT NOT NULL,
    "id_cliente" TEXT,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "precio_diario" DOUBLE PRECISION NOT NULL,
    "precio_semanal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deposito_garantia" DOUBLE PRECISION NOT NULL,
    "estado_alquiler" "EstadoAlquiler" NOT NULL,
    "kilometraje_inicio" INTEGER NOT NULL,
    "kilometraje_fin" INTEGER,
    "observaciones" TEXT,
    "isRented" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alquiler_pkey" PRIMARY KEY ("id_alquiler")
);

-- CreateTable
CREATE TABLE "empleado" (
    "id_empleado" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "cargo" "CargoEmpleado" NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fecha_contratacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salario" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empleado_pkey" PRIMARY KEY ("id_empleado")
);

-- CreateTable
CREATE TABLE "mantenimiento" (
    "id_mantenimiento" TEXT NOT NULL,
    "id_auto" TEXT NOT NULL,
    "fecha_mantenimiento" TIMESTAMP(3) NOT NULL,
    "tipo_mantenimiento" "TipoMantenimiento" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,
    "taller" TEXT NOT NULL,
    "proximo_mantenimiento" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mantenimiento_pkey" PRIMARY KEY ("id_mantenimiento")
);

-- CreateTable
CREATE TABLE "cuenta_bancaria" (
    "id_cuenta" TEXT NOT NULL,
    "id_empresa" TEXT NOT NULL,
    "banco" TEXT NOT NULL,
    "numero_cuenta" TEXT NOT NULL,
    "tipo_cuenta" "TipoCuenta" NOT NULL,
    "moneda" "Moneda" NOT NULL,
    "saldo_actual" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fecha_apertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado_cuenta" "EstadoCuenta" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cuenta_bancaria_pkey" PRIMARY KEY ("id_cuenta")
);

-- CreateTable
CREATE TABLE "transaccion" (
    "id_transaccion" TEXT NOT NULL,
    "id_cuenta" TEXT NOT NULL,
    "id_venta" TEXT,
    "id_alquiler" TEXT,
    "id_importacion" TEXT,
    "tipo_transaccion" "TipoTransaccion" NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "moneda" "Moneda" NOT NULL,
    "fecha_transaccion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" TEXT NOT NULL,
    "beneficiario" TEXT NOT NULL,
    "metodo_pago" "MetodoPago" NOT NULL,
    "numero_comprobante" TEXT,
    "estado_transaccion" "EstadoTransaccion" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaccion_pkey" PRIMARY KEY ("id_transaccion")
);

-- CreateTable
CREATE TABLE "factura" (
    "id_factura" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "id_venta" TEXT,
    "id_alquiler" TEXT,
    "numero_factura" TEXT NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "impuestos_factura" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "estado_factura" "EstadoFactura" NOT NULL,
    "fecha_vencimiento" TIMESTAMP(3),
    "forma_pago" "FormaPago" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "factura_pkey" PRIMARY KEY ("id_factura")
);

-- CreateTable
CREATE TABLE "impuesto" (
    "id_impuesto" TEXT NOT NULL,
    "id_transaccion" TEXT NOT NULL,
    "tipo_impuesto" "TipoImpuesto" NOT NULL,
    "tasa_porcentaje" DOUBLE PRECISION NOT NULL,
    "monto_impuesto" DOUBLE PRECISION NOT NULL,
    "periodo" TEXT NOT NULL,
    "fecha_pago" TIMESTAMP(3),
    "estado_impuesto" "EstadoImpuesto" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "impuesto_pkey" PRIMARY KEY ("id_impuesto")
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
CREATE UNIQUE INDEX "empleado_ci_key" ON "empleado"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "cuenta_bancaria_numero_cuenta_key" ON "cuenta_bancaria"("numero_cuenta");

-- CreateIndex
CREATE UNIQUE INDEX "transaccion_numero_comprobante_key" ON "transaccion"("numero_comprobante");

-- CreateIndex
CREATE UNIQUE INDEX "factura_numero_factura_key" ON "factura"("numero_factura");

-- AddForeignKey
ALTER TABLE "auto" ADD CONSTRAINT "auto_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id_proveedor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auto" ADD CONSTRAINT "auto_id_importacion_fkey" FOREIGN KEY ("id_importacion") REFERENCES "importacion"("id_importacion") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auto" ADD CONSTRAINT "auto_id_cliente_propietario_fkey" FOREIGN KEY ("id_cliente_propietario") REFERENCES "cliente"("id_cliente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cliente_importador" ADD CONSTRAINT "cliente_importador_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "importacion" ADD CONSTRAINT "importacion_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id_proveedor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "importacion_cliente" ADD CONSTRAINT "importacion_cliente_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "importacion_cliente" ADD CONSTRAINT "importacion_cliente_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id_proveedor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "importacion_cliente" ADD CONSTRAINT "importacion_cliente_id_auto_fkey" FOREIGN KEY ("id_auto") REFERENCES "auto"("id_auto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_id_auto_fkey" FOREIGN KEY ("id_auto") REFERENCES "auto"("id_auto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alquiler" ADD CONSTRAINT "alquiler_id_auto_fkey" FOREIGN KEY ("id_auto") REFERENCES "auto"("id_auto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alquiler" ADD CONSTRAINT "alquiler_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mantenimiento" ADD CONSTRAINT "mantenimiento_id_auto_fkey" FOREIGN KEY ("id_auto") REFERENCES "auto"("id_auto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cuenta_bancaria" ADD CONSTRAINT "cuenta_bancaria_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaccion" ADD CONSTRAINT "transaccion_id_cuenta_fkey" FOREIGN KEY ("id_cuenta") REFERENCES "cuenta_bancaria"("id_cuenta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaccion" ADD CONSTRAINT "transaccion_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "venta"("id_venta") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaccion" ADD CONSTRAINT "transaccion_id_alquiler_fkey" FOREIGN KEY ("id_alquiler") REFERENCES "alquiler"("id_alquiler") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaccion" ADD CONSTRAINT "transaccion_id_importacion_fkey" FOREIGN KEY ("id_importacion") REFERENCES "importacion"("id_importacion") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "factura" ADD CONSTRAINT "factura_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "factura" ADD CONSTRAINT "factura_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "venta"("id_venta") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "factura" ADD CONSTRAINT "factura_id_alquiler_fkey" FOREIGN KEY ("id_alquiler") REFERENCES "alquiler"("id_alquiler") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "impuesto" ADD CONSTRAINT "impuesto_id_transaccion_fkey" FOREIGN KEY ("id_transaccion") REFERENCES "transaccion"("id_transaccion") ON DELETE RESTRICT ON UPDATE CASCADE;
