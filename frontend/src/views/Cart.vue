<template>
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Meu Carrinho</h1>
    
    <div v-if="cartStore.totalItems === 0" class="text-center py-12">
      <i class="pi pi-shopping-cart text-6xl text-gray-400 mb-4"></i>
      <p class="text-xl text-gray-500 mb-4">Seu carrinho está vazio</p>
      <router-link 
        to="/" 
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        @mouseenter="handleHover($event, 'Continuar comprando')"
        @mouseleave="handleLeave"
      >
        Continuar Comprando
      </router-link>
    </div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Lista de Produtos -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Produto</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold">Preço</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold">Quantidade</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold">Subtotal</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="item in cartStore.items" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-4">
                      <img 
                        :src="item.image_url || '/placeholder-product.png'" 
                        class="w-16 h-16 object-cover rounded"
                        @mouseenter="handleHover($event, `Imagem do produto ${item.name}`)"
                        @mouseleave="handleLeave"
                      >
                      <div>
                        <h3 
                          class="font-semibold text-gray-800 dark:text-white"
                          @mouseenter="handleHover($event, item.name)"
                          @mouseleave="handleLeave"
                        >
                          {{ item.name }}
                        </h3>
                        <p v-if="item.discount_percent" class="text-sm text-green-600">-{{ item.discount_percent }}% OFF</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <div>
                      <span v-if="item.discount_percent" class="text-sm line-through text-gray-400">
                        R$ {{ formatPrice(item.price) }}
                      </span>
                      <span 
                        class="font-semibold text-blue-600"
                        @mouseenter="handleHover($event, `Preço com desconto: R$ ${formatPrice(cartStore.getItemPrice(item))}`)"
                        @mouseleave="handleLeave"
                      >
                        R$ {{ formatPrice(cartStore.getItemPrice(item)) }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <div class="flex items-center justify-center gap-2">
                      <button 
                        @click="updateQuantity(item.id, item.quantity - 1)"
                        class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                        @mouseenter="handleHover($event, `Diminuir quantidade de ${item.name}`)"
                        @mouseleave="handleLeave"
                      >
                        -
                      </button>
                      <span 
                        class="w-12 text-center"
                        @mouseenter="handleHover($event, `Quantidade: ${item.quantity} unidades`)"  
                        @mouseleave="handleLeave"
                      >
                        {{ item.quantity }}
                      </span>
                      <button 
                        @click="updateQuantity(item.id, item.quantity + 1)"
                        class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                        @mouseenter="handleHover($event, `Aumentar quantidade de ${item.name}`)"
                        @mouseleave="handleLeave"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-center font-semibold">
                    <span
                      @mouseenter="handleHover($event, `Subtotal: R$ ${formatPrice(cartStore.getItemPrice(item) * item.quantity)}`)"  
                      @mouseleave="handleLeave"
                    >
                      R$ {{ formatPrice(cartStore.getItemPrice(item) * item.quantity) }}
                    </span>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <button 
                      @click="removeItem(item.id)" 
                      class="text-red-500 hover:text-red-700 transition"
                      @mouseenter="handleHover($event, `Remover ${item.name} do carrinho`)"
                      @mouseleave="handleLeave"
                    >
                      <i class="pi pi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="mt-4 flex justify-between">
          <router-link 
            to="/" 
            class="text-blue-600 hover:text-blue-800 transition"
            @mouseenter="handleHover($event, 'Continuar comprando')"
            @mouseleave="handleLeave"
          >
            ← Continuar Comprando
          </router-link>
          <button 
            @click="openClearCartModal" 
            class="text-red-600 hover:text-red-800 transition font-medium"
            @mouseenter="handleHover($event, 'Limpar todo o carrinho')"
            @mouseleave="handleLeave"
          >
            <i class="pi pi-trash mr-1"></i>
            Limpar Carrinho
          </button>
        </div>
      </div>
      
      <!-- Resumo do Pedido -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
          <h2 class="text-xl font-bold mb-4">Resumo do Pedido</h2>
          
          <div class="space-y-3 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div class="flex justify-between">
              <span>Subtotal ({{ cartStore.totalItems }} itens)</span>
              <span>R$ {{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div v-if="cartStore.discount > 0" class="flex justify-between text-green-600">
              <span>Descontos</span>
              <span>- R$ {{ formatPrice(cartStore.discount) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Frete</span>
              <span>{{ cartStore.shipping === 0 ? 'Grátis' : `R$ ${formatPrice(cartStore.shipping)}` }}</span>
            </div>
          </div>
          
          <div class="flex justify-between font-bold text-lg mt-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <span>Total</span>
            <span class="text-blue-600">R$ {{ formatPrice(cartStore.grandTotal) }}</span>
          </div>
          
          <div class="mt-4 space-y-2">
            <div class="text-sm text-gray-500">
              <i class="pi pi-info-circle"></i>
              Frete grátis para compras acima de R$ 500,00
            </div>
            <button 
              @click="checkout"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
              @mouseenter="handleHover($event, 'Finalizar compra')"
              @mouseleave="handleLeave"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <Toast />
    <ConfirmDialog>
      <template #container="slotProps">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
              <i class="pi pi-exclamation-triangle text-red-600 dark:text-red-400 text-2xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                {{ slotProps.message?.header || 'Confirmar Ação' }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Esta ação não pode ser desfeita
              </p>
            </div>
          </div>
          
          <div class="mb-8">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ slotProps.message?.message }}
            </p>
          </div>
          
          <div class="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button 
              @click="slotProps.rejectCallback"
              class="px-6 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              @mouseenter="handleHover($event, 'Não, cancelar ação')"
              @mouseleave="handleLeave"
            >
              <i class="pi pi-times mr-2"></i>
              Não
            </button>
            <button 
              @click="slotProps.acceptCallback"
              class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              @mouseenter="handleHover($event, 'Sim, confirmar ação')"
              @mouseleave="handleLeave"
            >
              <i class="pi pi-check mr-2"></i>
              Sim
            </button>
          </div>
        </div>
      </template>
    </ConfirmDialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useCartStore, type CartItem } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { accessibilityService } from '../services/accessibility'

const router = useRouter()
const toast = useToast()
const confirm = useConfirm()
const cartStore = useCartStore()
const authStore = useAuthStore()

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace('.', ',')
}

const updateQuantity = (itemId: number, quantity: number): void => {
  const result = cartStore.updateQuantity(itemId, quantity)
  if (!result.success) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: result.message,
      life: 3000
    })
  }
}

