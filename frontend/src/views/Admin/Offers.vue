<template>
  <div class="container mx-auto px-4 py-8">
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white"
            @mouseenter="handleHover($event, 'Gerenciar Ofertas - Promoções e descontos')"
            @mouseleave="handleLeave">
          Gerenciar Ofertas
        </h1>

        <p class="text-gray-600 dark:text-gray-400 mt-1"
           @mouseenter="handleHover($event, `${offers.length} ofertas cadastradas`)" 
           @mouseleave="handleLeave">
          Total: {{ offers.length }} ofertas
        </p>
      </div>

      <button @click="openModal()" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              @mouseenter="handleHover($event, 'Adicionar nova oferta')" 
              @mouseleave="handleLeave">
        <i class="pi pi-plus"></i>
        Nova Oferta
      </button>
    </div>

    <!-- BUSCA -->
    <div class="mb-4">
      <div class="relative">
        <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
        <input
          v-model="search"
          type="text"
          placeholder="Pesquisar por produto ou desconto..."
          class="w-full md:w-80 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg p-2 
                 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          @mouseenter="handleHover($event, 'Pesquisar ofertas')"
          @mouseleave="handleLeave"
        />
      </div>
    </div>

    <!-- TABELA -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">ID</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Produto</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Desconto</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Preço Original</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Validade</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Ações</th>
              </tr>
          </thead>

          <tbody>
            <tr v-for="offer in filteredOffers" :key="offer.id"
                class="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                @mouseenter="handleHover($event, `Oferta: ${offer.product_name}, desconto de ${offer.discount_percent}%, válida até ${formatDate(offer.end_date)}`)" 
                @mouseleave="handleLeave">
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">{{ offer.id }}</td>
              <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{{ offer.product_name }}</td>
              <td class="px-4 py-3 text-sm text-red-600 font-bold">-{{ offer.discount_percent }}%</td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">R$ {{ formatPrice(offer.original_price) }}</td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{{ formatDate(offer.end_date) }}</td>
              <td class="px-4 py-3">
                <span :class="offer.active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'" 
                      class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ offer.active ? 'Ativa' : 'Inativa' }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <button @click="openModal(offer)" 
                          class="text-blue-600 hover:text-blue-800 transition p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          :aria-label="`Editar oferta ${offer.product_name}`"
                          @mouseenter="handleHover($event, `Editar oferta ${offer.product_name}`)" 
                          @mouseleave="handleLeave">
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button @click="deleteOffer(offer.id)" 
                          class="text-red-600 hover:text-red-800 transition p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                          :aria-label="`Excluir oferta ${offer.product_name}`"
                          @mouseenter="handleHover($event, `Excluir oferta ${offer.product_name}`)" 
                          @mouseleave="handleLeave">
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- SEM RESULTADO -->
            <tr v-if="filteredOffers.length === 0">
              <td colspan="7" class="text-center py-10 text-gray-500 dark:text-gray-400">
                <i class="pi pi-search text-3xl block mb-2"></i>
                Nenhuma oferta encontrada.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL DE OFERTA (CRIAR/EDITAR) -->
    <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeModal">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white"
              @mouseenter="handleHover($event, editingOffer ? 'Editar oferta' : 'Criar nova oferta')" 
              @mouseleave="handleLeave">
            {{ editingOffer ? 'Editar' : 'Nova' }} Oferta
          </h2>
          <button @click="closeModal" 
                  class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-1"
                  :aria-label="'Fechar'"
                  @mouseenter="handleHover($event, 'Fechar')" 
                  @mouseleave="handleLeave">
            <i class="pi pi-times text-xl" aria-hidden="true"></i>
          </button>
        </div>
        
        <div class="space-y-4">
          <!-- Produto -->
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                   @mouseenter="handleHover($event, 'Selecione o produto para aplicar o desconto')" 
                   @mouseleave="handleLeave">
              Produto *
            </label>
            <select
              v-model="form.product_id"
              required
              class="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="!!editingOffer"
              :class="editingOffer ? 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed' : ''"
              @mouseenter="handleHover($event, editingOffer ? 'Produto não pode ser alterado após a criação' : 'Selecione um produto')" 
              @mouseleave="handleLeave"
            >
              <option value="">Selecione um produto</option>
              <option v-for="product in availableProducts" :key="product.id" :value="product.id">
                {{ product.name }} - R$ {{ formatPrice(product.price) }}
              </option>
            </select>
            <p v-if="editingOffer" class="text-xs text-gray-500 mt-1">
              * O produto não pode ser alterado após a criação da oferta
            </p>
            <p v-if="!editingOffer && availableProducts.length === 0" class="text-xs text-yellow-600 mt-1">
              * Não há produtos disponíveis para criar novas ofertas. Todos os produtos já possuem ofertas ativas.
            </p>
          </div>
          
          <!-- Desconto -->
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                   @mouseenter="handleHover($event, 'Percentual de desconto - mínimo 1%, máximo 99%')" 
                   @mouseleave="handleLeave">
              Percentual de Desconto (%) *
            </label>
            <input
              v-model.number="form.discount_percent"
              type="number"
              min="1"
              max="99"
              required
              class="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 10, 15, 20"
              @mouseenter="handleHover($event, 'Digite o percentual de desconto entre 1 e 99')" 
              @mouseleave="handleLeave"
            />
          </div>
          
          <!-- Data de Início -->
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                   @mouseenter="handleHover($event, 'Data de início da oferta')" 
                   @mouseleave="handleLeave">
              Data de Início *
            </label>
            <input
              v-model="form.start_date"
              type="date"
              required
              class="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              @mouseenter="handleHover($event, 'Selecione a data de início da oferta')" 
              @mouseleave="handleLeave"
            />
          </div>
          
          <!-- Data de Término -->
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                   @mouseenter="handleHover($event, 'Data de término da oferta')" 
                   @mouseleave="handleLeave">
              Data de Término *
            </label>
            <input
              v-model="form.end_date"
              type="date"
              required
              class="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              @mouseenter="handleHover($event, 'Selecione a data de término da oferta')" 
              @mouseleave="handleLeave"
            />
          </div>
          
          <!-- Status -->
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="form.active"
                type="checkbox"
                class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                :checked="form.active === true || form.active === 1"
                @change="(e) => form.active = e.target.checked"
                @mouseenter="handleHover($event, form.active ? 'Desativar oferta' : 'Ativar oferta')" 
                @mouseleave="handleLeave"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                Oferta Ativa
              </span>
            </label>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-6">
          <button @click="closeModal" 
                  class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  :aria-label="'Cancelar'"
                  @mouseenter="handleHover($event, 'Cancelar e fechar')" 
                  @mouseleave="handleLeave">
            Cancelar
          </button>
          <button @click="saveOffer" 
                  :disabled="!editingOffer && availableProducts.length === 0"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  :aria-label="editingOffer ? 'Salvar alterações da oferta' : 'Criar nova oferta'"
                  @mouseenter="handleHover($event, editingOffer ? 'Salvar alterações' : 'Criar oferta')" 
                  @mouseleave="handleLeave">
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { accessibilityService } from '../../services/accessibility'

