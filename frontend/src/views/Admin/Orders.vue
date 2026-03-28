<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white"
            @mouseenter="handleHover($event, 'Gerenciar Pedidos - Painel administrativo')"
            @mouseleave="handleLeave">
          Gerenciar Pedidos
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1"
           @mouseenter="handleHover($event, `${orders.length} pedidos encontrados`)" 
           @mouseleave="handleLeave">
          Total: {{ orders.length }} pedidos
        </p>
      </div>
    </div>
    
    <!-- Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
           @mouseenter="handleHover($event, `Total de pedidos: ${stats.total?.total || 0} pedidos, total de R$ ${formatPrice(stats.total?.total_value || 0)}`)" 
           @mouseleave="handleLeave">
        <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.total?.total || 0 }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Total de Pedidos</p>
        <p class="text-xs text-gray-500 dark:text-gray-500">R$ {{ formatPrice(stats.total?.total_value || 0) }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
           @mouseenter="handleHover($event, `${stats.pending?.total || 0} pedidos pendentes`)" 
           @mouseleave="handleLeave">
        <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.pending?.total || 0 }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Pendentes</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
           @mouseenter="handleHover($event, `${stats.processing?.total || 0} pedidos em processamento`)" 
           @mouseleave="handleLeave">
        <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.processing?.total || 0 }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Processando</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
           @mouseenter="handleHover($event, `${stats.shipped?.total || 0} pedidos enviados`)" 
           @mouseleave="handleLeave">
        <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ stats.shipped?.total || 0 }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Enviados</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
           @mouseenter="handleHover($event, `${stats.delivered?.total || 0} pedidos entregues`)" 
           @mouseleave="handleLeave">
        <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.delivered?.total || 0 }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Entregues</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
           @mouseenter="handleHover($event, `${stats.cancelled?.total || 0} pedidos cancelados`)" 
           @mouseleave="handleLeave">
        <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.cancelled?.total || 0 }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Cancelados</p>
      </div>
    </div>
    
    <!-- Filtros -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700"
         @mouseenter="handleHover($event, 'Filtros de busca - Status e busca por texto')" 
         @mouseleave="handleLeave">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" 
                 @mouseenter="handleHover($event, 'Filtrar por status do pedido')" 
                 @mouseleave="handleLeave">
            Status
          </label>
          <select 
            v-model="filters.status" 
            @change="loadOrders" 
            class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            :aria-label="'Filtrar por status do pedido'"
            @mouseenter="handleHover($event, `Selecione o status: atual ${getStatusText(filters.status)}`)" 
            @mouseleave="handleLeave"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendente</option>
            <option value="processing">Processando</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregue</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" 
                 @mouseenter="handleHover($event, 'Buscar por número do pedido, cliente ou email')" 
                 @mouseleave="handleLeave">
            Buscar
          </label>
          <input 
            type="text" 
            v-model="filters.search" 
            @input="debouncedSearch" 
            placeholder="Nº pedido, cliente..." 
            class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            :aria-label="'Buscar pedidos'"
            @mouseenter="handleHover($event, 'Digite o número do pedido ou nome do cliente')" 
            @mouseleave="handleLeave"
          >
        </div>
        <div class="flex items-end">
          <button @click="loadOrders" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-md hover:shadow-lg"
                  :aria-label="'Buscar pedidos'"
                  @mouseenter="handleHover($event, 'Clique para buscar pedidos')" 
                  @mouseleave="handleLeave">
            <i class="pi pi-search" aria-hidden="true"></i>
            Buscar
          </button>
        </div>
      </div>
    </div>
    
    <!-- Tabela de Pedidos -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700" role="table">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr role="row">
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                  @mouseenter="handleHover($event, 'ID do pedido')" 
                  @mouseleave="handleLeave">ID</th>
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                  @mouseenter="handleHover($event, 'Número do pedido')" 
                  @mouseleave="handleLeave">Pedido</th>
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                  @mouseenter="handleHover($event, 'Nome e email do cliente')" 
                  @mouseleave="handleLeave">Cliente</th>
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                  @mouseenter="handleHover($event, 'Data do pedido')" 
                  @mouseleave="handleLeave">Data</th>
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                  @mouseenter="handleHover($event, 'Valor total do pedido')" 
                  @mouseleave="handleLeave">Total</th>
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                  @mouseenter="handleHover($event, 'Status do pedido')" 
                  @mouseleave="handleLeave">Status</th>
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                  @mouseenter="handleHover($event, 'Quantidade de itens')" 
                  @mouseleave="handleLeave">Itens</th>
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                  @mouseenter="handleHover($event, 'Ações disponíveis')" 
                  @mouseleave="handleLeave">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="order in orders" :key="order.id" 
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                @mouseenter="handleHover($event, `Pedido ${order.order_number} do cliente ${order.client_name}, valor R$ ${formatPrice(order.total)}, status ${getStatusText(order.status)}`)" 
                @mouseleave="handleLeave">
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">{{ order.id }}</td>
              <td class="px-6 py-4 font-mono text-sm text-gray-900 dark:text-white">{{ order.order_number }}</td>
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900 dark:text-white">{{ order.client_name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ order.client_email }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">{{ formatDate(order.created_at) }}</td>
              <td class="px-6 py-4 font-semibold text-blue-600 dark:text-blue-400"
                  @mouseenter="handleHover($event, `R$ ${formatPrice(order.total)}`)" 
                  @mouseleave="handleLeave">
                R$ {{ formatPrice(order.total) }}
              </td>
              <td class="px-6 py-4">
                <select 
                  :value="order.status" 
                  @change="updateStatus(order.id, ($event.target as HTMLSelectElement).value)" 
                  class="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                  :aria-label="`Alterar status do pedido ${order.order_number}`"
                  @mouseenter="handleHover($event, `Status atual: ${getStatusText(order.status)}. Clique para alterar`)" 
                  @mouseleave="handleLeave">
                  <option value="pending">Pendente</option>
                  <option value="processing">Processando</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregue</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </td>
              <td class="px-6 py-4 text-center text-gray-900 dark:text-white">{{ order.items_count || order.items?.length || 0 }}</td>
              <td class="px-6 py-4">
                <button @click="viewOrder(order)" 
                        class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        :aria-label="`Ver detalhes do pedido ${order.order_number}`"
                        @mouseenter="handleHover($event, `Ver detalhes do pedido ${order.order_number}`)" 
                        @mouseleave="handleLeave"
                        title="Ver detalhes">
                  <i class="pi pi-eye text-lg" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            <tr v-if="orders.length === 0">
              <td colspan="8" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  @mouseenter="handleHover($event, 'Nenhum pedido encontrado com os filtros selecionados')" 
                  @mouseleave="handleLeave">
                <i class="pi pi-inbox text-4xl mb-2 block" aria-hidden="true"></i>
                Nenhum pedido encontrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Paginação -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center gap-4">
        <p class="text-sm text-gray-500 dark:text-gray-400"
           @mouseenter="handleHover($event, `Mostrando ${orders.length} de ${pagination.total} pedidos`)" 
           @mouseleave="handleLeave">
          Mostrando {{ orders.length }} de {{ pagination.total }} pedidos
        </p>
        <div class="flex gap-2">
          <button 
            @click="prevPage" 
            :disabled="pagination.page === 1" 
            class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
            :aria-label="'Página anterior'"
            :aria-disabled="pagination.page === 1"
            @mouseenter="handleHover($event, 'Ir para página anterior')" 
            @mouseleave="handleLeave">
            Anterior
          </button>
          <span class="px-3 py-1 text-gray-700 dark:text-gray-300"
                @mouseenter="handleHover($event, `Página ${pagination.page} de ${pagination.totalPages}`)" 
                @mouseleave="handleLeave">
            Página {{ pagination.page }} de {{ pagination.totalPages }}
          </span>
          <button 
            @click="nextPage" 
            :disabled="pagination.page === pagination.totalPages || pagination.totalPages === 0" 
            class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
            :aria-label="'Próxima página'"
            :aria-disabled="pagination.page === pagination.totalPages"
            @mouseenter="handleHover($event, 'Ir para próxima página')" 
            @mouseleave="handleLeave">
            Próxima
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modal de Detalhes -->
    <Dialog 
      v-model:visible="modalVisible" 
      header="Detalhes do Pedido" 
      :modal="true" 
      :style="{ width: '90vw', maxWidth: '800px' }"
      :closable="true"
      :aria-label="'Detalhes do pedido'"
      class="rounded-xl"
    >
      <div v-if="selectedOrder" class="space-y-6">
        <!-- Informações do Pedido e Cliente -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
               @mouseenter="handleHover($event, 'Informações do pedido')" 
               @mouseleave="handleLeave">
            <h3 class="font-semibold text-lg mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <i class="pi pi-shopping-cart" aria-hidden="true"></i>
              Informações do Pedido
            </h3>
            <div class="space-y-2 text-sm">
              <p><span class="text-gray-500 dark:text-gray-400">Nº do Pedido:</span> <span class="font-mono text-gray-900 dark:text-white">{{ selectedOrder.order_number }}</span></p>
              <p><span class="text-gray-500 dark:text-gray-400">Data:</span> <span class="text-gray-900 dark:text-white">{{ formatDate(selectedOrder.created_at) }}</span></p>
              <p><span class="text-gray-500 dark:text-gray-400">Status:</span> 
                <span :class="getStatusBadgeClass(selectedOrder.status)" class="px-2 py-0.5 rounded-full text-xs ml-2">
                  {{ getStatusText(selectedOrder.status) }}
                </span>
              </p>
              <p><span class="text-gray-500 dark:text-gray-400">Pagamento:</span> <span class="text-gray-900 dark:text-white">{{ selectedOrder.payment_method || 'Não informado' }}</span></p>
              <p><span class="text-gray-500 dark:text-gray-400">Status Pagamento:</span> <span class="text-gray-900 dark:text-white">{{ selectedOrder.payment_status || 'Pendente' }}</span></p>
            </div>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
               @mouseenter="handleHover($event, 'Dados do cliente')" 
               @mouseleave="handleLeave">
            <h3 class="font-semibold text-lg mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <i class="pi pi-user" aria-hidden="true"></i>
              Dados do Cliente
            </h3>
            <div class="space-y-2 text-sm">
              <p><span class="text-gray-500 dark:text-gray-400">Nome:</span> <span class="text-gray-900 dark:text-white">{{ selectedOrder.client_name }}</span></p>
              <p><span class="text-gray-500 dark:text-gray-400">Email:</span> <span class="text-gray-900 dark:text-white">{{ selectedOrder.client_email }}</span></p>
              <p><span class="text-gray-500 dark:text-gray-400">Telefone:</span> <span class="text-gray-900 dark:text-white">{{ selectedOrder.client_phone || '-' }}</span></p>
              <p><span class="text-gray-500 dark:text-gray-400">CPF:</span> <span class="text-gray-900 dark:text-white">{{ selectedOrder.client_cpf || '-' }}</span></p>
            </div>
          </div>
        </div>
        
        <!-- Endereço de Entrega -->
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
             @mouseenter="handleHover($event, 'Endereço de entrega')" 
             @mouseleave="handleLeave">
          <h3 class="font-semibold text-lg mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <i class="pi pi-map-marker" aria-hidden="true"></i>
            Endereço de Entrega
          </h3>
          <div class="space-y-1 text-sm">
            <p class="text-gray-900 dark:text-white">{{ selectedOrder.shipping_address || 'Endereço não informado' }}</p>
            <p v-if="selectedOrder.shipping_city || selectedOrder.shipping_state" class="text-gray-900 dark:text-white">
              {{ selectedOrder.shipping_city }}{{ selectedOrder.shipping_city && selectedOrder.shipping_state ? ', ' : '' }}{{ selectedOrder.shipping_state }}
              {{ selectedOrder.shipping_zip ? ' - ' + selectedOrder.shipping_zip : '' }}
            </p>
          </div>
        </div>
        
        <!-- Itens do Pedido -->
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
             @mouseenter="handleHover($event, 'Itens do pedido')" 
             @mouseleave="handleLeave">
          <h3 class="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <i class="pi pi-list" aria-hidden="true"></i>
            Itens do Pedido
          </h3>
          <div class="space-y-3">
            <div v-for="item in selectedOrder.items" :key="item.id" class="flex gap-4 border-b border-gray-200 dark:border-gray-600 pb-3 last:border-0"
                 @mouseenter="handleHover($event, `${item.quantity} x ${item.product_name} - R$ ${formatPrice(item.subtotal || item.price * item.quantity)}`)" 
                 @mouseleave="handleLeave">
              <img :src="item.image_url || '/placeholder-product.png'" class="w-16 h-16 object-cover rounded" :alt="item.product_name">
              <div class="flex-1">
                <p class="font-semibold text-gray-900 dark:text-white">{{ item.product_name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.quantity }} x R$ {{ formatPrice(item.price) }}</p>
                <p v-if="item.discount_percent" class="text-xs text-green-600">Desconto: {{ item.discount_percent }}%</p>
              </div>
              <p class="font-semibold text-blue-600 dark:text-blue-400">R$ {{ formatPrice(item.subtotal || item.price * item.quantity) }}</p>
            </div>
          </div>
          
          <!-- Totais -->
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span class="text-gray-900 dark:text-white">R$ {{ formatPrice(selectedOrder.subtotal || selectedOrder.total) }}</span>
              </div>
              <div v-if="selectedOrder.discount && selectedOrder.discount > 0" class="flex justify-between text-sm text-green-600">
                <span>Descontos:</span>
                <span>- R$ {{ formatPrice(selectedOrder.discount) }}</span>
              </div>
              <div v-if="selectedOrder.shipping_cost && selectedOrder.shipping_cost > 0" class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Frete:</span>
                <span class="text-gray-900 dark:text-white">R$ {{ formatPrice(selectedOrder.shipping_cost) }}</span>
              </div>
              <div class="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-600">
                <span class="text-gray-900 dark:text-white">Total:</span>
                <span class="text-blue-600 dark:text-blue-400">R$ {{ formatPrice(selectedOrder.total) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Botões de Ação -->
        <div class="flex justify-end gap-3">
          <button 
            v-if="selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered'"
            @click="openUpdateStatusModal"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2 shadow-md hover:shadow-lg"
            :aria-label="`Alterar status do pedido ${selectedOrder.order_number}`"
            @mouseenter="handleHover($event, 'Alterar status do pedido')" 
            @mouseleave="handleLeave">
            <i class="pi pi-pencil" aria-hidden="true"></i>
            Alterar Status
          </button>
          <button 
            @click="modalVisible = false"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
            :aria-label="'Fechar detalhes do pedido'"
            @mouseenter="handleHover($event, 'Fechar')" 
            @mouseleave="handleLeave">
            Fechar
          </button>
        </div>
      </div>
    </Dialog>
    
    <!-- Modal de Atualização de Status -->
    <Dialog 
      v-model:visible="statusModalVisible" 
      header="Alterar Status do Pedido" 
      :modal="true" 
      :style="{ width: '90vw', maxWidth: '450px' }"
      :aria-label="'Alterar status do pedido'"
      class="rounded-xl"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                 @mouseenter="handleHover($event, 'Selecione o novo status')" 
                 @mouseleave="handleLeave">
            Novo Status
          </label>
          <select 
            v-model="newStatus" 
            class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            :aria-label="'Novo status do pedido'"
            @mouseenter="handleHover($event, `Selecione o novo status. Atual: ${getStatusText(newStatus)}`)" 
            @mouseleave="handleLeave">
            <option value="pending">Pendente</option>
            <option value="processing">Processando</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregue</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                 @mouseenter="handleHover($event, 'Adicione observações sobre a alteração')" 
                 @mouseleave="handleLeave">
            Observações (opcional)
          </label>
          <textarea 
            v-model="statusNotes" 
            rows="3" 
            class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
            placeholder="Digite observações sobre a alteração..."
            :aria-label="'Observações da alteração de status'"
            @mouseenter="handleHover($event, 'Digite observações sobre esta alteração de status')" 
            @mouseleave="handleLeave">
          </textarea>
        </div>
        <div class="flex justify-end gap-3">
          <button @click="statusModalVisible = false" 
                  class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
                  :aria-label="'Cancelar alteração de status'"
                  @mouseenter="handleHover($event, 'Cancelar alteração')" 
                  @mouseleave="handleLeave">
            Cancelar
          </button>
          <button @click="confirmUpdateStatus" 
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2 shadow-md hover:shadow-lg"
                  :aria-label="'Confirmar alteração de status'"
                  @mouseenter="handleHover($event, 'Confirmar alteração de status')" 
                  @mouseleave="handleLeave">
            <i class="pi pi-check" aria-hidden="true"></i>
            Confirmar
          </button>
        </div>
      </div>
    </Dialog>
    
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import { accessibilityService } from '../../services/accessibility'

// Interfaces
interface OrderItem {
  id: number
  product_id: number
  product_name: string
  quantity: number
  price: number
  discount_percent?: number
  subtotal?: number
  image_url?: string
}

interface Order {
  id: number
  order_number: string
  client_id: number
  client_name: string
  client_email: string
  client_phone?: string
  client_cpf?: string
  total: number
  subtotal?: number
  discount?: number
  shipping_cost?: number
  status: string
  payment_method: string
  payment_status?: string
  created_at: string
  items_count?: number
  items?: OrderItem[]
  shipping_address?: string
  shipping_city?: string
  shipping_state?: string
  shipping_zip?: string
}

interface Stats {
  total: { total: number; total_value: number }
  pending: { total: number }
  processing: { total: number }
  shipped: { total: number }
  delivered: { total: number }
  cancelled: { total: number }
}

interface Pagination {
  page: number
  total: number
  totalPages: number
  limit: number
}

const toast = useToast()

const loading = ref(false)
const orders = ref<Order[]>([])
const selectedOrder = ref<Order | null>(null)
const modalVisible = ref(false)
const statusModalVisible = ref(false)
const newStatus = ref('')
const statusNotes = ref('')

const filters = ref({
  status: 'all',
  search: ''
})

const pagination = ref<Pagination>({
  page: 1,
  total: 0,
  totalPages: 1,
  limit: 20
})

const stats = ref<Stats>({
  total: { total: 0, total_value: 0 },
  pending: { total: 0 },
  processing: { total: 0 },
  shipped: { total: 0 },
  delivered: { total: 0 },
  cancelled: { total: 0 }
})

let searchTimeout: ReturnType<typeof setTimeout> | null = null

const formatPrice = (price: number): string => {
  return Number(price || 0).toFixed(2).replace('.', ',')
}

const formatDate = (date: string): string => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusText = (status: string): string => {
  const texts: Record<string, string> = {
    pending: 'Pendente',
    processing: 'Processando',
    shipped: 'Enviado',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  }
  return texts[status] || status
}

const getStatusBadgeClass = (status: string): string => {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  }
  return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
}

const handleHover = (event: MouseEvent, text: string): void => {
  const target = event.currentTarget as HTMLElement
  accessibilityService.handleHover(target, text)
}

const handleLeave = (): void => {
  accessibilityService.handleLeave()
}

const loadStats = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/api/admin/orders/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (response.ok) {
      stats.value = await response.json()
    }
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error)
  }
}

