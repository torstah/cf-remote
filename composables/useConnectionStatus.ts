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
      const { data } = await useFetch<HealthResponse>('/api/health', {
        // Prevent caching
        key: Date.now().toString(),
        // Timeout after 5 seconds
        timeout: 5000
      })

      console.log('Health check response:', data.value)

      if (data.value) {
        status.value = data.value.status
        info.value = data.value.info
        lastCheck.value = data.value.timestamp || new Date().toISOString()
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