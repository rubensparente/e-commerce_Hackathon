<template>
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Finalizar Compra</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Formulário de Pagamento e Endereço -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <!-- Endereço de Entrega -->
          <div class="mb-8">
            <h2 class="text-xl font-bold mb-4">Endereço de Entrega</h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">CEP *</label>
                <input
                  v-model="shippingForm.cep"
                  type="text"
                  placeholder="01234-567"
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @blur="buscarCep"
                />
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Endereço *</label>
                  <input
                    v-model="shippingForm.address"
                    type="text"
                    required
                    placeholder="Rua, Av., etc"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Número *</label>
                  <input
                    v-model="shippingForm.number"
                    type="text"
                    required
                    placeholder="123"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Complemento</label>
                <input
                  v-model="shippingForm.complement"
                  type="text"
                  placeholder="Apto, Bloco, Casa"
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Bairro *</label>
                  <input
                    v-model="shippingForm.neighborhood"
                    type="text"
                    required
                    placeholder="Bairro"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Cidade *</label>
                  <input
                    v-model="shippingForm.city"
                    type="text"
                    required
                    placeholder="Cidade"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Estado *</label>
                  <select
                    v-model="shippingForm.state"
                    required
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
              </div>
              
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  v-model="saveAddress"
                  id="saveAddress"
                  class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label for="saveAddress" class="text-sm text-gray-700 dark:text-gray-300">
                  Salvar este endereço para próximas compras
                </label>
              </div>
            </div>
          </div>
          
          <!-- Forma de Pagamento -->
          <div>
            <h2 class="text-xl font-bold mb-4">Forma de Pagamento</h2>
            
            <div class="space-y-4 mb-8">
              <div 
                @click="selectedPayment = 'transfer'"
                :class="[
                  'border-2 rounded-lg p-4 cursor-pointer transition',
                  selectedPayment === 'transfer' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                ]"
              >
                <div class="flex items-center gap-3">
                  <i class="pi pi-credit-card text-2xl text-blue-600"></i>
                  <div>
                    <h3 class="font-semibold">Transferência Bancária</h3>
                    <p class="text-sm text-gray-500">Pague via transferência bancária (TED/DOC)</p>
                  </div>
                  <div class="ml-auto">
                    <div class="w-5 h-5 rounded-full border-2" :class="selectedPayment === 'transfer' ? 'bg-blue-500 border-blue-500' : 'border-gray-300'"></div>
                  </div>
                </div>
              </div>
              
              <div 
                @click="selectedPayment = 'pix'"
                :class="[
                  'border-2 rounded-lg p-4 cursor-pointer transition',
                  selectedPayment === 'pix' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                ]"
              >
                <div class="flex items-center gap-3">
                  <i class="pi pi-qrcode text-2xl text-green-600"></i>
                  <div>
                    <h3 class="font-semibold">PIX</h3>
                    <p class="text-sm text-gray-500">Pague instantaneamente com PIX</p>
                  </div>
                  <div class="ml-auto">
                    <div class="w-5 h-5 rounded-full border-2" :class="selectedPayment === 'pix' ? 'bg-blue-500 border-blue-500' : 'border-gray-300'"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Dados da Transferência -->
          <div v-if="selectedPayment === 'transfer'" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 class="font-semibold text-lg mb-4">Dados para Transferência</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Banco:</span>
                <span class="font-medium">Nu Pagamento S.A - Instituição de Pagamento</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Código do Banco:</span>
                <span class="font-medium">0260</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Agência:</span>
                <span class="font-medium">0001</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Conta:</span>
                <span class="font-medium">54112818-2</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Titular:</span>
                <span class="font-medium">RCP Tecnologia LTDA</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600 dark:text-gray-400">CNPJ:</span>
                <span class="font-medium">12.345.678/0001-90</span>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div class="flex gap-2">
                <i class="pi pi-info-circle text-yellow-600 mt-1"></i>
                <p class="text-sm text-yellow-800 dark:text-yellow-400">
                  Após a transferência, envie o comprovante para <strong>financeiro@rcptecnologia.com.br</strong> 
                  e aguarde a confirmação em até 24h úteis.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Dados do PIX -->
          <div v-if="selectedPayment === 'pix'" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 class="font-semibold text-lg mb-4">Pagamento via PIX</h3>
            
            <div v-if="!paymentConfirmed" class="space-y-6">
              <div class="text-center">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 inline-block">
                  <img :src="qrCodeUrl" class="w-48 h-48 mx-auto" alt="QR Code PIX">
                </div>
              </div>
              
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Código PIX (Copia e Cola):</p>
                <div class="flex gap-2">
                  <input 
                    :value="pixCode" 
                    readonly 
                    class="flex-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm font-mono"
                  >
                  <button 
                    @click="copyPixCode"
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                  >
                    Copiar
                  </button>
                </div>
              </div>
              
              <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div class="flex gap-2">
                  <i class="pi pi-check-circle text-green-600 mt-1"></i>
                  <p class="text-sm text-green-800 dark:text-green-400">
                    Após o pagamento, a confirmação é automática. Aguarde alguns segundos.
                  </p>
                </div>
              </div>
              
              <button 
                @click="confirmPayment"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Já paguei
              </button>
            </div>
            
            <div v-else class="text-center py-8">
              <i class="pi pi-check-circle text-5xl text-green-500 mb-4"></i>
              <h3 class="text-xl font-bold text-green-600 mb-2">Pagamento Confirmado!</h3>
              <p class="text-gray-600 dark:text-gray-400">Seu pagamento foi confirmado. Processando seu pedido...</p>
            </div>
          </div>
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
              @click="finalizeOrder"
              :disabled="processing || !isAddressValid"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {{ processing ? 'Processando...' : 'Confirmar Pedido' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()
const authStore = useAuthStore()

const selectedPayment = ref('pix')
const processing = ref(false)
const paymentConfirmed = ref(false)
const qrCodeUrl = ref('')
const pixCode = ref('')
const saveAddress = ref(false)

// Formulário de endereço
const shippingForm = ref({
  cep: '',
  address: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: ''
})

// Validação do endereço
const isAddressValid = computed(() => {
  return shippingForm.value.address && 
         shippingForm.value.number && 
         shippingForm.value.neighborhood && 
         shippingForm.value.city && 
         shippingForm.value.state
})

// Buscar CEP via API ViaCEP
const buscarCep = async () => {
  const cep = shippingForm.value.cep.replace(/\D/g, '')
  if (cep.length !== 8) return
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()
    
    if (!data.erro) {
      shippingForm.value.address = data.logradouro || ''
      shippingForm.value.neighborhood = data.bairro || ''
      shippingForm.value.city = data.localidade || ''
      shippingForm.value.state = data.uf || ''
    } else {
      toast.add({
        severity: 'warn',
        summary: 'CEP não encontrado',
        detail: 'Verifique o CEP informado',
        life: 3000
      })
    }
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
  }
}

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace('.', ',')
}

