/**
 * Enumeración de formas de pago disponibles
 */

import { EstadoVenta, FormaPago } from "@/app/generated/prisma/enums";

/**
 * Enumeración de estados de venta
 */

/**
 * Interfaz para registros de venta
 */
export interface Venta {
  id_venta: string;
  fecha_venta: Date;
  precio_venta: number;
  forma_pago: FormaPago;
  comision_vendedor: number | null;
  impuestos: number;
  estado_venta: EstadoVenta;
  createdAt: Date;
  updatedAt: Date;
  id_auto: string;
  id_cliente: string;
}

/**
 * Tipo para crear una nueva venta (excluyendo campos generados automáticamente)
 */
export type CreateVentaInput = Omit<
  Venta,
  "id_venta" | "createdAt" | "updatedAt"
>;

/**
 * Tipo para actualizar una venta existente
 */
export type UpdateVentaInput = Partial<CreateVentaInput>;

/**
 * Respuesta de API para una venta
 */
export interface VentaResponse extends Venta {
  auto?: {
    id_auto: string;
    marca: string;
    modelo: string;
    año: number;
  };
  cliente?: {
    id_cliente: string;
    nombre: string;
    email: string;
  };
  empleado?: {
    id_empleado: string;
    nombre: string;
  } | null;
}

/**
 * Estadísticas de ventas
 */
export interface VentasStats {
  total_ventas: number;
  total_ingresos: number;
  total_impuestos: number;
  comisiones_totales: number;
  promedio_venta: number;
  venta_mayor: number;
  venta_menor: number;
}
