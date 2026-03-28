<template>
  <header class="w-full">
    <!-- Barra Superior -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-gray-800 dark:to-gray-900 w-full">
      <div class="w-full px-4 md:px-8 py-3">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <!-- Logo -->
          <router-link 
            to="/" 
            class="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg flex-shrink-0"
            :aria-label="'RCP Tecnologia - Página inicial'"
            @click="resetAndGoHome"
            @mouseenter="handleHover($event, 'RCP Tecnologia - Página inicial')"
            @mouseleave="handleLeave"
          >
            <div class="text-white">
              <h1 class="text-xl md:text-2xl font-bold">RCP Tecnologia</h1>
              <p class="text-xs text-blue-200">Soluções em Informática</p>
            </div>
          </router-link>

          <!-- Search Bar -->
          <div class="flex-1 max-w-xl md:max-w-2xl" role="search" aria-label="Busca de produtos">
            <div class="relative">
              <input
                type="text"
                v-model="searchQuery"
                @input="handleSearchInput"
                placeholder="Buscar produtos..."
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                @mouseenter="handleHover($event, 'Campo de busca')"
                @mouseleave="handleLeave"
              />
              <i class="pi pi-search absolute right-3 top-2.5 text-gray-400"></i>
              <div v-if="searchResults.length > 0 && searchQuery.length >= 2" 
                   class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                <div v-for="product in searchResults" 
                     :key="product.id"
                     @click="selectProduct(product)"
                     class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-0"
                     @mouseenter="handleHover($event, `Produto: ${product.name}, preço: R$ ${formatPrice(product.price)}`)" 
                     @mouseleave="handleLeave"
                >
                  <div class="font-semibold text-gray-900 dark:text-white">{{ product.name }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    R$ {{ formatPrice(product.price) }}
                    <span v-if="product.discount_percent" class="text-red-500 ml-2">
                      -{{ product.discount_percent }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ações do Usuário -->
          <div class="flex items-center gap-2 md:gap-3">
            <button
              @click="toggleHoverSpeech"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition relative group"
              :title="hoverSpeechEnabled ? 'Leitura ativada' : 'Leitura desativada'"
              @mouseenter="handleHover($event, hoverSpeechEnabled ? 'Desativar leitura ao passar o mouse' : 'Ativar leitura ao passar o mouse')"
              @mouseleave="handleLeave"
            >
              <i :class="hoverSpeechEnabled ? 'pi pi-volume-up' : 'pi pi-volume-off'" class="text-lg"></i>
            </button>

            <button
              @click="toggleTheme"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              @mouseenter="handleHover($event, themeStore.isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro')"
              @mouseleave="handleLeave"
            >
              <i :class="themeStore.isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-lg"></i>
            </button>

            <!-- Carrinho -->
            <router-link to="/cart" class="relative">
              <button class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition relative">
                <i class="pi pi-shopping-cart text-lg"></i>
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {{ cartStore.totalItems }}
                </span>
              </button>
            </router-link>

            <!-- Menu do Usuário -->
            <div class="relative">
              <button 
                @click="toggleUserMenu" 
                class="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 md:px-4 py-2 rounded-lg transition"
                @mouseenter="handleHover($event, authStore.isAuthenticated ? `Menu do usuário: ${authStore.user?.name}` : 'Abrir menu de login')"
                @mouseleave="handleLeave"
              >
                <i class="pi pi-user"></i>
                <span class="hidden sm:inline text-sm md:text-base">{{ authStore.isAuthenticated ? userName : 'Entrar' }}</span>
                <i v-if="authStore.isAuthenticated" class="pi pi-chevron-down text-xs"></i>
              </button>
              
              <!-- Dropdown do Menu do Usuário -->
              <div 
                v-if="userMenuOpen" 
                class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
              >
                <div v-if="authStore.isAuthenticated">
                  <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ authStore.user?.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ authStore.user?.email }}</p>
                    <p class="text-xs mt-1" :class="isAdmin ? 'text-purple-600' : 'text-blue-600'">
                      {{ isAdmin ? 'Administrador' : 'Cliente' }}
                    </p>
                  </div>
                  
                  <div class="py-2">
                    <router-link 
                      to="/profile" 
                      class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      @click="userMenuOpen = false"
                      @mouseenter="handleHover($event, 'Meu Perfil')"
                      @mouseleave="handleLeave"
                    >
                      <i class="pi pi-user"></i>
                      <span>Meu Perfil</span>
                    </router-link>
                    
                    <router-link 
                      v-if="isAdmin" 
                      to="/admin" 
                      class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      @click="userMenuOpen = false"
                      @mouseenter="handleHover($event, 'Painel Administrativo')"
                      @mouseleave="handleLeave"
                    >
                      <i class="pi pi-cog"></i>
                      <span>Painel Administrativo</span>
                    </router-link>
                    
                    <router-link 
                      to="/orders" 
                      class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      @click="userMenuOpen = false"
                      @mouseenter="handleHover($event, 'Meus Pedidos')"
                      @mouseleave="handleLeave"
                    >
                      <i class="pi pi-shopping-cart"></i>
                      <span>Meus Pedidos</span>
                    </router-link>
                    
                    <hr class="my-1 border-gray-200 dark:border-gray-700">
                    
                    <button 
                      @click="handleLogout"
                      class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      @mouseenter="handleHover($event, 'Sair do sistema')"
                      @mouseleave="handleLeave"
                    >
                      <i class="pi pi-sign-out"></i>
                      <span>Sair</span>
                    </button>
                  </div>
                </div>
                
                <div v-else class="py-2">
                  <router-link 
                    to="/login" 
                    class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    @click="userMenuOpen = false"
                    @mouseenter="handleHover($event, 'Fazer login')"
                    @mouseleave="handleLeave"
                  >
                    <i class="pi pi-sign-in"></i>
                    <span>Entrar</span>
                  </router-link>
                  
                  <router-link 
                    to="/register" 
                    class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    @click="userMenuOpen = false"
                    @mouseenter="handleHover($event, 'Criar nova conta')"
                    @mouseleave="handleLeave"
                  >
                    <i class="pi pi-user-plus"></i>
                    <span>Criar Conta</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu de Categorias -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm w-full">
      <div class="w-full px-4 md:px-8">
        <nav class="flex items-center gap-2 py-2">
          <!-- Botão Departamentos -->
          <div class="relative flex-shrink-0">
            <button
              @click="departamentosOpen = !departamentosOpen"
              class="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition whitespace-nowrap text-sm"
              @mouseenter="handleHover($event, 'Abrir menu de departamentos')"
              @mouseleave="handleLeave"
            >
              <i class="pi pi-bars"></i>
              <span class="hidden sm:inline">Departamentos</span>
              <span class="sm:hidden">Deptos</span>
              <i :class="departamentosOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-xs"></i>
            </button>
            
            <!-- Dropdown -->
            <div 
              v-show="departamentosOpen" 
              class="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
            >
              <div class="py-2 max-h-96 overflow-y-auto">
                <div 
                  v-for="cat in categories" 
                  :key="cat.id"
                  @click="filterByCategory(cat.id)"
                  class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  @mouseenter="handleHover($event, `Filtrar por ${cat.name}`)"
                  @mouseleave="handleLeave"
                >
                  <span class="text-gray-700 dark:text-gray-300">{{ cat.name }}</span>
                </div>
                
                <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                
                <div 
                  @click="clearFilter"
                  class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  @mouseenter="handleHover($event, 'Mostrar todos os produtos')"
                  @mouseleave="handleLeave"
                >
                  <span class="text-gray-700 dark:text-gray-300 font-semibold">Todas as Categorias</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Categorias Rápidas -->
          <div class="flex-1 overflow-x-auto scrollbar-hide">
            <div class="flex items-center gap-2 min-w-max">
              <div 
                v-for="cat in categories" 
                :key="cat.id"
                @click="filterByCategory(cat.id)"
                :class="[
                  'px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm cursor-pointer transition whitespace-nowrap flex-shrink-0',
                  selectedCategory === cat.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
                @mouseenter="handleHover($event, `Filtrar por ${cat.name}`)"
                @mouseleave="handleLeave"
              >
                {{ cat.name }}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { accessibilityService } from '../services/accessibility'

