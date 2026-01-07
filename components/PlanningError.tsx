'use client'

interface PlanningErrorProps {
  error: string
  onRetry: () => void
  onCancel: () => void
}

export default function PlanningError({ error, onRetry, onCancel }: PlanningErrorProps) {
  return (
    <div className="fixed inset-0 z-50 bg-parchment flex items-center justify-center p-4">
      <div className="bg-cloud border-4 border-border-dark rounded-2xl shadow-lg p-8 max-w-md w-full text-center animate-fadeIn">
        {/* Friendly emoji */}
        <div className="text-6xl mb-4">😅</div>

        {/* Title */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-4">
          Oops! Something went wrong
        </h2>

        {/* Message */}
        <p className="font-body text-lg text-text-secondary mb-6">
          The adventure couldn&apos;t start right now. Let&apos;s try again!
        </p>

        {/* Error details (optional, for debugging) */}
        {error && (
          <details className="mb-6 text-left">
            <summary className="font-body text-sm text-text-secondary cursor-pointer hover:text-text-primary">
              Technical details
            </summary>
            <p className="font-body text-xs text-text-secondary mt-2 bg-white/50 p-3 rounded-lg border-2 border-border-dark break-words">
              {error}
            </p>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Try Again Button */}
          <button
            onClick={onRetry}
            className="font-heading text-xl font-bold px-8 py-4 bg-adventure-blue text-white border-4 border-border-dark rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-1 transition-all duration-200"
          >
            🔄 Try Again
          </button>

          {/* Go Back Button */}
          <button
            onClick={onCancel}
            className="font-heading text-xl font-bold px-8 py-4 bg-white text-text-primary border-4 border-border-dark rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-1 transition-all duration-200"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
