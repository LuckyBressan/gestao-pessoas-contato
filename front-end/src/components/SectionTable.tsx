import { PlusCircleIcon, Search } from "lucide-react";
import InputFilter from "./InputFilter";
import { Button } from "./ui/button";
import DataTable, { type DataTableProps } from "./DataTable";
import DialogForm from "./DialogForm";
import Form from "./Form";

interface SectionTableProps {
    tableProps: DataTableProps;
    search: {
      columnSearch: string;
      searchTerm: string;
      setSearchTerm: (term: string) => void;
    }

}

export default function SectionTable({
    search,
    tableProps,
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
          placeholder={search.columnSearch}
          className="sm:w-md"
          value={search.searchTerm}
          onChange={(e) => search.setSearchTerm(e.target.value)}
        />
        <DialogForm
          info={{
            title       : "Incluir Registro",
            description : "Informe os dados do novo registro.",
            Icon        : PlusCircleIcon
          }}
          Form={<Form {...tableProps.formProps} />}
        >
          <Button >
            <PlusCircleIcon
              className="-ms-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Incluir
          </Button>
        </DialogForm>
      </span>
      <DataTable {...tableProps} />
    </section>
  );
}
