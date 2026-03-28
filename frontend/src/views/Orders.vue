<template>
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white" 
        @mouseenter="handleHover($event, 'Meus Pedidos - Lista de todos os seus pedidos')"
        @mouseleave="handleLeave">
      Meus Pedidos
    </h1>
    
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12" role="status" aria-label="Carregando pedidos">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span class="sr-only">Carregando seus pedidos...</span>
    </div>
    
    <!-- Nenhum pedido -->
    <div v-else-if="orders.length === 0" class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg"
         @mouseenter="handleHover($event, 'Você ainda não realizou nenhum pedido')"
         @mouseleave="handleLeave">
      <i class="pi pi-inbox text-5xl text-gray-400 mb-3" aria-hidden="true"></i>
      <p class="text-gray-500">Você ainda não realizou nenhum pedido.</p>
      <router-link 
        to="/" 
        class="mt-4 inline-block text-blue-600 hover:text-blue-800"
        @mouseenter="handleHover($event, 'Continuar comprando')"
        @mouseleave="handleLeave"
      >
        Continuar Comprando
      </router-link>
    </div>
    
    <!-- Lista de pedidos -->
    <div v-else class="space-y-6">
      <div 
        v-for="order in orders" 
        :key="order.id" 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        :aria-label="`Pedido ${order.order_number || order.id}, status ${getStatusText(order.status)}`"
        @mouseenter="handleHover($event, `Pedido ${order.order_number || order.id}, realizado em ${formatDate(order.created_at)}, total R$ ${formatPrice(order.total)}, status ${getStatusText(order.status)}`)" 
        @mouseleave="handleLeave"
      >
        <!-- Cabeçalho do pedido -->
        <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div class="flex flex-wrap justify-between items-center gap-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                <span @mouseenter="handleHover($event, 'Número do pedido')" @mouseleave="handleLeave">Pedido #</span>
                <span class="font-mono">{{ order.order_number || order.id }}</span>
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                <span @mouseenter="handleHover($event, 'Data do pedido')" @mouseleave="handleLeave">Realizado em</span>
                {{ formatDate(order.created_at) }}
              </p>
            </div>
            <div class="flex items-center gap-4">
              <span 
                :class="getStatusClass(order.status)"
                class="px-3 py-1 rounded-full text-sm font-semibold"
                :aria-label="`Status: ${getStatusText(order.status)}`"
                @mouseenter="handleHover($event, `Status do pedido: ${getStatusText(order.status)}`)" 
                @mouseleave="handleLeave"
              >
                {{ getStatusText(order.status) }}
              </span>
              <button 
                @click="openOrderDetails(order)"
                class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
                :aria-label="`Ver detalhes do pedido ${order.order_number || order.id}`"
                @mouseenter="handleHover($event, `Ver detalhes do pedido ${order.order_number || order.id}`)" 
                @mouseleave="handleLeave"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
        
        <!-- Itens do pedido (resumo) -->
        <div class="p-6">
          <div class="space-y-3">
            <div v-for="(item, idx) in (order.items || []).slice(0, 3)" :key="idx" class="flex items-center gap-4"
                 @mouseenter="handleHover($event, `${item.quantity} x ${item.product_name} - R$ ${formatPrice(item.price * item.quantity)}`)" 
                 @mouseleave="handleLeave">
              <img :src="item.image_url || '/placeholder-product.png'" class="w-12 h-12 object-cover rounded" :alt="item.product_name">
              <div class="flex-1">
                <p class="font-semibold text-gray-800 dark:text-white">{{ item.product_name }}</p>
                <p class="text-sm text-gray-500">{{ item.quantity }} x R$ {{ formatPrice(item.price) }}</p>
              </div>
              <p class="font-semibold text-blue-600">R$ {{ formatPrice(item.price * item.quantity) }}</p>
            </div>
            <div v-if="(order.items || []).length > 3" class="text-sm text-gray-500"
                 @mouseenter="handleHover($event, `+ ${order.items.length - 3} outros itens`)" 
                 @mouseleave="handleLeave">
              + {{ order.items.length - 3 }} outros itens
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400" @mouseenter="handleHover($event, 'Total do pedido')" @mouseleave="handleLeave">Total do pedido</span>
            <span class="text-xl font-bold text-blue-600" @mouseenter="handleHover($event, `R$ ${formatPrice(order.total)}`)" @mouseleave="handleLeave">R$ {{ formatPrice(order.total) }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal de Detalhes do Pedido -->
    <Dialog 
      v-model:visible="detailsModalVisible" 
      header="Detalhes do Pedido" 
      :modal="true" 
      :style="{ width: '90vw', maxWidth: '800px' }"
      :closable="true"
    >
      <div v-if="selectedOrder" class="space-y-6">
        <!-- Status do pedido -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
             @mouseenter="handleHover($event, 'Status do pedido')" 
             @mouseleave="handleLeave">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold">Status do Pedido</h3>
            <span 
              :class="getStatusClass(selectedOrder.status)"
              class="px-3 py-1 rounded-full text-sm font-semibold"
              :aria-label="`Status: ${getStatusText(selectedOrder.status)}`"
            >
              {{ getStatusText(selectedOrder.status) }}
            </span>
          </div>
          
          <!-- Timeline de status -->
          <div class="relative">
            <div class="flex justify-between">
              <div v-for="step in statusSteps" :key="step.status" class="flex flex-col items-center flex-1"
                   @mouseenter="handleHover($event, step.label)" 
                   @mouseleave="handleLeave">
                <div 
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center z-10',
                    getStepStatus(step.status) === 'completed' ? 'bg-green-500 text-white' :
                    getStepStatus(step.status) === 'current' ? 'bg-blue-500 text-white' :
                    'bg-gray-300 dark:bg-gray-600 text-gray-500'
                  ]"
                  :aria-label="step.label"
                >
                  <i :class="step.icon" class="text-sm"></i>
                </div>
                <p class="text-xs mt-2 text-center">{{ step.label }}</p>
              </div>
            </div>
            <div class="absolute top-4 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600 -mt-2">
              <div 
                class="h-full bg-green-500 transition-all duration-500"
                :style="{ width: statusProgress + '%' }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Informações do pedido -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
               @mouseenter="handleHover($event, 'Dados do pedido')" 
               @mouseleave="handleLeave">
            <h4 class="font-semibold mb-2">Dados do Pedido</h4>
            <div class="space-y-2 text-sm">
              <p><span class="text-gray-500">Número:</span> <span class="font-mono">{{ selectedOrder.order_number || selectedOrder.id }}</span></p>
              <p><span class="text-gray-500">Data:</span> {{ formatDate(selectedOrder.created_at) }}</p>
              <p><span class="text-gray-500">Pagamento:</span> {{ selectedOrder.payment_method || 'Não informado' }}</p>
              <p><span class="text-gray-500">Itens:</span> {{ (selectedOrder.items || []).length }} produtos</p>
            </div>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
               @mouseenter="handleHover($event, 'Endereço de entrega')" 
               @mouseleave="handleLeave">
            <h4 class="font-semibold mb-2">Endereço de Entrega</h4>
            <div class="space-y-2 text-sm">
              <p>{{ selectedOrder.shipping_address || 'Endereço não informado' }}</p>
              <p v-if="selectedOrder.shipping_city && selectedOrder.shipping_city !== ''">
                {{ selectedOrder.shipping_city }}{{ selectedOrder.shipping_state ? ', ' + selectedOrder.shipping_state : '' }}
              </p>
              <p v-if="selectedOrder.shipping_zip && selectedOrder.shipping_zip !== ''">{{ selectedOrder.shipping_zip }}</p>
            </div>
          </div>
        </div>
        
        <!-- Itens do pedido -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
             @mouseenter="handleHover($event, 'Itens do pedido')" 
             @mouseleave="handleLeave">
          <h4 class="font-semibold mb-4">Itens do Pedido</h4>
          <div class="space-y-3">
            <div v-for="item in (selectedOrder.items || [])" :key="item.id" class="flex items-center gap-4 py-2 border-b border-gray-200 dark:border-gray-600 last:border-0"
                 @mouseenter="handleHover($event, `${item.quantity} x ${item.product_name} - R$ ${formatPrice(item.price * item.quantity)}`)" 
                 @mouseleave="handleLeave">
              <img :src="item.image_url || '/placeholder-product.png'" class="w-16 h-16 object-cover rounded" :alt="item.product_name">
              <div class="flex-1">
                <p class="font-semibold text-gray-800 dark:text-white">{{ item.product_name }}</p>
                <p class="text-sm text-gray-500">Quantidade: {{ item.quantity }}</p>
                <p class="text-sm text-gray-500">Preço unitário: R$ {{ formatPrice(item.price) }}</p>
              </div>
              <p class="font-semibold text-blue-600">R$ {{ formatPrice(item.price * item.quantity) }}</p>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>R$ {{ formatPrice(selectedOrder.subtotal || selectedOrder.total) }}</span>
              </div>
              <div v-if="selectedOrder.discount && Number(selectedOrder.discount) > 0" class="flex justify-between text-sm text-green-600">
                <span>Descontos</span>
                <span>- R$ {{ formatPrice(selectedOrder.discount) }}</span>
              </div>
              <div v-if="selectedOrder.shipping_cost && Number(selectedOrder.shipping_cost) > 0" class="flex justify-between text-sm">
                <span>Frete</span>
                <span>R$ {{ formatPrice(selectedOrder.shipping_cost) }}</span>
              </div>
              <div class="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span class="text-blue-600">R$ {{ formatPrice(selectedOrder.total) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Botões de ação -->
        <div class="flex justify-end gap-3">
          <button 
            v-if="selectedOrder.status === 'pending'"
            @click="cancelOrder"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            :aria-label="`Cancelar pedido ${selectedOrder.order_number || selectedOrder.id}`"
            @mouseenter="handleHover($event, 'Cancelar este pedido')" 
            @mouseleave="handleLeave"
          >
            Cancelar Pedido
          </button>
          <button 
            @click="detailsModalVisible = false"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            @mouseenter="handleHover($event, 'Fechar detalhes do pedido')" 
            @mouseleave="handleLeave"
          >
            Fechar
          </button>
        </div>
      </div>
    </Dialog>
    
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import { accessibilityService } from '../services/accessibility'

