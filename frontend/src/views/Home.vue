<template>
  <div class="w-full">
    <!-- Banner Principal - Full Width -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 w-full">
      <div class="w-full px-4 md:px-8 py-8 md:py-12">
        <div class="max-w-[1400px] mx-auto">
          <h1 class="text-2xl md:text-3xl font-bold mb-4 text-white">Bem-vindo à RCP Tecnologia</h1>
          <p class="text-base md:text-lg mb-6 text-white">Sua loja de informática completa com os melhores preços e condições!</p>
          <button 
            @click="scrollToProducts" 
            class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Rolar para ver os produtos"
            @mouseenter="handleHover($event, 'Clique para ver as ofertas')"
            @mouseleave="handleLeave"
          >
            Ver Ofertas
          </button>
        </div>
      </div>
    </div>

    <!-- Conteúdo Principal - Full Width -->
    <div class="w-full px-4 md:px-8 py-8">
      <div class="max-w-[1400px] mx-auto">
        <!-- Título da seção -->
        <div class="mb-6">
          <h2 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <i class="pi pi-tag text-blue-600" aria-hidden="true"></i>
            {{ selectedCategory ? getCategoryName(selectedCategory) : 'Produtos em Destaque' }}
          </h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {{ selectedCategory ? `Produtos da categoria ${getCategoryName(selectedCategory)}` : 'Confira nossos melhores produtos com descontos especiais' }}
          </p>
        </div>

        <!-- Loading -->
        <div v-if="loadingProducts" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" role="status" aria-label="Carregando produtos">
            <span class="sr-only">Carregando produtos...</span>
          </div>
        </div>
        
        <!-- Nenhum produto -->
        <div v-else-if="displayedProducts.length === 0" class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <i class="pi pi-inbox text-5xl text-gray-400 mb-3" aria-hidden="true"></i>
          <p class="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
          <button 
            @click="clearFilter" 
            class="mt-4 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2 transition"
            aria-label="Limpar filtro e ver todos os produtos"
            @mouseenter="handleHover($event, 'Ver todos os produtos')"
            @mouseleave="handleLeave"
          >
            Ver todos os produtos
          </button>
        </div>
        
        <!-- Grid de Produtos -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
          <div 
            v-for="(product, index) in displayedProducts" 
            :key="`${product.id}-${index}`"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            @click="viewProduct(product.id)"
            @mouseenter="handleHover($event, 'Clique para ver detalhes do produto: ' + product.name + ', preço: R$ ' + formatPrice(product.price))" 
            @mouseleave="handleLeave"
          >
            <div class="relative overflow-hidden">
              <img 
                :src="product.image_url || '/placeholder-product.png'" 
                :alt="product.name"
                class="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition duration-300"
                @error="handleImageError"
                loading="lazy"
              />
              <div v-if="product.discount_percent" 
                   class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold"
                   :aria-label="'Desconto de ' + product.discount_percent + ' por cento'">
                -{{ product.discount_percent }}%
              </div>
              <div v-if="product.stock === 0" 
                   class="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span class="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">ESGOTADO</span>
              </div>
            </div>
            <div class="p-3 md:p-4">
              <h3 class="text-sm md:text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
                {{ product.name }}
              </h3>
              <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {{ product.description || 'Sem descrição' }}
              </p>
              <div class="flex items-center justify-between">
                <div>
                  <span v-if="product.discount_percent" class="text-sm md:text-xl font-bold text-red-600">
                    R$ {{ formatPrice(calculateDiscountedPrice(product)) }}
                  </span>
                  <span :class="['text-xs md:text-lg', product.discount_percent ? 'line-through text-gray-400 ml-1 md:ml-2' : 'text-sm md:text-xl font-bold text-blue-600']">
                    R$ {{ formatPrice(product.price) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Seção de Diferenciais -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          <div 
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 text-center hover:shadow-lg transition"
            @mouseenter="handleHover($event, 'Entrega rápida em todo Brasil')"
            @mouseleave="handleLeave"
          >
            <i class="pi pi-truck text-3xl md:text-4xl text-blue-600 mb-2 md:mb-3" aria-hidden="true"></i>
            <h3 class="text-base md:text-lg font-semibold mb-2">Entrega Rápida</h3>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Entregamos em todo Brasil</p>
          </div>
          <div 
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 text-center hover:shadow-lg transition"
            @mouseenter="handleHover($event, 'Produtos originais com garantia')"
            @mouseleave="handleLeave"
          >
            <i class="pi pi-shield text-3xl md:text-4xl text-blue-600 mb-2 md:mb-3" aria-hidden="true"></i>
            <h3 class="text-base md:text-lg font-semibold mb-2">Garantia Garantida</h3>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Produtos originais com garantia</p>
          </div>
          <div 
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 text-center hover:shadow-lg transition"
            @mouseenter="handleHover($event, 'Pagamento no Pix, Transferencia ou Boleto Bancário')"
            @mouseleave="handleLeave"
          >
            <i class="pi pi-credit-card text-3xl md:text-4xl text-blue-600 mb-2 md:mb-3" aria-hidden="true"></i>
            <h3 class="text-base md:text-lg font-semibold mb-2">Pagamento Pix - Transferência</h3>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Pagamento no Pix, Transferencia ou Boleto Bancário</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { accessibilityService } from '../services/accessibility'

// Interfaces
interface Product {
  id: number
  name: string
  description: string
  price: number | string
  stock: number
  category_id: number
  category_name?: string
  image_url?: string
  discount_percent?: number
  discounted_price?: number | string
}

interface Category {
  id: number
  name: string
  icon?: string
}

const router = useRouter()

// Estado
const loadingProducts = ref(true)
const allProducts = ref<Product[]>([])
const discountedProducts = ref<Product[]>([])
const categories = ref<Category[]>([])
const selectedCategory = ref<number | null>(null)

// Computed para produtos exibidos - SEM LIMITE DE QUANTIDADE
const displayedProducts = computed(() => {
  let products: Product[] = []
  
  if (selectedCategory.value) {
    // Quando tem categoria selecionada, mostra todos os produtos da categoria
    products = allProducts.value.filter(p => p.category_id === selectedCategory.value)
  } else {
    // Quando não tem categoria selecionada, mostra todos os produtos com desconto
    // Se não houver produtos com desconto, mostra todos os produtos
    if (discountedProducts.value.length > 0) {
      products = discountedProducts.value // Mostra TODOS os produtos com desconto
    } else {
      products = allProducts.value // Mostra TODOS os produtos
    }
  }
  
  // Garantir unicidade por ID
  const uniqueMap = new Map<number, Product>()
  products.forEach(product => {
    if (!uniqueMap.has(product.id)) {
      uniqueMap.set(product.id, product)
    }
  })
  
  return Array.from(uniqueMap.values())
})

// Funções utilitárias
const toNumber = (value: number | string): number => {
  if (value === null || value === undefined) return 0
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = parseFloat(value.replace(',', '.'))
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

const formatPrice = (price: number | string): string => {
  const numPrice = toNumber(price)
  return numPrice.toFixed(2).replace('.', ',')
}

const calculateDiscountedPrice = (product: Product): number => {
  const price = toNumber(product.price)
  const discount = toNumber(product.discount_percent || 0)
  if (discount > 0) {
    return price * (1 - discount / 100)
  }
  return price
}

const viewProduct = (id: number): void => {
  router.push(`/product/${id}`)
  accessibilityService.speak(`Abrindo detalhes do produto`)
}

const getCategoryName = (categoryId: number): string => {
  const cat = categories.value.find(c => c.id === categoryId)
  return cat ? cat.name : 'Categoria'
}

const clearFilter = (): void => {
  selectedCategory.value = null
  window.dispatchEvent(new CustomEvent('category-filter', { detail: null }))
  accessibilityService.speak('Mostrando todos os produtos')
}

const scrollToProducts = (): void => {
  const element = document.querySelector('.grid')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    accessibilityService.speak('Rolando para os produtos')
  }
}

const handleImageError = (event: Event): void => {
  const img = event.target as HTMLImageElement
  img.src = '/placeholder-product.png'
}

const handleHover = (event: MouseEvent, text: string): void => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = (): void => {
  accessibilityService.handleLeave()
}

// Handler unificado para filtro de categoria (header e footer)
const handleCategoryFilter = (event: CustomEvent): void => {
  const categoryId = event.detail as number | null
  selectedCategory.value = categoryId
  
  if (categoryId) {
    const categoryName = getCategoryName(categoryId)
    accessibilityService.speak(`Filtrando produtos da categoria ${categoryName}`)
  } else {
    accessibilityService.speak('Mostrando todos os produtos')
  }
}

// Carregar dados da API
const loadData = async (): Promise<void> => {
  loadingProducts.value = true
  try {
    // Carregar categorias
    const categoriesRes = await fetch('http://localhost:3000/api/categories')
    if (!categoriesRes.ok) throw new Error('Erro ao carregar categorias')
    categories.value = await categoriesRes.json()
    
    // Carregar todos os produtos
    const allProductsRes = await fetch('http://localhost:3000/api/products')
    if (!allProductsRes.ok) throw new Error('Erro ao carregar produtos')
    const rawAllProducts = await allProductsRes.json()
    allProducts.value = rawAllProducts
    
    // Carregar produtos com desconto - SEM LIMITE
    const discountedRes = await fetch('http://localhost:3000/api/products/discounted')
    if (!discountedRes.ok) throw new Error('Erro ao carregar produtos com desconto')
    const rawDiscounted = await discountedRes.json()
    discountedProducts.value = rawDiscounted // Agora carrega TODOS os produtos com desconto
    
    console.log('Home - Dados carregados com sucesso:', {
      categorias: categories.value.length,
      produtos: allProducts.value.length,
      descontos: discountedProducts.value.length
    })
    
    accessibilityService.speak(`${discountedProducts.value.length} produtos em oferta carregados`)
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    accessibilityService.speak('Erro ao carregar produtos. Tente novamente mais tarde.')
  } finally {
    loadingProducts.value = false
  }
}

// Verificar se veio filtro da página de produto
const checkStoredFilter = (): void => {
  const storedCategory = localStorage.getItem('filterCategory')
  if (storedCategory) {
    const categoryId = parseInt(storedCategory)
    selectedCategory.value = categoryId
    localStorage.removeItem('filterCategory')
    
    // Dispara o evento para atualizar qualquer componente que precise
    window.dispatchEvent(new CustomEvent('category-filter', { detail: categoryId }))
  }
}

// Lifecycle
onMounted(() => {
  loadData()
  checkStoredFilter()
  
  // Adiciona listener para filtros do header e footer
  window.addEventListener('category-filter', handleCategoryFilter as EventListener)
})

onUnmounted(() => {
  // Remove listener para evitar memory leaks
  window.removeEventListener('category-filter', handleCategoryFilter as EventListener)
})
</script>

<style scoped>
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

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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

/* Melhorias de acessibilidade */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Transições suaves */
.transition {
  transition: all 0.3s ease;
}

/* Cursor pointer para o card inteiro */
.cursor-pointer {
  cursor: pointer;
}
</style>