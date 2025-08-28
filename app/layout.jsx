import { HamburgerMenu } from '@/hb/components/HamburgerMenu'
import '../src/styles/globals.css'

export const metadata = {
  title: 'Hashbrowns Breakfast App',
  description: 'A breakfast-themed app powered by Hashbrown AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
  <body className="min-h-screen">
        <div className="min-h-screen flex flex-col">
          <header className="bg-white-100">
            <div className="container mx-auto px- py-1 flex items-center gap-4">
              <HamburgerMenu />
                <h1 className="text-3xl font-title font-bold text-red-600 text-center flex-1 mt-2">breakfast brAIn</h1>
              <div className="w-10" /> {/* Spacer for centering */}
            </div>
          </header>
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}