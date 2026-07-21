import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatterStats } from '@/types/streamStats'
import { Medal } from 'lucide-react'

const achievementMilestones = [100, 300, 500, 1000]

function AchievementsCard({ chatters }: { chatters: ChatterStats[] }) {
  const achievements = chatters
    .flatMap((chatter) => {
      return achievementMilestones
        .filter((milestone) => chatter.messagesCount >= milestone)
        .map((milestone) => ({
          id: `${chatter.chatterTwitchId}-${milestone}`,
          name: chatter.displayName || chatter.login || chatter.chatterTwitchId,
          messages: milestone,
        }))
    })
    .slice(0, 12)

  return (
    <Card className="h-116 gap-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/7.5 to-white/[0.035] p-0 shadow-[0_16px_50px_rgba(0,0,0,0.35)] transition hover:border-white/20 hover:from-white/9 hover:to-white/4.5">
      <div className="flex items-center gap-3 px-5 pt-5 pb-5">
        <Medal className="text-yellow-400" size={24} strokeWidth={2} />
        <h2 className="text-2xl leading-none font-semibold text-white">
          Achievements
        </h2>
      </div>

      <ScrollArea className="h-95 px-5">
        <div className="pr-3">
          {achievements.length === 0 && (
            <div className="py-8 text-sm text-white/45">
              No achievements yet. They will appear as chatters reach message
              milestones.
            </div>
          )}

          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="border-b border-white/10 py-3 text-lg leading-snug text-white"
            >
              <span className="text-twitch-purple">{achievement.name}</span> has
              reached {achievement.messages} messages
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}

export default AchievementsCard
