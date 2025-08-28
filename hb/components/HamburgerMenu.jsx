'use client'
import { useState } from 'react'
import Link from 'next/link'

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-amber-800 hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-md"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-amber-900">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-amber-600 hover:text-amber-800 rounded-md"
            >
              <span className="sr-only">Close menu</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-amber-800 hover:bg-amber-50 hover:text-amber-900 rounded-lg transition-colors"
            >
              🍳 Home
            </Link>
            <Link
              href="/saved-recipes"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-amber-800 hover:bg-amber-50 hover:text-amber-900 rounded-lg transition-colors"
            >
              ❤️ Saved Recipes
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}