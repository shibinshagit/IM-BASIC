import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

import { StoreProvider } from "@/lib/store/provider"
import { SettingsProvider } from "@/lib/contexts/settings-context"
import { AuthProvider } from "@/lib/contexts/auth-context"
import BottomTabs from "@/components/ui/bottom-tabs"
import { ShopProvider, useShop } from "@/lib/contexts/shop-context"
import ShopToggle from "@/components/ui/shop-toggle"
import UserNavVisibility from "@/components/ui/user-nav-visibility"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "MOTOCLUB KOTTACKAL",
  description: "Your trusted source for SPARE PARTS AND SERVICE.",
    generator: 'Shah'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {/* AuthProvider must wrap the entire app so that useAuth is always in context */}
        <AuthProvider>
          <SettingsProvider>
            <StoreProvider>
              <ShopProvider>
                <UserNavVisibility />
                <div className="pb-16 lg:pb-0">
                  {children}
                </div>
              </ShopProvider>
            </StoreProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
