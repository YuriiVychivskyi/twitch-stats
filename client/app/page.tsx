import { Button } from '@/components/ui/button'
import { getApiUrl } from '@/lib/api'
import {
  Activity,
  BarChart3,
  MessageCircle,
  Radio,
  Trophy,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { FaTwitch } from 'react-icons/fa'

const productSteps = [
  {
    eyebrow: '01 / Connect',
    title: 'Sign in with Twitch and start tracking your live stream.',
    description:
      'Twitch Stats connects to your Twitch account, listens to live chat activity, and prepares a private dashboard for your stream.',
    icon: Radio,
    imageLabel: 'Generated image placeholder: creator connecting Twitch',
  },
  {
    eyebrow: '02 / Track',
    title: 'Follow messages, active chatters, and chat speed in real time.',
    description:
      'During the stream, every chat message updates your live stats so you can understand how active your community is right now.',
    icon: Activity,
    imageLabel: 'Generated image placeholder: live metrics dashboard',
  },
  {
    eyebrow: '03 / Discover',
    title: 'See who talks the most and what moments created activity.',
    description:
      'Top chatters and achievements help you notice loyal viewers, active moments, and patterns that are easy to miss while streaming.',
    icon: Trophy,
    imageLabel: 'Generated image placeholder: top chatters and achievements',
  },
  {
    eyebrow: '04 / Save',
    title: 'Keep stream stats after the stream ends.',
    description:
      'When the stream goes offline, your final stats are saved so you can compare sessions and build a better picture of your channel.',
    icon: BarChart3,
    imageLabel: 'Generated image placeholder: stream history overview',
  },
]

const heroMetrics = [
  {
    label: 'Total messages',
    value: '15 200',
    icon: MessageCircle,
    color: 'bg-twitch-purple',
  },
  {
    label: 'Unique chatters',
    value: '148',
    icon: Users,
    color: 'bg-emerald-500',
  },
  {
    label: 'Messages/min',
    value: '42',
    icon: Activity,
    color: 'bg-pink-600',
  },
]

export default function HomePage() {
  return (
    <section className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 overflow-hidden px-4">
      <div className="bg-twitch-purple/30 absolute top-[-220px] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full blur-[150px]" />
      <div className="bg-twitch-purple/25 absolute right-[-240px] bottom-[30%] h-[520px] w-[520px] rounded-full blur-[170px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%)]" />

      <div className="relative z-10 mx-auto max-w-[1038px]">
        <div className="flex min-h-screen flex-col items-center justify-center gap-9 py-16 text-center">
          <div className="space-y-5">
            <div className="border-twitch-purple/35 text-twitch-purple mx-auto w-fit rounded-full border bg-white/[0.04] px-4 py-2 text-sm font-medium">
              Live analytics for Twitch creators
            </div>

            <h1 className="text-twitch-purple text-5xl font-semibold md:text-7xl lg:text-8xl">
              Twitch <span className="font-normal text-white">Stats</span>
            </h1>

            <p className="mx-auto max-w-[620px] text-base leading-7 text-white/60 md:text-lg">
              Understand your stream chat while it is happening. Track live
              activity, find your most active viewers, and save each stream as a
              clean stats report.
            </p>
          </div>

          <Link href={getApiUrl('/api/auth/twitch')}>
            <Button
              variant="default"
              className="bg-twitch-purple hover:bg-twitch-purple/90 h-12 w-48 cursor-pointer gap-2 text-[16px] font-medium shadow-[0_0_32px_rgba(145,70,255,0.28)]"
            >
              <FaTwitch />
              Sign in with Twitch
            </Button>
          </Link>

          <div className="grid w-full gap-4 md:grid-cols-3">
            {heroMetrics.map((metric) => {
              const Icon = metric.icon

              return (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.075] to-white/[0.035] p-5 text-left shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
                >
                  <div
                    className={`mb-5 flex size-12 items-center justify-center rounded-xl text-white ${metric.color}`}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="text-sm text-white/45">{metric.label}</div>
                  <div className="mt-2 text-3xl font-semibold text-white">
                    {metric.value}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-24 pb-24">
          {productSteps.map((step, index) => {
            const Icon = step.icon
            const isReversed = index % 2 === 1

            return (
              <section
                key={step.title}
                className="grid items-center gap-8 lg:grid-cols-2"
              >
                <div className={isReversed ? 'lg:order-2' : undefined}>
                  <div className="text-twitch-purple mb-4 text-sm font-semibold">
                    {step.eyebrow}
                  </div>
                  <h2 className="max-w-[460px] text-3xl leading-tight font-semibold text-white md:text-4xl">
                    {step.title}
                  </h2>
                  <p className="mt-5 max-w-[460px] text-base leading-7 text-white/55">
                    {step.description}
                  </p>
                </div>

                <div className={isReversed ? 'lg:order-1' : undefined}>
                  <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                    <div className="bg-twitch-purple/20 absolute -top-24 right-0 size-56 rounded-full blur-[90px]" />
                    <div className="relative flex h-full min-h-[280px] flex-col justify-between rounded-2xl border border-dashed border-white/15 bg-black/25 p-5">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-white">
                        <Icon size={24} />
                      </div>

                      <div>
                        <div className="mb-2 text-sm text-white/35">
                          Image placeholder
                        </div>
                        <div className="max-w-[320px] text-xl leading-snug font-semibold text-white">
                          {step.imageLabel}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}
