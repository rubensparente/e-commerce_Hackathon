<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white"
        @mouseenter="handleHover($event, 'Dashboard Administrativo - Visão geral do sistema')"
        @mouseleave="handleLeave">
      Dashboard Administrativo
    </h1>
    
    <!-- Cards de Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
           @mouseenter="handleHover($event, `Total de produtos: ${stats.totalProducts} produtos cadastrados`)" 
           @mouseleave="handleLeave">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400"
               @mouseenter="handleHover($event, 'Quantidade total de produtos')" 
               @mouseleave="handleLeave">
              Total de Produtos
            </p>
            <p class="text-3xl font-bold text-blue-600 dark:text-blue-400"
               :aria-label="`${stats.totalProducts} produtos`"
               @mouseenter="handleHover($event, `${stats.totalProducts} produtos cadastrados`)" 
               @mouseleave="handleLeave">
              {{ stats.totalProducts }}
            </p>
          </div>
          <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <i class="pi pi-box text-2xl text-blue-600 dark:text-blue-400" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
           @mouseenter="handleHover($event, `Total de clientes: ${stats.totalClients} clientes cadastrados`)" 
           @mouseleave="handleLeave">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400"
               @mouseenter="handleHover($event, 'Quantidade total de clientes')" 
               @mouseleave="handleLeave">
              Clientes
            </p>
            <p class="text-3xl font-bold text-green-600 dark:text-green-400"
               :aria-label="`${stats.totalClients} clientes`"
               @mouseenter="handleHover($event, `${stats.totalClients} clientes cadastrados`)" 
               @mouseleave="handleLeave">
              {{ stats.totalClients }}
            </p>
          </div>
          <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <i class="pi pi-users text-2xl text-green-600 dark:text-green-400" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
           @mouseenter="handleHover($event, `Total de administradores: ${stats.totalAdmins} administradores`)" 
           @mouseleave="handleLeave">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400"
               @mouseenter="handleHover($event, 'Quantidade de administradores')" 
               @mouseleave="handleLeave">
              Administradores
            </p>
            <p class="text-3xl font-bold text-purple-600 dark:text-purple-400"
               :aria-label="`${stats.totalAdmins} administradores`"
               @mouseenter="handleHover($event, `${stats.totalAdmins} administradores cadastrados`)" 
               @mouseleave="handleLeave">
              {{ stats.totalAdmins }}
            </p>
          </div>
          <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <i class="pi pi-shield text-2xl text-purple-600 dark:text-purple-400" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
           @mouseenter="handleHover($event, `Ofertas ativas: ${stats.activeOffers} ofertas em promoção`)" 
           @mouseleave="handleLeave">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400"
               @mouseenter="handleHover($event, 'Quantidade de ofertas ativas')" 
               @mouseleave="handleLeave">
              Ofertas Ativas
            </p>
            <p class="text-3xl font-bold text-orange-600 dark:text-orange-400"
               :aria-label="`${stats.activeOffers} ofertas ativas`"
               @mouseenter="handleHover($event, `${stats.activeOffers} ofertas ativas no momento`)" 
               @mouseleave="handleLeave">
              {{ stats.activeOffers }}
            </p>
          </div>
          <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
            <i class="pi pi-tag text-2xl text-orange-600 dark:text-orange-400" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Ações Rápidas -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
           @mouseenter="handleHover($event, 'Ações rápidas - Gerenciamento do sistema')" 
           @mouseleave="handleLeave">
        <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-white"
            @mouseenter="handleHover($event, 'Ações rápidas - Clique nos botões para gerenciar')" 
            @mouseleave="handleLeave">
          Ações Rápidas
        </h2>
        <div class="space-y-3">
          <router-link to="/admin/products" class="block"
                       @mouseenter="handleHover($event, 'Gerenciar produtos - Cadastrar, editar e excluir produtos')" 
                       @mouseleave="handleLeave">
            <button class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    :aria-label="'Gerenciar produtos'">
              <i class="pi pi-box mr-2" aria-hidden="true"></i>
              📦 Gerenciar Produtos
            </button>
          </router-link>
          <router-link to="/admin/categories" class="block"
                       @mouseenter="handleHover($event, 'Gerenciar categorias - Organizar produtos por categoria')" 
                       @mouseleave="handleLeave">
            <button class="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    :aria-label="'Gerenciar categorias'">
              <i class="pi pi-tags mr-2" aria-hidden="true"></i>
              🏷️ Gerenciar Categorias
            </button>
          </router-link>
          <router-link to="/admin/offers" class="block"
                       @mouseenter="handleHover($event, 'Gerenciar ofertas - Criar promoções e descontos')" 
                       @mouseleave="handleLeave">
            <button class="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                    :aria-label="'Gerenciar ofertas'">
              <i class="pi pi-percent mr-2" aria-hidden="true"></i>
              🔥 Gerenciar Ofertas
            </button>
          </router-link>
          <router-link to="/admin/orders" class="block"
                       @mouseenter="handleHover($event, 'Gerenciar pedidos - Visualizar e atualizar status dos pedidos')" 
                       @mouseleave="handleLeave">
            <button class="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                    :aria-label="'Gerenciar pedidos'">
              <i class="pi pi-shopping-cart mr-2" aria-hidden="true"></i>
              📋 Gerenciar Pedidos
            </button>
          </router-link>
          <router-link to="/admin/admins" class="block"
                       @mouseenter="handleHover($event, 'Gerenciar administradores - Controlar acesso ao sistema')" 
                       @mouseleave="handleLeave">
            <button class="w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
                    :aria-label="'Gerenciar administradores'">
              <i class="pi pi-user-plus mr-2" aria-hidden="true"></i>
              👑 Gerenciar Administradores
            </button>
          </router-link>
          <router-link to="/admin/clients" class="block"
                       @mouseenter="handleHover($event, 'Gerenciar clientes - Visualizar e gerenciar clientes cadastrados')" 
                       @mouseleave="handleLeave">
            <button class="w-full bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
                    :aria-label="'Gerenciar clientes'">
              <i class="pi pi-users mr-2" aria-hidden="true"></i>
              👥 Gerenciar Clientes
            </button>
          </router-link>
        </div>
      </div>

      <!-- Últimos Produtos -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
           @mouseenter="handleHover($event, 'Últimos produtos adicionados ao sistema')" 
           @mouseleave="handleLeave">
        <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-white"
            @mouseenter="handleHover($event, 'Últimos produtos cadastrados')" 
            @mouseleave="handleLeave">
          Últimos Produtos
        </h2>
        <div v-if="loading" class="flex justify-center py-8"
             @mouseenter="handleHover($event, 'Carregando lista de produtos...')" 
             @mouseleave="handleLeave">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" 
               :aria-label="'Carregando produtos'"></div>
          <span class="sr-only">Carregando produtos...</span>
        </div>
        <div v-else-if="recentProducts.length === 0" 
             class="text-center py-8 text-gray-500 dark:text-gray-400"
             @mouseenter="handleHover($event, 'Nenhum produto cadastrado ainda')" 
             @mouseleave="handleLeave">
          <i class="pi pi-inbox text-4xl mb-2" aria-hidden="true"></i>
          <p>Nenhum produto cadastrado</p>
        </div>
        <ul v-else class="space-y-2">
          <li v-for="product in recentProducts" :key="product.id" 
              class="border-b border-gray-200 dark:border-gray-700 py-2 flex justify-between items-center"
              @mouseenter="handleHover($event, `${product.name} - R$ ${formatPrice(product.price)}`)" 
              @mouseleave="handleLeave">
            <span class="text-gray-700 dark:text-gray-300"
                  :aria-label="`Produto: ${product.name}`">
              {{ product.name }}
            </span>
            <span class="font-semibold text-blue-600 dark:text-blue-400"
                  :aria-label="`Preço: R$ ${formatPrice(product.price)}`"
                  @mouseenter="handleHover($event, `R$ ${formatPrice(product.price)}`)" 
                  @mouseleave="handleLeave">
              R$ {{ formatPrice(product.price) }}
            </span>
          </li>
        </ul>
        
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
             @mouseenter="handleHover($event, 'Ver todos os produtos no gerenciador')" 
             @mouseleave="handleLeave">
          <router-link to="/admin/products" class="block">
            <button class="w-full text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
                    :aria-label="'Ver todos os produtos'">
              Ver todos os produtos →
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { accessibilityService } from '../../services/accessibility'

