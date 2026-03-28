<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white"
            @mouseenter="handleHover($event, 'Gerenciar Produtos - Cadastro, edição e exclusão de produtos')"
            @mouseleave="handleLeave">
          Gerenciar Produtos
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1"
           @mouseenter="handleHover($event, `${filteredProducts.length} produtos encontrados`)" 
           @mouseleave="handleLeave">
          Total: {{ filteredProducts.length }} produtos
        </p>
      </div>
      <button @click="openModal()" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-md hover:shadow-lg"
              :aria-label="'Adicionar novo produto'"
              @mouseenter="handleHover($event, 'Adicionar novo produto')" 
              @mouseleave="handleLeave">
        <i class="pi pi-plus" aria-hidden="true"></i>
        Novo Produto
      </button>
    </div>

    <!-- Busca -->
    <div class="mb-6">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Buscar produto por nome..."
        class="w-full max-w-md px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        :aria-label="'Buscar produtos'"
        @mouseenter="handleHover($event, 'Digite o nome do produto para buscar')" 
        @mouseleave="handleLeave"
      />
    </div>

    <!-- Lista de Produtos -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Imagem</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Categoria</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Preço</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estoque</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Marca</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="product in filteredProducts" :key="product.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                @mouseenter="handleHover($event, `Produto ${product.name}, preço R$ ${formatPrice(product.price)}, estoque ${product.stock} unidades, status ${product.active ? 'ativo' : 'inativo'}`)" 
                @mouseleave="handleLeave">
              <td class="px-4 py-4 text-sm text-gray-900 dark:text-white">{{ product.id }}</td>
              <td class="px-4 py-4">
                <img :src="product.image_url || '/placeholder-product.png'" 
                     class="w-10 h-10 object-cover rounded" 
                     :alt="`Imagem do produto ${product.name}`">
              </td>
              <td class="px-4 py-4 font-medium text-gray-900 dark:text-white">{{ product.name }}</td>
              <td class="px-4 py-4 text-gray-600 dark:text-gray-400">{{ product.category_name }}</td>
              <td class="px-4 py-4 text-gray-900 dark:text-white">R$ {{ formatPrice(product.price) }}</td>
              <td class="px-4 py-4 text-gray-900 dark:text-white">{{ product.stock }}</td>
              <td class="px-4 py-4 text-gray-600 dark:text-gray-400">{{ product.brand || '-' }}</td>
              <td class="px-4 py-4">
                <span :class="product.active ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'" 
                      class="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"
                      :aria-label="product.active ? 'Produto ativo' : 'Produto inativo'"
                      @mouseenter="handleHover($event, product.active ? 'Produto ativo' : 'Produto inativo')" 
                      @mouseleave="handleLeave">
                  <i :class="product.active ? 'pi pi-check-circle' : 'pi pi-times-circle'" class="text-xs" aria-hidden="true"></i>
                  {{ product.active ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <button @click="openModal(product)" 
                          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30"
                          :aria-label="`Editar produto ${product.name}`"
                          @mouseenter="handleHover($event, `Editar produto ${product.name}`)" 
                          @mouseleave="handleLeave"
                          title="Editar">
                    <i class="pi pi-pencil text-lg" aria-hidden="true"></i>
                  </button>
                  <button @click="deleteProduct(product.id)" 
                          class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30"
                          :aria-label="`Excluir produto ${product.name}`"
                          @mouseenter="handleHover($event, `Excluir produto ${product.name}`)" 
                          @mouseleave="handleLeave"
                          title="Excluir">
                    <i class="pi pi-trash text-lg" aria-hidden="true"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="9" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  @mouseenter="handleHover($event, 'Nenhum produto encontrado')" 
                  @mouseleave="handleLeave">
                <i class="pi pi-inbox text-4xl mb-2 block" aria-hidden="true"></i>
                Nenhum produto encontrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Produto -->
    <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto" @click.self="closeModal">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white"
              @mouseenter="handleHover($event, editingProduct ? 'Formulário de edição de produto' : 'Formulário de criação de produto')" 
              @mouseleave="handleLeave">
            {{ editingProduct ? 'Editar' : 'Novo' }} Produto
          </h2>
          <button @click="closeModal" 
                  class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition"
                  :aria-label="'Fechar'"
                  @mouseenter="handleHover($event, 'Fechar')" 
                  @mouseleave="handleLeave">
            <i class="pi pi-times text-xl" aria-hidden="true"></i>
          </button>
        </div>
        
        <form @submit.prevent="saveProduct" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nome do Produto *</label>
            <input v-model="form.name" type="text" required
                   class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                   placeholder="Ex: Processador Intel Core i9-13900K"
                   @mouseenter="handleHover($event, 'Digite o nome do produto')" @mouseleave="handleLeave">
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Descrição</label>
            <textarea v-model="form.description" rows="3"
                      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="Descrição detalhada do produto..."
                      @mouseenter="handleHover($event, 'Digite a descrição do produto')" @mouseleave="handleLeave"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Preço *</label>
              <input v-model.number="form.price" type="number" step="0.01" required
                     class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                     placeholder="0.00"
                     @mouseenter="handleHover($event, 'Digite o preço do produto')" @mouseleave="handleLeave">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Estoque *</label>
              <input v-model.number="form.stock" type="number" required
                     class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                     placeholder="0"
                     @mouseenter="handleHover($event, 'Digite a quantidade em estoque')" @mouseleave="handleLeave">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Categoria *</label>
              <select v-model="form.category_id" required
                      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      @mouseenter="handleHover($event, 'Selecione uma categoria')" @mouseleave="handleLeave">
                <option value="">Selecione uma categoria</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Marca</label>
              <input v-model="form.brand" type="text"
                     class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                     placeholder="Ex: Intel, AMD, NVIDIA, Corsair"
                     @mouseenter="handleHover($event, 'Digite a marca do produto')" @mouseleave="handleLeave">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Garantia</label>
              <input v-model="form.warranty" type="text"
                     class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                     placeholder="Ex: 12 meses, 3 anos"
                     @mouseenter="handleHover($event, 'Digite a garantia do produto')" @mouseleave="handleLeave">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">URL da Imagem</label>
              <input v-model="form.image_url" type="url"
                     class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                     placeholder="https://..."
                     @mouseenter="handleHover($event, 'Digite a URL da imagem')" @mouseleave="handleLeave">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Especificações Técnicas (JSON)</label>
            <textarea v-model="specificationsText" rows="4"
                      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 font-mono text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder='{"processador": "Intel Core i9", "memoria": "32GB DDR5", "armazenamento": "1TB SSD"}'
                      @mouseenter="handleHover($event, 'Digite as especificações em JSON')" @mouseleave="handleLeave"></textarea>
          </div>

          <div>
            <label class="flex items-center cursor-pointer gap-2">
              <input v-model="form.active" type="checkbox" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                     @mouseenter="handleHover($event, 'Marcar para ativar o produto')" @mouseleave="handleLeave">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Produto Ativo</span>
            </label>
          </div>

          <div v-if="form.image_url" class="mt-4">
            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Preview da Imagem</label>
            <img :src="form.image_url" class="max-w-full h-32 object-contain border rounded p-2" :alt="'Preview da imagem'">
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button type="button" @click="closeModal" 
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
                    @mouseenter="handleHover($event, 'Cancelar e fechar')" @mouseleave="handleLeave">
              Cancelar
            </button>
            <button type="submit" 
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-2"
                    @mouseenter="handleHover($event, editingProduct ? 'Salvar alterações' : 'Criar novo produto')" @mouseleave="handleLeave">
              <i class="pi pi-save" aria-hidden="true"></i>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { accessibilityService } from '../../services/accessibility'

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category_id: number
  category_name?: string
  image_url?: string
  brand?: string
  warranty?: string
  specifications?: any
  active: boolean
}

interface Category {
  id: number
  name: string
}

const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const modalOpen = ref(false)
const editingProduct = ref<Product | null>(null)
const specificationsText = ref('')
const searchTerm = ref('')

const form = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category_id: '',
  image_url: '',
  brand: '',
  warranty: '',
  specifications: {},
  active: true
})

