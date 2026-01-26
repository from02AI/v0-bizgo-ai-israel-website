"use client"

import React, { useState } from "react"
import * as Lucide from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const channels = [
  {
    icon: Lucide.MessageCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "קבוצת WhatsApp",
    description: "דיונים יומיים, שאלות ותשובות, המלצות על כלים",
    cta: "הצטרפו ל־WhatsApp ←",
    ctaBg: "bg-green-600 hover:bg-green-700",
    // Community invite link (from admin-provided image)
    href: "https://chat.whatsapp.com/JLuDnhyUykg0sy0zOW8fM8",
  },
  {
    icon: Lucide.Mail,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "ניוזלטר שבועי",
    description: "תובנות AI, מחקרים חדשים, ההמלצות המובילות",
    cta: "הירשמו לניוזלטר ←",
    ctaBg: "bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
    href: "#",
  },
  {
    icon: Lucide.User,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "קבוצת Facebook",
    description: "דיונים מעמיקים, שיתוף ניסיון, נטוורקינג",
    cta: "הצטרפו לפייסבוק ←",
    ctaBg: "bg-blue-600 hover:bg-blue-700",
    href: "https://www.facebook.com/groups/3741611762641473",
  },
]

export function CommunitySection() {
  const [joinCommunity, setJoinCommunity] = useState(true)
  return (
    <section id="community" className="bg-purple-50 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-600 drop-shadow-sm mb-4">
            הצטרפו לקהילה
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600">
            לומדים מניסיון אמיתי של בעלי עסקים בישראל. משתפים, שואלים, צומחים יחד.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {channels.map((channel, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-14 h-14 ${channel.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <channel.icon className={`w-7 h-7 ${channel.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-[#0b2e7b] mb-2">{channel.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{channel.description}</p>
              <Button asChild className={`w-full ${channel.ctaBg} text-white font-bold rounded-xl`}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    // For WhatsApp community invite, open in a new tab without navigating away
                    if (channel.href?.startsWith && channel.href.startsWith("https://chat.whatsapp.com")) {
                      e.preventDefault()
                      window.open(channel.href, '_blank', 'noopener,noreferrer')
                    }
                  }}
                >
                  {channel.cta}
                </a>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-3">
            <Checkbox
              id="homepage-join"
              checked={joinCommunity}
              onCheckedChange={(checked: boolean | 'indeterminate') => setJoinCommunity(checked === true)}
            />
            <label htmlFor="homepage-join" className="text-slate-700 cursor-pointer">
              אני מעוניין/ת להצטרף לקהילת BizGoAI ולקבל עדכונים ותוכן
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}
