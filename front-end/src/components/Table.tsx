import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import Input from "./Input";
import { useState, type ChangeEvent } from "react";
import { FunnelX } from "lucide-react";
import Text from "./Text";

type Columns = readonly string[];

type RowType = {
  [K in Columns[number]]: string | number;
};

interface TableProps<Columns extends readonly string[]>
  extends React.ComponentProps<"table"> {
  filter?: {
    column: string;
  };
  columns: Columns;
  rows: RowType[];
}

export default function Table<Columns extends readonly string[]>({
  filter,
  columns,
  rows,
  className,
  ...props
}: TableProps<Columns>) {
  const [filterValue, setFilterValue] = useState("");

  //Removemos caracteres especiais para filtrar corretamente
  const normalize = (str: string | number) =>
    String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    setFilterValue(input.value);
  };

  const rowsFilter = rows
    .filter((row) => {
      if (!filterValue) return true;
      const column = filter?.column || "";
      return normalize(row[column]).includes(normalize(filterValue));
    })
    .map((row, rowIndex) => (
      <Tr key={`linha-${rowIndex}`}>
        {columns.map((column) => (
          <td key={`celula-${rowIndex}-${column}`} className="px-8">
            {row[column]}
          </td>
        ))}
        <td key={`celula-acao-${rowIndex}`}>Ação</td>
      </Tr>
    ));

    let emptyState;
    if(!rowsFilter.length) {
        emptyState = (
            <div
                className={`
                    flex flex-col gap-3
                    items-center justify-center text-center
                    w-full p-6
                `}
            >
                <FunnelX size={50} className="text-lochmara-950" />
                <Text as="h1" variant={'body-md-bold'}>Nenhum registro encontrado!</Text>
                <Text as="p" className="text-lochmara-500">Nenhum registro retornou da filtragem realizada, <br /> por favor tente filtrar de outra forma.</Text>
            </div>
        )
    }

  return (
    <div className="flex flex-col gap-3">
      <span className="flex gap-3">
        {filter && (
          <Input
            placeholder={`Filtre por ${filter.column}...`}
            onChange={handleFilterChange}
          />
        )}
      </span>
      <div className="border border-lochmara-300 rounded-md overflow-hidden">
        <table className={`overflow-hidden ${className}`} {...props}>
          <thead className="bg-lochmara-200">
            <Tr variant={"secondary"} className="last:first:border-b">
              {columns.map((column) => (
                <th key={`coluna-${column}`} className="px-8 text-start">
                  {column}
                </th>
              ))}
              <th className="pr-12 text-start">&nbsp;</th>
            </Tr>
          </thead>
          <tbody>
            {
                rowsFilter.length
                ? rowsFilter.map(row => row)
                : (
                    <Tr variant={'none'} >
                        <td colSpan={4}>{emptyState}</td>
                    </Tr>
                )
            }
        </tbody>
        </table>
      </div>
    </div>
  );
}

const trVariants = cva(
  `
    border-y border-lochmara-300
    first:border-t-0 last:border-b-0
    h-10
`,
  {
    variants: {
      variant: {
        none   : '',
        primary: "font-semibold text-lochmara-800",
        secondary: "uppercase font-bold text-lochmara-950",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface TrProps
  extends React.ComponentProps<"tr">,
    VariantProps<typeof trVariants> {}

function Tr({ variant, className, children }: TrProps) {
  return <tr className={trVariants({ variant, className })}>{children}</tr>;
}
