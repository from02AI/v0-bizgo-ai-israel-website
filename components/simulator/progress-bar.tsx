interface ProgressBarProps {
  currentTool: 1 | 2 | 3
  toolName: string
}

const toolNames = {
  1: "מאתר הזדמנויות AI",
  2: "נקודת בדיקת בטיחות",
  3: "מחשבון ROI",
}

export function ProgressBar({ currentTool, toolName }: ProgressBarProps) {
  const progress = (currentTool / 3) * 100

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-slate-100 py-4">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-500">כלי {currentTool} מתוך 3</span>
          <span className="text-sm font-bold text-[#0b2e7b]">{toolNames[currentTool]}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-amber-500 to-amber-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
