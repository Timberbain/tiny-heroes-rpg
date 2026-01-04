/**
 * Local Storage utilities for managing adventure session IDs
 * Used in MVP for anonymous session persistence
 */

const SESSION_KEY = 'tiny-heroes-session-id'

/**
 * Save session ID to localStorage
 */
export function saveSessionId(sessionId: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(SESSION_KEY, sessionId)
    } catch (error) {
      console.error('Failed to save session ID to localStorage:', error)
    }
  }
}

/**
 * Get session ID from localStorage
 */
export function getSessionId(): string | null {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem(SESSION_KEY)
    } catch (error) {
      console.error('Failed to get session ID from localStorage:', error)
      return null
    }
  }
  return null
}

/**
 * Clear session ID from localStorage
 */
export function clearSessionId(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch (error) {
      console.error('Failed to clear session ID from localStorage:', error)
    }
  }
}

/**
 * Check if there's an active session
 */
export function hasActiveSession(): boolean {
  return getSessionId() !== null
}
