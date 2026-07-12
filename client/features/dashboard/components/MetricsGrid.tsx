import { Activity, MessageCircle, Users } from 'lucide-react'

import MetricCard from './MetricCard'

function MetricsGrid({
  totalMessages,
  uniqueChatters,
  messagesPerMinute,
}: {
  totalMessages: number
  uniqueChatters: number
  messagesPerMinute: number
}) {
  const metrics = [
    {
      description: 'Total messages',
      counter: totalMessages,
      icon: <MessageCircle className="size-8" strokeWidth={2} />,
      iconClassName: 'bg-twitch-purple shadow-[0_0_32px_rgba(145,70,255,0.28)]',
    },
    {
      description: 'Unique chatters',
      counter: uniqueChatters,
      icon: <Users className="size-8" strokeWidth={2} />,
      iconClassName: 'bg-emerald-500 shadow-[0_0_32px_rgba(16,185,129,0.25)]',
    },
    {
      description: 'Messages/min',
      counter: messagesPerMinute,
      icon: <Activity className="size-8" strokeWidth={2} />,
      iconClassName: 'bg-pink-600 shadow-[0_0_32px_rgba(219,39,119,0.25)]',
    },
  ]

  return (
    <div className="grid w-full max-w-[1038px] grid-cols-1 gap-4 md:grid-cols-3 lg:gap-[16.5px]">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.description}
          description={metric.description}
          counter={metric.counter}
          icon={metric.icon}
          iconClassName={metric.iconClassName}
        />
      ))}
    </div>
  )
}

export default MetricsGrid
