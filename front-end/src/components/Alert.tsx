import { CircleCheck, CircleX, HelpCircle, TriangleAlert } from "lucide-react";

import {
  Alert as AlertComponent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import { cva, type VariantProps } from "class-variance-authority";

export const AlertVariants = cva('z-[100] shadow', {
  variants: {
    variant: {
      success: 'bg-emerald-50 border-emerald-500 px-4 py-3 text-emerald-600',
      error  : 'bg-red-50 border-red-500 text-red-600',
      warning: 'bg-amber-50 border-amber-500 text-amber-600',
      info   : 'bg-blue-50 border-blue-500 text-blue-600'
    }
  },
  defaultVariants: {
    variant: 'info'
  }
})

const AlertVariantsIcon = {
  success: CircleCheck,
  error  : CircleX,
  warning: TriangleAlert,
  info   : HelpCircle,
};

export interface AlertProps extends VariantProps<typeof AlertVariants> {
  title      : string;
  description?: string;
}

export default function Alert({
  title,
  description,
  variant,
} : AlertProps) {

  const Icon = AlertVariantsIcon[variant || 'info']

  return (
    <AlertComponent className={AlertVariants({ variant })}>
      <Icon size={4} />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription
        className={!description ? 'hide' : ''}
      >
        {description}
      </AlertDescription>
    </AlertComponent>
  );
}
