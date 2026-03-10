import type { Metadata } from "next";
import "./globals.css";
import { ThemeInitializer } from "@/inits/theme-initializer";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import PixelTrail from "@/components/pixel-trail";
// import MouseMoveEffect from "@/components/move-mosue-effect";

export const metadata: Metadata = {
  metadataBase: new URL("https://poiro.com"),
  title: "Poiro",
  description: "Poiro",
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/dnjcut34n/image/upload/v1752644583/poiro/poiro-o-logo-removebg-preview_f0uecw.png",
        sizes: "196x196",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "https://res.cloudinary.com/dnjcut34n/image/upload/v1752644583/poiro/poiro-o-logo-removebg-preview_f0uecw.png",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
    >
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ThemeInitializer />
        {/* <MouseMoveEffect /> */}
        <PixelTrail />
        {/* <BlocksOverlay /> */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
