import type { ButtonColorType } from './colors'

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
  requiresConfirm?: boolean;
  confirmMessage?: string;
  color?: 'white' | 'gray' | 'black' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
}

export interface FunctionGroup {
  label: string;
  description?: string;
  functions: Record<string, GameFunction>;
  layout?: 'grid' | 'sideBySide';
}

export const gameFunctionGroups: Record<string, FunctionGroup> = {
  production: {
    label: "Main",
    description: "Scenes and main functions",
    functions: {
      idle: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "Idle",
        generateTransaction: true,
        label: "Idle",
        description: "Idle",
        color: 'blue',
      },
      testSound: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "TestSound",
        generateTransaction: true,
        label: "Test Sound",
        description: "Test the sound",
        color: 'yellow',
      },
      start: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "Start",
        generateTransaction: true,
        label: "Start",
        description: "Back to start",
        color: 'green',
      },
      showTechStack: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "ShowTechStack",
        generateTransaction: true,
        label: "Show Tech Stack",
        description: "Show the tech stack",
        color: 'orange',
      },
      hideTechStack: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "HideTechStack",
        generateTransaction: true,
        label: "Hide Tech Stack",
        color: 'orange',
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

  hoverbuttons: {
    label: "Hoverbuttons",
    description: "Remote control the hoverbuttons",
    layout: 'sideBySide',
    functions: {
      leftButton: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "LeftHoverButton",
        generateTransaction: true,
        label: "Left Button",
        description: "Trigger Left Hover Button",
        color: 'blue',
        group: 'row1'
      },
      rightButton: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "RightHoverButton",
        generateTransaction: true,
        label: "Right Button",
        description: "Trigger Right Hover Button",
        color: 'green',
        group: 'row1'
      },
      nextStep: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "NextStep",
        generateTransaction: true,
        label: "Next Step",
        description: "Go to the next step",
        color: 'yellow',
        group: 'row2'
      }
    },
  },
  audioControls: {
    label: "Audio",
    description: "Control the audio",
    functions: {
      muteSpeakers: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "MuteSpeakers",
        generateTransaction: true,
        label: "VO in neck speakers",
        description: "Mutes the speakers",
      },
      unmuteSpeakers: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "UnmuteSpeakers",
        generateTransaction: true,
        label: "VO in front Speakers",
        description: "Unmutes the speakers",
      },
    },
  },

  // Example of another group:
  avatarcontrols: {
    label: "Avatar",
    description: "Control the avatar",
    functions: {
      showAvatar: {
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
      nextStep: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "NextStep",
        generateTransaction: true,
        label: "Next Step",
        description: "Go to the next step",
      },
      setNoAvatarEnabled: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "SetNoAvatarEnabled",
        generateTransaction: true,
        label: "Set No Avatar Enabled",
      },
      setNoAvatarDisabled: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "SetNoAvatarDisabled",
        generateTransaction: true,
        label: "Set No Avatar Disabled",
      },
      enableParallax: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "EnableParallax",
        generateTransaction: true,
        label: "Enable Parallax",
      },
      disableParallax: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "DisableParallax",
        generateTransaction: true,
        label: "Disable Parallax",
      },
    },
  },

 
 
  settings: {
    label: "Settings",
    description: "Game settings and configuration",
    
    functions: {
      setResolution: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "SetResolution",
        generateTransaction: true,
        label: "Set Resolution",
        description: "Change the game resolution",
        requiresInput: true,
        component: "ResolutionSettings",
        color: 'blue',
      },
      setWindowed: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "SetWindowed",
        generateTransaction: true,
        label: "Set Windowed",
        description: "Change the game to windowed mode",
        color: 'purple',
      },
      setFullscreen: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "SetFullscreen",
        generateTransaction: true,
        label: "Set Fullscreen",
        description: "Change the game to fullscreen mode",
        color: 'green',
      },
      setSitting: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "SetSitting",
        generateTransaction: true,
        label: "Set Sitting",
        description: "Change the game to sitting mode",
        color: 'green',
      },
      setStanding: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "SetStanding",
        generateTransaction: true,
        label: "Set Standing",
        description: "Change the game to standing mode",
        color: 'green',
      },
      showSettingsScreen: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "ShowSettingsScreen",
        generateTransaction: true,
        label: "Show Settings Screen",
      },
      hideSettingsScreen: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "HideSettingsScreen",
        generateTransaction: true,
        label: "Hide Settings Screen",
      },
    },
  },
  danger: {
    label: "App",
    description: "App functions",
    layout: 'grid',
    functions: {
      startGame: {
        objectPath: "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "StartGame",
        generateTransaction: false,
        label: "Start Game",
        description: "Start the game process",
        color: 'green'
      },
      quitGame: {
        objectPath:
          "/Game/Maps/_MasterMain._MasterMain:PersistentLevel.BP_RemoteIntermediate_C_1",
        functionName: "QuitGame",
        generateTransaction: true,
        label: "Quit Game",
        description: "Quit the game",
        color: 'red',
        requiresConfirm: true,
        confirmMessage: "Are you sure you want to quit the game?"
      },
    },
  },
};

