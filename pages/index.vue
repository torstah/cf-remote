<template>
 
    <div class="min-h-screen bg-black text-gray-100 p-4">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-100">CF Remote</h1>
          <div class="flex items-center gap-2">
            <div 
              class="w-3 h-3 rounded-full"
              :class="{
                'bg-green-500': status === 'connected',
                'bg-red-500': status === 'disconnected',
                'bg-yellow-500 animate-pulse': status === 'checking'
              }"
            />
            <span class="text-sm">
              {{ status === 'connected' ? 'Connected' : status === 'disconnected' ? 'Disconnected' : 'Checking...' }}
            </span>
          </div>
        </div>
        
        <div class="space-y-4">
          <div 
            v-for="(group, groupKey) in gameFunctionGroups" 
            :key="groupKey"
            class="border border-gray-700 p-4 bg-gray-900"
          >
            <div class="mb-4">
              <h2 class="text-xl font-bold text-gray-100">{{ group.label }}</h2>
              <p v-if="group.description" class="text-sm text-gray-400">
                {{ group.description }}
              </p>
            </div>

            <div :class="{
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4': !group.layout || group.layout === 'grid',
              'flex flex-wrap gap-4': group.layout === 'sideBySide'
            }">
              <div 
                v-for="(func, key) in group.functions" 
                :key="key"
                :class="{
                  'pb-4': !group.layout || group.layout === 'grid',
                  'flex-1': group.layout === 'sideBySide'
                }"
              >
                <UButton
                  @click="() => handleFunction(func)"
                  :color="func.color || 'gray'"
                  block
                  class=" !rounded-none"
                >
                  {{ func.label }}
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <div v-if="result" class="mt-6 border border-gray-700 rounded-lg p-4 bg-gray-800">
          <h2 class="text-xl font-semibold mb-2 text-gray-200">Last Response:</h2>
          <pre class="bg-gray-700 p-4 rounded text-gray-300 overflow-x-auto">{{ JSON.stringify(result, null, 2) }}</pre>
        </div>

        <div class="mt-8">
          <UModal v-model="showResolutionModal">
            <ResolutionSettings 
              @resolution-set="(config) => {
                handleFunctionCall(config);
                showResolutionModal.value = false;
              }" 
            />
          </UModal>
        </div>
      </div>
    </div>
 
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { GameFunction } from '~/config/gameFunctions';
import { buttonColors } from '~/config/colors'

const result = ref(null);
const toast = useToast()
const { status, info } = useConnectionStatus()
const { gameFunctionGroups, callFunction } = useGameFunctions()

const showResolutionModal = ref(false)
const selectedFunction = ref<GameFunction | null>(null)

const handleFunction = (func: GameFunction) => {
  if (func.requiresInput) {
    selectedFunction.value = func
    showResolutionModal.value = true
  } else {
    handleFunctionCall(func)
  }
}

const handleFunctionCall = async (functionConfig: GameFunction) => {
  try {
    result.value = await callFunction(functionConfig)
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An error occurred';
    toast.add({
      title: 'Error',
      description: errorMessage,
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 1000
    })
  }
}
</script> 