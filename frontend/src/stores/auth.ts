// frontend/src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref<any>(null)
  const isAuthenticated = ref(!!token.value)

  const setAuth = (newToken: string, userData: any) => {
    token.value = newToken
    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('userRole', userData.role)
    console.log('Auth store atualizado:', { token: newToken.substring(0, 20) + '...', user: userData })
  }

  const logout = () => {
    token.value = ''
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userRole')
    console.log('Logout realizado')
  }

  const login = async (email: string, password: string, role: string = 'client') => {
    try {
      console.log('Tentativa de login:', { email, role })
      const response = await api.post('/auth/login', { email, password, role })
      console.log('Resposta do login:', response.data)
      
      const { token: newToken, user: userData } = response.data
      setAuth(newToken, userData)
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('Erro no login:', error.response?.data || error.message)
      return { success: false, error: error.response?.data?.error || 'Erro no login' }
    }
  }

  const register = async (userData: any) => {
    try {
      console.log('Tentativa de registro:', { name: userData.name, email: userData.email })
      const response = await api.post('/auth/register', userData)
      console.log('Resposta do registro:', response.data)
      
      const { token: newToken, user: newUser } = response.data
      setAuth(newToken, newUser)
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('Erro no registro:', error.response?.data || error.message)
      return { success: false, error: error.response?.data?.error || 'Erro no cadastro' }
    }
  }

  // Carregar usuário do localStorage
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
      console.log('Usuário carregado do localStorage:', user.value)
    } catch (e) {
      console.error('Erro ao parsear user:', e)
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    logout,
    setAuth
  }
})