// Interfaces
interface Product {
  id: number
  name: string
  price: number | string
  discount_percent?: number
  image_url?: string
}

interface Category {
  id: number
  name: string
}

// Composables
const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

// Estado
const searchQuery = ref<string>('')
const searchResults = ref<Product[]>([])
const categories = ref<Category[]>([])
const selectedCategory = ref<number | null>(null)
const userMenuOpen = ref<boolean>(false)
const departamentosOpen = ref<boolean>(false)
const hoverSpeechEnabled = accessibilityService.getHoverSpeechEnabled()

// Computed
const userName = computed<string>(() => {
  return authStore.user?.name?.split(' ')[0] || 'Usuário'
})

const isAdmin = computed<boolean>(() => {
  return authStore.user?.role === 'admin' || authStore.user?.role === 'super_admin'
})

// Funções utilitárias
const formatPrice = (price: number | string): string => {
  const num = Number(price) || 0
  return num.toFixed(2).replace('.', ',')
}

// Ações
const toggleTheme = (): void => {
  themeStore.toggleTheme()
  accessibilityService.speak(themeStore.isDark ? 'Modo escuro ativado' : 'Modo claro ativado')
}

const toggleHoverSpeech = (): void => {
  accessibilityService.toggleHoverSpeech()
}

const toggleUserMenu = (): void => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
  } else {
    userMenuOpen.value = !userMenuOpen.value
  }
}

