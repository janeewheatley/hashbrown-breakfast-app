'use client'

import { HashbrownProvider } from "@hashbrownai/react"

export default function HashbrownBreakfastProvider({ children }) {
  return (
    <HashbrownProvider url="/api/generate">
      {children}
    </HashbrownProvider>
  )
}