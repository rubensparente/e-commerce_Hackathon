<template>
  <footer class="bg-gray-900 dark:bg-gray-950 text-white mt-auto w-full" role="contentinfo" aria-label="Rodapé do site">
    <div class="max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8 md:py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <!-- Sobre a RCP -->
        <div>
          <h3 class="text-lg md:text-xl font-bold mb-3 md:mb-4">RCP Tecnologia</h3>
          <p class="text-gray-400 text-xs md:text-sm">
            Sua loja de informática completa desde 2020. 
            Qualidade e confiança em tecnologia.
          </p>
          <div class="flex gap-3 md:gap-4 mt-3 md:mt-4">
            <a 
              href="https://facebook.com" 
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
              aria-label="Facebook"
              @mouseenter="handleHover($event, 'Facebook da RCP Tecnologia')"
              @mouseleave="handleLeave"
            >
              <i class="pi pi-facebook text-lg md:text-xl" aria-hidden="true"></i>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
              aria-label="Instagram"
              @mouseenter="handleHover($event, 'Instagram da RCP Tecnologia')"
              @mouseleave="handleLeave"
            >
              <i class="pi pi-instagram text-lg md:text-xl" aria-hidden="true"></i>
            </a>
            <a 
              href="https://wa.me/5585999999999" 
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
              aria-label="WhatsApp"
              @mouseenter="handleHover($event, 'WhatsApp da RCP Tecnologia')"
              @mouseleave="handleLeave"
            >
              <i class="pi pi-whatsapp text-lg md:text-xl" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <!-- Links Úteis -->
        <div>
          <h4 class="font-semibold mb-2 md:mb-4 text-base md:text-lg">Institucional</h4>
          <ul class="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
            <li>
              <router-link 
                to="/sobre" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                @mouseenter="handleHover($event, 'Sobre a RCP Tecnologia')"
                @mouseleave="handleLeave"
              >
                Sobre Nós
              </router-link>
            </li>
            <li>
              <router-link 
                to="/privacidade" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                @mouseenter="handleHover($event, 'Política de Privacidade')"
                @mouseleave="handleLeave"
              >
                Política de Privacidade
              </router-link>
            </li>
            <li>
              <router-link 
                to="/termos" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                @mouseenter="handleHover($event, 'Termos de Uso')"
                @mouseleave="handleLeave"
              >
                Termos de Uso
              </router-link>
            </li>
            <li>
              <router-link 
                to="/trocas" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                @mouseenter="handleHover($event, 'Política de Trocas e Devoluções')"
                @mouseleave="handleLeave"
              >
                Trocas e Devoluções
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Categorias - Links com filtro -->
        <div>
          <h4 class="font-semibold mb-2 md:mb-4 text-base md:text-lg">Categorias</h4>
          <ul class="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
            <li>
              <button 
                @click="filterByCategory(1, 'Processadores')" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 cursor-pointer w-full text-left"
                aria-label="Filtrar produtos da categoria Processadores"
                @mouseenter="handleHover($event, 'Ver produtos de Processadores')"
                @mouseleave="handleLeave"
              >
                Processadores
              </button>
            </li>
            <li>
              <button 
                @click="filterByCategory(2, 'Placas de Vídeo')" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 cursor-pointer w-full text-left"
                aria-label="Filtrar produtos da categoria Placas de Vídeo"
                @mouseenter="handleHover($event, 'Ver produtos de Placas de Vídeo')"
                @mouseleave="handleLeave"
              >
                Placas de Vídeo
              </button>
            </li>
            <li>
              <button 
                @click="filterByCategory(3, 'Memórias RAM')" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 cursor-pointer w-full text-left"
                aria-label="Filtrar produtos da categoria Memórias RAM"
                @mouseenter="handleHover($event, 'Ver produtos de Memórias RAM')"
                @mouseleave="handleLeave"
              >
                Memórias RAM
              </button>
            </li>
            <li>
              <button 
                @click="filterByCategory(4, 'Armazenamento')" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 cursor-pointer w-full text-left"
                aria-label="Filtrar produtos da categoria Armazenamento"
                @mouseenter="handleHover($event, 'Ver produtos de Armazenamento')"
                @mouseleave="handleLeave"
              >
                Armazenamento
              </button>
            </li>
            <li>
              <button 
                @click="filterByCategory(5, 'Placas Mãe')" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 cursor-pointer w-full text-left"
                aria-label="Filtrar produtos da categoria Placas Mãe"
                @mouseenter="handleHover($event, 'Ver produtos de Placas Mãe')"
                @mouseleave="handleLeave"
              >
                Placas Mãe
              </button>
            </li>
            <li>
              <button 
                @click="filterByCategory(24, 'Fontes de Alimentação')" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 cursor-pointer w-full text-left"
                aria-label="Filtrar produtos da categoria Fontes de Alimentação"
                @mouseenter="handleHover($event, 'Ver produtos de Fontes de Alimentação')"
                @mouseleave="handleLeave"
              >
                Fontes
              </button>
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div>
          <h4 class="font-semibold mb-2 md:mb-4 text-base md:text-lg">Contato</h4>
          <ul class="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
            <li class="flex items-center gap-2">
              <i class="pi pi-phone" aria-hidden="true"></i>
              <a 
                href="tel:+558545028922" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                @mouseenter="handleHover($event, 'Ligar para (85) 4502-8922')"
                @mouseleave="handleLeave"
              >
                (85) 4502-8922
              </a>
            </li>
            <li class="flex items-center gap-2">
              <i class="pi pi-whatsapp" aria-hidden="true"></i>
              <a 
                href="https://wa.me/5585999999999" 
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                @mouseenter="handleHover($event, 'Abrir WhatsApp')"
                @mouseleave="handleLeave"
              >
                (85) 99999-9999
              </a>
            </li>
            <li class="flex items-center gap-2">
              <i class="pi pi-envelope" aria-hidden="true"></i>
              <a 
                href="mailto:contato@rcptecnologia.com.br" 
                class="hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                @mouseenter="handleHover($event, 'Enviar e-mail para contato@rcptecnologia.com.br')"
                @mouseleave="handleLeave"
              >
                contato@rcptecnologia.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-400">
        <p>&copy; 2026 RCP Tecnologia - Todos os direitos reservados</p>
        <p class="mt-2">Desenvolvido com 💙 para você</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { accessibilityService } from '../services/accessibility'

const router = useRouter()

// Handler para hover com acessibilidade
const handleHover = (event: MouseEvent, text: string): void => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = (): void => {
  accessibilityService.handleLeave()
}

// Função para filtrar por categoria
const filterByCategory = (categoryId: number, categoryName: string): void => {
  // Dispara o evento global para o componente Home
  window.dispatchEvent(new CustomEvent('category-filter', { detail: categoryId }))
  
  // Anuncia a ação para acessibilidade
  accessibilityService.speak(`Filtrando produtos da categoria ${categoryName}`)
  
  // Navega para a home
  router.push('/')
  
  // Rola suavemente até os produtos após um pequeno delay
  setTimeout(() => {
    const element = document.querySelector('.grid')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)
}
</script>