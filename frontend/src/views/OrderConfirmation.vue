<template>
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-16 text-center">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <div class="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="pi pi-check-circle text-5xl text-green-600"></i>
      </div>
      
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Pedido Confirmado!
      </h1>
      
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Seu pedido foi realizado com sucesso. Em breve você receberá um e-mail com as informações de rastreamento.
      </p>
      
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-8">
        <p class="text-sm text-gray-500 dark:text-gray-400">Número do Pedido</p>
        <p class="text-2xl font-bold text-blue-600">#{{ orderNumber }}</p>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link 
          to="/orders" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Meus Pedidos
        </router-link>
        <router-link 
          to="/" 
          class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-2 rounded-lg transition"
        >
          Continuar Comprando
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const orderNumber = ref(Math.floor(Math.random() * 1000000))
</script>