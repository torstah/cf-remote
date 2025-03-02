import { gameFunctionGroups, type GameFunction } from '~/config/gameFunctions'

export const useGameFunctions = () => {
  const callFunction = async (functionConfig: GameFunction) => {
    console.log('Calling function with config:', functionConfig)
    
    // Special handling for starting the game
    if (functionConfig.functionName === 'StartGame') {
      try {
        const data = await $fetch('/api/start-game', {
          method: 'POST'
        })
        return data
      } catch (error) {
        throw error
      }
    }
    
    // Regular UE function calls
    try {
      const data = await $fetch('/api/game', {
        method: 'POST',
        body: {
          objectPath: functionConfig.objectPath,
          functionName: functionConfig.functionName,
          generateTransaction: functionConfig.generateTransaction,
          parameters: functionConfig.parameters
        }
      })
      return data
    } catch (error) {
      throw error
    }
  }

  return {
    gameFunctionGroups,
    callFunction
  }
} 