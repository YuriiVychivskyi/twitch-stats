import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatterStats } from '@/types/stats'
import { Crown, MessageCircle } from 'lucide-react'
import Image from 'next/image'

function TopChattersCard({
  chatters,
  isLoading,
}: {
  chatters: ChatterStats[]
  isLoading: boolean
}) {
  const hasChatters = chatters.length > 0

  return (
    <Card className="h-116 gap-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/7.5 to-white/[0.035] p-0 shadow-[0_16px_50px_rgba(0,0,0,0.35)] transition hover:border-white/20 hover:from-white/9 hover:to-white/4.5">
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <Crown className="text-yellow-400" size={24} strokeWidth={2} />
        <h2 className="text-2xl leading-none font-semibold text-white">
          Top chatters
        </h2>
      </div>

      <ScrollArea className="h-97 px-5">
        <div className="pr-3">
          {!hasChatters && (
            <div className="py-8 text-sm text-white/45">
              {isLoading
                ? 'Loading chatters...'
                : 'No chatters tracked for the current stream yet.'}
            </div>
          )}

          {chatters.map((chatter, index) => (
            <div
              key={chatter.chatterTwitchId}
              className="grid grid-cols-[28px_40px_1fr_auto] items-center gap-3 border-b border-white/10 py-3"
            >
              <div
                className={
                  index < 3
                    ? 'flex size-7 items-center justify-center rounded-full bg-yellow-400 text-sm font-semibold text-black'
                    : 'text-center text-lg text-white'
                }
              >
                {index + 1}
              </div>

              <Image
                src={
                  chatter.profileImageUrl ||
                  'https://static-cdn.jtvnw.net/jtv_user_pictures/1384fb8b-4241-45ed-a2b1-66ebdf057ff8-profile_image-300x300.png'
                }
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />

              <span className="truncate text-lg text-white">
                {chatter.displayName ||
                  chatter.login ||
                  chatter.chatterTwitchId}
              </span>

              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">
                <MessageCircle size={14} />
                {chatter.messagesCount}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}

export default TopChattersCard
