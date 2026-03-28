<template>
  <div class="w-full px-4 md:px-8 py-8">
    <div class="max-w-[1400px] mx-auto">
      <div 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8"
        @mouseenter="handleHover($event, 'Política de Privacidade - Conheça como protegemos seus dados pessoais')"
        @mouseleave="handleLeave"
      >
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Política de Privacidade
        </h1>
        <p 
          class="text-gray-500 dark:text-gray-400 mb-6 text-sm"
          @mouseenter="handleHover($event, 'Última atualização: Março de 2026')"
          @mouseleave="handleLeave"
        >
          Última atualização: Março de 2026
        </p>
        
        <div class="prose dark:prose-invert max-w-none space-y-6">
          <div 
            @mouseenter="handleHover($event, 'Introdução - Entenda nossa política de privacidade e como protegemos seus dados')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              1. Introdução
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              A RCP Tecnologia está comprometida em proteger sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você visita nosso site ou utiliza nossos serviços. Ao utilizar nossa plataforma, você concorda com os termos desta política.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Informações que Coletamos - Dados de cadastro, endereço, navegação, transação e comunicação')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              2. Informações que Coletamos
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:
            </p>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
              <li 
                @mouseenter="handleHover($event, 'Dados de Cadastro: Nome completo, CPF, e-mail, telefone, data de nascimento')"
                @mouseleave="handleLeave"
              >
                <strong>Dados de Cadastro:</strong> Nome completo, CPF, e-mail, telefone, data de nascimento
              </li>
              <li 
                @mouseenter="handleHover($event, 'Dados de Endereço: Endereço de entrega e cobrança, CEP, cidade, estado')"
                @mouseleave="handleLeave"
              >
                <strong>Dados de Endereço:</strong> Endereço de entrega e cobrança, CEP, cidade, estado
              </li>
              <li 
                @mouseenter="handleHover($event, 'Dados de Navegação: IP, tipo de dispositivo, navegador, páginas visitadas')"
                @mouseleave="handleLeave"
              >
                <strong>Dados de Navegação:</strong> IP, tipo de dispositivo, navegador, páginas visitadas
              </li>
              <li 
                @mouseenter="handleHover($event, 'Dados de Transação: Histórico de compras, produtos visualizados, preferências')"
                @mouseleave="handleLeave"
              >
                <strong>Dados de Transação:</strong> Histórico de compras, produtos visualizados, preferências
              </li>
              <li 
                @mouseenter="handleHover($event, 'Dados de Comunicação: Interações com nosso suporte, avaliações e comentários')"
                @mouseleave="handleLeave"
              >
                <strong>Dados de Comunicação:</strong> Interações com nosso suporte, avaliações e comentários
              </li>
            </ul>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Como Utilizamos suas Informações - Processamento de pedidos, personalização, comunicação e segurança')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              3. Como Utilizamos suas Informações
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              Utilizamos suas informações para:
            </p>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
              <li 
                @mouseenter="handleHover($event, 'Processar e entregar seus pedidos')"
                @mouseleave="handleLeave"
              >
                Processar e entregar seus pedidos
              </li>
              <li 
                @mouseenter="handleHover($event, 'Personalizar sua experiência de compra')"
                @mouseleave="handleLeave"
              >
                Personalizar sua experiência de compra
              </li>
              <li 
                @mouseenter="handleHover($event, 'Enviar atualizações sobre pedidos e status de entrega')"
                @mouseleave="handleLeave"
              >
                Enviar atualizações sobre pedidos e status de entrega
              </li>
              <li 
                @mouseenter="handleHover($event, 'Oferecer atendimento ao cliente eficiente')"
                @mouseleave="handleLeave"
              >
                Oferecer atendimento ao cliente eficiente
              </li>
              <li 
                @mouseenter="handleHover($event, 'Enviar ofertas e promoções exclusivas com seu consentimento')"
                @mouseleave="handleLeave"
              >
                Enviar ofertas e promoções exclusivas (com seu consentimento)
              </li>
              <li 
                @mouseenter="handleHover($event, 'Prevenir fraudes e atividades suspeitas')"
                @mouseleave="handleLeave"
              >
                Prevenir fraudes e atividades suspeitas
              </li>
              <li 
                @mouseenter="handleHover($event, 'Melhorar continuamente nossos produtos e serviços')"
                @mouseleave="handleLeave"
              >
                Melhorar continuamente nossos produtos e serviços
              </li>
              <li 
                @mouseenter="handleHover($event, 'Cumprir obrigações legais e regulatórias')"
                @mouseleave="handleLeave"
              >
                Cumprir obrigações legais e regulatórias
              </li>
            </ul>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Compartilhamento de Dados - Parceiros de entrega, processadores de pagamento e autoridades legais')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              4. Compartilhamento de Dados
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              Compartilhamos suas informações apenas quando necessário:
            </p>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
              <li 
                @mouseenter="handleHover($event, 'Parceiros de Entrega: Para realizar a logística e entrega dos produtos')"
                @mouseleave="handleLeave"
              >
                <strong>Parceiros de Entrega:</strong> Para realizar a logística e entrega dos produtos
              </li>
              <li 
                @mouseenter="handleHover($event, 'Processadores de Pagamento: Para processar transações financeiras')"
                @mouseleave="handleLeave"
              >
                <strong>Processadores de Pagamento:</strong> Para processar transações financeiras
              </li>
              <li 
                @mouseenter="handleHover($event, 'Autoridades Legais: Quando exigido por lei ou para proteção de direitos')"
                @mouseleave="handleLeave"
              >
                <strong>Autoridades Legais:</strong> Quando exigido por lei ou para proteção de direitos
              </li>
              <li 
                @mouseenter="handleHover($event, 'Fornecedores de Serviços: Empresas que nos auxiliam em operações essenciais')"
                @mouseleave="handleLeave"
              >
                <strong>Fornecedores de Serviços:</strong> Empresas que nos auxiliam em operações essenciais
              </li>
            </ul>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
              Nunca vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de marketing sem seu consentimento explícito.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Cookies e Tecnologias de Rastreamento - Melhoramos sua experiência de navegação')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              5. Cookies e Tecnologias de Rastreamento
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência de navegação, personalizar conteúdo, analisar tendências e administrar o site. Você pode controlar o uso de cookies através das configurações do seu navegador. Cookies essenciais são necessários para o funcionamento básico do site.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Segurança dos Dados - Criptografia SSL, firewalls e monitoramento contínuo')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              6. Segurança dos Dados
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Implementamos rigorosas medidas de segurança para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia SSL (Secure Socket Layer) para proteger a transmissão de dados, firewalls, sistemas de detecção de intrusão e controles de acesso rigorosos. Nossos sistemas são continuamente monitorados e atualizados para garantir a máxima proteção.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Seus Direitos LGPD - Acesso, correção, eliminação e portabilidade dos seus dados')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              7. Seus Direitos (LGPD)
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), você possui os seguintes direitos:
            </p>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
              <li 
                @mouseenter="handleHover($event, 'Confirmação da existência de tratamento de seus dados')"
                @mouseleave="handleLeave"
              >
                Confirmação da existência de tratamento de seus dados
              </li>
              <li 
                @mouseenter="handleHover($event, 'Acesso aos seus dados pessoais')"
                @mouseleave="handleLeave"
              >
                Acesso aos seus dados pessoais
              </li>
              <li 
                @mouseenter="handleHover($event, 'Correção de dados incompletos, inexatos ou desatualizados')"
                @mouseleave="handleLeave"
              >
                Correção de dados incompletos, inexatos ou desatualizados
              </li>
              <li 
                @mouseenter="handleHover($event, 'Anonimização, bloqueio ou eliminação de dados desnecessários')"
                @mouseleave="handleLeave"
              >
                Anonimização, bloqueio ou eliminação de dados desnecessários
              </li>
              <li 
                @mouseenter="handleHover($event, 'Portabilidade dos dados a outro fornecedor de serviço')"
                @mouseleave="handleLeave"
              >
                Portabilidade dos dados a outro fornecedor de serviço
              </li>
              <li 
                @mouseenter="handleHover($event, 'Eliminação dos dados tratados com seu consentimento')"
                @mouseleave="handleLeave"
              >
                Eliminação dos dados tratados com seu consentimento
              </li>
              <li 
                @mouseenter="handleHover($event, 'Informação sobre compartilhamento de dados')"
                @mouseleave="handleLeave"
              >
                Informação sobre compartilhamento de dados
              </li>
              <li 
                @mouseenter="handleHover($event, 'Revogação do consentimento a qualquer momento')"
                @mouseleave="handleLeave"
              >
                Revogação do consentimento a qualquer momento
              </li>
            </ul>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Retenção de Dados - Mantemos seus dados pelo tempo necessário para cumprir obrigações legais')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              8. Retenção de Dados
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Armazenamos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, respeitando prazos legais e regulatórios. Dados de transações comerciais são mantidos por 5 anos conforme exigido pela legislação fiscal. Após esse período, os dados são anonimizados ou eliminados de forma segura.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Dados de Menores de Idade - Não coletamos dados de menores de 18 anos')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              9. Dados de Menores de Idade
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente dados pessoais de menores. Se você é responsável por um menor e descobre que ele nos forneceu dados pessoais, entre em contato para que possamos remover as informações.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Atualizações desta Política - Revisamos periodicamente nossa política de privacidade')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              10. Atualizações desta Política
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Esta política pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou na legislação. Notificaremos você sobre alterações significativas através do site ou por e-mail. Recomendamos revisar esta política regularmente. A data da última atualização está indicada no topo desta página.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Contato - Encarregado de Dados DPO - Entre em contato para exercer seus direitos')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              11. Contato - Encarregado de Dados (DPO)
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Para exercer seus direitos, esclarecer dúvidas ou reportar preocupações sobre privacidade, entre em contato com nosso Encarregado de Proteção de Dados:
            </p>
            <div 
              class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-3"
              @mouseenter="handleHover($event, 'Contato: privacidade@rcptecnologia.com.br, telefone (85) 4502-8922, endereço: Av. Treze de Maio, 1100 - Bairro de Fátima, Fortaleza - CE, 60000-100')"
              @mouseleave="handleLeave"
            >
              <p class="text-gray-600 dark:text-gray-400">
                <strong>E-mail:</strong> privacidade@rcptecnologia.com.br<br>
                <strong>Telefone:</strong> (85) 4502-8922<br>
                <strong>Endereço:</strong> Av. Treze de Maio, 1100 - Bairro de Fátima, Fortaleza - CE, 60000-100
              </p>
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
  accessibilityService.speak('Política de Privacidade carregada. Conheça como protegemos seus dados')
})
</script>