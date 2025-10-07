'use client'

import { useEffect, useState } from 'react'

export default function AuthCallback() {
  const [status, setStatus] = useState('Authenticating...')
  const [hasToken, setHasToken] = useState(false)
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    // Get access token from URL hash (Supabase redirects with #access_token=...)
    const hash = window.location.hash
    if (hash) {
      const params = new URLSearchParams(hash.substring(1))
      const token = params.get('access_token')

      if (token) {
        setHasToken(true)
        setAccessToken(token)
        setStatus('Authentication successful! Click the button below to open Pi Boost.')
      } else {
        setStatus('No access token found in URL')
      }
    } else {
      setStatus('No authentication data found')
    }
  }, [])

  const openDesktopApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault() // Prevent default anchor behavior

    const hash = window.location.hash
    if (hash) {
      const params = new URLSearchParams(hash.substring(1))
      const accessToken = params.get('access_token')

      if (accessToken) {
        // Trigger deep link to open desktop app
        const deepLink = `piboost://auth?access_token=${encodeURIComponent(accessToken)}`

        setStatus('Opening Pi Boost app...')

        // Use hidden iframe to trigger deep link without navigation
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = deepLink
        document.body.appendChild(iframe)

        // Clean up
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe)
          }
        }, 1000)

        // Update status after a delay
        setTimeout(() => {
          setStatus('If the app didn\'t open, click the button again or continue in browser.')
        }, 2000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          {hasToken ? (
            <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {hasToken ? '✓ Authentication Successful!' : 'Processing...'}
        </h1>

        <p className="text-gray-600 mb-6">
          {status}
        </p>

        {hasToken && (
          <div className="space-y-3">
            <button
              onClick={openDesktopApp}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Open Pi Boost App
            </button>

            <p className="text-sm text-gray-500">
              App didn't open? <a href="/app" className="text-blue-600 hover:underline">Continue in browser</a> or make sure Pi Boost is installed.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
