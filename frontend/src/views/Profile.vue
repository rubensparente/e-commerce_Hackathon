<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Meu Perfil</h1>
      
      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      
      <!-- Conteúdo -->
      <div v-else>
        <!-- Admin não tem perfil de cliente -->
        <div v-if="isAdmin" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
          <i class="pi pi-info-circle text-4xl text-yellow-600 mb-3"></i>
          <h2 class="text-xl font-semibold text-yellow-800 dark:text-yellow-400 mb-2">Acesso como Administrador</h2>
          <p class="text-yellow-700 dark:text-yellow-500 mb-4">
            Você está logado como administrador. Os dados de perfil são gerenciados na área administrativa.
          </p>
          <router-link 
            to="/admin" 
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Ir para o Painel Administrativo
          </router-link>
        </div>
        
        <!-- Perfil do Cliente -->
        <div v-else>
          <!-- Abas -->
          <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav class="flex gap-4">
              <button
                @click="activeTab = 'profile'"
                :class="[
                  'px-4 py-2 font-medium transition',
                  activeTab === 'profile' 
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                ]"
              >
                <i class="pi pi-user mr-2"></i>
                Dados Pessoais
              </button>
              <button
                @click="activeTab = 'password'"
                :class="[
                  'px-4 py-2 font-medium transition',
                  activeTab === 'password' 
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                ]"
              >
                <i class="pi pi-key mr-2"></i>
                Alterar Senha
              </button>
            </nav>
          </div>
          
          <!-- Dados Pessoais -->
          <div v-if="activeTab === 'profile'" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nome *</label>
                  <input
                    v-model="profileForm.name"
                    type="text"
                    required
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email *</label>
                  <input
                    v-model="profileForm.email"
                    type="email"
                    required
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">CPF</label>
                  <input
                    v-model="profileForm.cpf"
                    type="text"
                    placeholder="123.456.789-00"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Telefone</label>
                  <input
                    v-model="profileForm.phone"
                    type="text"
                    placeholder="(11) 99999-9999"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Endereço</label>
                <input
                  v-model="profileForm.address"
                  type="text"
                  placeholder="Rua, número, bairro"
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Cidade</label>
                  <input
                    v-model="profileForm.city"
                    type="text"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Estado</label>
                  <select
                    v-model="profileForm.state"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">CEP</label>
                  <input
                    v-model="profileForm.zip_code"
                    type="text"
                    placeholder="01234-567"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="saving"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:bg-gray-400"
                >
                  {{ saving ? 'Salvando...' : 'Salvar Alterações' }}
                </button>
              </div>
            </form>
          </div>
          
          <!-- Alterar Senha -->
          <div v-if="activeTab === 'password'" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <form @submit.prevent="changePassword" class="space-y-6 max-w-md">
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Senha Atual *</label>
                <input
                  v-model="passwordForm.currentPassword"
                  type="password"
                  required
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nova Senha *</label>
                <input
                  v-model="passwordForm.newPassword"
                  type="password"
                  required
                  minlength="6"
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p class="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Confirmar Nova Senha *</label>
                <input
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  required
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div v-if="passwordError" class="text-red-500 text-sm">
                {{ passwordError }}
              </div>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="savingPassword"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:bg-gray-400"
                >
                  {{ savingPassword ? 'Alterando...' : 'Alterar Senha' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

interface UserProfile {
  id: number
  name: string
  email: string
  cpf?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  role?: string
}

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(true)
const saving = ref(false)
const savingPassword = ref(false)
const activeTab = ref('profile')
const passwordError = ref('')

const profileForm = ref<UserProfile>({
  id: 0,
  name: '',
  email: '',
  cpf: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip_code: ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isAdmin = computed(() => {
  return authStore.user?.role === 'admin' || authStore.user?.role === 'super_admin'
})

const loadProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('Usuário não autenticado')
    }
    
    const response = await fetch('http://localhost:3000/api/clients/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.status === 404) {
      // Admin não tem perfil de cliente, não é erro
      console.log('Usuário admin não possui perfil de cliente')
      return
    }
    
    if (!response.ok) {
      if (response.status === 401) {
        authStore.logout()
        router.push('/login')
        throw new Error('Sessão expirada. Faça login novamente.')
      }
      const error = await response.json()
      throw new Error(error.error || 'Erro ao carregar perfil')
    }
    
    const data = await response.json()
    profileForm.value = data
  } catch (error: any) {
    console.error('Erro ao carregar perfil:', error)
    // Não exibir alert para admin
    if (!isAdmin.value) {
      alert(error.message || 'Erro ao carregar perfil')
    }
  }
}

const updateProfile = async () => {
  saving.value = true
  try {
    const token = localStorage.getItem('token')
    
    const response = await fetch('http://localhost:3000/api/clients/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileForm.value)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erro ao atualizar perfil')
    }
    
    const data = await response.json()
    
    if (authStore.user) {
      authStore.user.name = profileForm.value.name
      authStore.user.email = profileForm.value.email
    }
    
    alert('Perfil atualizado com sucesso!')
  } catch (error: any) {
    console.error('Erro ao atualizar perfil:', error)
    alert(error.message || 'Erro ao atualizar perfil')
  } finally {
    saving.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = 'As senhas não conferem'
    return
  }
  
  if (passwordForm.value.newPassword.length < 6) {
    passwordError.value = 'A nova senha deve ter no mínimo 6 caracteres'
    return
  }
  
  passwordError.value = ''
  savingPassword.value = true
  
  try {
    const token = localStorage.getItem('token')
    
    const response = await fetch('http://localhost:3000/api/clients/me/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword
      })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erro ao alterar senha')
    }
    
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    
    alert('Senha alterada com sucesso!')
  } catch (error: any) {
    console.error('Erro ao alterar senha:', error)
    alert(error.message || 'Erro ao alterar senha')
  } finally {
    savingPassword.value = false
  }
}

onMounted(async () => {
  if (!isAdmin.value) {
    await loadProfile()
  }
  loading.value = false
})
</script>