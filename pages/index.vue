<template>
  <NuxtLayout name="default">
    <div class="min-h-screen bg-gray-900 dark:bg-gray-900 text-gray-100 p-4">
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold mb-6 text-gray-100">UE5 Game Controller</h1>
        
        <div class="space-y-8">
          <div 
            v-for="(group, groupKey) in gameFunctionGroups" 
            :key="groupKey"
            class="border border-gray-700 rounded-lg p-4 bg-gray-800"
          >
            <div class="mb-4">
              <h2 class="text-xl font-bold text-gray-100">{{ group.label }}</h2>
              <p v-if="group.description" class="text-sm text-gray-400">
                {{ group.description }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="(func, key) in group.functions" 
                :key="key"
                class="border-b border-gray-700 last:border-b-0 pb-4 last:pb-0"
              >
                <button
                  @click="() => callFunction(func)"
                  class="bg-gray-600 hover:bg-gray-700 text-gray-100 font-bold py-2 px-4 rounded w-full transition-colors duration-200 mb-2"
                  :disabled="isLoading"
                  :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
                >
                  {{ isLoading ? 'Calling...' : func.label }}
                </button>
                <!-- <p v-if="func.description" class="text-sm text-gray-400">
                  {{ func.description }}
                </p> -->
              </div>
            </div>
          </div>
        </div>

        <div v-if="result" class="mt-6 border border-gray-700 rounded-lg p-4 bg-gray-800">
          <h2 class="text-xl font-semibold mb-2 text-gray-200">Last Response:</h2>
          <pre class="bg-gray-700 p-4 rounded text-gray-300 overflow-x-auto">{{ JSON.stringify(result, null, 2) }}</pre>
        </div>

       
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGameApi } from '~/services/gameApi';
import { gameFunctionGroups, type GameFunction } from '~/config/gameFunctions';

const { callGameFunction } = useGameApi();
const isLoading = ref(false);
const result = ref(null);
const error = ref('');
const toast = useToast()  // Create toast instance

const callFunction = async (functionConfig: GameFunction) => {
  isLoading.value = true;
  error.value = '';
  
  try {
    result.value = await callGameFunction(functionConfig);
    // toast.add({
    //   title: 'Success',
    //   description: `${functionConfig.label} executed successfully`,
    //   icon: 'i-heroicons-check-circle',
    //   color: 'green',
    //   timeout: 2000
    // })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An error occurred';
    error.value = errorMessage;
    toast.add({
      title: 'Error',
      description: errorMessage,
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 1000
    })
  } finally {
    isLoading.value = false;
  }
};
</script> 