interface Offer {
  id: number
  product_id: number
  product_name: string
  original_price: number
  discount_percent: number
  start_date: string
  end_date: string
  active: boolean | number
}

interface Product {
  id: number
  name: string
  price: number
}

const offers = ref<Offer[]>([])
const products = ref<Product[]>([])
const search = ref('')

const modalOpen = ref(false)
const editingOffer = ref<Offer | null>(null)

// Computed para produtos disponíveis (que não têm oferta ativa)
const availableProducts = computed(() => {
  if (editingOffer.value) {
    // Quando estiver editando, mostra todos os produtos (incluindo o atual)
    return products.value
  }
  
  // Quando for criar nova oferta, filtra apenas produtos sem oferta ativa
  const activeOfferProductIds = offers.value
    .filter(offer => toBoolean(offer.active))
    .map(offer => offer.product_id)
  
  return products.value.filter(product => !activeOfferProductIds.includes(product.id))
})

// Função auxiliar para converter active para booleano
const toBoolean = (value: boolean | number): boolean => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value === 1
  return false
}

const form = ref({
  product_id: '',
  discount_percent: 0,
  start_date: '',
  end_date: '',
  active: true
})

/* ================= BUSCA ================= */
const filteredOffers = computed(() => {
  if (!search.value) return offers.value

  return offers.value.filter(offer =>
    offer.product_name.toLowerCase().includes(search.value.toLowerCase()) ||
    String(offer.discount_percent).includes(search.value)
  )
})

/* ================= ACESSIBILIDADE ================= */
const handleHover = (event: MouseEvent, text: string) => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = () => {
  accessibilityService.handleLeave()
}