const loadOrders = async (): Promise<void> => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const params = new URLSearchParams({
      page: String(pagination.value.page),
      limit: String(pagination.value.limit),
      status: filters.value.status,
      search: filters.value.search
    })
    
    const response = await fetch(`http://localhost:3000/api/admin/orders?${params}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    if (response.ok) {
      const data = await response.json()
      orders.value = data.orders
      pagination.value = {
        page: data.page,
        total: data.total,
        totalPages: data.totalPages,
        limit: data.limit
      }
    }
  } catch (error) {
    console.error('Erro ao carregar pedidos:', error)
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar pedidos', life: 3000 })
  } finally {
    loading.value = false
  }
}

const updateStatus = async (orderId: number, newStatusValue: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/api/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatusValue })
    })
    
    if (response.ok) {
      toast.add({ severity: 'success', summary: 'Status atualizado', detail: 'Status do pedido atualizado com sucesso', life: 3000 })
      loadStats()
      loadOrders()
    } else {
      const error = await response.json()
      throw new Error(error.error)
    }
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Erro', detail: error.message, life: 3000 })
    loadOrders()
  }
}

const viewOrder = async (order: Order): Promise<void> => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/api/admin/orders/${order.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    if (response.ok) {
      selectedOrder.value = await response.json()
      modalVisible.value = true
    }
  } catch (error) {
    console.error('Erro ao carregar detalhes:', error)
  }
}

const openUpdateStatusModal = (): void => {
  if (selectedOrder.value) {
    newStatus.value = selectedOrder.value.status
    statusNotes.value = ''
    statusModalVisible.value = true
  }
}

const confirmUpdateStatus = async (): Promise<void> => {
  if (!selectedOrder.value) return
  
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/api/admin/orders/${selectedOrder.value.id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        status: newStatus.value,
        notes: statusNotes.value 
      })
    })
    
    if (response.ok) {
      toast.add({ severity: 'success', summary: 'Status atualizado', detail: 'Status do pedido atualizado com sucesso', life: 3000 })
      statusModalVisible.value = false
      modalVisible.value = false
      loadStats()
      loadOrders()
    } else {
      const error = await response.json()
      throw new Error(error.error)
    }
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Erro', detail: error.message, life: 3000 })
  }
}

const prevPage = (): void => {
  if (pagination.value.page > 1) {
    pagination.value.page--
    loadOrders()
  }
}

const nextPage = (): void => {
  if (pagination.value.page < pagination.value.totalPages) {
    pagination.value.page++
    loadOrders()
  }
}

const debouncedSearch = (): void => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    loadOrders()
  }, 500)
}

onMounted(() => {
  loadStats()
  loadOrders()
})
</script>