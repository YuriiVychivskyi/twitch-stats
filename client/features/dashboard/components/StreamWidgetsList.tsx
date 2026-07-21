function StreamWidgetsList() {
  return (
    <div className="space-y-3">
      <h3 className="text-2xl leading-none font-semibold text-white">
        Widgets
      </h3>

      <div className="flex flex-col items-start gap-3 text-base">
        <a href="#" className="text-twitch-purple underline">
          Achievements
        </a>
        <a href="#" className="text-twitch-purple underline">
          Average chatters
        </a>
      </div>
    </div>
  )
}

export default StreamWidgetsList
