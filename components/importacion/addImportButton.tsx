import Link from "next/link";
import { Button, ButtonProps } from "../ui/button";
import { PlusIcon } from "lucide-react";

interface ActivityAddButtonProps extends ButtonProps {}

export function AddImportButton({ ...props }: ActivityAddButtonProps) {
  return (
    <Link href={"/dealer/importacion/add"}>
      <Button {...props}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Nuevo
      </Button>
    </Link>
  );
}
