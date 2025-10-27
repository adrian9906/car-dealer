import { ImportacionCliente } from "@prisma/client";
import { ArrowUpRightIcon, File, User } from "lucide-react";
import { ImportCarTable } from "./table/imporCar-table";
import { columns } from "./table/columns";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Button } from "../ui/button";
import Link from "next/link";

interface ImportListProps {
  imports: ImportacionCliente[];
  total: number;
  pageCount: number;
}

export function ImportList({ imports, total, pageCount }: ImportListProps) {
  return (
    <>
      {imports.length > 0 ? (
        <ImportCarTable
          total={total}
          pageCount={pageCount}
          columns={columns}
          data={imports}
        />
      ) : (
        <div className="py-8 mt-10">
          <Empty className="items-center">
            <EmptyHeader>
              <EmptyMedia variant="default" className="text-6xl">
                <File className="w-40 h-40 text-primary" />
              </EmptyMedia>
              <EmptyTitle className="text-4xl text-primary">
                No hay importaciones todavía
              </EmptyTitle>
              <EmptyDescription className="text-2xl">
                No hay solicitudes de importaciones todavía. Inicia creando tu
                primera importación
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button>
                  <Link href={"/dealer/importacion/add"}>
                    Crear inportación
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="text-primary border-primary border-2 hover:bg-primary/10 dark:hover:bg-primary/10 hover:text-primary"
                >
                  <Link href="/dealer/inventario">Ver Inverntario</Link>
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        </div>
      )}
    </>
  );
}
