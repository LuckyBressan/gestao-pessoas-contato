import { CircleAlertIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { JSX } from "react";

interface AlertDialogDeleteProps {
  open    : boolean;
  children: JSX.Element;
  onDelete: () => void;
  onCancel: () => void;
}

export default function AlertDialogDelete({
  open,
  children,
  onDelete,
  onCancel
} : AlertDialogDeleteProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onCancel();
        }
      }}
    >
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="text-lochmara-950 opacity-80" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar registro?</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja deletar o registro selecionado? <br />
              Todos os dados serão removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
