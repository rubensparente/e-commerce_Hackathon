<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white"
            @mouseenter="handleHover($event, 'Gerenciar Clientes - Cadastro e gerenciamento de clientes')"
            @mouseleave="handleLeave">
          Gerenciar Clientes
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1"
           @mouseenter="handleHover($event, `${filteredClients.length} clientes encontrados`)" 
           @mouseleave="handleLeave">
          Total: {{ filteredClients.length }} clientes
        </p>
      </div>
      <button @click="openModal()" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-md hover:shadow-lg"
              :aria-label="'Adicionar novo cliente'"
              @mouseenter="handleHover($event, 'Adicionar novo cliente')" 
              @mouseleave="handleLeave">
        <i class="pi pi-plus" aria-hidden="true"></i>
        Novo Cliente
      </button>
    </div>

    <!-- Busca -->
    <div class="mb-6">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Buscar cliente por nome ou email..."
        class="w-full max-w-md px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        :aria-label="'Buscar clientes'"
        @mouseenter="handleHover($event, 'Digite o nome ou email do cliente para buscar')" 
        @mouseleave="handleLeave"
      />
    </div>

    <!-- Lista de Clientes -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">CPF</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Telefone</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cidade</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cadastro</th>
              <th class="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="client in filteredClients" :key="client.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                @mouseenter="handleHover($event, `Cliente ${client.name}, email ${client.email}, CPF ${client.cpf || 'não informado'}, telefone ${client.phone || 'não informado'}, cidade ${client.city || 'não informada'}, cadastrado em ${formatDate(client.created_at)}`)" 
                @mouseleave="handleLeave">
              <td class="px-4 py-4 text-sm text-gray-900 dark:text-white">{{ client.id }}</td>
              <td class="px-4 py-4 font-medium text-gray-900 dark:text-white">{{ client.name }}</td>
              <td class="px-4 py-4 text-gray-600 dark:text-gray-400">{{ client.email }}</td>
              <td class="px-4 py-4 text-gray-900 dark:text-white">{{ client.cpf || '-' }}</td>
              <td class="px-4 py-4 text-gray-900 dark:text-white">{{ client.phone || '-' }}</td>
              <td class="px-4 py-4 text-gray-600 dark:text-gray-400">{{ client.city || '-' }}</td>
              <td class="px-4 py-4 text-gray-600 dark:text-gray-400"
                  @mouseenter="handleHover($event, `Cadastrado em ${formatDate(client.created_at)}`)" 
                  @mouseleave="handleLeave">
                {{ formatDate(client.created_at) }}
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <button @click="openModal(client)" 
                          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30"
                          :aria-label="`Editar cliente ${client.name}`"
                          @mouseenter="handleHover($event, `Editar cliente ${client.name}`)" 
                          @mouseleave="handleLeave"
                          title="Editar">
                    <i class="pi pi-pencil text-lg" aria-hidden="true"></i>
                  </button>
                  <button @click="deleteClient(client.id)" 
                          class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30"
                          :aria-label="`Excluir cliente ${client.name}`"
                          @mouseenter="handleHover($event, `Excluir cliente ${client.name}`)" 
                          @mouseleave="handleLeave"
                          title="Excluir">
                    <i class="pi pi-trash text-lg" aria-hidden="true"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredClients.length === 0">
              <td colspan="8" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  @mouseenter="handleHover($event, 'Nenhum cliente encontrado')" 
                  @mouseleave="handleLeave">
                <i class="pi pi-inbox text-4xl mb-2 block" aria-hidden="true"></i>
                Nenhum cliente encontrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Cliente -->
    <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto" @click.self="closeModal">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white"
              @mouseenter="handleHover($event, editingClient ? 'Formulário de edição de cliente' : 'Formulário de criação de cliente')" 
              @mouseleave="handleLeave">
            {{ editingClient ? 'Editar' : 'Novo' }} Cliente
          </h2>
          <button @click="closeModal" 
                  class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition"
                  :aria-label="'Fechar'"
                  @mouseenter="handleHover($event, 'Fechar')" 
                  @mouseleave="handleLeave">
            <i class="pi pi-times text-xl" aria-hidden="true"></i>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nome *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Nome completo"
              @mouseenter="handleHover($event, 'Digite o nome completo do cliente')" 
              @mouseleave="handleLeave"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email *</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="email@exemplo.com"
              @mouseenter="handleHover($event, 'Digite o email do cliente')" 
              @mouseleave="handleLeave"
            />
          </div>
          
          <div v-if="!editingClient">
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Senha *</label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Mínimo de 6 caracteres"
              @mouseenter="handleHover($event, 'Digite a senha do cliente')" 
              @mouseleave="handleLeave"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">CPF</label>
              <input
                v-model="form.cpf"
                type="text"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="123.456.789-00"
                @mouseenter="handleHover($event, 'Digite o CPF do cliente')" 
                @mouseleave="handleLeave"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Telefone</label>
              <input
                v-model="form.phone"
                type="text"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="(11) 99999-9999"
                @mouseenter="handleHover($event, 'Digite o telefone do cliente')" 
                @mouseleave="handleLeave"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Endereço</label>
            <input
              v-model="form.address"
              type="text"
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Rua, número, bairro"
              @mouseenter="handleHover($event, 'Digite o endereço do cliente')" 
              @mouseleave="handleLeave"
            />
          </div>
          
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Cidade</label>
              <input
                v-model="form.city"
                type="text"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Cidade"
                @mouseenter="handleHover($event, 'Digite a cidade do cliente')" 
                @mouseleave="handleLeave"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">UF</label>
              <input
                v-model="form.state"
                type="text"
                maxlength="2"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="SP"
                @mouseenter="handleHover($event, 'Digite a sigla do estado')" 
                @mouseleave="handleLeave"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">CEP</label>
              <input
                v-model="form.zip_code"
                type="text"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="01234-567"
                @mouseenter="handleHover($event, 'Digite o CEP do cliente')" 
                @mouseleave="handleLeave"
              />
            </div>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 mt-6">
          <button type="button" @click="closeModal" 
                  class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
                  @mouseenter="handleHover($event, 'Cancelar e fechar')" 
                  @mouseleave="handleLeave">
            Cancelar
          </button>
          <button @click="saveClient" 
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-2"
                  @mouseenter="handleHover($event, editingClient ? 'Salvar alterações' : 'Criar novo cliente')" 
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

