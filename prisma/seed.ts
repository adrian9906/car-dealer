import {
  CargoEmpleado,
  Category,
  EstadoAlquiler,
  EstadoAuto,
  EstadoCuenta,
  EstadoFactura,
  EstadoImportacion,
  EstadoImpuesto,
  EstadoLicencia,
  EstadoSolicitudImportacion,
  EstadoTransaccion,
  EstadoVenta,
  FormaPago,
  MetodoPago,
  Moneda,
  PrismaClient,
  Stock,
  TipoCliente,
  TipoCombustible,
  TipoCuenta,
  TipoImpuesto,
  TipoMantenimiento,
  TipoPropiedad,
  TipoProveedor,
  TipoTransaccion,
  TipoTransmision,
} from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }),
});

// URLs de imágenes de Unsplash para diferentes marcas y modelos
const getImagenUrl = (marca: string, modelo: string, año: number): string => {
  const imagenes: { [key: string]: string } = {
    // Toyota
    "Toyota Corolla":
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
    "Toyota Corolla 2024":
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
    // Honda
    "Honda CR-V":
      "https://images.unsplash.com/photo-1609781374025-bc6b3b9b0f0d?w=800&h=600&fit=crop",
    "Honda CR-V 2023":
      "https://images.unsplash.com/photo-1609781374025-bc6b3b9b0f0d?w=800&h=600&fit=crop",
    // BMW
    "BMW X5":
      "https://images.unsplash.com/photo-1620150560901-28f4081093e1?w=800&h=600&fit=crop",
    "BMW X5 2022":
      "https://images.unsplash.com/photo-1620150560901-28f4081093e1?w=800&h=600&fit=crop",
    // Nissan
    "Nissan Altima":
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
    "Nissan Altima 2021":
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
    // Ford
    "Ford F-150":
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
    "Ford F-150 2023":
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
    // Imágenes adicionales por categoría
    SEDAN:
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
    SUV: "https://images.unsplash.com/photo-1609781374025-bc6b3b9b0f0d?w=800&h=600&fit=crop",
    LUXURY:
      "https://images.unsplash.com/photo-1620150560901-28f4081093e1?w=800&h=600&fit=crop",
    PICKUP:
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&h=600&fit=crop",
  };

  const key = `${marca} ${modelo}`;
  return (
    imagenes[key] ||
    imagenes[modelo.split(" ")[0]] ||
    imagenes[Category.SEDAN] ||
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop"
  );
};

