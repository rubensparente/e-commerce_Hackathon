import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  id: number
  product_id: number
  name: string
  price: number
  quantity: number
  image_url?: string
  discount_percent?: number
  stock: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((sum, item) => {
      const price = getItemPrice(item)
      return sum + (price * item.quantity)
    }, 0)
  })

  const discount = computed(() => {
    return items.value.reduce((sum, item) => {
      if (item.discount_percent) {
        const originalPrice = item.price
        const discountedPrice = originalPrice * (1 - item.discount_percent / 100)
        const itemDiscount = (originalPrice - discountedPrice) * item.quantity
        return sum + itemDiscount
      }
      return sum
    }, 0)
  })

  const total = computed(() => {
    return subtotal.value - discount.value
  })

  const shipping = computed(() => {
    return total.value > 500 ? 0 : 29.90
  })

  const grandTotal = computed(() => {
    return total.value + shipping.value
  })

  const getItemPrice = (item: CartItem): number => {
    if (item.discount_percent) {
      return item.price * (1 - item.discount_percent / 100)
    }
    return item.price
  }

  const loadCart = (): void => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        items.value = JSON.parse(savedCart)
      } catch (e) {
        console.error('Erro ao carregar carrinho:', e)
      }
    }
  }

  const saveCart = (): void => {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  const addItem = (product: any, quantity: number = 1): { success: boolean; message: string } => {
    const existingItem = items.value.find(item => item.product_id === product.id)
    
    if (existingItem) {
      if (existingItem.quantity + quantity > product.stock) {
        return { success: false, message: 'Quantidade excede o estoque disponível' }
      }
      existingItem.quantity += quantity
    } else {
      if (quantity > product.stock) {
        return { success: false, message: 'Quantidade excede o estoque disponível' }
      }
      items.value.push({
        id: Date.now(),
        product_id: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: quantity,
        image_url: product.image_url,
        discount_percent: product.discount_percent,
        stock: product.stock
      })
    }
    
    saveCart()
    return { success: true, message: 'Produto adicionado ao carrinho!' }
  }

  const removeItem = (itemId: number): void => {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
      items.value.splice(index, 1)
      saveCart()
    }
  }

  const updateQuantity = (itemId: number, quantity: number): { success: boolean; message: string } => {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeItem(itemId)
        return { success: true, message: 'Item removido' }
      } else if (quantity <= item.stock) {
        item.quantity = quantity
        saveCart()
        return { success: true, message: 'Quantidade atualizada' }
      } else {
        return { success: false, message: 'Quantidade excede o estoque disponível' }
      }
    }
    return { success: false, message: 'Item não encontrado' }
  }

  const clearCart = (): void => {
    items.value = []
    saveCart()
  }

  loadCart()

  return {
    items,
    totalItems,
    subtotal,
    discount,
    total,
    shipping,
    grandTotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemPrice
  }
})