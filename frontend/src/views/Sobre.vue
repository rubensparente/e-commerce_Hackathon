<template>
  <div class="w-full px-4 md:px-8 py-8">
    <div class="max-w-[1400px] mx-auto">
      <!-- Hero Section -->
      <div 
        class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 md:p-8 mb-8"
        @mouseenter="handleHover($event, 'Sobre a RCP Tecnologia - Transformando tecnologia em soluções desde 2020')"
        @mouseleave="handleLeave"
      >
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Sobre a RCP Tecnologia
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Transformando tecnologia em soluções desde 2020
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Conteúdo Principal -->
        <div class="lg:col-span-2">
          <div 
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 mb-8"
            @mouseenter="handleHover($event, 'Nossa História - Conheça a trajetória da RCP Tecnologia desde sua fundação em 2020')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Nossa História
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              A RCP Tecnologia nasceu em 2020 com um propósito claro: democratizar o acesso à tecnologia de qualidade no Brasil. Fundada por entusiastas de tecnologia e profissionais com mais de 15 anos de experiência no mercado de informática, nossa empresa surgiu para preencher uma lacuna no mercado: oferecer produtos de alta qualidade com preços justos e atendimento excepcional.
            </p>
            <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Desde nossa fundação, crescemos de forma sustentável, conquistando a confiança de milhares de clientes em todo o território nacional. Nosso compromisso sempre foi oferecer não apenas produtos, mas soluções completas que atendam às necessidades específicas de cada cliente, seja ele um entusiasta, profissional ou empresa.
            </p>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Hoje, somos referência no e-commerce de tecnologia, com um portfólio diversificado que inclui as principais marcas do mercado, garantia de procedência e suporte técnico especializado. Nosso crescimento é movido pela paixão por tecnologia e pela satisfação de nossos clientes.
            </p>
          </div>

          <div 
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 mb-8"
            @mouseenter="handleHover($event, 'Missão, Visão e Valores - Conheça nossos propósitos e princípios')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Missão, Visão e Valores
            </h2>
            
            <div class="space-y-6">
              <div 
                @mouseenter="handleHover($event, 'Missão: Oferecer produtos e soluções tecnológicas de alta qualidade com preços competitivos')"
                @mouseleave="handleLeave"
              >
                <h3 class="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  <i class="pi pi-flag mr-2"></i>
                  Missão
                </h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Oferecer produtos e soluções tecnológicas de alta qualidade, com preços competitivos e atendimento excepcional, contribuindo para o crescimento e sucesso de nossos clientes através da tecnologia.
                </p>
              </div>
              
              <div 
                @mouseenter="handleHover($event, 'Visão: Ser a melhor opção em tecnologia do Brasil até 2028')"
                @mouseleave="handleLeave"
              >
                <h3 class="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  <i class="pi pi-eye mr-2"></i>
                  Visão
                </h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Ser reconhecida como a melhor opção em tecnologia do Brasil, referência em qualidade, inovação e experiência do cliente até 2028.
                </p>
              </div>
              
              <div 
                @mouseenter="handleHover($event, 'Valores: Compromisso com qualidade, transparência, inovação, responsabilidade socioambiental, excelência e paixão por tecnologia')"
                @mouseleave="handleLeave"
              >
                <h3 class="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  <i class="pi pi-heart mr-2"></i>
                  Valores
                </h3>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600 dark:text-gray-400">
                  <li 
                    class="flex items-center gap-2"
                    @mouseenter="handleHover($event, 'Compromisso com a qualidade')"
                    @mouseleave="handleLeave"
                  >
                    <i class="pi pi-check-circle text-green-500"></i>
                    <span>Compromisso com a qualidade</span>
                  </li>
                  <li 
                    class="flex items-center gap-2"
                    @mouseenter="handleHover($event, 'Transparência e honestidade')"
                    @mouseleave="handleLeave"
                  >
                    <i class="pi pi-check-circle text-green-500"></i>
                    <span>Transparência e honestidade</span>
                  </li>
                  <li 
                    class="flex items-center gap-2"
                    @mouseenter="handleHover($event, 'Inovação constante')"
                    @mouseleave="handleLeave"
                  >
                    <i class="pi pi-check-circle text-green-500"></i>
                    <span>Inovação constante</span>
                  </li>
                  <li 
                    class="flex items-center gap-2"
                    @mouseenter="handleHover($event, 'Responsabilidade socioambiental')"
                    @mouseleave="handleLeave"
                  >
                    <i class="pi pi-check-circle text-green-500"></i>
                    <span>Responsabilidade socioambiental</span>
                  </li>
                  <li 
                    class="flex items-center gap-2"
                    @mouseenter="handleHover($event, 'Excelência no atendimento')"
                    @mouseleave="handleLeave"
                  >
                    <i class="pi pi-check-circle text-green-500"></i>
                    <span>Excelência no atendimento</span>
                  </li>
                  <li 
                    class="flex items-center gap-2"
                    @mouseenter="handleHover($event, 'Paixão por tecnologia')"
                    @mouseleave="handleLeave"
                  >
                    <i class="pi pi-check-circle text-green-500"></i>
                    <span>Paixão por tecnologia</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div 
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8"
            @mouseenter="handleHover($event, 'Diferenciais RCP - Conheça nossos principais diferenciais')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Diferenciais RCP
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                class="flex items-start gap-3"
                @mouseenter="handleHover($event, 'Produtos Originais - Garantia de autenticidade e procedência')"
                @mouseleave="handleLeave"
              >
                <i class="pi pi-shield text-2xl text-blue-600 mt-1"></i>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-white mb-1">Produtos Originais</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Garantia de autenticidade e procedência</p>
                </div>
              </div>
              <div 
                class="flex items-start gap-3"
                @mouseenter="handleHover($event, 'Entrega Rápida - Logística otimizada para todo Brasil')"
                @mouseleave="handleLeave"
              >
                <i class="pi pi-truck text-2xl text-blue-600 mt-1"></i>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-white mb-1">Entrega Rápida</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Logística otimizada para todo Brasil</p>
                </div>
              </div>
              <div 
                class="flex items-start gap-3"
                @mouseenter="handleHover($event, 'Melhores Condições - Parcele em até 12x sem juros')"
                @mouseleave="handleLeave"
              >
                <i class="pi pi-credit-card text-2xl text-blue-600 mt-1"></i>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-white mb-1">Melhores Condições</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Parcele em até 12x sem juros</p>
                </div>
              </div>
              <div 
                class="flex items-start gap-3"
                @mouseenter="handleHover($event, 'Suporte Especializado - Atendimento técnico qualificado')"
                @mouseleave="handleLeave"
              >
                <i class="pi pi-headset text-2xl text-blue-600 mt-1"></i>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-white mb-1">Suporte Especializado</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Atendimento técnico qualificado</p>
                </div>
              </div>
              <div 
                class="flex items-start gap-3"
                @mouseenter="handleHover($event, 'Compra Segura - Ambiente protegido e certificado')"
                @mouseleave="handleLeave"
              >
                <i class="pi pi-lock text-2xl text-blue-600 mt-1"></i>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-white mb-1">Compra Segura</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Ambiente protegido e certificado</p>
                </div>
              </div>
              <div 
                class="flex items-start gap-3"
                @mouseenter="handleHover($event, 'Ofertas Exclusivas - Promoções e descontos especiais')"
                @mouseleave="handleLeave"
              >
                <i class="pi pi-gift text-2xl text-blue-600 mt-1"></i>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-white mb-1">Ofertas Exclusivas</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Promoções e descontos especiais</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div 
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
            @mouseenter="handleHover($event, 'Números que Comprovam - Conheça nossos resultados')"
            @mouseleave="handleLeave"
          >
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Números que Comprovam
            </h3>
            <div class="space-y-4">
              <div 
                class="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-lg"
                @mouseenter="handleHover($event, 'Mais de 15 anos de experiência no mercado de tecnologia')"
                @mouseleave="handleLeave"
              >
                <div class="text-3xl font-bold text-blue-600">+15</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Anos de experiência</div>
              </div>
              <div 
                class="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-lg"
                @mouseenter="handleHover($event, 'Mais de 50 mil clientes satisfeitos')"
                @mouseleave="handleLeave"
              >
                <div class="text-3xl font-bold text-blue-600">+50k</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Clientes satisfeitos</div>
              </div>
              <div 
                class="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-lg"
                @mouseenter="handleHover($event, 'Mais de 500 produtos disponíveis em nosso catálogo')"
                @mouseleave="handleLeave"
              >
                <div class="text-3xl font-bold text-blue-600">+500</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Produtos disponíveis</div>
              </div>
              <div 
                class="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-lg"
                @mouseenter="handleHover($event, '100% dos produtos são originais com garantia')"
                @mouseleave="handleLeave"
              >
                <div class="text-3xl font-bold text-blue-600">100%</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Produtos originais</div>
              </div>
            </div>
          </div>

          <div 
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            @mouseenter="handleHover($event, 'Certificações - Nossas certificações e selos de qualidade')"
            @mouseleave="handleLeave"
          >
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Certificações
            </h3>
            <div class="space-y-3">
              <div 
                class="flex items-center gap-3"
                @mouseenter="handleHover($event, 'Empresa certificada pelo Procon')"
                @mouseleave="handleLeave"
              >
                <i class="pi pi-check-circle text-green-500 text-xl"></i>
                <span class="text-gray-600 dark:text-gray-400">Empresa certificada pelo Procon</span>
              </div>
              <div 
                class="flex items-center gap-3"
                @mouseenter="handleHover($event, 'Selo Ebit de confiança')"
                @mouseleave="handleLeave"
              >
                <i class="pi pi-check-circle text-green-500 text-xl"></i>
                <span class="text-gray-600 dark:text-gray-400">Selo Ebit de confiança</span>
              </div>
              <div 
                class="flex items-center gap-3"
                @mouseenter="handleHover($event, 'Google Customer Reviews')"
                @mouseleave="handleLeave"
              >
                <i class="pi pi-check-circle text-green-500 text-xl"></i>
                <span class="text-gray-600 dark:text-gray-400">Google Customer Reviews</span>
              </div>
              <div 
                class="flex items-center gap-3"
                @mouseenter="handleHover($event, 'RA1000 - Excelência em atendimento')"
                @mouseleave="handleLeave"
              >
                <i class="pi pi-check-circle text-green-500 text-xl"></i>
                <span class="text-gray-600 dark:text-gray-400">RA1000 - Excelência em atendimento</span>
              </div>
            </div>
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
  accessibilityService.speak('Página Sobre Nós carregada. Conheça nossa história e diferenciais')
})
</script>