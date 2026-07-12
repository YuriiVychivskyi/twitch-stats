import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center">
      <div className="border-twitch-purple/35 text-twitch-purple mb-5 w-fit rounded-full border bg-white/[0.04] px-4 py-2 text-sm font-medium">
        404
      </div>
      <h1 className="text-4xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 max-w-md text-white/55">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="text-twitch-purple mt-8 font-medium">
        Return home
      </Link>
    </section>
  )
}
