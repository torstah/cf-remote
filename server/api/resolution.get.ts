import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    // Get the game user settings object which contains resolution info
    const response = await $fetch(`${config.ueServer}/remote/object/property`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      query: {
        objectPath: '/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1',
        propertyName: 'CurrentResolution'  // You might need to adjust this property name
      }
    })
    
    console.log('Resolution response:', response)
    return response

  } catch (error) {
    console.error('Failed to get resolution:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to get resolution'
    })
  }
}) 