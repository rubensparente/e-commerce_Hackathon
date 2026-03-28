<template>
  <div class="p-8">
    <div class="card p-6 animate-fade-in">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Tailwind CSS 4 - RCP Tecnologia
      </h1>
      
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
          <p class="text-blue-800 dark:text-blue-200">Blue Theme</p>
        </div>
        <div class="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
          <p class="text-purple-800 dark:text-purple-200">Purple Theme</p>
        </div>
        <div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
          <p class="text-green-800 dark:text-green-200">Green Theme</p>
        </div>
      </div>
      
      <div class="mt-6 flex gap-4">
        <button class="btn-primary">Botão Primário</button>
        <button class="btn-secondary">Botão Secundário</button>
      </div>
      
      <div class="mt-6">
        <div class="dark:bg-gray-800 bg-gray-100 p-4 rounded-lg transition-colors">
          <p class="dark:text-white text-gray-800">
            Dark mode automático com Tailwind 4!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Componente de teste
</script>