import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Profile from '../views/Profile.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Orders from '../views/Orders.vue'

// Importar as páginas institucionais
import Sobre from '../views/Sobre.vue'
import Privacidade from '../views/Privacidade.vue'
import Termos from '../views/Termos.vue'
import Trocas from '../views/Trocas.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Início' }
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: Sobre,
    meta: { title: 'Sobre Nós' }
  },
  {
    path: '/privacidade',
    name: 'Privacidade',
    component: Privacidade,
    meta: { title: 'Política de Privacidade' }
  },
  {
    path: '/termos',
    name: 'Termos',
    component: Termos,
    meta: { title: 'Termos de Uso' }
  },
  {
    path: '/trocas',
    name: 'Trocas',
    component: Trocas,
    meta: { title: 'Trocas e Devoluções' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: 'Cadastro' }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { title: 'Detalhes do Produto' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true, title: 'Meu Perfil' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { title: 'Carrinho de Compras' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true, title: 'Finalizar Compra' }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { requiresAuth: true, title: 'Meus Pedidos' }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../views/Admin/Dashboard.vue'),
    meta: { requiresAuth: true, role: 'admin', title: 'Admin - Dashboard' }
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: () => import('../views/Admin/Products.vue'),
    meta: { requiresAuth: true, role: 'admin', title: 'Admin - Produtos' }
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: () => import('../views/Admin/Categories.vue'),
    meta: { requiresAuth: true, role: 'admin', title: 'Admin - Categorias' }
  },
  {
    path: '/admin/offers',
    name: 'AdminOffers',
    component: () => import('../views/Admin/Offers.vue'),
    meta: { requiresAuth: true, role: 'admin', title: 'Admin - Ofertas' }
  },
  {
    path: '/admin/admins',
    name: 'AdminAdmins',
    component: () => import('../views/Admin/Admins.vue'),
    meta: { requiresAuth: true, role: 'admin', title: 'Admin - Administradores' }
  },
  {
    path: '/admin/clients',
    name: 'AdminClients',
    component: () => import('../views/Admin/Clients.vue'),
    meta: { requiresAuth: true, role: 'admin', title: 'Admin - Clientes' }
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: () => import('../views/Admin/Orders.vue'),
    meta: { requiresAuth: true, role: 'admin', title: 'Admin - Pedidos' }
  },
  // Rota 404 - Não encontrada
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: 'Página Não Encontrada' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Guarda de navegação
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('userRole')
  
  // Atualizar título da página
  if (to.meta?.title) {
    document.title = `${to.meta.title} - RCP Tecnologia`
  } else {
    document.title = 'RCP Tecnologia'
  }
  
  // Verificar se precisa de autenticação
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } 
  // Verificar se precisa ser admin
  else if (to.meta.role === 'admin' && userRole !== 'admin' && userRole !== 'super_admin') {
    next('/')
  } 
  else {
    next()
  }
})

export default router