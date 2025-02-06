export interface GameFunction {
  objectPath: string;
  functionName: string;
  generateTransaction: boolean;
  parameters?: Record<string, any>;
  label: string;
  description?: string;
}

export interface FunctionGroup {
  label: string;
  description?: string;
  functions: Record<string, GameFunction>;
}

export const gameFunctionGroups: Record<string, FunctionGroup> = {
  production: {
    label: "Production Controls",
    description: "Control factory and production systems",
    functions: {
      factory: {
        objectPath: "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "Factory",
        generateTransaction: true,
        label: "Call Factory",
        description: "Triggers the factory function in the game"
      }
    }
  },
  // Example of another group:
  combat: {
    label: "Combat System",
    description: "Control enemies and combat scenarios",
    functions: {
      spawnEnemy: {
        objectPath: "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "SpawnEnemy",
        generateTransaction: true,
        label: "Spawn Enemy",
        description: "Spawns a new enemy in the game"
      }
    }
  }
}; 