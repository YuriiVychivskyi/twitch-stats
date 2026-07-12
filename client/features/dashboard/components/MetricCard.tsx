import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ReactNode } from 'react'

function MetricCard({
  icon,
  description,
  counter,
  iconClassName,
}: {
  icon: ReactNode
  description: string
  counter: number
  iconClassName: string
}) {
  return (
    <Card className="h-25 w-full border border-white/10 bg-gradient-to-br from-white/[0.075] to-white/[0.035] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.35)] transition hover:border-white/20 hover:from-white/[0.09] hover:to-white/[0.045]">
      <CardHeader className="relative grid h-full items-center gap-0">
        <div className="space-y-4">
          <CardDescription className="text-base leading-none font-normal text-white/55">
            {description}
          </CardDescription>
          <CardTitle className="text-3xl leading-none font-semibold text-white">
            {counter.toLocaleString('en-US')}
          </CardTitle>
        </div>

        <div
          className={`absolute right-0 flex size-15 items-center justify-center rounded-xl text-white ${iconClassName}`}
        >
          {icon}
        </div>
      </CardHeader>
    </Card>
  )
}

export default MetricCard
