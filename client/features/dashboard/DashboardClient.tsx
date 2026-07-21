'use client'
import { getApiUrl } from '@/lib/api'
import { LiveStreamStats } from '@/types/streamStats'
import { StreamerProfile } from '@/types/streamerProfile'
import { useEffect, useMemo, useState } from 'react'

import AchievementsCard from './components/AchievementsCard'
import CurrentStreamCard from './components/CurrentStreamCard'
import DashboardHeader from './components/DashboardHeader'
import MetricsGrid from './components/MetricsGrid'
import PreviousStreamsList from './components/PreviousStreamsList'
import TopChattersCard from './components/TopChattersCard'

const mockPreviousStreams = [
  {
    twitchStreamId: 'stream-4',
    title: 'Evening stream and community games',
    category: 'Just Chatting',
    startedAt: 'June 22, 2026',
    duration: '03:12:48',
    totalMessages: 15200,
    uniqueChatters: 148,
  },
  {
    twitchStreamId: 'stream-3',
    title: 'Ranked grind',
    category: 'VALORANT',
    startedAt: 'June 20, 2026',
    duration: '04:38:10',
    totalMessages: 11842,
    uniqueChatters: 121,
  },
  {
    twitchStreamId: 'stream-2',
    title: 'Late night chat',
    category: 'Just Chatting',
    startedAt: 'June 18, 2026',
    duration: '02:15:34',
    totalMessages: 8261,
    uniqueChatters: 94,
  },
]

function DashboardClient({ profile }: { profile: StreamerProfile }) {
  const [stats, setStats] = useState<LiveStreamStats | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchLiveStats = async () => {
      try {
        const response = await fetch(
          getApiUrl(`/api/streamers/${profile.twitchId}/live-stats`),
        )

        if (!response.ok) {
          throw new Error(`Live stats response status: ${response.status}`)
        }

        const data = await response.json()
        const liveStats = data?.data ?? data

        if (isMounted) {
          setStats(liveStats)
        }
      } catch (error) {
        console.error('Failed to fetch live stream stats', error)
      } finally {
        if (isMounted) {
          setIsLoadingStats(false)
        }
      }
    }

    fetchLiveStats()

    const intervalId = window.setInterval(fetchLiveStats, 3000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [profile.twitchId])

  const chatters = useMemo(() => {
    return [...(stats?.chatters || [])].sort(
      (firstChatter, secondChatter) =>
        secondChatter.messagesCount - firstChatter.messagesCount,
    )
  }, [stats?.chatters])

  const uniqueChatters = chatters.length
  const totalMessages = stats?.totalMessages || 0
  const messagesPerMinute = 0
  const isLive = Boolean(stats?.twitchStreamId)

  return (
    <section className="relative mx-auto w-full max-w-[1038px] space-y-8 py-6">
      <div className="bg-twitch-purple/15 pointer-events-none absolute top-20 left-1/2 -z-10 h-80 w-[70%] -translate-x-1/2 rounded-full blur-[120px]" />

      <DashboardHeader
        displayName={profile.displayName}
        imageUrl={profile.profileImageUrl}
      />

      {isLoadingStats ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-8 text-sm text-white/45">
          Loading stream data...
        </div>
      ) : isLive ? (
        <>
          <MetricsGrid
            totalMessages={totalMessages}
            uniqueChatters={uniqueChatters}
            messagesPerMinute={messagesPerMinute}
          />

          <div className="grid min-h-116 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,406px)_minmax(0,300px)_minmax(0,300px)] lg:gap-5.5">
            <TopChattersCard chatters={chatters} isLoading={isLoadingStats} />
            <AchievementsCard chatters={chatters} />
            <CurrentStreamCard
              isLive={isLive}
              twitchStreamId={stats?.twitchStreamId}
            />
          </div>
        </>
      ) : (
        <PreviousStreamsList streams={mockPreviousStreams} />
      )}
    </section>
  )
}

export default DashboardClient
