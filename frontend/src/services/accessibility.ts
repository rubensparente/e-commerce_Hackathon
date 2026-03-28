import { ref, readonly } from 'vue'

class AccessibilityService {
  private static instance: AccessibilityService
  private hoverSpeechEnabled = ref(false)
  private speechSynthesis: SpeechSynthesis | null = null
  private hoverTimeout: NodeJS.Timeout | null = null
  private currentUtterance: SpeechSynthesisUtterance | null = null

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.speechSynthesis = window.speechSynthesis
    }
    this.loadSettings()
  }

  static getInstance(): AccessibilityService {
    if (!AccessibilityService.instance) {
      AccessibilityService.instance = new AccessibilityService()
    }
    return AccessibilityService.instance
  }

  private loadSettings(): void {
    const saved = localStorage.getItem('hoverSpeechEnabled')
    if (saved) {
      this.hoverSpeechEnabled.value = saved === 'true'
    }
  }

  private saveSettings(): void {
    localStorage.setItem('hoverSpeechEnabled', String(this.hoverSpeechEnabled.value))
  }

  getHoverSpeechEnabled() {
    return readonly(this.hoverSpeechEnabled)
  }

  toggleHoverSpeech(): void {
    this.hoverSpeechEnabled.value = !this.hoverSpeechEnabled.value
    this.saveSettings()
    this.speak(this.hoverSpeechEnabled.value ? 'Leitura ao passar o mouse ativada' : 'Leitura ao passar o mouse desativada')
  }

  speak(text: string): void {
    if (!this.hoverSpeechEnabled.value) return
    if (!this.speechSynthesis) return
    
    // Cancelar fala anterior
    this.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'pt-BR'
    utterance.rate = 0.9
    utterance.pitch = 1
    
    this.speechSynthesis.speak(utterance)
    this.currentUtterance = utterance
  }

  handleHover(element: HTMLElement, text: string): void {
    if (!this.hoverSpeechEnabled.value) return
    
    // Limpar timeout anterior
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout)
    }
    
    // Aguardar 300ms antes de falar (para não falar ao passar rápido)
    this.hoverTimeout = setTimeout(() => {
      this.speak(text)
    }, 300)
  }

  handleLeave(): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout)
      this.hoverTimeout = null
    }
  }
}

export const accessibilityService = AccessibilityService.getInstance()