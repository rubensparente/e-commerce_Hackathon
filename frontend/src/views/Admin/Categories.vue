<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white"
            @mouseenter="handleHover($event, 'Gerenciar Categorias - Organização dos produtos')"
            @mouseleave="handleLeave">
          Gerenciar Categorias
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1"
           @mouseenter="handleHover($event, `${filteredCategories.length} de ${categories.length} categorias exibidas`)" 
           @mouseleave="handleLeave">
          Total: {{ categories.length }} categorias
        </p>
      </div>
      <button @click="openModal()" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :aria-label="'Adicionar nova categoria'"
              @mouseenter="handleHover($event, 'Adicionar nova categoria')" 
              @mouseleave="handleLeave">
        <i class="pi pi-plus" aria-hidden="true"></i>
        Nova Categoria
      </button>
    </div>

    <!-- BUSCA - Mesmo padrão das ofertas -->
    <div class="mb-4">
      <div class="relative">
        <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
        <input
          v-model="search"
          type="text"
          placeholder="Pesquisar por nome da categoria ou descrição..."
          class="w-full md:w-96 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg p-2 
                 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          @mouseenter="handleHover($event, 'Digite o nome ou descrição para buscar categorias')"
          @mouseleave="handleLeave"
        />
      </div>
    </div>

    <!-- Lista de Categorias -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  @mouseenter="handleHover($event, 'ID da categoria')" 
                  @mouseleave="handleLeave">ID</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  @mouseenter="handleHover($event, 'Nome da categoria')" 
                  @mouseleave="handleLeave">Nome</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  @mouseenter="handleHover($event, 'Descrição da categoria')" 
                  @mouseleave="handleLeave">Descrição</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  @mouseenter="handleHover($event, 'Status da categoria')" 
                  @mouseleave="handleLeave">Status</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  @mouseenter="handleHover($event, 'Ações disponíveis')" 
                  @mouseleave="handleLeave">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="category in filteredCategories" :key="category.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                @mouseenter="handleHover($event, `Categoria ${category.name} - ${category.description || 'Sem descrição'}, status ${category.active ? 'ativo' : 'inativo'}`)" 
                @mouseleave="handleLeave">
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">{{ category.id }}</td>
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ category.name }}</td>
              <td class="px-6 py-4 text-gray-600 dark:text-gray-400">{{ category.description || '-' }}</td>
              <td class="px-6 py-4">
                <span 
                  :class="category.active ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'" 
                  class="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"
                  :aria-label="category.active ? 'Categoria ativa' : 'Categoria inativa'"
                  @mouseenter="handleHover($event, category.active ? 'Categoria ativa' : 'Categoria inativa')" 
                  @mouseleave="handleLeave">
                  <i :class="category.active ? 'pi pi-check-circle' : 'pi pi-times-circle'" class="text-xs" aria-hidden="true"></i>
                  {{ category.active ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button 
                    @click="openModal(category)" 
                    class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :aria-label="`Editar categoria ${category.name}`"
                    @mouseenter="handleHover($event, `Editar categoria ${category.name}`)" 
                    @mouseleave="handleLeave"
                    title="Editar">
                    <i class="pi pi-pencil text-lg" aria-hidden="true"></i>
                  </button>
                  <button 
                    @click="deleteCategory(category.id)" 
                    class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                    :aria-label="`Excluir categoria ${category.name}`"
                    @mouseenter="handleHover($event, `Excluir categoria ${category.name}`)" 
                    @mouseleave="handleLeave"
                    title="Excluir">
                    <i class="pi pi-trash text-lg" aria-hidden="true"></i>
                  </button>
                </div>
              </td>
            </tr>
            
            <!-- Loading -->
            <tr v-if="loading">
              <td colspan="5" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                <i class="pi pi-spin pi-spinner text-2xl mb-2 block" aria-hidden="true"></i>
                Carregando categorias...
              </td>
            </tr>
            
            <!-- Sem resultados na busca -->
            <tr v-else-if="filteredCategories.length === 0 && search">
              <td colspan="5" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  @mouseenter="handleHover($event, 'Nenhuma categoria encontrada com o termo pesquisado')" 
                  @mouseleave="handleLeave">
                <i class="pi pi-search text-4xl mb-2 block" aria-hidden="true"></i>
                Nenhuma categoria encontrada para "{{ search }}".
              </td>
            </tr>
            
            <!-- Nenhuma categoria cadastrada -->
            <tr v-else-if="categories.length === 0 && !loading">
              <td colspan="5" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  @mouseenter="handleHover($event, 'Nenhuma categoria cadastrada')" 
                  @mouseleave="handleLeave">
                <i class="pi pi-inbox text-4xl mb-2 block" aria-hidden="true"></i>
                Nenhuma categoria cadastrada. Clique em "Nova Categoria" para criar.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Categoria -->
    <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 max-w-md shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white"
              @mouseenter="handleHover($event, editingCategory ? 'Formulário de edição de categoria' : 'Formulário de criação de categoria')" 
              @mouseleave="handleLeave">
            {{ editingCategory ? 'Editar' : 'Nova' }} Categoria
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
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                   @mouseenter="handleHover($event, 'Nome da categoria - obrigatório')" 
                   @mouseleave="handleLeave">
              Nome *
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Ex: Processadores"
              :aria-label="'Nome da categoria'"
              @mouseenter="handleHover($event, 'Digite o nome da categoria')" 
              @mouseleave="handleLeave"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                   @mouseenter="handleHover($event, 'Descrição da categoria')" 
                   @mouseleave="handleLeave">
              Descrição
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Descrição da categoria"
              :aria-label="'Descrição da categoria'"
              @mouseenter="handleHover($event, 'Digite a descrição da categoria')" 
              @mouseleave="handleLeave"
            ></textarea>
          </div>
          
          <div>
            <label class="flex items-center cursor-pointer gap-2">
              <input
                v-model="form.active"
                type="checkbox"
                class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:outline-none"
                :aria-label="'Categoria ativa'"
                @mouseenter="handleHover($event, 'Marcar para ativar a categoria')" 
                @mouseleave="handleLeave"
              />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    @mouseenter="handleHover($event, 'Categoria ativa')" 
                    @mouseleave="handleLeave">
                Categoria Ativa
              </span>
            </label>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 mt-6">
          <button 
            @click="closeModal" 
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            :aria-label="'Cancelar'"
            @mouseenter="handleHover($event, 'Cancelar e fechar')" 
            @mouseleave="handleLeave">
            Cancelar
          </button>
          <button 
            @click="saveCategory" 
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :aria-label="editingCategory ? 'Salvar alterações da categoria' : 'Criar nova categoria'"
            @mouseenter="handleHover($event, editingCategory ? 'Salvar alterações da categoria' : 'Criar nova categoria')" 
            @mouseleave="handleLeave">
            <i class="pi pi-save" aria-hidden="true"></i>
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

interface Category {
  id: number
  name: string
  description?: string
  active: boolean | number
  created_at?: string
}

const categories = ref<Category[]>([])
const modalOpen = ref<boolean>(false)
const editingCategory = ref<Category | null>(null)
const loading = ref<boolean>(false)
const search = ref<string>('')

/* ================= BUSCA ================= */
const filteredCategories = computed(() => {
  if (!search.value) return categories.value

  const searchTerm = search.value.toLowerCase().trim()
  
  return categories.value.filter(category =>
    category.name.toLowerCase().includes(searchTerm) ||
    (category.description && category.description.toLowerCase().includes(searchTerm))
  )
})

const handleHover = (event: MouseEvent, text: string): void => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = (): void => {
  accessibilityService.handleLeave()
}

// Função para converter active para boolean
const isActive = (value: boolean | number): boolean => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value === 1
  return false
}

const loadCategories = async (): Promise<void> => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/api/admin/categories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Erro ao carregar categorias')
    }
    
    const data = await response.json()
    categories.value = data.map((cat: Category) => ({
      ...cat,
      active: isActive(cat.active)
    }))
    console.log('Categorias carregadas:', categories.value.length)
    accessibilityService.speak(`${categories.value.length} categorias carregadas`)
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
    alert('Erro ao carregar categorias')
    accessibilityService.speak('Erro ao carregar categorias')
  } finally {
    loading.value = false
  }
}

