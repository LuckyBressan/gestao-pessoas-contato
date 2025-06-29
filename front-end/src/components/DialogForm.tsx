import type { JSX } from "react"
import type { LucideProps } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DialogFormProps {
  info: {
    title: string;
    description: string;
    Icon: React.FC<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  }
  open?: boolean;
  onCancel?: () => void;
  Form: JSX.Element;
  children: JSX.Element;
}

export default function DialogForm({
  info: {
    title,
    description,
    Icon
  },
  open,
  onCancel,
  Form,
  children
} : DialogFormProps) {

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => !open && onCancel?.()}
    >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <Icon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">{title}</DialogTitle>
            <DialogDescription className="text-left">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>
        {Form}
      </DialogContent>
    </Dialog>
  )
}
