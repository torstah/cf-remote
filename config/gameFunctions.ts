export interface GameFunction {
  objectPath: string;
  functionName: string;
  generateTransaction: boolean;
  parameters?: Record<string, any>;
  label: string;
  description?: string;
  group?: string;
  key?: string;
  requiresInput?: boolean;
  component?: string;
}

export interface FunctionGroup {
  label: string;
  description?: string;
  functions: Record<string, GameFunction>;
}

export const gameFunctionGroups: Record<string, FunctionGroup> = {
  production: {
    label: "Main",
    description: "Scenes and main functions",
    functions: {
      start: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "Start",
        generateTransaction: true,
        label: "Start",
        description: "Back to start",
      },
      nexus: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "Nexus",
        generateTransaction: true,
        label: "Nexus",
        description: "To the menu",
      },
      healthcare: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "Healthcare",
        generateTransaction: true,
        label: "Healthcare",
        description: "To the healthcare scene",
      },
      citizen: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "Citizen",
        generateTransaction: true,
        label: "Citizen",
        description: "To the citizen scene",
      },
      farm: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "Farm",
        generateTransaction: true,
        label: "Farm",
        description: "To the farm scene",
      },
      factory: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "Factory",
        generateTransaction: true,
        label: "Factory",
        description: "To the factory scene",
      },
    },
  },

  // Example of another group:
  avatarcontrols: {
    label: "Avatar",
    description: "Control the avatar",
    functions: {
      spawnEnemy: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "ShowAvatar",
        generateTransaction: true,
        label: "Show Avatar",
        description: "Shows the avatar",
      },
      hideAvatar: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "HideAvatar",
        generateTransaction: true,
        label: "Hide Avatar",
        description: "Hides the avatar",
      },
    },
  },

  audioControls: {
    label: "Audio",
    description: "Control the audio",
    functions: {
      spawnEnemy: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "MuteSpeakers",
        generateTransaction: true,
        label: "Mute Speakers",
        description: "Mutes the speakers",
      },
      unmuteSpeakers: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "UnmuteSpeakers",
        generateTransaction: true,
        label: "Unmute Speakers",
        description: "Unmutes the speakers",
      },
    },
  },
  debug: {
    label: "Debug",
    description: "Debugging purposes",
    functions: {
      spawnEnemy: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "ShowAvatar",
        generateTransaction: true,
        label: "Show Avatar",
        description: "Shows the avatar",
      },
      hideAvatar: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "HideAvatar",
        generateTransaction: true,
        label: "Hide Avatar",
        description: "Hides the avatar",
      },
    },
  },
  settings: {
    label: "Settings",
    description: "Game settings and configuration",
    functions: {
      setResolution: {
        objectPath: "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "SetResolution",
        generateTransaction: true,
        label: "Set Resolution",
        description: "Change the game resolution",
        requiresInput: true,
        component: 'ResolutionSettings'
      }
    }
  }
};
