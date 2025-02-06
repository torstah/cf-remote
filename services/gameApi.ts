import type { GameFunction } from '~/config/gameFunctions';

export const useGameApi = () => {
  const callGameFunction = async (functionConfig: GameFunction) => {
    try {
      const response = await fetch('/api/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          objectPath: functionConfig.objectPath,
          functionName: functionConfig.functionName,
          generateTransaction: functionConfig.generateTransaction,
          parameters: functionConfig.parameters
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calling game function:', error);
      throw error;
    }
  };

  return {
    callGameFunction,
  };
}; 