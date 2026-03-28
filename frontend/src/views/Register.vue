<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          RCP Tecnologia
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Crie sua conta
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo *</label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="Seu nome completo"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">E-mail *</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha *</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="******"
            />
          </div>
          
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar senha *</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="******"
            />
          </div>
          
          <div>
            <label for="cpf" class="block text-sm font-medium text-gray-700 dark:text-gray-300">CPF</label>
            <input
              id="cpf"
              v-model="cpf"
              type="text"
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="123.456.789-00"
            />
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
            <input
              id="phone"
              v-model="phone"
              type="text"
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded">
          {{ errorMessage }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition"
          >
            {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Já tem uma conta?
            <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
              Faça login
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const cpf = ref('')
const phone = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  // Limpar mensagem de erro
  errorMessage.value = ''
  
  // Validações
  if (!name.value.trim()) {
    errorMessage.value = 'Nome é obrigatório'
    return
  }
  
  if (!email.value.trim()) {
    errorMessage.value = 'E-mail é obrigatório'
    return
  }
  
  if (!password.value) {
    errorMessage.value = 'Senha é obrigatória'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'As senhas não conferem'
    return
  }
  
  if (password.value.length < 6) {
    errorMessage.value = 'A senha deve ter no mínimo 6 caracteres'
    return
  }
  
  loading.value = true
  
  try {
    const userData = {
      name: name.value.trim(),
      email: email.value.trim().toLowerCase(),
      password: password.value,
      cpf: cpf.value || null,
      phone: phone.value || null
    }
    
    console.log('Enviando dados de registro:', userData)
    
    const result = await authStore.register(userData)
    
    console.log('Resultado do registro:', result)
    
    if (result.success) {
      // Redirecionar para a página inicial após cadastro bem-sucedido
      router.push('/')
    } else {
      errorMessage.value = result.error || 'Erro ao cadastrar. Tente novamente.'
    }
  } catch (error: any) {
    console.error('Erro no cadastro:', error)
    errorMessage.value = error.message || 'Erro ao cadastrar. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>