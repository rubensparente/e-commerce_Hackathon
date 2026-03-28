```vue
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white"
            @mouseenter="handleHover($event, 'Gerenciar Administradores - Controle de acesso ao sistema')"
            @mouseleave="handleLeave">
          Gerenciar Administradores
        </h1>

        <p class="text-gray-600 dark:text-gray-400 mt-1"
           @mouseenter="handleHover($event, `${admins.length} administradores encontrados`)"
           @mouseleave="handleLeave">
          Total: {{ admins.length }} administradores
        </p>
      </div>

      <button @click="openModal()" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              @mouseenter="handleHover($event, 'Adicionar novo administrador')" 
              @mouseleave="handleLeave">
        <i class="pi pi-plus"></i>
        Novo Administrador
      </button>
    </div>

    <!-- BUSCA -->
    <div class="mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="Pesquisar por nome ou email..."
        class="w-full md:w-80 border border-gray-300 dark:border-gray-600 rounded-lg p-2 
               dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        @mouseenter="handleHover($event, 'Digite para pesquisar administradores por nome ou email')"
        @mouseleave="handleLeave"
      />
    </div>

    <!-- TABELA -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="px-4 py-3 text-left">ID</th>
            <th class="px-4 py-3 text-left">Nome</th>
            <th class="px-4 py-3 text-left">Email</th>
            <th class="px-4 py-3 text-left">Role</th>
            <th class="px-4 py-3 text-left">Criado</th>
            <th class="px-4 py-3 text-left">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="admin in filteredAdmins" :key="admin.id"
              class="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
              @mouseenter="handleHover($event, `Administrador ${admin.name}, email ${admin.email}`)"
              @mouseleave="handleLeave">

            <td class="px-4 py-3">{{ admin.id }}</td>
            <td class="px-4 py-3">{{ admin.name }}</td>
            <td class="px-4 py-3">{{ admin.email }}</td>

            <td class="px-4 py-3">
              <span class="px-2 py-1 text-xs rounded"
                    :class="admin.role === 'super_admin' 
                      ? 'bg-purple-200 text-purple-800' 
                      : 'bg-blue-200 text-blue-800'">
                {{ admin.role }}
              </span>
            </td>

            <td class="px-4 py-3">
              {{ formatDate(admin.created_at) }}
            </td>

            <td class="px-4 py-3 flex gap-2">
              <button @click="openModal(admin)"
                      @mouseenter="handleHover($event, 'Editar administrador')"
                      @mouseleave="handleLeave">
                <i class="pi pi-pencil text-blue-600"></i>
              </button>

              <button @click="deleteAdmin(admin.id)"
                      @mouseenter="handleHover($event, 'Excluir administrador')"
                      @mouseleave="handleLeave">
                <i class="pi pi-trash text-red-600"></i>
              </button>

              <button @click="openPasswordModal(admin)"
                      @mouseenter="handleHover($event, 'Alterar senha')"
                      @mouseleave="handleLeave">
                <i class="pi pi-key text-yellow-600"></i>
              </button>
            </td>
          </tr>

          <!-- SEM RESULTADO -->
          <tr v-if="filteredAdmins.length === 0">
            <td colspan="6" class="text-center py-10 text-gray-500">
              <i class="pi pi-search text-3xl block mb-2"></i>
              Nenhum administrador encontrado.
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <!-- MODAL ADMIN -->
    <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">

        <h2 class="text-xl font-bold mb-4">
          {{ editingAdmin ? 'Editar' : 'Novo' }} Administrador
        </h2>

        <input v-model="form.name" placeholder="Nome" class="input" />
        <input v-model="form.email" placeholder="Email" class="input" />
        <input v-if="!editingAdmin" v-model="form.password" placeholder="Senha" type="password" class="input" />

        <select v-model="form.role" class="input">
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>

        <div class="flex justify-end gap-2 mt-4">
          <button @click="closeModal">Cancelar</button>
          <button @click="saveAdmin" class="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
        </div>
      </div>
    </div>

    <!-- MODAL SENHA -->
    <div v-if="passwordModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">

        <h2 class="text-xl font-bold mb-4">Alterar Senha</h2>

        <input v-model="passwordForm.newPassword" type="password" placeholder="Nova senha" class="input" />
        <input v-model="passwordForm.confirmPassword" type="password" placeholder="Confirmar senha" class="input" />

        <div v-if="passwordError" class="text-red-500 text-sm">
          {{ passwordError }}
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button @click="closePasswordModal">Cancelar</button>
          <button @click="changePassword" class="bg-yellow-600 text-white px-4 py-2 rounded">
            Alterar
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { accessibilityService } from '../../services/accessibility'

interface Admin {
  id: number
  name: string
  email: string
  role: string
  created_at: string
}

const admins = ref<Admin[]>([])
const search = ref('')

const modalOpen = ref(false)
const passwordModalOpen = ref(false)
const editingAdmin = ref<Admin | null>(null)
const selectedAdmin = ref<Admin | null>(null)
const passwordError = ref('')

const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'admin'
})

const passwordForm = ref({
  newPassword: '',
  confirmPassword: ''
})

const filteredAdmins = computed(() => {
  if (!search.value) return admins.value

  return admins.value.filter(admin =>
    admin.name.toLowerCase().includes(search.value.toLowerCase()) ||
    admin.email.toLowerCase().includes(search.value.toLowerCase())
  )
})

const handleHover = (event: MouseEvent, text: string) => {
  accessibilityService.handleHover(event.currentTarget as HTMLElement, text)
}

const handleLeave = () => {
  accessibilityService.handleLeave()
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const loadAdmins = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch('http://localhost:3000/api/admin/admins', {
    headers: { Authorization: `Bearer ${token}` }
  })
  admins.value = await res.json()
}

const openModal = (admin?: Admin) => {
  if (admin) {
    editingAdmin.value = admin
    form.value = { ...admin, password: '' }
  } else {
    editingAdmin.value = null
    form.value = { name: '', email: '', password: '', role: 'admin' }
  }
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const saveAdmin = async () => {
  const token = localStorage.getItem('token')

  const url = editingAdmin.value
    ? `http://localhost:3000/api/admin/admins/${editingAdmin.value.id}`
    : 'http://localhost:3000/api/admin/admins'

  await fetch(url, {
    method: editingAdmin.value ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(form.value)
  })

  closeModal()
  loadAdmins()
}

const deleteAdmin = async (id: number) => {
  if (!confirm('Deseja excluir?')) return

  const token = localStorage.getItem('token')

  await fetch(`http://localhost:3000/api/admin/admins/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })

  loadAdmins()
}

const openPasswordModal = (admin: Admin) => {
  selectedAdmin.value = admin
  passwordModalOpen.value = true
}

const closePasswordModal = () => {
  passwordModalOpen.value = false
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = 'Senhas não conferem'
    return
  }

  const token = localStorage.getItem('token')

  await fetch(`http://localhost:3000/api/admin/admins/${selectedAdmin.value?.id}/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ password: passwordForm.value.newPassword })
  })

  closePasswordModal()
}

onMounted(loadAdmins)
</script>

<style>
.input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>