async function main() {
  console.log("🌱 Iniciando seed del sistema automotriz...");

  try {
    // ===== LIMPIAR DATOS EXISTENTES =====
    console.log("🗑️  Limpiando datos anteriores...");
    await prisma.impuesto.deleteMany();
    await prisma.factura.deleteMany();
    await prisma.transaccion.deleteMany();
    await prisma.mantenimiento.deleteMany();
    await prisma.alquiler.deleteMany();
    await prisma.venta.deleteMany();
    await prisma.auto.deleteMany();
    await prisma.importacionCliente.deleteMany();
    await prisma.importacion.deleteMany();
    await prisma.clienteImportador.deleteMany();
    await prisma.cliente.deleteMany();
    await prisma.empleado.deleteMany();
    await prisma.cuentaBancaria.deleteMany();
    await prisma.empresa.deleteMany();
    await prisma.proveedor.deleteMany();

    // ===== CREAR EMPRESA =====
    console.log("📋 Creando empresa...");
    const empresa = await prisma.empresa.create({
      data: {
        nombre: "AutoHub Cuba",
        direccion: "Avenida 5ta #1200, La Habana",
        telefono: "+53 7 1234567",
        email: "info@autohubcuba.com",
        rnc: "12345678901",
        fecha_fundacion: new Date("2020-01-15"),
      },
    });
    console.log("✅ Empresa creada:", empresa.nombre);

    // ===== CREAR CUENTAS BANCARIAS =====
    console.log("🏦 Creando cuentas bancarias...");
    const cuentas = await prisma.cuentaBancaria.createMany({
      data: [
        {
          id_empresa: empresa.id_empresa,
          banco: "Banco de Crédito y Comercio (BCC)",
          numero_cuenta: "2100123456789",
          tipo_cuenta: TipoCuenta.CORRIENTE,
          moneda: Moneda.CUP,
          saldo_actual: 500000,
          estado_cuenta: EstadoCuenta.ACTIVA,
        },
        {
          id_empresa: empresa.id_empresa,
          banco: "Banco Metropolitano",
          numero_cuenta: "2200987654321",
          tipo_cuenta: TipoCuenta.AHORRO,
          moneda: Moneda.MLC,
          saldo_actual: 50000,
          estado_cuenta: EstadoCuenta.ACTIVA,
        },
      ],
    });
    console.log(`✅ ${cuentas.count} cuentas bancarias creadas`);

    // ===== CREAR PROVEEDORES =====
    console.log("🚚 Creando proveedores...");
    const proveedores = await prisma.proveedor.createManyAndReturn({
      data: [
        {
          nombre: "Premium Motors USA",
          pais: "Estados Unidos",
          direccion: "123 Market St, Miami, FL",
          telefono: "+1 305 1234567",
          email: "info@premiummotorsusa.com",
          tipo_proveedor: TipoProveedor.NUEVO,
        },
        {
          nombre: "Second Hand Europe",
          pais: "España",
          direccion: "Calle Principal 456, Madrid",
          telefono: "+34 91 1234567",
          email: "contact@secondhandeurope.es",
          tipo_proveedor: TipoProveedor.USADO,
        },
        {
          nombre: "Japan Auto Imports",
          pais: "Japón",
          direccion: "Shibuya 789, Tokio",
          telefono: "+81 3 1234567",
          email: "sales@japanautoimports.jp",
          tipo_proveedor: TipoProveedor.USADO,
        },
      ],
    });
    console.log(`✅ ${proveedores.length} proveedores creados`);

    // ===== CREAR EMPLEADOS =====
    console.log("👥 Creando empleados...");
    const empleados = await prisma.empleado.createManyAndReturn({
      data: [
        {
          nombre: "Carlos",
          apellidos: "García López",
          ci: "98765432100",
          cargo: CargoEmpleado.VENDEDOR,
          telefono: "+53 5 1234567",
          email: "carlos.garcia@autohub.com",
          salario: 1500,
        },
        {
          nombre: "María",
          apellidos: "Rodríguez Martínez",
          ci: "98765432101",
          cargo: CargoEmpleado.VENDEDOR,
          telefono: "+53 5 1234568",
          email: "maria.rodriguez@autohub.com",
          salario: 1500,
        },
        {
          nombre: "Juan",
          apellidos: "Pérez González",
          ci: "98765432102",
          cargo: CargoEmpleado.GERENTE,
          telefono: "+53 5 1234569",
          email: "juan.perez@autohub.com",
          salario: 3000,
        },
        {
          nombre: "Pedro",
          apellidos: "Sánchez Rodríguez",
          ci: "98765432103",
          cargo: CargoEmpleado.MECANICO,
          telefono: "+53 5 1234570",
          email: "pedro.sanchez@autohub.com",
          salario: 1800,
        },
      ],
    });
    console.log(`✅ ${empleados.length} empleados creados`);

    // ===== CREAR CLIENTES =====
    console.log("👤 Creando clientes...");
    const clientes = await prisma.cliente.createManyAndReturn({
      data: [
        {
          nombre: "Roberto",
          apellidos: "Fernández Castro",
          ci: "12345678900",
          direccion: "Calle 23 #500, Vedado, La Habana",
          telefono: "+53 5 9876543",
          email: "roberto.fernandez@email.com",
          tipo_cliente: TipoCliente.NACIONAL,
        },
        {
          nombre: "Ana",
          apellidos: "Martínez López",
          ci: "12345678901",
          direccion: "Avenida Paseo #1000, Miramar",
          telefono: "+53 5 9876544",
          email: "ana.martinez@email.com",
          tipo_cliente: TipoCliente.NACIONAL,
        },
        {
          nombre: "Luis",
          apellidos: "González Jiménez",
          ci: "12345678902",
          direccion: "Calle L #800, Vedado",
          telefono: "+53 5 9876545",
          email: "luis.gonzalez@email.com",
          tipo_cliente: TipoCliente.IMPORTADOR,
        },
        {
          nombre: "Miguel",
          apellidos: "Ramírez Torres",
          ci: "12345678903",
          direccion: "Avenida 7ma #2000, Playa",
          telefono: "+53 5 9876546",
          email: "miguel.ramirez@email.com",
          tipo_cliente: TipoCliente.NACIONAL,
        },
      ],
    });
    console.log(`✅ ${clientes.length} clientes creados`);

    // ===== CREAR CLIENTE IMPORTADOR =====
    console.log("📦 Creando cliente importador...");
    const clienteImportador = await prisma.clienteImportador.create({
      data: {
        id_cliente: clientes[2].id_cliente,
        licencia_importacion: "LIC-2024-001",
        limite_importacion: 10,
        autos_importados_actual: 2,
        estado_licencia: EstadoLicencia.ACTIVA,
        observaciones: "Cliente premium con historial de 3 años",
      },
    });
    console.log("✅ Cliente importador creado");

    // ===== CREAR IMPORTACIONES =====
    console.log("🚢 Creando importaciones...");
    const importaciones = await prisma.importacion.createManyAndReturn({
      data: [
        {
          id_proveedor: proveedores[0].id_proveedor,
          fecha_salida: new Date("2024-01-10"),
          fecha_llegada: new Date("2024-02-05"),
          puerto_salida: "Miami, Florida",
          puerto_llegada: "Puerto de La Habana",
          cantidad_autos: 5,
          costo_transporte: 12000,
          costo_aduana: 8500,
          estado_importacion: EstadoImportacion.COMPLETADA,
          numero_contenedor: "CONT-2024-001",
        },
        {
          id_proveedor: proveedores[1].id_proveedor,
          fecha_salida: new Date("2024-02-15"),
          fecha_llegada: new Date("2024-03-10"),
          puerto_salida: "Port of Barcelona",
          puerto_llegada: "Puerto de La Habana",
          cantidad_autos: 3,
          costo_transporte: 9000,
          costo_aduana: 6000,
          estado_importacion: EstadoImportacion.EN_TRANSITO,
          numero_contenedor: "CONT-2024-002",
        },
      ],
    });
    console.log(`✅ ${importaciones.length} importaciones creadas`);

    // ===== CREAR AUTOS CON IMÁGENES =====
    console.log("🚗 Creando autos con imágenes de Unsplash...");
    const autos = await prisma.auto.createManyAndReturn({
      data: [
        {
          id_proveedor: proveedores[0].id_proveedor,
          id_importacion: importaciones[0].id_importacion,
          marca: "Toyota",
          modelo: "Corolla 2024",
          año: 2024,
          color: "Plata",
          tipo_combustible: TipoCombustible.GASOLINA,
          transmision: TipoTransmision.AUTOMATICA,
          precio_compra: 25000,
          precio_venta: 32000,
          estado_auto: EstadoAuto.DISPONIBLE,
          vin: "VIN123456789TOYOTA001",
          kilometraje: 100,
          tipo_propiedad: TipoPropiedad.EMPRESA,
          fecha_llegada_cuba: new Date("2024-02-05"),
          stock: Stock.IMPORT,
          category: Category.SEDAN,
          features:
            "Aire acondicionado, elevalunas eléctricos, sistema de audio",
          description: "Toyota Corolla último modelo, excelente condición",
          imagen:
            "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop", // 👈 Usando "imagen"
        },
        {
          id_proveedor: proveedores[0].id_proveedor,
          id_importacion: importaciones[0].id_importacion,
          marca: "Honda",
          modelo: "CR-V 2023",
          año: 2023,
          color: "Negro",
          tipo_combustible: TipoCombustible.GASOLINA,
          transmision: TipoTransmision.AUTOMATICA,
          precio_compra: 28000,
          precio_venta: 36000,
          estado_auto: EstadoAuto.DISPONIBLE,
          vin: "VIN123456789HONDA001",
          kilometraje: 500,
          tipo_propiedad: TipoPropiedad.EMPRESA,
          fecha_llegada_cuba: new Date("2024-02-05"),
          stock: Stock.IMPORT,
          category: Category.SUV,
          features:
            "4WD, techo panorámico, sistema de navegación, cámara trasera",
          description: "Honda CR-V SUV con equipamiento completo",
          imagen:
            "https://images.unsplash.com/photo-1609781374025-bc6b3b9b0f0d?w=800&h=600&fit=crop",
        },
        {
          id_proveedor: proveedores[1].id_proveedor,
          id_importacion: importaciones[0].id_importacion,
          marca: "BMW",
          modelo: "X5 2022",
          año: 2022,
          color: "Blanco",
          tipo_combustible: TipoCombustible.DIESEL,
          transmision: TipoTransmision.AUTOMATICA,
          precio_compra: 45000,
          precio_venta: 55000,
          estado_auto: EstadoAuto.DISPONIBLE,
          vin: "VIN123456789BMW001",
          kilometraje: 12000,
          tipo_propiedad: TipoPropiedad.EMPRESA,
          fecha_llegada_cuba: new Date("2024-02-05"),
          stock: Stock.IMPORT,
          category: Category.LUXURY,
          features:
            "Cuero premium, asientos calefactables, control climático dual",
          description: "BMW X5 vehículo de lujo en perfecto estado",
          imagen:
            "https://images.unsplash.com/photo-1620150560901-28f4081093e1?w=800&h=600&fit=crop",
        },
        {
          id_proveedor: proveedores[2].id_proveedor,
          marca: "Nissan",
          modelo: "Altima 2021",
          año: 2021,
          color: "Gris",
          tipo_combustible: TipoCombustible.GASOLINA,
          transmision: TipoTransmision.AUTOMATICA,
          precio_compra: 18000,
          precio_venta: 24000,
          estado_auto: EstadoAuto.DISPONIBLE,
          vin: "VIN123456789NISSAN001",
          kilometraje: 8500,
          tipo_propiedad: TipoPropiedad.EMPRESA,
          stock: Stock.LOCAL,
          category: Category.SEDAN,
          features: "Aire acondicionado, radio CD, espejos eléctricos",
          description: "Nissan Altima sedán en buen estado",
          imagen:
            "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
        },
        {
          id_proveedor: proveedores[0].id_proveedor,
          marca: "Ford",
          modelo: "F-150 2023",
          año: 2023,
          color: "Rojo",
          tipo_combustible: TipoCombustible.DIESEL,
          transmision: TipoTransmision.AUTOMATICA,
          precio_compra: 35000,
          precio_venta: 44000,
          estado_auto: EstadoAuto.DISPONIBLE,
          vin: "VIN123456789FORD001",
          kilometraje: 2000,
          tipo_propiedad: TipoPropiedad.EMPRESA,
          stock: Stock.IMPORT,
          category: Category.PICKUP,
          features:
            "Tracción 4x4, cabina doble, sistema multimedia touchscreen",
          description: "Ford F-150 pickup potente y confiable",
          imagen:
            "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&h=600&fit=crop",
        },
        // Auto adicional - Mercedes Benz
        {
          id_proveedor: proveedores[1].id_proveedor,
          marca: "Mercedes-Benz",
          modelo: "Clase C 2023",
          año: 2023,
          color: "Negro",
          tipo_combustible: TipoCombustible.GASOLINA,
          transmision: TipoTransmision.AUTOMATICA,
          precio_compra: 42000,
          precio_venta: 52000,
          estado_auto: EstadoAuto.DISPONIBLE,
          vin: "VIN123456789MB001",
          kilometraje: 5000,
          tipo_propiedad: TipoPropiedad.EMPRESA,
          stock: Stock.IMPORT,
          category: Category.LUXURY,
          features: "Asientos de cuero, techo solar, sistema de sonido premium",
          description: "Mercedes-Benz Clase C en excelentes condiciones",
          imagen:
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
        },
        // Auto adicional - Tesla Model 3
        {
          id_proveedor: proveedores[0].id_proveedor,
          marca: "Tesla",
          modelo: "Model 3 2023",
          año: 2023,
          color: "Rojo",
          tipo_combustible: TipoCombustible.ELECTRICO,
          transmision: TipoTransmision.AUTOMATICA,
          precio_compra: 48000,
          precio_venta: 59000,
          estado_auto: EstadoAuto.DISPONIBLE,
          vin: "VIN123456789TESLA001",
          kilometraje: 500,
          tipo_propiedad: TipoPropiedad.EMPRESA,
          stock: Stock.IMPORT,
          category: Category.SEDAN,
          features:
            "Autopilot, techo de vidrio panorámico, sistema de sonido premium",
          description: "Tesla Model 3 totalmente eléctrico",
          imagen:
            "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
        },
        // Auto adicional - Chevrolet Silverado
        {
          id_proveedor: proveedores[2].id_proveedor,
          marca: "Chevrolet",
          modelo: "Silverado 2022",
          año: 2022,
          color: "Azul",
          tipo_combustible: TipoCombustible.DIESEL,
          transmision: TipoTransmision.AUTOMATICA,
          precio_compra: 38000,
          precio_venta: 47000,
          estado_auto: EstadoAuto.DISPONIBLE,
          vin: "VIN123456789CHEV001",
          kilometraje: 15000,
          tipo_propiedad: TipoPropiedad.EMPRESA,
          stock: Stock.IMPORT,
          category: Category.PICKUP,
          features: "4x4, remolque, cámara de reversa",
          description: "Chevrolet Silverado pickup robusta y potente",
          imagen:
            "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
        },
        // Auto adicional - Audi Q5
        {
          id_proveedor: proveedores[1].id_proveedor,
          marca: "Audi",
          modelo: "Q5 2023",
          año: 2023,
          color: "Blanco",
          tipo_combustible: TipoCombustible.GASOLINA,
          transmision: TipoTransmision.AUTOMATICA,
          precio_compra: 44000,
          precio_venta: 54000,
          estado_auto: EstadoAuto.DISPONIBLE,
          vin: "VIN123456789AUDI001",
          kilometraje: 3000,
          tipo_propiedad: TipoPropiedad.EMPRESA,
          stock: Stock.IMPORT,
          category: Category.SUV,
          features: "Quattro AWD, asientos de cuero, sistema de sonido Bose",
          description: "Audi Q5 SUV de lujo con tracción integral",
          imagen:
            "https://images.unsplash.com/photo-1609781374025-bc6b3b9b0f0d?w=800&h=600&fit=crop",
        },
      ],
    });
    console.log(`✅ ${autos.length} autos creados con imágenes de Unsplash`);

    // ===== CREAR IMPORTACIÓN DE CLIENTE =====
    console.log("📦 Creando solicitud de importación de cliente...");
    const importacionCliente = await prisma.importacionCliente.create({
      data: {
        id_cliente: clientes[2].id_cliente,
        id_proveedor: proveedores[0].id_proveedor,
        costo_importacion: 28000,
        estado_solicitud: EstadoSolicitudImportacion.COMPLETADA,
        servicios_adicionales: "Envío a domicilio, trámites de importación",
        comision_empresa: 2500,
        condition: "Nueva",
      },
    });
    console.log("✅ Solicitud de importación de cliente creada");

    // ===== CREAR VENTA =====
    console.log("💳 Creando venta...");
    const venta = await prisma.venta.create({
      data: {
        id_auto: autos[0].id_auto,
        id_cliente: clientes[0].id_cliente,
        precio_venta: 32000,
        forma_pago: FormaPago.TRANSFERENCIA,
        comision_vendedor: 1600,
        impuestos: 3200,
        estado_venta: EstadoVenta.COMPLETADA,
      },
    });
    console.log("✅ Venta creada");

    // ===== CREAR ALQUILER =====
    console.log("🔑 Creando alquiler...");
    const alquiler = await prisma.alquiler.create({
      data: {
        id_auto: autos[1].id_auto,
        id_cliente: clientes[1].id_cliente,
        fecha_inicio: new Date("2024-03-01"),
        fecha_fin: new Date("2024-03-15"),
        precio_diario: 80,
        precio_semanal: 500,
        deposito_garantia: 1000,
        estado_alquiler: EstadoAlquiler.COMPLETADO,
        kilometraje_inicio: 500,
        kilometraje_fin: 1200,
        observaciones: "Cliente satisfecho, sin incidentes",
        isRented: false,
      },
    });
    console.log("✅ Alquiler creado");

    // ===== CREAR MANTENIMIENTO =====
    console.log("🔧 Creando mantenimiento...");
    const mantenimiento = await prisma.mantenimiento.create({
      data: {
        id_auto: autos[2].id_auto,
        fecha_mantenimiento: new Date("2024-02-28"),
        tipo_mantenimiento: TipoMantenimiento.PREVENTIVO,
        descripcion: "Cambio de aceite, filtros y revisión general",
        costo: 450,
        taller: "Taller Premium Auto",
        proximo_mantenimiento: new Date("2024-08-28"),
      },
    });
    console.log("✅ Mantenimiento creado");

    // ===== OBTENER CUENTA BANCARIA =====
    const cuentaBancaria = await prisma.cuentaBancaria.findFirst({
      where: { id_empresa: empresa.id_empresa },
    });

    // ===== CREAR TRANSACCIÓN =====
    console.log("💰 Creando transacción...");
    const transaccion = await prisma.transaccion.create({
      data: {
        id_cuenta: cuentaBancaria!.id_cuenta,
        id_venta: venta.id_venta,
        tipo_transaccion: TipoTransaccion.INGRESO,
        monto: 32000,
        moneda: Moneda.MLC,
        descripcion: "Venta de auto Toyota Corolla",
        beneficiario: "AutoHub Cuba",
        metodo_pago: MetodoPago.TRANSFERENCIA,
        numero_comprobante: "COMP-2024-001",
        estado_transaccion: EstadoTransaccion.COMPLETADA,
      },
    });
    console.log("✅ Transacción creada");

    // ===== CREAR FACTURA =====
    console.log("📄 Creando factura...");
    const factura = await prisma.factura.create({
      data: {
        id_cliente: clientes[0].id_cliente,
        id_venta: venta.id_venta,
        numero_factura: "FAC-2024-001",
        subtotal: 32000,
        impuestos_factura: 3200,
        total: 35200,
        estado_factura: EstadoFactura.PAGADA,
        forma_pago: FormaPago.TRANSFERENCIA,
      },
    });
    console.log("✅ Factura creada");

    // ===== CREAR IMPUESTO =====
    console.log("💹 Creando impuesto...");
    const impuesto = await prisma.impuesto.create({
      data: {
        id_transaccion: transaccion.id_transaccion,
        tipo_impuesto: TipoImpuesto.VENTAS,
        tasa_porcentaje: 10,
        monto_impuesto: 3200,
        periodo: "2024-02",
        estado_impuesto: EstadoImpuesto.PAGADO,
      },
    });
    console.log("✅ Impuesto creado");

    // ===== RESUMEN FINAL =====
    console.log("\n========================================");
    console.log("✅ SEED COMPLETADO EXITOSAMENTE!");
    console.log("========================================");
    console.log("📊 RESUMEN DE DATOS CREADOS:");
    console.log(`   • 1 Empresa: ${empresa.nombre}`);
    console.log(`   • 2 Cuentas bancarias`);
    console.log(`   • 3 Proveedores`);
    console.log(`   • 4 Empleados`);
    console.log(`   • 4 Clientes (1 importador)`);
    console.log(`   • 2 Importaciones`);
    console.log(`   • ${autos.length} Autos (con imágenes de Unsplash)`);
    console.log(`   • 1 Solicitud de importación de cliente`);
    console.log(`   • 1 Venta`);
    console.log(`   • 1 Alquiler`);
    console.log(`   • 1 Mantenimiento`);
    console.log(`   • 1 Transacción`);
    console.log(`   • 1 Factura`);
    console.log(`   • 1 Impuesto`);
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error durante el seed:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("Error fatal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
