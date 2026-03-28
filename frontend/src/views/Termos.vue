<template>
  <div class="w-full px-4 md:px-8 py-8">
    <div class="max-w-[1400px] mx-auto">
      <div 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8"
        @mouseenter="handleHover($event, 'Termos de Uso - Conheça as condições e regras para utilizar nossos serviços')"
        @mouseleave="handleLeave"
      >
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Termos de Uso
        </h1>
        <p 
          class="text-gray-500 dark:text-gray-400 mb-6 text-sm"
          @mouseenter="handleHover($event, 'Última atualização: Janeiro de 2024')"
          @mouseleave="handleLeave"
        >
          Última atualização: Março de 2026
        </p>
        
        <div class="prose dark:prose-invert max-w-none space-y-6">
          <div 
            @mouseenter="handleHover($event, 'Aceitação dos Termos - Ao acessar nosso site você concorda com estes termos')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              1. Aceitação dos Termos
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Ao acessar e utilizar o site da RCP Tecnologia, você concorda em cumprir estes Termos de Uso, todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Cadastro e Conta - Responsabilidades do usuário e condições de cadastro')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              2. Cadastro e Conta
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              Para realizar compras em nosso site, você deve criar uma conta fornecendo informações precisas, completas e atualizadas. Você é responsável por:
            </p>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
              <li 
                @mouseenter="handleHover($event, 'Manter a confidencialidade de sua senha e dados de acesso')"
                @mouseleave="handleLeave"
              >
                Manter a confidencialidade de sua senha e dados de acesso
              </li>
              <li 
                @mouseenter="handleHover($event, 'Todas as atividades que ocorrerem em sua conta')"
                @mouseleave="handleLeave"
              >
                Todas as atividades que ocorrerem em sua conta
              </li>
              <li 
                @mouseenter="handleHover($event, 'Notificar imediatamente sobre qualquer uso não autorizado')"
                @mouseleave="handleLeave"
              >
                Notificar imediatamente sobre qualquer uso não autorizado
              </li>
              <li 
                @mouseenter="handleHover($event, 'Fornecer informações verdadeiras e atualizadas')"
                @mouseleave="handleLeave"
              >
                Fornecer informações verdadeiras e atualizadas
              </li>
            </ul>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
              Reservamo-nos o direito de recusar ou cancelar cadastros a nosso critério, sem necessidade de justificativa.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Produtos e Preços - Disponibilidade, preços e imagens ilustrativas')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              3. Produtos e Preços
            </h2>
            <p 
              class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3"
              @mouseenter="handleHover($event, 'Disponibilidade: Produtos sujeitos à disponibilidade em estoque')"
              @mouseleave="handleLeave"
            >
              <strong>Disponibilidade:</strong> Todos os produtos estão sujeitos à disponibilidade em estoque. Em caso de indisponibilidade após a realização do pedido, entraremos em contato para oferecer alternativas ou cancelamento com reembolso integral.
            </p>
            <p 
              class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3"
              @mouseenter="handleHover($event, 'Preços: Valores em reais com impostos inclusos, sujeitos a alteração')"
              @mouseleave="handleLeave"
            >
              <strong>Preços:</strong> Os preços são apresentados em reais (R$), com inclusão de impostos. Reservamo-nos o direito de alterar preços a qualquer momento sem aviso prévio, mas os preços aplicados serão aqueles vigentes no momento da confirmação do pedido.
            </p>
            <p 
              class="text-gray-600 dark:text-gray-400 leading-relaxed"
              @mouseenter="handleHover($event, 'Imagens: Meramente ilustrativas, consulte especificações técnicas')"
              @mouseleave="handleLeave"
            >
              <strong>Imagens:</strong> As imagens dos produtos são meramente ilustrativas. Consulte as especificações técnicas para informações precisas sobre características e funcionalidades.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Processo de Compra - Etapas desde a seleção até a confirmação do pedido')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              4. Processo de Compra
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              O processo de compra em nosso site segue os seguintes passos:
            </p>
            <ol class="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
              <li 
                @mouseenter="handleHover($event, 'Passo 1: Seleção dos produtos e adição ao carrinho')"
                @mouseleave="handleLeave"
              >
                Seleção dos produtos e adição ao carrinho
              </li>
              <li 
                @mouseenter="handleHover($event, 'Passo 2: Informação dos dados de entrega e pagamento')"
                @mouseleave="handleLeave"
              >
                Informação dos dados de entrega e pagamento
              </li>
              <li 
                @mouseenter="handleHover($event, 'Passo 3: Confirmação do pedido com resumo da compra')"
                @mouseleave="handleLeave"
              >
                Confirmação do pedido com resumo da compra
              </li>
              <li 
                @mouseenter="handleHover($event, 'Passo 4: Processamento do pagamento')"
                @mouseleave="handleLeave"
              >
                Processamento do pagamento
              </li>
              <li 
                @mouseenter="handleHover($event, 'Passo 5: Confirmação final por e-mail com número do pedido')"
                @mouseleave="handleLeave"
              >
                Confirmação final por e-mail com número do pedido
              </li>
            </ol>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
              Reservamo-nos o direito de cancelar pedidos em caso de inconsistências, suspeita de fraude, erro de precificação ou indisponibilidade de produtos. Nestes casos, o valor pago será integralmente reembolsado.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Formas de Pagamento - Cartões, boleto, PIX e PayPal')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              5. Formas de Pagamento
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              Aceitamos as seguintes formas de pagamento:
            </p>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">              
              <li 
                @mouseenter="handleHover($event, 'Boleto bancário')"
                @mouseleave="handleLeave"
              >
                Boleto bancário
              </li>
              <li 
                @mouseenter="handleHover($event, 'PIX com confirmação imediata')"
                @mouseleave="handleLeave"
              >
                PIX com confirmação imediata
              </li>              
            </ul>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Entregas - Prazos, regiões atendidas e taxas de frete')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              6. Entregas
            </h2>
            <p 
              class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3"
              @mouseenter="handleHover($event, 'Prazos: Entrega a partir da confirmação do pagamento')"
              @mouseleave="handleLeave"
            >
              <strong>Prazos:</strong> Os prazos de entrega são estimados e contados a partir da confirmação do pagamento. Para boletos, o prazo conta após a compensação (até 3 dias úteis). Para cartão e PIX, a confirmação é imediata.
            </p>
            <p 
              class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3"
              @mouseenter="handleHover($event, 'Regiões: Entregamos para todo o território nacional')"
              @mouseleave="handleLeave"
            >
              <strong>Regiões:</strong> Entregamos para todo o território nacional. O prazo varia conforme a localidade, sendo maior para regiões Norte e Nordeste.
            </p>
            <p 
              class="text-gray-600 dark:text-gray-400 leading-relaxed"
              @mouseenter="handleHover($event, 'Taxas: Frete calculado por CEP, grátis para compras acima de R$ 299 nas regiões Sul e Sudeste')"
              @mouseleave="handleLeave"
            >
              <strong>Taxas:</strong> O valor do frete é calculado no momento da compra com base no CEP de destino. Oferecemos frete grátis para compras acima de R$ 299,00 para regiões Sul e Sudeste.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Trocas e Devoluções - Arrependimento e produtos com defeito')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              7. Trocas e Devoluções
            </h2>
            <p 
              class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3"
              @mouseenter="handleHover($event, 'Arrependimento: 7 dias corridos após o recebimento')"
              @mouseleave="handleLeave"
            >
              <strong>Arrependimento:</strong> Conforme o Código de Defesa do Consumidor, você tem até 7 dias corridos após o recebimento para desistir da compra, desde que o produto esteja em perfeitas condições e na embalagem original.
            </p>
            <p 
              class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3"
              @mouseenter="handleHover($event, 'Defeitos: 30 dias para não duráveis, 90 dias para duráveis')"
              @mouseleave="handleLeave"
            >
              <strong>Defeitos:</strong> Produtos com defeito de fabricação podem ser trocados ou devolvidos em até 30 dias para produtos não duráveis e 90 dias para produtos duráveis.
            </p>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Para mais detalhes, consulte nossa <router-link to="/trocas" class="text-blue-600 hover:underline" @mouseenter="handleHover($event, 'Clique para ver a Política de Trocas e Devoluções completa')" @mouseleave="handleLeave">Política de Trocas e Devoluções</router-link> completa.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Garantia - Garantia legal de 90 dias para produtos duráveis')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              8. Garantia
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Todos os produtos comercializados possuem garantia contra defeitos de fabricação conforme especificado pelo fabricante. A garantia legal é de 90 dias para produtos duráveis. Produtos com garantia estendida são identificados em suas páginas. Em caso de defeito, entre em contato com nosso suporte para orientações sobre o processo de acionamento da garantia.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Propriedade Intelectual - Todo conteúdo do site é protegido por direitos autorais')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              9. Propriedade Intelectual
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Todo o conteúdo deste site, incluindo textos, imagens, logotipos, ícones, design, código-fonte e demais elementos, são de propriedade exclusiva da RCP Tecnologia ou de seus licenciadores, protegidos pelas leis de direitos autorais e propriedade intelectual. É proibida a reprodução, distribuição, modificação ou uso comercial sem autorização expressa.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Limitação de Responsabilidade - Responsabilidade limitada ao valor do produto')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              10. Limitação de Responsabilidade
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              A RCP Tecnologia não se responsabiliza por danos indiretos, lucros cessantes ou perdas decorrentes do uso ou incapacidade de uso de nossos produtos ou serviços. Nossa responsabilidade limita-se ao valor pago pelo produto objeto da reclamação. Esta limitação não se aplica em casos de dolo ou culpa grave.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Modificações dos Termos - Podemos alterar os termos a qualquer momento')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              11. Modificações dos Termos
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor imediatamente após a publicação no site. Recomendamos revisar periodicamente esta página. O uso continuado do site após alterações constitui aceitação dos novos termos.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Legislação Aplicável - Regido pelas leis brasileiras, foro em São Paulo')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              12. Legislação Aplicável
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Para todas as questões relacionadas a estes termos, fica eleito o foro da comarca de São Paulo - SP, com exclusão de qualquer outro, por mais privilegiado que seja.
            </p>
          </div>

          <div 
            @mouseenter="handleHover($event, 'Contato - E-mail, telefone e horário de atendimento')"
            @mouseleave="handleLeave"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              13. Contato
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Em caso de dúvidas sobre estes Termos de Uso, entre em contato:
            </p>
            <div 
              class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-3"
              @mouseenter="handleHover($event, 'Contato: contato@rcptecnologia.com.br, telefone (85) 4502-8922, WhatsApp (85) 98866-0818, horário de atendimento segunda a sexta das 9h às 18h')"
              @mouseleave="handleLeave"
            >
              <p class="text-gray-600 dark:text-gray-400">
                <strong>E-mail:</strong> contato@rcptecnologia.com.br<br>
                <strong>Telefone:</strong> (85) 4502-8922<br>
                <strong>WhatsApp:</strong> (85) 98866-0818<br>
                <strong>Horário de atendimento:</strong> Segunda a Sexta, 9h às 18h
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
  accessibilityService.speak('Termos de Uso carregados. Conheça as condições e regras para utilizar nossos serviços')
})
</script>