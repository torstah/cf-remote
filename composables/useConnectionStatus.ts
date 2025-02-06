import { ref, onMounted, onUnmounted } from 'vue'

interface HealthResponse {
  status: 'connected' | 'disconnected'
  info?: any
  error?: string
  timestamp?: string
}

export const useConnectionStatus = () => {
  const status = ref<'checking' | 'connected' | 'disconnected'>('checking')
  const info = ref<any>(null)
  const lastCheck = ref<string>('')
  let pollInterval: NodeJS.Timer | null = null

  const checkConnection = async () => {
    status.value = 'checking'
    console.log('Checking connection...')

    try {
      const response = await $fetch<HealthResponse>('/api/health', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })

      console.log('Health check response:', response)

      if (response) {
        status.value = response.status
        info.value = response.info
        lastCheck.value = response.timestamp || new Date().toISOString()
      } else {
        status.value = 'disconnected'
        console.warn('No data received from health check')
      }
    } catch (e) {
      status.value = 'disconnected'
      console.error('Connection check failed:', e)
    }
  }

  const startPolling = () => {
    console.log('Starting connection polling...')
    // Clear any existing interval
    stopPolling()
    // Check immediately
    checkConnection()
    // Then check every 5 seconds
    pollInterval = setInterval(checkConnection, 5000)
  }

  const stopPolling = () => {
    if (pollInterval) {
      clearInterval(pollInterval)
      pollInterval = null
      console.log('Stopped connection polling')
    }
  }

  onMounted(() => {
    startPolling()
  })

  onUnmounted(() => {
    stopPolling()
  })

  return {
    status,
    info,
    lastCheck,
    checkConnection,
    startPolling,
    stopPolling
  }
} 