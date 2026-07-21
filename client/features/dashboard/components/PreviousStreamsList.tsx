import { Card } from '@/components/ui/card'
import { formatNumber } from '@/lib/format'
import { StreamHistoryItem } from '@/types/streamStats'
import {
  CalendarDays,
  Clock3,
  History,
  MessageCircle,
  Users,
} from 'lucide-react'

function PreviousStreamsList({ streams }: { streams: StreamHistoryItem[] }) {
  return (
    <Card className="gap-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/7.5 to-white/[0.035] p-0 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <History className="text-twitch-purple" size={24} />
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Previous streams
            </h2>
            <p className="mt-1 text-sm text-white/45">
              Your latest completed Twitch streams
            </p>
          </div>
        </div>

        <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/60">
          Offline
        </span>
      </div>

      <div className="divide-y divide-white/10 px-6">
        {streams.length === 0 && (
          <div className="py-12 text-center text-sm text-white/45">
            No completed streams yet.
          </div>
        )}

        {streams.map((stream) => (
          <article
            key={stream.twitchStreamId}
            className="grid gap-5 py-5 transition hover:bg-white/[0.025] md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
          >
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-white">
                {stream.title}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/45">
                <span>{stream.category}</span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={15} />
                  {stream.startedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 size={15} />
                  {stream.duration}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-sm text-white">
                <MessageCircle size={16} className="text-twitch-purple" />
                {formatNumber(stream.totalMessages)}
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-sm text-white">
                <Users size={16} className="text-emerald-400" />
                {formatNumber(stream.uniqueChatters)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Card>
  )
}

export default PreviousStreamsList
