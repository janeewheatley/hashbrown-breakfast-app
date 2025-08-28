'use client'

import { HashbrownProvider } from "@hashbrownai/react"

export default function MyHashbrownProvider({ children }) {
  return (
    <HashbrownProvider url="/api/generate">
      {children}
    </HashbrownProvider>
  )
}