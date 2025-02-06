import { defineEventHandler, readBody } from 'h3'
import { createError } from 'h3'

interface GameFunctionCall {
  objectPath: string;
  functionName: string;
  generateTransaction: boolean;
  parameters?: Record<string, any>;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {
    const response = await $fetch('http://192.168.0.97:30010/remote/object/call', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        objectPath: body.objectPath,
        functionName: body.functionName,
        generateTransaction: body.generateTransaction,
        parameters: body.parameters
      })
    })

    return response
  } catch (error) {
    console.error('Error calling game function:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to call game function'
    })
  }
}) 