import DashboardClient from '@/features/dashboard/DashboardClient'
import { getApiUrl } from '@/lib/api'

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ streamerTwitchId: string }>
}) {
  const { streamerTwitchId } = await searchParams
  if (!streamerTwitchId) throw new Error('Twitch id not found!')

  const response = await fetch(getApiUrl(`/api/streamers/${streamerTwitchId}`))
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }

  const streamerProfile = await response.json()

  return <DashboardClient profile={streamerProfile} />
}
