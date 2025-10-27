import type React from "react";
import { ImportCarForm } from "@/components/importacion/importForm";
import { db } from "@/lib/db";
import { getImportData } from "@/lib/actions/actions";
import { Vehicle } from "../../inventario/page";

export type PageProps = {
  searchParams?: {
    page: string;
    limit: string;
    sort: string;
    dir: "asc" | "desc";
    q: string;
  };
};

export default async function ImportPage({ searchParams }: PageProps) {
  const autos: Vehicle[] = await db.auto.findMany();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <ImportCarForm autos={autos} />
    </div>
  );
}
