export interface ChatterStats {
  chatterTwitchId: string
  displayName?: string
  login?: string
  profileImageUrl?: string | null
  messagesCount: number
}

export interface LiveStreamStats {
  twitchStreamId: string
  totalMessages: number
  chatters: ChatterStats[]
}

export interface StreamHistoryItem {
  twitchStreamId: string
  title: string
  category: string
  startedAt: string
  duration: string
  totalMessages: number
  uniqueChatters: number
}
