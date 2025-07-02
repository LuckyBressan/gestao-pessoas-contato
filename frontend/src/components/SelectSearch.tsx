import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { normalize } from "@/utils/stringFormatter";

export type SelectSearchItem = {
  label: string;
  value: string;
};

interface SelectSearchProps {
  label: string;
  placeholder: string;
  value      : string;
  setValue   : (value: string) => void
  items: SelectSearchItem[];
}

export default function SelectSearch({
  label,
  placeholder,
  value,
  setValue,
  items,
}: SelectSearchProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            name="contact-person"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]">
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? items.find((item) => item.value === value)?.label
                : `Selecione uma ${placeholder}`}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start">
          <Command shouldFilter={false}>
            <CommandInput
              value={searchTerm}
              onValueChange={(value) => setSearchTerm(value)}
              placeholder={`Procure uma ${placeholder}...`}
            />
            <CommandList>
              <CommandEmpty>Nenhuma {label} encontrada.</CommandEmpty>
              <CommandGroup>
                {items
                  .filter((item) =>
                    normalize(item.label).includes(normalize(searchTerm))
                  )
                  .map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}>
                      <Square className="bg-lochmara-400/20 text-lochmara-500">
                        {item.label[0]}
                      </Square>
                      {item.label}
                      {value === item.value && (
                        <CheckIcon size={16} className="ml-auto" />
                      )}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface SquareProps {
  className?: string;
  children: React.ReactNode;
}

function Square({ className, children }: SquareProps) {
  return (
    <span
      data-square
      className={cn(
        "bg-muted text-muted-foreground flex size-5 items-center justify-center rounded text-xs font-medium",
        className
      )}
      aria-hidden="true">
      {children}
    </span>
  );
}
