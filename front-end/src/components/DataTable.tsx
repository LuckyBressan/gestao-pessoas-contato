"use client";

import type React from "react";

import { MoreHorizontal, Edit, Trash2, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import AlertDialogDelete from "./AlertDialogDelete";
import Text from "./Text";
import DialogForm from "./DialogForm";
import type { FormProps } from "./Form";
import Form from "./Form";

export interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface DataTableProps {
  data    : any[];
  columns : Column[];
  loading?: boolean;
  formProps: FormProps;
  onDelete: (id: number) => void;
}

interface DialogOpenState {
  delete: boolean;
  edit: boolean;
}

export default function DataTable({
  data,
  columns,
  loading,
  formProps,
  onDelete
}: DataTableProps) {
  const [openDialog, setOpenDialog] = useState<DialogOpenState>({
    delete: false,
    edit: false,
  });

  const handleDelete = (id: number) => {
    setOpenDialog((prev) => ({ ...prev, delete: false }));
    onDelete(id);
  };

  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
              <TableHead className="w-[70px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    <div className="h-4 bg-lochmara-200 rounded animate-pulse"></div>
                  </TableCell>
                ))}
                <TableCell>
                  <div className="h-8 w-8 bg-lochmara-200 rounded animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
              <TableHead className="w-[70px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-center">
                <div className="flex flex-col items-center justify-center gap-3 p-6">
                  <FilterX className="text-lochmara-600" size={40} />
                  <Text as="h1" variant={"body-md-bold"}>
                    Nenhum resultado encontrado.
                  </Text>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <div className=" sm:min-w-2xl h-full">
        <Table
          className={`
            [&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t
            [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b
          `}>
          <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
            <TableRow className="hover:bg-transparent">
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
              <TableHead className="w-[70px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DialogForm
                        info={{
                          title: "Editar Registro",
                          description:
                            "Você pode editar os dados deste registro.",
                          Icon: Edit,
                        }}
                        open={openDialog.edit}
                        onCancel={() =>
                          setOpenDialog((prev) => ({ ...prev, edit: false }))
                        }
                        Form={(<Form props={{ info: row }} {...formProps} />)}>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenDialog((prev) => ({ ...prev, edit: true }));
                          }}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                      </DialogForm>
                      <AlertDialogDelete
                        open={openDialog.delete}
                        onDelete={() => handleDelete(row.id as number)}
                        onCancel={() =>
                          setOpenDialog((prev) => ({ ...prev, delete: false }))
                        }>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenDialog((prev) => ({
                              ...prev,
                              delete: true,
                            }));
                          }}
                          className="text-lochmara-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </AlertDialogDelete>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
