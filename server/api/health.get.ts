import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  try {
    const response = await $fetch('http://localhost:30010/remote/info', {
      method: 'GET'
    })
    
    // If we get any response from the UE server, consider it connected
    return {
      status: 'connected',
      info: response
    }
  } catch (error) {
    console.error('Health check failed:', error)
    return {
      status: 'disconnected',
      error: error instanceof Error ? error.message : 'Failed to connect to UE5 server'
    }
  }
}) 