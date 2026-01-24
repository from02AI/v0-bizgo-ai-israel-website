import Link from "next/link"

interface ProgressBarProps {
  currentTool: 1 | 2 | 3
  toolName: string
}

const toolNames = {
  1: "התאמת משימות",
  2: "בטיחות",
  3: "חסכון",
}

export function ProgressBar({ currentTool, toolName }: ProgressBarProps) {
  const progress = (currentTool / 3) * 100

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-slate-100 py-4">
      {/* Logo pinned to far left of the viewport */}
      <Link href="/" className="absolute left-2 sm:left-4 top-4 sm:top-2 z-50">
          <img
            src="/images/BizGoAI-simulator-logo.png"
            alt="BizGoAI logo"
            className="h-10 sm:h-14 md:h-10 lg:h-14 object-contain"
          />
      </Link>

      <div className="max-w-3xl mx-auto px-4 pl-16 sm:pl-20 md:pl-4">
        <div className="flex items-center justify-center mb-2">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-medium text-slate-500">סימולטור AI לעסקים קטנים - כלי {currentTool} - {toolNames[currentTool]}</div>
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
