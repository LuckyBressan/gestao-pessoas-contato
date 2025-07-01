import { useId } from "react"
import type { LucideProps } from "lucide-react"
import { Input } from "@/components/ui/input"

interface InputFilterProps extends React.ComponentProps<'input'> {
  Icon: React.FC<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

export default function InputFilter({
  className,
  Icon,
  placeholder,
  ...props
} : InputFilterProps) {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id={id}
          className={`peer pe-9 ${className}`}
          placeholder={`Pesquise por ${placeholder}...`}
          {...props}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
          <Icon size={16} aria-hidden="true"  />
        </div>
      </div>
    </div>
  )
}
