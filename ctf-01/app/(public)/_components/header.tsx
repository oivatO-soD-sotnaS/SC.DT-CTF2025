"use client"

import { Button } from "@/components/ui/button"
import { Skull } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      {/* Logo */}
      <Skull className="size-9"/>

      {/* Login Button Group with Arrow */}
      <Link href={'/sign-in'} id="gooey-btn" className="cursor-pointer relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
        <button className="absolute right-0 px-2.5 py-2 rounded-full bg-primary text-black font-normal text-xs transition-all duration-300 hover:bg-primary/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
        <Button className="z-20 cursor-pointer">
          Sign-in
        </Button>
      </Link>
    </header>
  )
}
