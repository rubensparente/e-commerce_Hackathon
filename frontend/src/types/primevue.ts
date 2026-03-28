import type { Component } from 'vue'

export interface PrimeVueComponent {
  name: string
  component: Component
}

export interface PrimeVuePluginOptions {
  theme?: {
    preset: any
    options?: {
      prefix?: string
      darkModeSelector?: string
      cssLayer?: boolean
    }
  }
  ripple?: boolean
  inputStyle?: 'outlined' | 'filled'
  zIndex?: {
    modal?: number
    overlay?: number
    menu?: number
    tooltip?: number
  }
}