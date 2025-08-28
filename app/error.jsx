'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-8 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-amber-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-amber-700 mb-6">
            We encountered an error while preparing your breakfast experience.
          </p>
          <button
            onClick={() => reset()}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}