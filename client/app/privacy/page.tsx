import Link from 'next/link'

const collectedData = [
  'Twitch account id, login, display name, profile image, and email address when you sign in.',
  'Twitch access and refresh tokens required to connect your account and keep the integration working.',
  'Live stream identifiers and stream metadata received from Twitch events.',
  'Chat activity statistics, including total messages, unique chatters, chatter ids, display names, and message counts.',
]

const usage = [
  'To create and display your Twitch Stats dashboard.',
  'To track live chat activity while your stream is online.',
  'To save final stream statistics after a stream ends.',
  'To improve reliability, debug issues, and protect the service from abuse.',
]

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-[860px] py-16">
      <Link
        href="/"
        className="text-twitch-purple mb-10 inline-block text-sm font-medium"
      >
        Back to home
      </Link>

      <div className="mb-12">
        <div className="border-twitch-purple/35 text-twitch-purple mb-5 w-fit rounded-full border bg-white/[0.04] px-4 py-2 text-sm font-medium">
          Privacy Policy
        </div>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">
          Privacy Policy & Terms
        </h1>
        <p className="mt-5 text-base leading-7 text-white/55">
          Twitch Stats is a creator analytics tool that helps streamers
          understand live chat activity. This page explains what data is used,
          why it is used, and what you agree to when using the product.
        </p>
        <p className="mt-3 text-sm text-white/35">
          Last updated: June 15, 2026
        </p>
      </div>

      <div className="space-y-8">
        <PolicySection title="Data We Collect">
          <ul className="space-y-3">
            {collectedData.map((item) => (
              <li key={item} className="text-white/55">
                {item}
              </li>
            ))}
          </ul>
        </PolicySection>

        <PolicySection title="How We Use Data">
          <ul className="space-y-3">
            {usage.map((item) => (
              <li key={item} className="text-white/55">
                {item}
              </li>
            ))}
          </ul>
        </PolicySection>

        <PolicySection title="Twitch Integration">
          <p>
            By signing in with Twitch, you allow Twitch Stats to access only the
            Twitch permissions shown during authorization. The app uses this
            access to identify your account, subscribe to stream events, and
            process chat-related statistics for your dashboard.
          </p>
        </PolicySection>

        <PolicySection title="What We Do Not Do">
          <p>
            Twitch Stats does not sell your personal data, does not post
            messages in your chat on your behalf unless a feature clearly
            requires it, and does not share your private account data with other
            creators.
          </p>
        </PolicySection>

        <PolicySection title="Data Storage">
          <p>
            Live stream stats may be stored temporarily during an active stream.
            Final stream stats may be saved so you can review stream history.
            Access tokens and refresh tokens are stored only to keep Twitch
            integration working.
          </p>
        </PolicySection>

        <PolicySection title="Your Choices">
          <p>
            You can stop using Twitch Stats at any time. You can also revoke
            Twitch access from your Twitch account settings. If you want your
            stored data removed, contact the developer using the details below.
          </p>
        </PolicySection>

        <PolicySection title="Terms of Use">
          <p>
            Twitch Stats is provided as an MVP analytics tool. You agree to use
            it responsibly, not abuse the service, and understand that live
            statistics may be delayed, incomplete, or unavailable during
            technical issues.
          </p>
        </PolicySection>

        <PolicySection title="Contact">
          <div className="space-y-2">
            <p>
              Developer: <span className="text-white">livay1337</span>
            </p>
            <p>
              Email:{' '}
              <a
                href="mailto:yuravychivskii@gmail.com"
                className="text-twitch-purple underline"
              >
                yuravychivskii@gmail.com
              </a>
            </p>
            <p>
              LinkedIn:{' '}
              <span className="text-white/35">add your LinkedIn link here</span>
            </p>
            <p>
              Discord:{' '}
              <span className="text-white/35">
                add your Discord username here
              </span>
            </p>
          </div>
        </PolicySection>
      </div>
    </section>
  )
}

function PolicySection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.075] to-white/[0.035] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
      <h2 className="mb-4 text-2xl font-semibold text-white">{title}</h2>
      <div className="leading-7 text-white/55">{children}</div>
    </section>
  )
}
