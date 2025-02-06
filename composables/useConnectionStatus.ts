export const useConnectionStatus = () => {
  const status = ref('checking')
  const info = ref(null)

  const checkConnection = async () => {
    try {
      const { data } = await useFetch('/api/health')
      status.value = data.value?.status || 'disconnected'
      info.value = data.value?.info
    } catch (e) {
      status.value = 'disconnected'
    }
  }

  // Check connection on mount and every 30 seconds
  onMounted(() => {
    checkConnection()
    const interval = setInterval(checkConnection, 30000)
    onUnmounted(() => clearInterval(interval))
  })

  return {
    status,
    info,
    checkConnection
  }
} 