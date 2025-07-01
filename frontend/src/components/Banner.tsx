import type { LucideProps } from "lucide-react"

import Text from "./Text";

interface BannerProps {
  title: string;
  description: string;
  Icon: React.FC<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export default function Banner({
  Icon,
  title,
  description
} : BannerProps) {

  return (
    <div className="bg-lochmara-100 border border-lochmara-300 rounded-lg text-foreground px-4 py-3">
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <div
            className="bg-lochmara-600/15 flex size-9 shrink-0 items-center justify-center rounded-full max-md:mt-0.5"
            aria-hidden="true"
          >
            <Icon className="opacity-80 text-lochmara-950" size={16} />
          </div>
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="space-y-0.5">
              <Text
                as="p"
                variant={'body-md-bold'}
              >
                {title}
              </Text>
              <Text
                as="p"
                variant={'body-sm'}
              >
                {description}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
