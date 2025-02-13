import { gameFunctionGroups, type GameFunction } from '~/config/gameFunctions'

export const useGameFunctions = () => {
  const callFunction = async (functionConfig: GameFunction) => {
    console.log('Calling function with config:', functionConfig)
    
    try {
      const data = await $fetch('/api/game', {
        method: 'POST',
        body: {
          objectPath: functionConfig.objectPath,
          functionName: functionConfig.functionName,
          generateTransaction: functionConfig.generateTransaction,
          parameters: functionConfig.parameters // Use parameters directly
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