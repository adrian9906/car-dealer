"use server";

import {
  FormaPago,
  Prisma,
  PrismaClient,
} from "../../app/generated/prisma/client";

import { Alquiler, PageParams } from "@/app/dealer/inventario/page";
import { EstadoSolicitudImportacion } from "../import";
import {
  DatabaseConnectionError,
  EntityNotFound,
  InvalidParameterError,
} from "../exceptions/db";
import { PriceExport } from "@/components/importacion/importForm";
import { db } from "../db";
import { ImportacionCliente } from "@/components/importacion/importList";
import { ClienteForm } from "@/components/inventario/cotizar";

type getImportParams = {
  q?: string;
  limit?: number;
  page?: number;
  sort?: keyof ImportacionCliente | string;
  dir?: "asc" | "desc";
};
export async function getBrands() {
  try {
    const brands = await db.auto.findMany({
      select: {
        marca: true,
      },
      orderBy: {
        marca: "asc",
      },
    });
    const brandsUnique = new Set(brands.map((brand) => brand.marca));
    return Array.from(brandsUnique);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getModelos() {
  try {
    const models = await db.auto.findMany({
      select: {
        modelo: true,
      },
      orderBy: {
        modelo: "asc",
      },
    });
    return models.map((model) => model.modelo);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getVehicle(id: string) {
  const vehicle = db.auto.findFirst({
    where: {
      id_auto: id,
    },
    select: {
      año: true,
      id_auto: true,
      vin: true,
      category: true,
      color: true,
      estado_auto: true,
      features: true,
      imagen: true,
      kilometraje: true,
      marca: true,
      modelo: true,
      precio_venta: true,
      stock: true,
      tipo_combustible: true,
      transmision: true,
      tipo_propiedad: true,
      fecha_llegada_cuba: true,
    },
  });
  return vehicle;
}

export async function getVehicles(searchParams: PageParams["searchParams"]) {
  const where: any = {};
  if (searchParams.marca && searchParams.marca !== "all") {
    where.marca = searchParams.marca;
  }

  if (searchParams.modelo && searchParams.modelo !== "all") {
    where.modelo = {
      contains: searchParams.modelo,
    };
  }

  if (searchParams.año && searchParams.año !== "all") {
    where.año = parseInt(searchParams.año);
  }

  if (searchParams.color && searchParams.color !== "all") {
    where.color = {
      contains: searchParams.color,
    };
  }

  if (
    searchParams.tipo_combustible &&
    searchParams.tipo_combustible !== "all"
  ) {
    where.tipo_combustible = searchParams.tipo_combustible;
  }

  if (searchParams.stock && searchParams.stock !== "all") {
    where.stock = searchParams.stock;
  }

  if (searchParams.category && searchParams.category !== "all") {
    where.category = searchParams.category;
  }

  if (searchParams.price_min || searchParams.price_max) {
    where.precio_venta = {};
    if (searchParams.price_min) {
      where.precio_venta.gte = parseFloat(searchParams.price_min);
    }
    if (searchParams.price_max) {
      where.precio_venta.lte = parseFloat(searchParams.price_max);
    }
  }

  if (searchParams.location && searchParams.location !== "all") {
    where.ubicacion = searchParams.location;
  }

  if (searchParams.brand && searchParams.brand !== "all") {
    const brandsArray = searchParams.brand.split(",");
    where.marca = {
      in: brandsArray,
    };
  }

  const page = parseInt(searchParams.page || "1");
  const rowsPerPage = parseInt(searchParams.rows || "50");
  const skip = (page - 1) * rowsPerPage;

  let orderBy: any = {};
  switch (searchParams.sort) {
    case "precio_asc":
      orderBy = { precio_venta: "asc" };
      break;
    case "precio_desc":
      orderBy = { precio_venta: "desc" };
      break;
    case "año_desc":
      orderBy = { año: "desc" };
      break;
    case "kilometraje_asc":
      orderBy = { kilometraje: "asc" };
      break;
    case "fecha_llegada_cuba":
      orderBy = { fecha_llegada_cuba: "desc" };
      break;
    default:
      orderBy = { fecha_llegada_cuba: "desc" };
      break;
  }

  try {
    const vehicles = await db.auto.findMany({
      where,
      select: {
        id_auto: true,
        marca: true,
        modelo: true,
        año: true,
        precio_venta: true,
        stock: true,
        category: true,
        imagen: true,
        kilometraje: true,
        estado_auto: true,
        color: true,
        tipo_combustible: true,
        transmision: true,
        features: true,
        vin: true,
        tipo_propiedad: true,
      },
      orderBy,
      skip: skip,
      take: rowsPerPage,
    });

    return vehicles;
  } catch (error) {
    console.error("Error fetching vehicles from Prisma:", error);
    return [];
  }
}

export async function getVehiclesTotal() {
  try {
    const vehicles = await db.auto.count();
    return vehicles;
  } catch (error) {
    console.error("Error fetching vehicles from Prisma:", error);
    return 0;
  }
}

export interface FormDataImport {
  name: string;
  nameAuto: string;
  email: string;
  tel: string;
  model: string;
  costo_importacion: number;
  request?: string;
  condition: string;
  year?: string;
  apellidos: string;
  ci: string;
  direccion: string;
}

export async function CreateClientImport(
  formData: FormDataImport,
  estimatedCost: PriceExport,
) {
  try {
    const {
      name,
      nameAuto,
      email,
      tel,
      model,
      costo_importacion,
      request,
      condition,
      year,
      direccion,
      ci,
      apellidos,
    } = formData;

    const cliente = await db.cliente.findFirst({
      where: {
        nombre: name,
        email: email,
        telefono: tel,
      },
    });
    let clienteID = cliente?.id_cliente;
    if (!cliente) {
      const cliente = await db.cliente.create({
        data: {
          email,
          nombre: name,
          telefono: tel,
          tipo_cliente: "NACIONAL",
          direccion,
          ci,
          apellidos,
        },
      });
      clienteID = cliente?.id_cliente;
    }
    const auto = await db.auto.findFirst({
      where: {
        marca: nameAuto,
        modelo: model,
      },
    });
    if (!auto) {
      throw new Error("El auto no existe");
    }
    if (clienteID) {
      const client = await db.importacionCliente.create({
        data: {
          costo_importacion: estimatedCost.total,
          id_auto: auto.id_auto,
          id_cliente: clienteID,
          estado_solicitud: "PENDIENTE",
          servicios_adicionales: request,
          condition,
        },
      });

      return client;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getImportData({
  q = "",
  limit = 10,
  page = 1,
  sort = "id_importacion_cliente",
  dir = "asc",
}: getImportParams) {
  try {
    if (limit < 1 || page < 1) {
      throw new InvalidParameterError(
        "Algunos de los parámetros no es correcto.",
      );
    }

    if (!["asc", "desc"].includes(dir)) {
      throw new InvalidParameterError(
        'Dirección de ordenamiento inválida. Debe ser "asc" o "desc".',
      );
    }

    const whereClause = {
      OR: [
        { auto: { marca: { contains: q } } },
        { cliente: { nombre: { contains: q } } },
      ],
    };

    const imports = await db.importacionCliente.findMany({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        cliente: true,
        auto: true,
      },
      orderBy: {
        [sort]: dir,
      },
    });
    const total = await db.importacionCliente.count({ where: whereClause });
    return { imports, total, pageCount: Math.ceil(total / limit) };
  } catch (error) {
    if (
      error instanceof InvalidParameterError ||
      error instanceof DatabaseConnectionError
    ) {
      throw error;
    } else {
      console.log("Unkown Error", error);
      throw new Error(
        "Ocurrio un error desconocido. Por favor, intentalo de nuevo más tarde.",
      );
    }
  }
}

export async function CancelImportCar(importCar: ImportacionCliente) {
  try {
    await db.importacionCliente.update({
      where: {
        id_importacion_cliente: importCar.id_importacion_cliente,
      },
      data: {
        estado_solicitud: "RECHAZADA",
      },
    });
    return { success: true };
  } catch (error) {
    if (
      error instanceof EntityNotFound ||
      error instanceof DatabaseConnectionError
    ) {
      throw error;
    } else {
      throw new Error(
        "Ocurrio un error desconocido al cancelar el servicio. Por favor, intentalo de nuevo más tarde.",
      );
    }
  }
}
export async function ReactivateImportCar(importCar: ImportacionCliente) {
  try {
    await db.importacionCliente.update({
      where: {
        id_importacion_cliente: importCar.id_importacion_cliente,
      },
      data: {
        estado_solicitud: "APROBADA",
      },
    });
    return { success: true };
  } catch (error) {
    if (
      error instanceof EntityNotFound ||
      error instanceof DatabaseConnectionError
    ) {
      throw error;
    } else {
      throw new Error(
        "Ocurrio un error desconocido al cancelar el servicio. Por favor, intentalo de nuevo más tarde.",
      );
    }
  }
}
export async function getImportCar({
  where,
}: {
  where: Prisma.ImportacionClienteWhereUniqueInput;
}) {
  try {
    const profile = await db.importacionCliente.findUnique({
      where,
    });
    if (!profile) {
      throw new EntityNotFound(
        "El perfil solicitado está inactivo o no existe",
      );
    }
    return profile;
  } catch (error) {
    if (
      error instanceof EntityNotFound ||
      error instanceof DatabaseConnectionError
    ) {
      throw error;
    } else {
      throw new Error(
        "Ocurrio un error desconocido. Por favor, intentalo de nuevo más tarde.",
      );
    }
  }
}
export async function DeleteImportCar({
  where,
}: {
  where: Prisma.ImportacionClienteWhereUniqueInput;
}) {
  try {
    const importCar = await getImportCar({ where });
    console.log(importCar);
    if (!importCar) {
      throw new EntityNotFound("La importación solicitada no existe");
    }

    await db.importacionCliente.delete({
      where: { id_importacion_cliente: importCar.id_importacion_cliente },
    });
    return { success: true };
  } catch (error) {
    if (
      error instanceof EntityNotFound ||
      error instanceof DatabaseConnectionError
    ) {
      throw error;
    } else {
      throw new Error(
        "Ocurrio un error desconocido al cancelar el servicio. Por favor, intentalo de nuevo más tarde.",
      );
    }
  }
}

export async function ApproveImportCar() {
  const autos: Alquiler[] = await db.alquiler.findMany({
    include: {
      auto: true,
      facturas: true,
      transacciones: true,
    },
  });
  return autos;
}

export async function CreateVenta(
  id_auto: string,
  formaPago: FormaPago,
  cliente: ClienteForm,
) {
  const autos = await db.auto.findFirst({
    where: {
      id_auto,
    },
  });
  console.log(autos);
  if (!autos) {
    throw new EntityNotFound("El auto solicitado no existe");
  }
  let cliente2 = await db.cliente.findUnique({
    where: { ci: cliente.ci },
  });

  if (!cliente2) {
    // Solo crear si no existe
    cliente2 = await db.cliente.create({
      data: {
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono,
        tipo_cliente: cliente.tipo_cliente,
        direccion: cliente.direccion,
        ci: cliente.ci || "",
        apellidos: cliente.apellidos,
      },
    });
  }
  const venta = await db.venta.create({
    data: {
      auto: {
        // ← Usa la relación, no id_auto
        connect: {
          id_auto: autos.id_auto,
        },
      },
      cliente: {
        // ← Usa relación, no id_cliente
        connect: { id_cliente: cliente2.id_cliente },
      },
      precio_venta: autos.precio_venta || 0,
      forma_pago: formaPago,
      impuestos: 100,
      estado_venta: "COMPLETADA",
      comision_vendedor: autos.precio_venta ? autos.precio_venta * 0.05 : 0,
    },
  });
  if (!venta) {
    throw new Error("No se pudo crear la venta");
  }
  return venta;
}
