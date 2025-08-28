import '../src/styles/globals.css'

export const metadata = {
  title: 'Hashbrowns Breakfast App',
  description: 'A breakfast-themed app powered by Hashbrown AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-amber-50 text-amber-900">
        <div className="min-h-screen flex flex-col">
          <header className="bg-amber-100 border-b border-amber-200">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-amber-800">🍳 Hashbrowns Breakfast App</h1>
            </div>
          </header>
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-amber-100 border-t border-amber-200 py-4">
            <div className="container mx-auto px-4 text-center text-amber-600">
              <p>Powered by Hashbrown AI</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}