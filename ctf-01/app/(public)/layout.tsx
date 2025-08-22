import Dither from "@/components/react-bits/dither";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
        <div className="absolute top-0 bottom-0 h-screen w-screen -z-10">
            <Dither
              waveColor={[0.5, 0.5, 0.5]}
              disableAnimation={false}
              enableMouseInteraction={true}
              mouseRadius={0.3}
              colorNum={4}
              waveAmplitude={0.3}
              waveFrequency={3}
              waveSpeed={0.05}
            />
        </div>
        {children}
    </div>
  );
}
