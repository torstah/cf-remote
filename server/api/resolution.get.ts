import { defineEventHandler, createError } from 'h3'

interface UE5Response {
  Location?: {
    X: number
    Y: number
    Z: number
  }
  Resolution?: {
    X: number
    Y: number
  }
  // ... other properties
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const response = await $fetch<UE5Response>(`${config.ueServer}/remote/object/property`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        objectPath: '/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1',
        access: 'READ_ACCESS'
      }
    })
    
    console.log('Full UE5 response:', response)

    // Check if we have resolution info in the response
    if (response.Resolution) {
      return {
        x: response.Resolution.X,
        y: response.Resolution.Y
      }
    }

    // If we can't find resolution info, return default values
    console.warn('Resolution info not found in response, using defaults')
    return {
      x: 1920,
      y: 1080
    }

  } catch (error) {
    console.error('Failed to get resolution:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to get resolution'
    })
  }
}) 