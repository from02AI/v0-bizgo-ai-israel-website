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
    <div dir="ltr" className="sticky top-0 z-50 bg-white border-b border-slate-100 py-2 sm:py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-2 min-h-[32px]">
          {/* Logo on the left */}
          <Link href="/" className="text-sm sm:text-base md:text-lg font-bold text-[#0b2e7b] shrink-0 z-10">
            BizGoAI
          </Link>

          {/* Centered progress/tool label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-[10px] sm:text-xs md:text-sm font-medium text-slate-500 truncate text-center">כלי {currentTool} - {toolNames[currentTool]}</div>
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-400 rounded-full transition-all duration-500 ml-auto"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
