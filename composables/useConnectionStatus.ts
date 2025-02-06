import { ref, onMounted, onUnmounted } from 'vue'

interface HealthResponse {
  status: 'connected' | 'disconnected'
  info?: any
  error?: string
}

export const useConnectionStatus = () => {
  const status = ref<'checking' | 'connected' | 'disconnected'>('checking')
  const info = ref<any>(null)
  let pollInterval: NodeJS.Timer | null = null

  const checkConnection = async () => {
    try {
      const { data } = await useFetch<HealthResponse>('/api/health', {
        // Prevent caching
        key: Date.now().toString(),
        // Timeout after 5 seconds
        timeout: 5000
      })

      if (data.value) {
        status.value = data.value.status
        info.value = data.value.info
      } else {
        status.value = 'disconnected'
      }
    } catch (e) {
      status.value = 'disconnected'
      console.error('Connection check failed:', e)
    }
  }

  const startPolling = () => {
    // Check immediately
    checkConnection()
    
    // Then check every 5 seconds
    pollInterval = setInterval(checkConnection, 5000)
  }

  const stopPolling = () => {
    if (pollInterval) {
      clearInterval(pollInterval)
      pollInterval = null
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
    checkConnection,
    startPolling,
    stopPolling
  }
} 