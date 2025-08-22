"use client"

export default function HeroContent() {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg bg-muted/30 rounded-2xl p-6">
      <div className="text-left">

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
          <span className="font-medium italic instrument">Web</span> Hacking
          <br />
          <span className="font-light tracking-tight text-white">01</span>
        </h1>

        {/* Description */}
        <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
          Welcome to the first web hacking challenge! Dive into an exciting journey through puzzles and vulnerabilities as you test your skills in ethical hacking. Enjoy the challenge and uncover the secrets hidden in every line of code.
        </p>
      </div>
    </main>
  )
}