const copyPixCode = () => {
  navigator.clipboard.writeText(pixCode.value)
  toast.add({
    severity: 'success',
    summary: 'Copiado!',
    detail: 'Código PIX copiado para a área de transferência',
    life: 3000
  })
}

const confirmPayment = () => {
  paymentConfirmed.value = true
  setTimeout(() => {
    finalizeOrder()
  }, 2000)
}

const generatePix = async () => {
  try {
    const amount = cartStore.grandTotal
    const pixPayload = `00020126580014BR.GOV.BCB.PIX0136chave.pix@rcptecnologia.com.br5204000053039865404${amount.toFixed(2)}5802BR5913RCP Tecnologia6009SAO PAULO62070503***6304E2C9`
    qrCodeUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixPayload)}`
    pixCode.value = pixPayload
  } catch (error) {
    console.error('Erro ao gerar PIX:', error)
  }
}

const finalizeOrder = async () => {
  if (!isAddressValid.value) {
    toast.add({
      severity: 'warn',
      summary: 'Endereço incompleto',
      detail: 'Preencha todos os campos do endereço de entrega',
      life: 3000
    })
    return
  }
  
  if (selectedPayment.value === 'pix' && !paymentConfirmed.value) {
    toast.add({
      severity: 'warn',
      summary: 'Aguarde',
      detail: 'Confirme o pagamento PIX antes de finalizar',
      life: 3000
    })
    return
  }
  
  processing.value = true
  
  try {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    // Montar endereço completo
    const fullAddress = `${shippingForm.value.address}, ${shippingForm.value.number}${shippingForm.value.complement ? ', ' + shippingForm.value.complement : ''} - ${shippingForm.value.neighborhood}`
    
    const orderData = {
      items: cartStore.items.map(item => ({
        product_id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: cartStore.getItemPrice(item),
        original_price: item.price,
        discount_percent: item.discount_percent || 0,
        image_url: item.image_url
      })),
      total: cartStore.grandTotal,
      subtotal: cartStore.subtotal,
      discount: cartStore.discount,
      shipping_cost: cartStore.shipping,
      payment_method: selectedPayment.value === 'pix' ? 'PIX' : 'Transferência Bancária',
      shipping_address: fullAddress,
      shipping_city: shippingForm.value.city,
      shipping_state: shippingForm.value.state,
      shipping_zip: shippingForm.value.cep
    }
    
    const response = await fetch('http://localhost:3000/api/clients/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    })
    
    const responseData = await response.json()
    
    if (!response.ok) {
      throw new Error(responseData.error || 'Erro ao processar pedido')
    }
    
    // Salvar endereço se marcado
    if (saveAddress.value) {
      await fetch('http://localhost:3000/api/clients/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...user,
          address: fullAddress,
          city: shippingForm.value.city,
          state: shippingForm.value.state,
          zip_code: shippingForm.value.cep
        })
      })
    }
    
    cartStore.clearCart()
    
    toast.add({
      severity: 'success',
      summary: 'Pedido confirmado!',
      detail: `Seu pedido #${responseData.orderNumber} foi realizado com sucesso`,
      life: 5000
    })
    
    setTimeout(() => {
      router.push('/orders')
    }, 2000)
    
  } catch (error: any) {
    console.error('Erro ao finalizar pedido:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error.message || 'Erro ao processar seu pedido. Tente novamente.',
      life: 5000
    })
  } finally {
    processing.value = false
  }
}

// Carregar endereço salvo do perfil
const loadSavedAddress = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/api/clients/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    if (response.ok) {
      const user = await response.json()
      if (user.address) {
        // Parse do endereço salvo
        const addressMatch = user.address.match(/^([^,]+),?\s*(\d+)(?:,\s*([^,]+))?\s*-\s*(.+)$/)
        if (addressMatch) {
          shippingForm.value.address = addressMatch[1]?.trim() || ''
          shippingForm.value.number = addressMatch[2]?.trim() || ''
          shippingForm.value.complement = addressMatch[3]?.trim() || ''
          shippingForm.value.neighborhood = addressMatch[4]?.trim() || ''
        } else {
          shippingForm.value.address = user.address || ''
        }
        shippingForm.value.city = user.city || ''
        shippingForm.value.state = user.state || ''
        shippingForm.value.cep = user.zip_code || ''
      }
    }
  } catch (error) {
    console.error('Erro ao carregar endereço salvo:', error)
  }
}

onMounted(() => {
  if (cartStore.totalItems === 0) {
    router.push('/cart')
  }
  generatePix()
  loadSavedAddress()
})
</script>