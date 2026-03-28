<template>
  <div class="w-full px-4 md:px-8 py-8">
    <div class="max-w-[1400px] mx-auto">
      <div 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8"
        @mouseenter="handleHover($event, 'Política de Trocas e Devoluções - Conheça nossas condições para troca e devolução')"
        @mouseleave="handleLeave"
      >
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Política de Trocas e Devoluções
        </h1>
        
        <div class="prose dark:prose-invert max-w-none">
          <p 
            class="text-gray-600 dark:text-gray-400 mb-4"
            @mouseenter="handleHover($event, 'Nossa política de trocas e devoluções foi desenvolvida para garantir sua satisfação e segurança nas compras')"
            @mouseleave="handleLeave"
          >
            Nossa política de trocas e devoluções foi desenvolvida para garantir sua satisfação 
            e segurança nas compras.
          </p>
          
          <div
            @mouseenter="handleHover($event, 'Prazo para Devolução: Você tem até 7 dias corridos a partir do recebimento do produto para solicitar a devolução por desistência ou arrependimento')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
              Prazo para Devolução
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Você tem até 7 dias corridos a partir do recebimento do produto para solicitar a 
              devolução por desistência ou arrependimento.
            </p>
          </div>
          
          <div
            @mouseenter="handleHover($event, 'Condições para Troca: Produto em perfeitas condições, na embalagem original, com todos os acessórios e manuais, e nota fiscal de compra')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
              Condições para Troca
            </h2>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4">
              <li 
                @mouseenter="handleHover($event, 'Condição 1: Produto em perfeitas condições')"
                @mouseleave="handleLeave"
              >
                Produto em perfeitas condições
              </li>
              <li 
                @mouseenter="handleHover($event, 'Condição 2: Produto na embalagem original')"
                @mouseleave="handleLeave"
              >
                Na embalagem original
              </li>
              <li 
                @mouseenter="handleHover($event, 'Condição 3: Com todos os acessórios e manuais')"
                @mouseleave="handleLeave"
              >
                Com todos os acessórios e manuais
              </li>
              <li 
                @mouseenter="handleHover($event, 'Condição 4: Nota fiscal de compra')"
                @mouseleave="handleLeave"
              >
                Nota fiscal de compra
              </li>
            </ul>
          </div>
          
          <div
            @mouseenter="handleHover($event, 'Produtos com Defeito: Em caso de defeito de fabricação, entre em contato em até 30 dias para produtos não duráveis ou 90 dias para produtos duráveis, conforme o Código de Defesa do Consumidor')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
              Produtos com Defeito
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Em caso de defeito de fabricação, entre em contato conosco em até 30 dias para 
              produtos não duráveis ou 90 dias para produtos duráveis, conforme o Código de 
              Defesa do Consumidor.
            </p>
          </div>
          
          <div
            @mouseenter="handleHover($event, 'Como Solicitar: Entre em contato pelo e-mail trocas@rcptecnologia.com.br ou telefone (85) 4502-8922 informando o número do pedido e o motivo da troca ou devolução')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
              Como Solicitar
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Entre em contato pelo e-mail 
              <strong 
                @mouseenter="handleHover($event, 'E-mail para trocas: trocas@rcptecnologia.com.br')"
                @mouseleave="handleLeave"
              >
                trocas@rcptecnologia.com.br
              </strong> 
              ou 
              <strong 
                @mouseenter="handleHover($event, 'Telefone para trocas: (85) 4502-8922')"
                @mouseleave="handleLeave"
              >
                (85) 4502-8922
              </strong> 
              informando o número do pedido e o motivo 
              da troca/devolução.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { accessibilityService } from '../services/accessibility'

const handleHover = (event: MouseEvent, text: string): void => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = (): void => {
  accessibilityService.handleLeave()
}

onMounted(() => {
  accessibilityService.speak('Política de Trocas e Devoluções carregada. Conheça nossas condições para troca e devolução de produtos')
})
</script>