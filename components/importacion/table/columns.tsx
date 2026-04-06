"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/tables/data-table-header";
import { Badge } from "@/components/ui/badge";
import { ImportCarOptions } from "../import-options";
import { ImportacionCliente } from "../importList";
export enum EstadoSolicitudImportacion {
  PENDIENTE = "PENDIENTE",
  APROBADA = "APROBADA",
  EN_TRANSITO = "EN_TRANSITO",
  COMPLETADA = "COMPLETADA",
  RECHAZADA = "RECHAZADA",
}
export const columns: ColumnDef<ImportacionCliente>[] = [
  {
    accessorKey: "cliente.nombre",
    meta: {
      name: "nombre",
    },
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Nombre del Cliente" />
      );
    },
  },
  {
    accessorKey: "auto.marca",
    meta: {
      name: "marca",
    },
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Marca del Vehículo" />
      );
    },
  },
  {
    accessorKey: "auto.modelo",
    meta: {
      name: "modelo",
    },
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Modelo del Vehículo" />
      );
    },
  },
  {
    accessorKey: "auto.category",
    meta: {
      name: "category",
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Categoria" />;
    },
  },
  {
    accessorKey: "fecha_solicitud",
    meta: {
      name: "fecha_Solicitud",
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Fecha Solicitud" />;
    },
    cell: ({ row }) => {
      const fecha_solicitud = row.getValue("fecha_solicitud") as Date;
      const formatedDate = fecha_solicitud.toLocaleDateString("es-ES", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });
      return <div>{formatedDate}</div>;
    },
  },
  {
    accessorKey: "fecha_estimada_llegada",
    meta: {
      name: "fecha_Llegada",
    },
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Fecha estimada de llegada"
        />
      );
    },
  },

  {
    accessorKey: "estado_solicitud",
    meta: {
      name: "estado_solicitud",
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="estado_solicitud" />;
    },
    cell: ({ row }) => {
      const name =
        (row.getValue("estado_solicitud") as EstadoSolicitudImportacion) || {};
      const isCanceled =
        row.original.estado_solicitud === EstadoSolicitudImportacion.RECHAZADA;
      const badges = {
        PENDIENTE: <Badge>{name ? name.toUpperCase() : ""}</Badge>,
        APROBADA: <Badge>{name ? name.toUpperCase() : ""}</Badge>,
        EN_TRANSITO: (
          <Badge className="border-gray-200 bg-gradient-to-r from-yellow-400 to-pink-500 dark:border-gray-800">
            {name ? name.toUpperCase() : ""}
          </Badge>
        ),
        COMPLETADA: <Badge>{name ? name.toUpperCase() : ""}</Badge>,
      };
      if (isCanceled) {
        return <Badge variant={"destructive"}>CANCELADO</Badge>;
      }
      return badges[name as keyof typeof badges];
    },
  },
  {
    id: "actions",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Acciones" />;
    },
    cell: ({ row }) => {
      const importCar = row.original;

      return <ImportCarOptions importCar={importCar} />;
    },
  },
];
