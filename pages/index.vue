<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">UE5 Game Controller</h1>
    
    <div class="space-y-8">
      <div 
        v-for="(group, groupKey) in gameFunctionGroups" 
        :key="groupKey"
        class="border rounded-lg p-4"
      >
        <div class="mb-4">
          <h2 class="text-xl font-bold text-gray-800">{{ group.label }}</h2>
          <p v-if="group.description" class="text-sm text-gray-600">
            {{ group.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="(func, key) in group.functions" 
            :key="key"
            class="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h3 class="font-semibold mb-2">{{ func.label }}</h3>
            <p v-if="func.description" class="text-sm text-gray-600 mb-2">
              {{ func.description }}
            </p>
            <button
              @click="() => callFunction(func)"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Calling...' : 'Execute' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="result" class="mt-6 border rounded-lg p-4">
      <h2 class="text-xl font-semibold mb-2">Last Response:</h2>
      <pre class="bg-gray-100 p-4 rounded">{{ JSON.stringify(result, null, 2) }}</pre>
    </div>

    <div v-if="error" class="mt-4 p-4 bg-red-50 text-red-500 rounded-lg">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGameApi } from '~/services/gameApi';
import { gameFunctionGroups, type GameFunction } from '~/config/gameFunctions';

const { callGameFunction } = useGameApi();
const isLoading = ref(false);
const result = ref(null);
const error = ref('');

const callFunction = async (functionConfig: GameFunction) => {
  isLoading.value = true;
  error.value = '';
  
  try {
    result.value = await callGameFunction(functionConfig);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An error occurred';
  } finally {
    isLoading.value = false;
  }
};
</script> 