interface Product {
  id: number
  name: string
  price: number
  description?: string
}

const loading = ref(true)
const stats = ref({
  totalProducts: 0,
  totalClients: 0,
  totalAdmins: 0,
  activeOffers: 0
})
const recentProducts = ref<Product[]>([])

const formatPrice = (price: number): string => {
  const num = Number(price) || 0
  return num.toFixed(2).replace('.', ',')
}

const handleHover = (event: MouseEvent, text: string): void => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = (): void => {
  accessibilityService.handleLeave()
}

const loadDashboard = async (): Promise<void> => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/api/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Erro ao carregar dashboard')
    }
    
    const data = await response.json()
    stats.value = {
      totalProducts: data.totalProducts || 0,
      totalClients: data.totalClients || 0,
      totalAdmins: data.totalAdmins || 0,
      activeOffers: data.activeOffers || 0
    }
    recentProducts.value = data.products?.slice(0, 5) || []
    
    // Anunciar carregamento para leitores de tela
    accessibilityService.speak(`Dashboard carregado. Total de produtos: ${stats.value.totalProducts}, clientes: ${stats.value.totalClients}, administradores: ${stats.value.totalAdmins}, ofertas ativas: ${stats.value.activeOffers}`)
    
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)
    accessibilityService.speak('Erro ao carregar dashboard')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDashboard()
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>