interface OrderItem {
  id: number
  product_id: number
  product_name: string
  quantity: number
  price: number
  image_url?: string
}

interface Order {
  id: number
  order_number?: string
  total: number
  subtotal?: number
  discount?: number
  shipping_cost?: number
  status: string
  payment_method: string
  created_at: string
  items: OrderItem[]
  shipping_address?: string
  shipping_city?: string
  shipping_state?: string
  shipping_zip?: string
}

const toast = useToast()

const loading = ref(true)
const orders = ref<Order[]>([])
const detailsModalVisible = ref(false)
const selectedOrder = ref<Order | null>(null)
const statusProgress = ref(0)

const statusSteps = [
  { status: 'pending', label: 'Pedido Realizado', icon: 'pi pi-shopping-cart' },
  { status: 'processing', label: 'Processando', icon: 'pi pi-cog' },
  { status: 'shipped', label: 'Enviado', icon: 'pi pi-truck' },
  { status: 'delivered', label: 'Entregue', icon: 'pi pi-check-circle' }
]

const getStatusClass = (status: string): string => {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: string): string => {
  const texts: Record<string, string> = {
    pending: 'Pendente',
    processing: 'Processando',
    shipped: 'Enviado',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  }
  return texts[status] || status
}

const getStepStatus = (stepStatus: string): string => {
  if (!selectedOrder.value) return 'pending'
  
  const stepIndex = statusSteps.findIndex(s => s.status === stepStatus)
  const currentIndex = statusSteps.findIndex(s => s.status === selectedOrder.value.status)
  
  if (stepIndex < currentIndex) return 'completed'
  if (stepIndex === currentIndex) return 'current'
  return 'pending'
}

