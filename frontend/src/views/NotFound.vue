<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4 py-12">
    <div class="text-center">
      <div class="text-6xl md:text-8xl font-bold text-blue-600 mb-4">404</div>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Página Não Encontrada
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link 
          to="/" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Voltar para Home
        </router-link>
        <router-link 
          to="/produtos" 
          class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Ver Produtos
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { accessibilityService } from '../services/accessibility'

onMounted(() => {
  accessibilityService.speak('Página não encontrada')
})
</script>