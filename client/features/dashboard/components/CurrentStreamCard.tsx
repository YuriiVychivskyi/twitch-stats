import { Card } from '@/components/ui/card'

import WidgetsList from './WidgetsList'

function CurrentStreamCard({
  isLive,
  twitchStreamId,
}: {
  isLive: boolean
  twitchStreamId?: string
}) {
  const streamStats = [
    {
      label: 'Stream ID',
      value: twitchStreamId || 'Not live',
    },
    {
      label: 'Status',
      value: isLive ? 'Tracking live' : 'Not active',
    },
    {
      label: 'Stats',
      value: isLive ? 'Updating' : 'Unavailable',
    },
  ]

  return (
    <Card className="h-116 gap-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/7.5 to-white/[0.035] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.35)] transition hover:border-white/20 hover:from-white/9 hover:to-white/4.5">
      <div className="flex h-full flex-col">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white ${isLive ? 'bg-red-500' : 'bg-white/20'}`}
            >
              <span className="size-3 rounded-full bg-white" />
              {isLive ? 'LIVE' : 'OFFLINE'}
            </div>

            <h2 className="text-2xl leading-none font-semibold text-white">
              Current stream
            </h2>
          </div>

          <p className="mb-5 text-lg leading-none text-white">
            {isLive
              ? 'Current Twitch stream is being tracked'
              : 'No active stream'}
          </p>

          <div className="space-y-5">
            {streamStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between gap-6 text-lg"
              >
                <span className="text-white/45">{stat.label}</span>
                <span className="font-semibold text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <WidgetsList />
        </div>
      </div>
    </Card>
  )
}

export default CurrentStreamCard
