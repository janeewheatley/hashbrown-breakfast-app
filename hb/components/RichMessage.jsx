export const RichMessage = ({ message, onRetry, isLast }) => {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-amber-600 text-white px-4 py-2 rounded-lg rounded-br-none max-w-xs lg:max-w-md">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    )
  }

  if (message.role === 'assistant') {
    return (
      <div className="flex justify-start mb-4">
        <div className="bg-white border border-amber-200 px-4 py-2 rounded-lg rounded-bl-none max-w-xs lg:max-w-md shadow-sm">
          {message.content && (
            <p className="text-sm text-amber-900 mb-2">{message.content}</p>
          )}
          
          {/* Render UI components if present */}
          {message.ui && (
            <div className="mt-2">
              {message.ui}
            </div>
          )}

          {/* Tool calls display */}
          {message.toolCalls && message.toolCalls.length > 0 && (
            <div className="mt-2 text-xs text-amber-600">
              {message.toolCalls.map((toolCall, index) => (
                <div key={index} className="bg-amber-50 px-2 py-1 rounded text-amber-700">
                  Using tool: {toolCall.name}
                </div>
              ))}
            </div>
          )}

          {/* Error handling */}
          {message.error && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
              Error: {message.error}
              {isLast && onRetry && (
                <button 
                  onClick={onRetry}
                  className="ml-2 text-red-700 hover:text-red-900 underline"
                >
                  Retry
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}