const formatPrice = (price: number | string): string => {
  const num = Number(price) || 0
  return num.toFixed(2).replace('.', ',')
}

const formatDate = (date: string): string => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleHover = (event: MouseEvent, text: string): void => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = (): void => {
  accessibilityService.handleLeave()
}

const loadOrders = async (): Promise<void> => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    
    const response = await fetch('http://localhost:3000/api/clients/orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erro ao carregar pedidos')
    }
    
    const data = await response.json()
    orders.value = data.map((order: Order) => ({
      ...order,
      items: order.items || []
    }))
    
  } catch (error) {
    console.error('Erro ao carregar pedidos:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error instanceof Error ? error.message : 'Erro ao carregar seus pedidos',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

const openOrderDetails = (order: Order): void => {
  selectedOrder.value = order
  
  const currentIndex = statusSteps.findIndex(s => s.status === order.status)
  statusProgress.value = (currentIndex / (statusSteps.length - 1)) * 100
  
  detailsModalVisible.value = true
}

const cancelOrder = async (): Promise<void> => {
  if (!confirm('Tem certeza que deseja cancelar este pedido?')) return
  
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/api/clients/orders/${selectedOrder.value?.id}/cancel`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.ok) {
      toast.add({
        severity: 'success',
        summary: 'Pedido cancelado',
        detail: 'Seu pedido foi cancelado com sucesso',
        life: 3000
      })
      detailsModalVisible.value = false
      loadOrders()
    } else {
      const error = await response.json()
      throw new Error(error.error || 'Erro ao cancelar pedido')
    }
  } catch (error) {
    console.error('Erro ao cancelar pedido:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error instanceof Error ? error.message : 'Erro ao cancelar pedido',
      life: 3000
    })
  }
}

onMounted(() => {
  loadOrders()
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