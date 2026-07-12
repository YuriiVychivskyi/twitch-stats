import Image from 'next/image'

interface Header {
  img: string | null
  username: string
}

function DashboardHeader({ img, username }: Header) {
  const avatarSrc = img || '/twitch.svg'

  return (
    <header className="flex w-full items-center justify-between py-5">
      <div className="text-white">EN</div>

      <div className="flex items-center gap-3">
        <Image
          src={avatarSrc}
          alt="User image"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-white">{username}</span>
      </div>
    </header>
  )
}

export default DashboardHeader
