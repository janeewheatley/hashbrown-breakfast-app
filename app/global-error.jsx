'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
              <h2 className="text-xl font-bold text-red-900 mb-2">
                Critical Error
              </h2>
              <p className="text-gray-700 mb-6">
                A critical error occurred. The application needs to restart.
              </p>
              <button
                onClick={() => reset()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Restart Application
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}