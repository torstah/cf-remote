export const buttonColors = {
  primary: 'bg-blue-600 hover:bg-blue-700',
  success: 'bg-green-600 hover:bg-green-700',
  warning: 'bg-yellow-600 hover:bg-yellow-700',
  danger: 'bg-red-600 hover:bg-red-700',
  info: 'bg-purple-600 hover:bg-purple-700'
} as const

export type ButtonColorType = keyof typeof buttonColors 