import { PlusCircleIcon, Search } from "lucide-react";
import InputFilter from "./InputFilter";
import { Button } from "./ui/button";
import DataTable, { type DataTableProps } from "./DataTable";

interface SectionTableProps {
    tableProps: DataTableProps;
    addNew    : () => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export default function SectionTable({
    tableProps,
    addNew,
    searchTerm,
    setSearchTerm
} : SectionTableProps) {
  return (
    <section
      key="section-table"
      className={`
        border border-lochmara-300 p-3 sm:p-6 rounded-xl
        shadow-2xl flex flex-col gap-6 overflow-hidden
    `}>
      <span className="flex gap-3">
        <InputFilter
          type="text"
          Icon={Search}
          placeholder="nome"
          className="w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={addNew}>
          <PlusCircleIcon
            className="-ms-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Incluir Pessoa
        </Button>
      </span>
      <DataTable {...tableProps} />
    </section>
  );
}
