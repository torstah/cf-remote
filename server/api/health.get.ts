import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  try {
    // Log the attempt
    console.log('Checking UE5 server health...')
    
    const response = await $fetch('http://localhost:30010/remote/info', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    // Log the successful response
    console.log('UE5 server response:', response)

    // Any response means we're connected
    return {
      status: 'connected',
      info: response,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    // Log the error details
    console.error('Health check failed:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })

    return {
      status: 'disconnected',
      error: error instanceof Error ? error.message : 'Failed to connect to UE5 server',
      timestamp: new Date().toISOString()
    }
  }
}) 