/* ================= UTIL ================= */
const formatPrice = (price: any): string => {
  return Number(price).toFixed(2).replace('.', ',')
}

const formatDate = (date: string): string => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR')
}

/* ================= API ================= */
const loadOffers = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:3000/api/admin/offers', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.ok) {
      const data = await res.json()
      // Converter active de número para booleano
      offers.value = data.map((offer: Offer) => ({
        ...offer,
        active: toBoolean(offer.active)
      }))
      accessibilityService.speak(`${offers.value.length} ofertas carregadas`)
    }
  } catch (error) {
    console.error('Erro ao carregar ofertas:', error)
    accessibilityService.speak('Erro ao carregar ofertas')
  }
}

const loadProducts = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/products')
    if (res.ok) {
      products.value = await res.json()
    }
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }
}

/* ================= CRUD ================= */
const openModal = (offer?: Offer) => {
  if (offer) {
    editingOffer.value = offer
    form.value = {
      product_id: String(offer.product_id),
      discount_percent: offer.discount_percent,
      start_date: offer.start_date.split('T')[0],
      end_date: offer.end_date.split('T')[0],
      active: toBoolean(offer.active)
    }
    accessibilityService.speak(`Editando oferta do produto ${offer.product_name}`)
  } else {
    editingOffer.value = null
    form.value = {
      product_id: '',
      discount_percent: 0,
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      active: true
    }
    accessibilityService.speak('Criando nova oferta')
  }
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  editingOffer.value = null
  accessibilityService.speak('Formulário fechado')
}

const saveOffer = async () => {
  // Validações
  if (!form.value.product_id) {
    alert('Selecione um produto')
    accessibilityService.speak('Selecione um produto')
    return
  }
  
  if (!form.value.discount_percent || form.value.discount_percent < 1 || form.value.discount_percent > 99) {
    alert('O desconto deve ser entre 1% e 99%')
    accessibilityService.speak('O desconto deve ser entre 1 e 99 por cento')
    return
  }
  
  if (!form.value.start_date) {
    alert('Selecione a data de início')
    accessibilityService.speak('Selecione a data de início')
    return
  }
  
  if (!form.value.end_date) {
    alert('Selecione a data de término')
    accessibilityService.speak('Selecione a data de término')
    return
  }
  
  if (new Date(form.value.end_date) <= new Date(form.value.start_date)) {
    alert('A data de término deve ser maior que a data de início')
    accessibilityService.speak('A data de término deve ser maior que a data de início')
    return
  }
  
  try {
    const token = localStorage.getItem('token')
    const url = editingOffer.value 
      ? `http://localhost:3000/api/admin/offers/${editingOffer.value.id}`
      : 'http://localhost:3000/api/admin/offers'
    
    const method = editingOffer.value ? 'PUT' : 'POST'
    
    const payload = {
      product_id: parseInt(form.value.product_id),
      discount_percent: form.value.discount_percent,
      start_date: form.value.start_date,
      end_date: form.value.end_date,
      active: form.value.active ? 1 : 0
    }
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    
    if (response.ok) {
      closeModal()
      await loadOffers()
      const message = editingOffer.value ? 'Oferta atualizada com sucesso!' : 'Oferta criada com sucesso!'
      alert(message)
      accessibilityService.speak(message)
    } else {
      const error = await response.json()
      const errorMessage = error.error || 'Erro ao salvar oferta'
      alert(errorMessage)
      accessibilityService.speak(errorMessage)
    }
  } catch (error) {
    console.error('Erro ao salvar:', error)
    alert('Erro ao salvar oferta')
    accessibilityService.speak('Erro ao salvar oferta')
  }
}

const deleteOffer = async (id: number) => {
  const confirmMessage = 'Tem certeza que deseja excluir esta oferta?'
  if (!confirm(confirmMessage)) {
    accessibilityService.speak('Exclusão cancelada')
    return
  }
  
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/api/admin/offers/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    
    if (response.ok) {
      await loadOffers()
      const successMessage = 'Oferta excluída com sucesso!'
      alert(successMessage)
      accessibilityService.speak(successMessage)
    } else {
      const error = await response.json()
      alert(error.error || 'Erro ao excluir oferta')
      accessibilityService.speak('Erro ao excluir oferta')
    }
  } catch (error) {
    console.error('Erro ao excluir:', error)
    alert('Erro ao excluir oferta')
    accessibilityService.speak('Erro ao excluir oferta')
  }
}

onMounted(() => {
  loadOffers()
  loadProducts()
})
</script>