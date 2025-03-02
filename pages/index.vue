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
              'flex flex-col': group.layout === 'sideBySide'
            }">
              <!-- Group buttons by their group property -->
              <template v-if="group.layout === 'sideBySide'">
                <!-- First row - side by side buttons -->
                <div class="flex gap-4">
                  <div v-for="(func, key) in Object.values(group.functions).filter(f => f.group === 'row1')" 
                    :key="key"
                    class="flex-1"
                  >
                    <UButton
                      @click="() => handleFunction(func)"
                      :color="func.color || 'gray'"
                      variant="solid"
                      :class="[
                        '!rounded-none transition-opacity duration-200',
                        recentlyClicked[func.functionName] ? 'opacity-50' : 'opacity-100'
                      ]"
                      block
                    >
                      {{ func.label }}
                    </UButton>
                  </div>
                </div>
                <!-- Second row - full width buttons with larger gap -->
                <div class="mt-8">
                  <div v-for="(func, key) in Object.values(group.functions).filter(f => f.group === 'row2')" 
                    :key="key"
                  >
                    <UButton
                      @click="() => handleFunction(func)"
                      :color="func.color || 'gray'"
                      variant="solid"
                      :class="[
                        '!rounded-none transition-opacity duration-200',
                        recentlyClicked[func.functionName] ? 'opacity-50' : 'opacity-100'
                      ]"
                      block
                    >
                      {{ func.label }}
                    </UButton>
                  </div>
                </div>
              </template>
              <!-- Default layout for other groups -->
              <template v-else>
                <div 
                  v-for="(func, key) in group.functions" 
                  :key="key"
                  :class="{
                    'pb-4': !group.layout || group.layout === 'grid'
                  }"
                >
                  <UButton
                    @click="() => handleFunction(func)"
                    :color="func.color || 'gray'"
                    variant="solid"
                    :class="[
                      '!rounded-none transition-opacity duration-200',
                      recentlyClicked[func.functionName] ? 'opacity-50' : 'opacity-100'
                    ]"
                    block
                  >
                    {{ func.label }}
                  </UButton>
                </div>
              </template>
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

          <!-- Confirmation Modal -->
          <UModal v-model="showConfirmModal">
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-4">Confirm Action</h3>
              <p class="mb-6">{{ pendingFunction?.confirmMessage }}</p>
              <div class="flex justify-end gap-4">
                <UButton
                  color="gray"
                  variant="outline"
                  @click="showConfirmModal = false"
                >
                  Cancel
                </UButton>
                <UButton
                  color="red"
                  @click="handleConfirmed"
                >
                  Confirm
                </UButton>
              </div>
            </div>
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
const showConfirmModal = ref(false)
const selectedFunction = ref<GameFunction | null>(null)
const pendingFunction = ref<GameFunction | null>(null)
const recentlyClicked = ref<Record<string, boolean>>({})

const handleFunction = async (func: GameFunction) => {
  // Set clicked state and schedule reset immediately
  recentlyClicked.value = {
    ...recentlyClicked.value,
    [func.functionName]: true
  }
  
  // Always reset opacity after short delay
  setTimeout(() => {
    recentlyClicked.value = {
      ...recentlyClicked.value,
      [func.functionName]: false
    }
  }, 200)

  try {
    if (func.requiresConfirm) {
      pendingFunction.value = func
      showConfirmModal.value = true
      return
    }

    if (func.requiresInput) {
      selectedFunction.value = func
      showResolutionModal.value = true
      return
    }

    const response = await callFunction(func)
    result.value = response
  } catch (error) {
    console.error('Function call error:', error)
    toast.add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Failed to execute function',
      color: 'red'
    })
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

const handleConfirmed = async () => {
  if (!pendingFunction.value) return
  
  try {
    const response = await callFunction(pendingFunction.value)
    result.value = response
  } catch (error) {
    console.error('Function call error:', error)
    toast.add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Failed to execute function',
      color: 'red'
    })
  } finally {
    pendingFunction.value = null
    showConfirmModal.value = false
  }
}
</script> 