const clients = ref<any[]>([])
const searchTerm = ref('')
const modalOpen = ref(false)
const editingClient = ref<any>(null)
const form = ref({
  name: '',
  email: '',
  password: '',
  cpf: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip_code: ''
})

const handleHover = (event: MouseEvent, text: string): void => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = (): void => {
  accessibilityService.handleLeave()
}

const filteredClients = computed(() => {
  if (!searchTerm.value) return clients.value
  const term = searchTerm.value.toLowerCase()
  return clients.value.filter(client => 
    client.name.toLowerCase().includes(term) ||
    client.email.toLowerCase().includes(term)
  )
})

const formatDate = (date: string) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR')
}

const loadClients = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/api/admin/clients', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    clients.value = await response.json()
  } catch (error) {
    console.error('Erro ao carregar clientes:', error)
  }
}

const openModal = (client?: any) => {
  if (client) {
    editingClient.value = client
    form.value = {
      name: client.name,
      email: client.email,
      password: '',
      cpf: client.cpf || '',
      phone: client.phone || '',
      address: client.address || '',
      city: client.city || '',
      state: client.state || '',
      zip_code: client.zip_code || ''
    }
  } else {
    editingClient.value = null
    form.value = {
      name: '',
      email: '',
      password: '',
      cpf: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip_code: ''
    }
  }
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  editingClient.value = null
}

const saveClient = async () => {
  if (!form.value.name || !form.value.email) {
    alert('Nome e email são obrigatórios')
    return
  }
  
  if (!editingClient.value && !form.value.password) {
    alert('Senha é obrigatória para novos clientes')
    return
  }
  
  try {
    const token = localStorage.getItem('token')
    const url = editingClient.value 
      ? `http://localhost:3000/api/admin/clients/${editingClient.value.id}`
      : 'http://localhost:3000/api/admin/clients'
    
    const method = editingClient.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form.value)
    })
    
    if (response.ok) {
      closeModal()
      loadClients()
      alert(editingClient.value ? 'Cliente atualizado!' : 'Cliente criado!')
    } else {
      const error = await response.json()
      alert(error.error || 'Erro ao salvar')
    }
  } catch (error) {
    console.error('Erro ao salvar:', error)
    alert('Erro ao salvar cliente')
  }
}

const deleteClient = async (id: number) => {
  if (!confirm('Tem certeza que deseja excluir este cliente?')) return
  
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/api/admin/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.ok) {
      loadClients()
      alert('Cliente excluído!')
    } else {
      const error = await response.json()
      alert(error.error || 'Erro ao excluir cliente')
    }
  } catch (error) {
    console.error('Erro ao excluir:', error)
    alert('Erro ao excluir cliente')
  }
}

onMounted(() => {
  loadClients()
})
</script>