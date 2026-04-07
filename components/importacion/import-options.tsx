"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { formatDate } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import {
  CancelImportCar,
  DeleteImportCar,
  ReactivateImportCar,
} from "@/lib/actions/actions";

import { useRouter } from "next/navigation";
import { ImportacionCliente } from "./importList";

type Props = {
  importCar: ImportacionCliente;
};

export function ImportCarOptions({ importCar }: Props) {
  const [showSubscriptionAlert, setSubscriptionAlert] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);

  async function handleCancelSubscription(importCar: ImportacionCliente) {
    try {
      const response = await CancelImportCar(importCar);
      if (response.success === true) {
        toast({
          title: "Suscripción cancelada",
          description: `Se ha deshabilitado el servicio de pressclipping para este perfil.`,
          variant: "default",
        });
      }
      router.push("/dealer/importacion");
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Algo salio mal",
          description: error.message,
          variant: "default",
        });
      } else {
        throw error;
      }
    }
  }
  async function handleReactivateSubscription(importCar: ImportacionCliente) {
    try {
      const response = await ReactivateImportCar(importCar);
      if (response.success === true) {
        toast({
          title: "Perfil reactivado",
          description: `Se ha reactivado el pressclipping ${importCar.id_auto}.`,
          variant: "default",
        });
      }
      router.push("/dealer/importacion");
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Algo salio mal",
          description: error.message,
          variant: "default",
        });
      } else {
        throw error;
      }
    }
  }

  async function handleDeleteProfile(importCar: ImportacionCliente) {
    try {
      const response = await DeleteImportCar({
        where: {
          id_importacion_cliente: importCar.id_importacion_cliente,
        },
      });
      if (response.success === true) {
        toast({
          title: "Pressclipping eliminado",
          description: `Se ha eliminado correctamente el pressclipping de ${importCar.id_importacion_cliente}.`,
          variant: "default",
        });
      }
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Algo salio mal",
          description: error.message,
          variant: "default",
        });
        console.log(error.message);
      } else {
        throw error;
      }
    }
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu de acciones</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setSubscriptionAlert(true);
            }}
            className={
              importCar.estado_solicitud.toLowerCase() === "rechazada"
                ? "text-green-500 focus:text-green-500"
                : "text-red-500 focus:text-red-500"
            }
          >
            {importCar.estado_solicitud.toLowerCase() === "rechazada" ? (
              <UserRoundCheck className="mr-2 h-4 w-4" />
            ) : (
              <UserRoundX className="mr-2 h-4 w-4" />
            )}
            {importCar.estado_solicitud.toLowerCase() === "rechazada"
              ? "Reactivar Importación"
              : `Anular Importación`}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setShowDeleteAlert(true);
            }}
            className="text-red-500 focus:text-red-500"
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Eliminar Importación</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={showSubscriptionAlert}
        onOpenChange={setSubscriptionAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {importCar.estado_solicitud.toLowerCase() === "rechazada"
                ? "Desea reactivar la suscripción de este perfil?"
                : "Esta seguro que desea anular la suscripción de este perfil?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {importCar.estado_solicitud.toLowerCase() === "rechazada"
                ? `Al hacer esto se empezará a enviar notificaciones del clipping de prensa a partir del ${formatDate(
                    new Date(),
                    {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    },
                  )}`
                : `Al hacer esto se dejará de enviar actualizaciones del
               clipping de prensa hasta que se reactive el perfil.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);
                if (importCar.estado_solicitud.toLowerCase() === "rechazada") {
                  await handleCancelSubscription(importCar);
                } else {
                  await handleReactivateSubscription(importCar);
                }
                setIsLoading(false);
                setSubscriptionAlert(false);
              }}
              className={
                importCar.estado_solicitud.toLowerCase() === "rechazada"
                  ? "bg-green-600 focus:ring-green-600"
                  : "bg-red-600 focus:ring-red-600"
              }
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : importCar.estado_solicitud.toLowerCase() === "rechazada" ? (
                <UserRoundCheck className="mr-2 h-4 w-4" />
              ) : (
                <UserRoundX className="mr-2 h-4 w-4" />
              )}
              <span>
                {importCar.estado_solicitud.toLowerCase() === "rechazada"
                  ? "Reactivar Importación"
                  : `Anular Importación`}{" "}
              </span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Esta seguro que desea eliminar este perfil?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es irreversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);

                const deleted = await handleDeleteProfile(importCar);

                if (deleted) {
                  setIsLoading(false);
                  setShowDeleteAlert(false);
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Eliminar perfil</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