const openModal = (category?: Category): void => {
  if (category) {
    editingCategory.value = category
    form.value = {
      name: category.name,
      description: category.description || '',
      active: isActive(category.active)
    }
    accessibilityService.speak(`Editando categoria ${category.name}`)
  } else {
    editingCategory.value = null
    form.value = {
      name: '',
      description: '',
      active: true
    }
    accessibilityService.speak('Criando nova categoria')
  }
  modalOpen.value = true
}

const closeModal = (): void => {
  modalOpen.value = false
  editingCategory.value = null
  accessibilityService.speak('Formulário fechado')
}

const form = ref({
  name: '',
  description: '',
  active: true
})

const saveCategory = async (): Promise<void> => {
  if (!form.value.name.trim()) {
    alert('Nome da categoria é obrigatório')
    accessibilityService.speak('Nome da categoria é obrigatório')
    return
  }
  
  if (form.value.name.length < 3) {
    alert('O nome da categoria deve ter pelo menos 3 caracteres')
    accessibilityService.speak('O nome da categoria deve ter pelo menos 3 caracteres')
    return
  }
  
  try {
    const token = localStorage.getItem('token')
    const url = editingCategory.value 
      ? `http://localhost:3000/api/admin/categories/${editingCategory.value.id}`
      : 'http://localhost:3000/api/admin/categories'
    
    const method = editingCategory.value ? 'PUT' : 'POST'
    
    const payload = {
      name: form.value.name.trim(),
      description: form.value.description?.trim() || null,
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
      await loadCategories()
      const message = editingCategory.value ? 'Categoria atualizada com sucesso!' : 'Categoria criada com sucesso!'
      alert(message)
      accessibilityService.speak(message)
    } else {
      const error = await response.json()
      const errorMessage = error.error || 'Erro ao salvar categoria'
      alert(errorMessage)
      accessibilityService.speak(errorMessage)
    }
  } catch (error) {
    console.error('Erro ao salvar:', error)
    const errorMessage = 'Erro ao salvar categoria'
    alert(errorMessage)
    accessibilityService.speak(errorMessage)
  }
}

const deleteCategory = async (id: number): Promise<void> => {
  const confirmMessage = 'Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.'
  if (!confirm(confirmMessage)) {
    accessibilityService.speak('Exclusão cancelada')
    return
  }
  
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/api/admin/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.ok) {
      await loadCategories()
      const successMessage = 'Categoria excluída com sucesso!'
      alert(successMessage)
      accessibilityService.speak(successMessage)
    } else {
      const error = await response.json()
      const errorMessage = error.error || 'Erro ao excluir categoria'
      alert(errorMessage)
      accessibilityService.speak(errorMessage)
    }
  } catch (error) {
    console.error('Erro ao excluir:', error)
    const errorMessage = 'Erro ao excluir categoria'
    alert(errorMessage)
    accessibilityService.speak(errorMessage)
  }
}

onMounted(() => {
  loadCategories()
})
</script>