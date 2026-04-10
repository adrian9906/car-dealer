import { getImportData } from "@/lib/actions/actions";
import HeadingText from "@/components/ui/headingText";
import { AddImportButton } from "@/components/importacion/addImportButton";
import { ImportList } from "@/components/importacion/importList";

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
  const params = await searchParams;
  //* Pagination
  const page = parseInt(params?.page ?? "1");
  const limit = parseInt(params?.limit ?? "10");

  //* Sort
  const sort = params?.sort ?? "id_importacion_cliente";
  const dir = params?.dir ?? "desc";

  //* Filters
  const globalSearch = params?.q ?? "";

  const { imports, total, pageCount } = await getImportData({
    q: globalSearch,
    page,
    limit,
    dir,
    sort,
  }).catch((error) => {
    throw error;
  });

  return (
    <div className="min-h-screen bg-background mt-20">
      <div className="mt-5 px-9">
        <HeadingText
          heading="Importacón"
          subtext="Crear y administrar solicitudes para las importaciones de los autos"
        >
          <AddImportButton />
        </HeadingText>
      </div>
      <div>
        <ImportList imports={imports} total={total} pageCount={pageCount} />
      </div>
    </div>
  );
}
