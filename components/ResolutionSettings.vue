<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold">Resolution Settings</h2>
    
    <UForm :validate="validate" @submit="handleSubmit">
      <div class="grid grid-cols-2 gap-4">
        <UFormGroup label="Width" name="x">
          <UInput
            v-model="form.x"
            type="number"
            :min="100"
            :max="4000"
            placeholder="1920"
          />
        </UFormGroup>
        
        <UFormGroup label="Height" name="y">
          <UInput
            v-model="form.y"
            type="number"
            :min="100"
            :max="4000"
            placeholder="1080"
          />
        </UFormGroup>
      </div>
      
      <div class="mt-4">
        <UButton type="submit" color="primary">
          Apply Resolution
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()
const { gameFunctionGroups, callFunction } = useGameFunctions()

const form = ref({
  x: 1920,
  y: 1080
})

const validate = (data: typeof form.value) => {
  const errors = []
  
  if (!data.x || data.x < 100 || data.x > 4000) {
    errors.push({
      path: 'x',
      message: 'Width must be between 100 and 4000'
    })
  }
  
  if (!data.y || data.y < 100 || data.y > 4000) {
    errors.push({
      path: 'y',
      message: 'Height must be between 100 and 4000'
    })
  }
  
  return errors
}

const handleSubmit = async () => {
  try {
    const setResolutionFn = gameFunctionGroups.settings.functions.setResolution
    
    await callFunction({
      ...setResolutionFn,
      parameters: {
        x: parseInt(form.value.x),
        y: parseInt(form.value.y)
      }
    })
    
    toast.add({
      title: 'Success',
      description: `Resolution changed to ${form.value.x}x${form.value.y}`,
      color: 'green'
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Failed to change resolution',
      color: 'red'
    })
  }
}
</script> 