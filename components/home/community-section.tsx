"use client"

import React, { useState } from "react"
import * as Lucide from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const channels = [
  {
    icon: Lucide.MessageCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "ערוץ WhatsApp שקט",
    description: "להישאר מעודכנים בכל מה שקשור ל-AI לעסקים קטנים",
    cta: "הצטרפו ל־WhatsApp ←",
    ctaBg: "bg-green-600 hover:bg-green-700",
    // Community invite link (from admin-provided image)
    href: "https://chat.whatsapp.com/JLuDnhyUykg0sy0zOW8fM8",
  },
    {
    icon: Lucide.User,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "קהילת Facebook",
    description: "דיונים מעמיקים, שיתוף ניסיון, נטוורקינג",
    cta: "הצטרפו לפייסבוק ←",
    ctaBg: "bg-blue-600 hover:bg-blue-700",
    href: "https://www.facebook.com/groups/3741611762641473",
  },
  {
    icon: Lucide.Mail,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "ניוזלטר",
    description: "מידע שיעזור לך להעמיק ב-AI ישירות לתיבת המייל",
    cta: "הירשמו לניוזלטר ←",
    ctaBg: "bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
    href: "/newsletter",
  },

]

export function CommunitySection() {
  const [joinCommunity, setJoinCommunity] = useState(true)
  return (
    <section id="community" className="relative py-20 md:py-24 overflow-hidden bg-linear-to-b from-neutral-100 to-neutral-80">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
    
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0b2e7b] mb-4">
מוכנים להתקדם עם AI?
          </h2>
          <p className="text-xl sm:text-3xl text-gray-600 max-w-2xl mx-auto">
        הצטרפו לקהילת BizGoAI במגוון ערוצים
          
          </p>
        </div>

        {/* Main Community Channels - Horizontal Layout */}
        <div className="space-y-6 mb-12">
          {channels.map((channel, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/50"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Icon */}
                <div className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 ${channel.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <channel.icon className={`w-10 h-10 sm:w-12 sm:h-12 ${channel.iconColor} stroke-[2.5]`} />
                </div>

                {/* Content */}
                <div className="flex-1 text-center sm:text-right">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0b2e7b] mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">
                    {channel.description}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="shrink-0 sm:self-center">
                  <Button
                    asChild
                    size="lg"
                    className={`${channel.ctaBg} text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 px-8 py-6 text-base sm:text-lg whitespace-nowrap`}
                  >
                      {channel.href && String(channel.href).startsWith('/') ? (
                        <Link href={String(channel.href)}>{channel.cta}</Link>
                      ) : (
                        <a
                          href={channel.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            if (channel.href?.startsWith && channel.href.startsWith("https://chat.whatsapp.com")) {
                              e.preventDefault()
                              window.open(channel.href, '_blank', 'noopener,noreferrer')
                            }
                          }}
                        >
                          {channel.cta}
                        </a>
                      )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
            