const filteredProducts = computed(() => {
  if (!searchTerm.value) return products.value
  const term = searchTerm.value.toLowerCase()
  return products.value.filter(product => product.name.toLowerCase().includes(term))
})

const handleHover = (event: MouseEvent, text: string): void => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = (): void => {
  accessibilityService.handleLeave()
}

const formatPrice = (price: any): string => {
  const num = Number(price) || 0
  return num.toFixed(2).replace('.', ',')
}

const loadProducts = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/api/products', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    products.value = await response.json()
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }
}

const loadCategories = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3000/api/categories')
    categories.value = await response.json()
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
  }
}

const openModal = (product?: Product): void => {
  if (product) {
    editingProduct.value = product
    form.value = {
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      stock: product.stock,
      category_id: product.category_id,
      image_url: product.image_url || '',
      brand: product.brand || '',
      warranty: product.warranty || '',
      specifications: product.specifications || {},
      active: product.active === 1 || product.active === true
    }
    specificationsText.value = product.specifications ? JSON.stringify(product.specifications, null, 2) : ''
  } else {
    editingProduct.value = null
    form.value = {
      name: '', description: '', price: 0, stock: 0, category_id: '',
      image_url: '', brand: '', warranty: '', specifications: {}, active: true
    }
    specificationsText.value = ''
  }
  modalOpen.value = true
}

const closeModal = (): void => {
  modalOpen.value = false
  editingProduct.value = null
}

const saveProduct = async (): Promise<void> => {
  if (!form.value.name || !form.value.price || !form.value.category_id) {
    alert('Preencha os campos obrigatórios: Nome, Preço e Categoria')
    return
  }
  
  try {
    const token = localStorage.getItem('token')
    const url = editingProduct.value 
      ? `http://localhost:3000/api/admin/products/${editingProduct.value.id}`
      : 'http://localhost:3000/api/admin/products'
    const method = editingProduct.value ? 'PUT' : 'POST'
    
    let specifications = {}
    if (specificationsText.value) {
      try { specifications = JSON.parse(specificationsText.value) } catch(e) {}
    }
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...form.value, price: Number(form.value.price), stock: Number(form.value.stock), specifications })
    })
    
    if (response.ok) {
      closeModal()
      loadProducts()
      alert(editingProduct.value ? 'Produto atualizado!' : 'Produto criado!')
    }
  } catch (error) {
    console.error('Erro ao salvar:', error)
    alert('Erro ao salvar produto')
  }
}

const deleteProduct = async (id: number): Promise<void> => {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return
  
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    if (response.ok) {
      loadProducts()
      alert('Produto excluído!')
    }
  } catch (error) {
    console.error('Erro ao excluir:', error)
    alert('Erro ao excluir produto')
  }
}

onMounted(() => {
  loadProducts()
  loadCategories()
})
</script>