import { defineEventHandler } from 'h3'
import { spawn } from 'child_process'
import { resolve } from 'path'

export default defineEventHandler(async () => {
  try {
    // Get the full path to start-game.bat relative to the current file
    const batPath = resolve(process.cwd(), 'start-game.bat')
    
    // Spawn the batch file process
    const child = spawn('cmd.exe', ['/c', batPath], {
      detached: true,
      stdio: 'ignore'
    })

    // Unref the child to allow it to run independently
    child.unref()

    return { success: true, message: 'Game started' }
  } catch (error) {
    console.error('Failed to start game:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to start game'
    })
  }
}) 