<template>
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
    
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Carregando produto...</p>
      </div>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <i class="pi pi-exclamation-triangle text-5xl text-yellow-500 mb-3" aria-hidden="true"></i>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Erro ao carregar produto</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{{ error }}</p>
      <button 
        @click="retryLoad" 
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        @mouseenter="handleHover($event, 'Tentar carregar novamente')"
        @mouseleave="handleLeave"
      >
        Tentar novamente
      </button>
    </div>

    <!-- Produto -->
    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <!-- Imagem do Produto -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <img 
          :src="product.image_url || '/placeholder-product.png'" 
          :alt="product.name"
          class="w-full h-96 object-contain"
          @error="handleImageError"
          @mouseenter="handleHover($event, `Imagem do produto ${product.name}`)"
          @mouseleave="handleLeave"
        />
      </div>

      <!-- Informações do Produto -->
      <div>
        <h1 
          class="text-3xl font-bold text-gray-800 dark:text-white mb-4"
          @mouseenter="handleHover($event, product.name)"
          @mouseleave="handleLeave"
        >
          {{ product.name }}
        </h1>

        <div class="mb-4">
          <span class="text-sm text-gray-500">Categoria:</span>
          <button 
            v-if="product.category_id"
            @click="goToCategory(product.category_id)" 
            class="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:underline font-medium"
            @mouseenter="handleHover($event, `Ir para categoria ${product.category_name}`)"
            @mouseleave="handleLeave"
          >
            {{ product.category_name || 'Carregando...' }}
          </button>
          <span v-else class="ml-2 text-gray-500">Não informada</span>
        </div>

        <p 
          class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
          @mouseenter="handleHover($event, product.description || 'Descrição do produto')"
          @mouseleave="handleLeave"
        >
          {{ product.description || 'Sem descrição disponível' }}
        </p>

        <div v-if="product.brand" class="mb-4">
          <span class="text-sm text-gray-500">Marca:</span>
          <span 
            class="ml-2 text-gray-700 dark:text-gray-300"
            @mouseenter="handleHover($event, `Marca: ${product.brand}`)"
            @mouseleave="handleLeave"
          >
            {{ product.brand }}
          </span>
        </div>

        <div v-if="product.warranty" class="mb-4">
          <span class="text-sm text-gray-500">Garantia:</span>
          <span 
            class="ml-2 text-gray-700 dark:text-gray-300"
            @mouseenter="handleHover($event, `Garantia: ${product.warranty}`)"
            @mouseleave="handleLeave"
          >
            {{ product.warranty }}
          </span>
        </div>

        <!-- Preço -->
        <div class="mb-6">
          <div class="flex items-center gap-3">
            <span 
              v-if="product.discount_percent" 
              class="text-3xl font-bold text-red-600"
              @mouseenter="handleHover($event, `Preço com desconto: R$ ${formatPrice(getDiscountedPrice())}`)"
              @mouseleave="handleLeave"
            >
              R$ {{ formatPrice(getDiscountedPrice()) }}
            </span>
            <span 
              :class="['text-2xl font-bold', product.discount_percent ? 'line-through text-gray-400' : 'text-3xl text-blue-600']"
              @mouseenter="handleHover($event, `Preço original: R$ ${formatPrice(product.price)}`)"  
              @mouseleave="handleLeave"
            >
              R$ {{ formatPrice(product.price) }}
            </span>
            <span 
              v-if="product.discount_percent" 
              class="bg-red-500 text-white px-2 py-1 rounded-lg text-sm"
              @mouseenter="handleHover($event, `Desconto de ${product.discount_percent} por cento`)"  
              @mouseleave="handleLeave"
            >
              -{{ product.discount_percent }}%
            </span>
          </div>
        </div>

        <!-- Estoque -->
        <div class="mb-6">
          <div class="flex items-center gap-2">
            <span class="text-gray-600">Estoque:</span>
            <span 
              :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'"
              @mouseenter="handleHover($event, product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Produto esgotado')"  
              @mouseleave="handleLeave"
            >
              {{ product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Esgotado' }}
            </span>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <button 
            @click="addToCart"
            :disabled="product.stock === 0 || addingToCart"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            @mouseenter="handleHover($event, product.stock > 0 ? `Adicionar ${product.name} ao carrinho` : 'Produto esgotado, não é possível adicionar')"
            @mouseleave="handleLeave"
          >
            <i v-if="addingToCart" class="pi pi-spin pi-spinner"></i>
            <i v-else class="pi pi-shopping-cart"></i>
            {{ addingToCart ? 'Adicionando...' : 'Adicionar ao Carrinho' }}
          </button>
          <button 
            @click="buyNow"
            :disabled="product.stock === 0 || buyingNow"
            class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            @mouseenter="handleHover($event, product.stock > 0 ? `Comprar ${product.name} agora` : 'Produto esgotado, não é possível comprar')"
            @mouseleave="handleLeave"
          >
            <i v-if="buyingNow" class="pi pi-spin pi-spinner"></i>
            <i v-else class="pi pi-bolt"></i>
            {{ buyingNow ? 'Redirecionando...' : 'Comprar Agora' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Especificações Técnicas -->
    <div v-if="product && product.specifications && Object.keys(getSpecifications()).length > 0" 
         class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
         @mouseenter="handleHover($event, 'Especificações técnicas do produto')"
         @mouseleave="handleLeave"
    >
      <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
        <i class="pi pi-cog text-blue-600" aria-hidden="true"></i>
        Especificações Técnicas
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(value, key) in getSpecifications()" :key="key" 
             class="flex border-b border-gray-200 dark:border-gray-700 py-3"
             @mouseenter="handleHover($event, `${formatKey(key)}: ${value}`)"
             @mouseleave="handleLeave">
          <span class="font-medium text-gray-600 dark:text-gray-400 w-2/5">{{ formatKey(key) }}:</span>
          <span class="text-gray-800 dark:text-gray-200 flex-1">{{ value }}</span>
        </div>
      </div>
    </div>

    <!-- Produtos Relacionados -->
    <div v-if="uniqueRelatedProducts.length > 0" class="mt-12">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <i class="pi pi-tags text-blue-600" aria-hidden="true"></i>
        Produtos Relacionados
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <div 
          v-for="item in uniqueRelatedProducts" 
          :key="item.id" 
          @click="viewProduct(item.id)"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer group"
          @mouseenter="handleHover($event, `Ver produto relacionado: ${item.name}, preço: R$ ${formatPrice(item.price)}`)"  
          @mouseleave="handleLeave"
        >
          <div class="relative overflow-hidden">
            <img :src="item.image_url || '/placeholder-product.png'" 
                 :alt="item.name"
                 class="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition duration-300"
                 @error="handleImageError">
          </div>
          <div class="p-3">
            <h3 class="font-semibold line-clamp-1 text-sm md:text-base">{{ item.name }}</h3>
            <p class="text-blue-600 font-bold mt-2 text-sm md:text-base">R$ {{ formatPrice(item.price) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useCartStore } from '../stores/cart'
import { accessibilityService } from '../services/accessibility'

// Tipagem correta
interface Product {
  id: number
  name: string
  description?: string
  price: number | string
  stock: number
  category_id?: number
  category_name?: string
  image_url?: string
  discount_percent?: number
  brand?: string
  warranty?: string
  specifications?: string | Record<string, any>
}

// Estado
const route = useRoute()
const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()

const loading = ref(true)
const error = ref<string | null>(null)
const product = ref<Product | null>(null)
const relatedProducts = ref<any[]>([])
const addingToCart = ref(false)
const buyingNow = ref(false)

// Computed para remover duplicatas por ID
const uniqueRelatedProducts = computed(() => {
  const uniqueMap = new Map<number, any>()
  relatedProducts.value.forEach(product => {
    if (!uniqueMap.has(product.id)) {
      uniqueMap.set(product.id, product)
    }
  })
  return Array.from(uniqueMap.values())
})

let abortController: AbortController | null = null
let isMounted = true

// Utils
const formatPrice = (price: number | string): string => {
  const num = Number(price) || 0
  return num.toFixed(2).replace('.', ',')
}

const getDiscountedPrice = (): number => {
  if (!product.value) return 0

  const price = Number(product.value.price) || 0
  const discount = Number(product.value.discount_percent) || 0

  return discount > 0 ? price * (1 - discount / 100) : price
}

// Função para obter especificações técnicas
const getSpecifications = (): Record<string, any> => {
  if (!product.value?.specifications) return {}
  
  try {
    if (typeof product.value.specifications === 'string') {
      return JSON.parse(product.value.specifications)
    }
    return product.value.specifications as Record<string, any>
  } catch (e) {
    console.error('Erro ao parsear specifications:', e)
    return {}
  }
}

// Formatar chave da especificação
const formatKey = (key: string): string => {
  return key.replace(/_/g, ' ')
           .replace(/\b\w/g, l => l.toUpperCase())
}

// Navegação
const goToCategory = (categoryId: number) => {
  localStorage.setItem('filterCategory', categoryId.toString())
  router.push('/')
}

const viewProduct = (id: number): void => {
  router.push(`/product/${id}`)
}

// Carrinho - FUNÇÃO CORRIGIDA
const addToCart = async () => {
  if (!product.value) return
  
  if (product.value.stock === 0) {
    toast.add({
      severity: 'error',
      summary: 'Produto esgotado',
      detail: 'Este produto está sem estoque no momento.',
      life: 3000
    })
    accessibilityService.speak('Produto esgotado, não é possível adicionar')
    return
  }
  
  addingToCart.value = true
  
  try {
    const quantity = 1
    const result = cartStore.addItem(product.value, quantity)
    
    if (result.success) {
      toast.add({
        severity: 'success',
        summary: 'Adicionado!',
        detail: `${product.value.name} foi adicionado ao carrinho.`,
        life: 3000
      })
      accessibilityService.speak(`${product.value.name} adicionado ao carrinho`)
      
      // Animação no botão
      const button = document.querySelector('.bg-blue-600')
      if (button) {
        button.classList.add('animate-pulse')
        setTimeout(() => {
          button.classList.remove('animate-pulse')
        }, 500)
      }
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: result.message || 'Não foi possível adicionar ao carrinho',
        life: 3000
      })
      accessibilityService.speak(result.message || 'Erro ao adicionar ao carrinho')
    }
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao adicionar produto ao carrinho',
      life: 3000
    })
    accessibilityService.speak('Erro ao adicionar ao carrinho')
  } finally {
    addingToCart.value = false
  }
}

// Comprar agora - FUNÇÃO CORRIGIDA
const buyNow = async () => {
  if (!product.value) return
  
  if (product.value.stock === 0) {
    toast.add({
      severity: 'error',
      summary: 'Produto esgotado',
      detail: 'Este produto está sem estoque no momento.',
      life: 3000
    })
    accessibilityService.speak('Produto esgotado, não é possível comprar')
    return
  }
  
  buyingNow.value = true
  
  try {
    const quantity = 1
    const result = cartStore.addItem(product.value, quantity)
    
    if (result.success) {
      toast.add({
        severity: 'info',
        summary: 'Redirecionando',
        detail: 'Você será redirecionado para o carrinho.',
        life: 1500
      })
      accessibilityService.speak('Redirecionando para o carrinho')
      
      setTimeout(() => {
        router.push('/cart')
      }, 500)
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: result.message || 'Não foi possível processar a compra',
        life: 3000
      })
      accessibilityService.speak(result.message || 'Erro ao processar compra')
    }
  } catch (error) {
    console.error('Erro ao comprar agora:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao processar a compra',
      life: 3000
    })
    accessibilityService.speak('Erro ao processar compra')
  } finally {
    buyingNow.value = false
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

// Carregar produtos relacionados
const loadRelatedProducts = async (categoryId: number, currentProductId: number): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/category/${categoryId}`)
    
    if (response.ok) {
      let products = await response.json()
      
      if (!Array.isArray(products)) {
        products = []
      }
      
      // Remover duplicatas e o produto atual
      const uniqueProducts = products.filter((p: any, index: number, self: any[]) => 
        p.id !== currentProductId && 
        index === self.findIndex((t: any) => t.id === p.id)
      )
      
      relatedProducts.value = uniqueProducts.slice(0, 4)
    }
  } catch (error) {
    console.error('Erro ao carregar produtos relacionados:', error)
    relatedProducts.value = []
  }
}

// Função principal de carregamento
const loadProduct = async () => {
  if (!isMounted) return

  if (abortController) {
    abortController.abort()
  }

  loading.value = true
  error.value = null

  try {
    const id = route.params.id as string

    if (!id || isNaN(Number(id))) {
      throw new Error('ID inválido')
    }

    abortController = new AbortController()

    const response = await fetch(
      `http://localhost:3000/api/products/${id}`,
      { signal: abortController.signal }
    )

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`)
    }

    const data = await response.json()

    if (!data?.id) {
      throw new Error('Produto inválido')
    }

    if (!isMounted) return

    product.value = data

    if (data.category_id) {
      await loadRelatedProducts(data.category_id, data.id)
    }

    if (product.value?.name) {
      accessibilityService.speak(`Produto ${product.value.name} carregado`)
    }

  } catch (err: any) {
    console.error('Erro detalhado:', err)

    if (err.name === 'AbortError') {
      error.value = 'Requisição cancelada'
    } else if (err.message === 'Failed to fetch') {
      error.value = 'Erro de conexão. Verifique sua internet.'
    } else {
      error.value = err.message || 'Erro ao carregar produto'
    }

    if (isMounted && error.value) {
      accessibilityService.speak(error.value)
    }

  } finally {
    if (isMounted) {
      loading.value = false
    }
    abortController = null
  }
}

// Retry
const retryLoad = () => {
  loadProduct()
}

// Watch seguro
watch(
  () => route.params.id,
  async () => {
    await loadProduct()
  }
)

// Lifecycle
onMounted(() => {
  isMounted = true
  loadProduct()
})

onUnmounted(() => {
  isMounted = false
  if (abortController) {
    abortController.abort()
  }
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-pulse {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
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

.cursor-pointer {
  cursor: pointer;
}
</style>