const handleLogout = (): void => {
  authStore.logout()
  userMenuOpen.value = false
  accessibilityService.speak('Você saiu do sistema')
  router.push('/')
}

const resetAndGoHome = (): void => {
  selectedCategory.value = null
  window.dispatchEvent(new CustomEvent('category-filter', { detail: null }))
  localStorage.removeItem('filterCategory')
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}

// Busca
const handleSearchInput = async (event: Event): Promise<void> => {
  const target = event.target as HTMLInputElement
  const query = target.value
  
  if (query.length >= 2) {
    try {
      const response = await fetch(`http://localhost:3000/api/products/search?q=${query}`)
      const data = await response.json() as Product[]
      searchResults.value = data
    } catch (error) {
      console.error('Erro na busca:', error)
      searchResults.value = []
    }
  } else {
    searchResults.value = []
  }
}

const selectProduct = (product: Product): void => {
  router.push(`/product/${product.id}`)
  searchQuery.value = ''
  searchResults.value = []
}

// Categorias
const filterByCategory = (categoryId: number): void => {
  selectedCategory.value = categoryId
  departamentosOpen.value = false
  window.dispatchEvent(new CustomEvent('category-filter', { detail: categoryId }))
  const categoryName = categories.value.find(c => c.id === categoryId)?.name || 'categoria'
  accessibilityService.speak(`Filtrando produtos da categoria ${categoryName}`)
  if (router.currentRoute.value.path !== '/') {
    localStorage.setItem('filterCategory', categoryId.toString())
    router.push('/')
  }
}

const clearFilter = (): void => {
  selectedCategory.value = null
  departamentosOpen.value = false
  window.dispatchEvent(new CustomEvent('category-filter', { detail: null }))
  accessibilityService.speak('Mostrando todos os produtos')
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}

const loadCategories = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3000/api/categories')
    const data = await response.json() as Category[]
    categories.value = data
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
  }
}

// Acessibilidade
const handleHover = (event: MouseEvent, text: string): void => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = (): void => {
  accessibilityService.handleLeave()
}

// Fechar dropdown ao clicar fora
const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    userMenuOpen.value = false
    departamentosOpen.value = false
  }
}

// Lifecycle
onMounted((): void => {
  loadCategories()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted((): void => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.overflow-x-auto {
  overflow-x: auto;
  scroll-behavior: smooth;
}

.min-w-max {
  min-width: max-content;
}
</style>