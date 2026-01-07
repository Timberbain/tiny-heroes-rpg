'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSessionId } from '@/lib/session-storage'

export default function PlayRedirect() {
  const router = useRouter()

  useEffect(() => {
    const sessionId = getSessionId()
    if (sessionId) {
      router.replace(`/play/${sessionId}`)
    } else {
      router.replace('/select-character')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center">
      <div className="font-heading text-2xl text-text-primary animate-pulse">
        Loading...
      </div>
    </div>
  )
}