const removeItem = (itemId: number): void => {
  const item = cartStore.items.find(i => i.id === itemId)
  if (!item) return
  
  confirm.require({
    message: `Deseja remover "${item.name}" do carrinho?`,
    header: 'Remover Item',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      cartStore.removeItem(itemId)
      toast.add({
        severity: 'success',
        summary: 'Item removido',
        detail: `${item.name} foi removido do carrinho.`,
        life: 3000
      })
    },
    reject: () => {}
  })
}

const openClearCartModal = (): void => {
  confirm.require({
    message: 'Tem certeza que deseja limpar todo o carrinho? Todos os itens serão removidos permanentemente.',
    header: 'Limpar Carrinho',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      cartStore.clearCart()
      toast.add({
        severity: 'success',
        summary: 'Carrinho limpo',
        detail: 'Todos os itens foram removidos do carrinho.',
        life: 3000
      })
    },
    reject: () => {}
  })
}

const checkout = (): void => {
  if (!authStore.isAuthenticated) {
    confirm.require({
      message: 'Você precisa estar logado para finalizar a compra. Deseja fazer login agora?',
      header: 'Login necessário',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        router.push('/login')
      },
      reject: () => {}
    })
    return
  }
  
  router.push('/checkout')
}

const handleHover = (event: MouseEvent, text: string): void => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = (): void => {
  accessibilityService.handleLeave()
}
</script>