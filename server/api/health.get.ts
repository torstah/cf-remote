import { defineEventHandler, setHeaders } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // Set no-cache headers
  setHeaders(event, {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  })

  try {
    // Log the attempt
    console.log('Checking UE5 server health...')
    
    const response = await $fetch(`${config.ueServer}/remote/info`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
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