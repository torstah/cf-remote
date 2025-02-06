import { gameFunctionGroups, type GameFunction } from '~/config/gameFunctions'

export const useGameFunctions = () => {
  const callFunction = async (functionConfig: GameFunction) => {
    const { data, error } = await useFetch('/api/game', {
      method: 'POST',
      body: {
        objectPath: functionConfig.objectPath,
        functionName: functionConfig.functionName,
        generateTransaction: functionConfig.generateTransaction,
        parameters: functionConfig.parameters
      }
    })

    if (error.value) {
      throw error.value
    }

    return data.value
  }

  return {
    gameFunctionGroups,
    callFunction
  }
} 